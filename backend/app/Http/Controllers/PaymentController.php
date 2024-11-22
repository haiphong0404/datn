<?php

namespace App\Http\Controllers;

use App\Models\OrderDetail;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Models\Product;
use Carbon\Carbon;

class PaymentController extends Controller
{
    /**
     * Tạo đơn hàng và trả về chi tiết thanh toán.
     */
    public function createPayment(Request $request)
{
    try {
        // Thông tin đơn hàng
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

        // Lấy chi tiết đơn hàng
        $orderDetails = OrderDetail::where('order_id', $order->id)->get();

        // Trả về chi tiết đơn hàng và các URL hành động
        return response()->json([
            'message' => 'Dữ liệu đã được nhận thành công!',
            'received_data' => $request->all(), // Trả về tất cả dữ liệu frontend gửi lên
            'order_id' => $order->id, // Trả về order_id
            'order_details' => $orderDetails, // Trả về dữ liệu order_details
        ], 200);

    } catch (\Exception $e) {
        // Log lỗi vào file log
        Log::error('Lỗi tạo đơn hàng: ' . $e->getMessage(), [
            'user_id' => $request->input('user_id'),
            'order_data' => $request->all(),
            'error' => $e->getTraceAsString(), // Log stack trace để dễ dàng chẩn đoán lỗi
        ]);

        // Trả về thông báo lỗi cho người dùng
        return response()->json([
            'message' => 'Đã có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.',
        ], 500);
    }
}

    /**
     * Xử lý khi thanh toán thành công.
     */
    public function paymentSuccess($order_id)
    {
        // Lấy đơn hàng từ database
        $order = Order::find($order_id);

        if (!$order || $order->status !== 'pending') {
            return response()->json([
                'message' => 'Đơn hàng không tồn tại hoặc không hợp lệ.',
            ], 404);
        }

        try {
            // Cập nhật trạng thái đơn hàng
            $order->update([
                'payment_status' => 'paid',
            ]);

            // Trừ số lượng sản phẩm biến thể và tính toán lại số lượng sản phẩm cha
            foreach ($order->orderDetails as $detail) {
                $productVariant = $detail->productVariant; // Lấy biến thể sản phẩm
                if ($productVariant) {
                    if ($productVariant->quantity >= $detail->quantity) {
                        // Trừ số lượng của biến thể
                        $productVariant->decrement('quantity', $detail->quantity);

                        // Tính lại tổng số lượng của sản phẩm cha
                        $product = $productVariant->product; // Lấy sản phẩm cha qua biến thể
                        if ($product) {
                            $product->total_quantity_in_stock = $product->variants->sum('quantity'); // Tính tổng số lượng từ các biến thể
                            $product->save();
                        }
                    } else {
                        Log::warning('Không đủ số lượng trong kho để trừ:', [
                            'product_variant_id' => $productVariant->id,
                            'current_quantity' => $productVariant->quantity,
                            'requested_quantity' => $detail->quantity,
                        ]);
                    }
                } else {
                    Log::error('Không tìm thấy biến thể cho chi tiết đơn hàng:', [
                        'order_detail_id' => $detail->id,
                    ]);
                }
            }

            // Xóa sản phẩm trong giỏ hàng
            Cart::where('user_id', $order->user_id)->delete();

            return response()->json([
                'message' => 'Thanh toán thành công!',
                'order' => $order,
            ]);

        } catch (\Exception $e) {
            // Log lỗi và trả về thông báo lỗi
            Log::error('Lỗi khi xử lý thanh toán thành công:', [
                'order_id' => $order_id,
                'error_message' => $e->getMessage(),
            ]);

            return response()->json([
                'message' => 'Đã có lỗi xảy ra trong quá trình xử lý thanh toán.',
            ], 500);
        }
    }

    /**
     * Xử lý khi hủy đơn hàng.
     */
    public function paymentCancel($order_id)
{
    // Lấy đơn hàng từ database
    $order = Order::find($order_id);

    if (!$order || $order->status !== 'pending') {
        return response()->json([
            'message' => 'Đơn hàng không tồn tại hoặc không hợp lệ.',
        ], 404);
    }

    try {
        // Xóa các chi tiết đơn hàng liên quan trong bảng order_details
        $order->orderDetails()->delete(); // Giả sử đã định nghĩa quan hệ orderDetails trong model Order

        // Xóa đơn hàng trong bảng orders
        $order->delete();

        return response()->json([
            'message' => 'Đơn hàng và các chi tiết liên quan đã được xóa!',
        ]);
    } catch (\Exception $e) {
        // Log lỗi nếu có vấn đề xảy ra
        Log::error('Lỗi khi hủy đơn hàng:', [
            'order_id' => $order_id,
            'error_message' => $e->getMessage(),
        ]);

        return response()->json([
            'message' => 'Đã có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.',
        ], 500);
    }
}
}
