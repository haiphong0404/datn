<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;
use Stripe\Webhook;

class StripeController extends Controller
{
    //
    public function createStripe(Request $request)
    {
        try {
            // Bắt đầu transaction
            DB::beginTransaction();

            // Tạo dữ liệu đơn hàng
            $orderData = [
                'user_id' => $request->input('user_id'),
                'order_date' => Carbon::parse($request->input('order_date'))->format('Y-m-d H:i:s'),
                'status' => $request->input('status', 'pending'),
                'total_amount' => $request->input('total_amount'),
                'name' => $request->input('name'),
                'phone' => $request->input('phone'),
                'address' => $request->input('address'),
                'infor' => $request->input('infor'),
                'payment_method' => $request->input('payment_method'),
                'payment_status' => $request->input('payment_status', 'unpaid'),
                'shipping_fee' => $request->input('shipping_fee'), // Thêm phí vận chuyển
                'voucher_discount' => $request->input('voucher_discount'), // Thêm giảm giá từ voucher
            ];

            // Tạo đơn hàng
            $order = Order::create($orderData);

            // Tạo các chi tiết đơn hàng
            foreach ($request->products as $product) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'product_variant_id' => $product['product_variant_id'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                    'image' => $product['image'],
                ]);
            }

            // Tính tổng số tiền (total_amount)
            $totalAmountInVND = $request->input('total_amount'); // Giá trị của total_amount trong VND (đã tính phí vận chuyển, giảm giá,...)
            foreach ($request->products as $product) {
                // Lấy thông tin sản phẩm biến thể
                $productVariant = ProductVariant::find($product['product_variant_id']);
                if (!$productVariant) {
                    throw new \Exception('Sản phẩm biến thể không tồn tại.');
                }

                $productName = $productVariant->product->name;  // Tên sản phẩm
                $color = $productVariant->color->name;  // Màu sắc
                $size = $productVariant->size->name;    // Kích cỡ
                $price = $productVariant->price;  // Giá của sản phẩm
                // $quantity = $productVariant->image;
            }
            // Tạo phiên thanh toán Stripe
            Stripe::setApiKey(config('services.stripe.secret'));

            // Tạo phiên thanh toán cho Stripe
            $checkoutSession = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [
                    [
                        'price_data' => [
                    'currency' => 'vnd', // Sử dụng VND
                    'product_data' => [
                        'name' => $productName . ' - ' . $color . ' - Size ' . $size, // Tên sản phẩm, màu sắc, kích cỡ
                    //    'quantity' => intval($product['quantity'])
                    ],
                            'unit_amount' => $totalAmountInVND, // Dùng total_amount của đơn hàng (được tính bằng đồng)
                        ],
                        'quantity' => 1, // Đây là tổng giá trị của đơn hàng, chỉ cần một dòng
                    ]
                ],
                'mode' => 'payment',
                'success_url' => url('http://localhost:3000/payment-success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => url('http://localhost:3000/payment-cancel'),
                'metadata' => [
                    'order_id' => $order->id,
                ],
            ]);

            // Commit transaction
            DB::commit();

            // Trả về session ID của Stripe
            return response()->json([
                'message' => 'Phiên thanh toán Stripe đã được tạo thành công.',
                'order_id' => $order->id,
                'sessionId' => $checkoutSession->id,
                'success_url' => url('http://localhost:3000/payment-success') . '?session_id=' . $checkoutSession->id,  // Trả về URL thành công
            ], 200);
    } catch (\Exception $e) {
        // Rollback nếu có lỗi
        DB::rollBack();

        // Log lỗi
        Log::error('Lỗi tạo thanh toán: ' . $e->getMessage(), [
            'data' => $request->all(),
            'error' => $e->getTraceAsString(),
        ]);

        // Trả về lỗi
        return response()->json([
            'message' => 'Đã xảy ra lỗi khi tạo phiên thanh toán.',
        ], 500);
    }
}
public function handle(Request $request)
{
    // Log tất cả dữ liệu từ Stripe webhook
    Log::info('Stripe Webhook received:', [
        'payload' => $request->getContent(),
        'headers' => $request->headers->all()
    ]);

    // Xác thực webhook signature
    Stripe::setApiKey(config('services.stripe.secret'));
    $endpointSecret = config('services.stripe.webhook_secret');
    $payload = $request->getContent();
    $sigHeader = $request->header('Stripe-Signature');

    try {
        // Kiểm tra sự kiện
        $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);

        // Log sự kiện Stripe
        Log::info('Stripe Event received:', ['event' => $event]);

        if ($event->type === 'checkout.session.completed') {
            // Thanh toán thành công
            $session = $event->data->object;
            $orderId = $session->metadata->order_id;
            $order = Order::find($orderId);

            if ($order) {
                $order->payment_status = 'paid'; // Cập nhật trạng thái thanh toán thành "paid"
                // $order->status = 'completed';   // Cập nhật trạng thái đơn hàng thành "completed"
                $order->save();

                foreach ($order->orderDetails as $detail) {
                    $productVariant = $detail->productVariant;
                    if ($productVariant) {
                        if ($productVariant->quantity >= $detail->quantity) {
                            $productVariant->decrement('quantity', $detail->quantity);

                            $product = $productVariant->product;
                            if ($product) {
                                $product->total_quantity_in_stock = $product->variants->sum('quantity');
                                $product->save();
                            }
                        } else {
                            throw new \Exception("Không đủ số lượng trong kho cho biến thể sản phẩm ID: {$productVariant->id}");
                        }
                    } else {
                        throw new \Exception("Không tìm thấy biến thể sản phẩm cho order_detail ID: {$detail->id}");
                    }
                }

                // Xóa giỏ hàng
                CartItem::whereHas('cart', function ($query) use ($order) {
                    $query->where('user_id', $order->user_id);
                })
                ->whereIn('product_variant_id', $order->orderDetails->pluck('product_variant_id'))
                    ->delete();
            }
        } elseif ($event->type === 'checkout.session.expired') {
            // Thanh toán không thành công (hết hạn)
            $session = $event->data->object;
            $orderId = $session->metadata->order_id;
            $order = Order::find($orderId);

            if ($order) {
                // Xóa các chi tiết đơn hàng
                $order->orderDetails()->delete();

                // Xóa đơn hàng
                $order->delete();
            }
        }

        return response()->json(['status' => 'success'], 200);

    } catch (\Exception $e) {
        // Log lỗi nếu có
        Log::error('Stripe Webhook Error:', [
            'error' => $e->getMessage(),
            'payload' => $payload,
            'signature' => $sigHeader
        ]);

        return response()->json(['error' => 'Invalid webhook signature'], 400);
    }
}

public function verifySession($sessionId)
{
    Stripe::setApiKey(config('services.stripe.secret'));

    try {
        // Lấy thông tin phiên thanh toán từ Stripe
        $session = \Stripe\Checkout\Session::retrieve($sessionId);

        // Kiểm tra trạng thái thanh toán
        if ($session->payment_status === 'paid') {
            // Tìm đơn hàng từ metadata đã lưu trong phiên thanh toán
            $order = Order::find($session->metadata->order_id);

            if ($order) {
                return response()->json([
                    'status' => 'success',
                    'order' => $order,
                ], 200);
            } else {
                return response()->json([
                    'status' => 'failed',
                    'message' => 'Order not found.',
                ], 404);
            }
        } else {
            return response()->json([
                'status' => 'failed',
                'message' => 'Payment not successful.',
            ], 400);
        }
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to verify payment session.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function cancelOrder($orderId)
{
    try {
        $order = Order::find($orderId);

        if (!$order) {
            return response()->json(['message' => 'Order not found.'], 404);
        }

        // Xóa chi tiết đơn hàng
        $order->orderDetails()->delete();

        // Xóa đơn hàng
        $order->delete();

        return response()->json(['status' => 'success', 'message' => 'Order has been cancelled and deleted.'], 200);
    } catch (\Exception $e) {
        Log::error('Error canceling order: ' . $e->getMessage(), [
            'order_id' => $orderId,
            'error' => $e->getTraceAsString(),
        ]);

        return response()->json(['status' => 'error', 'message' => 'Failed to cancel the order.'], 500);
    }
}

}
