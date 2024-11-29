<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Cart;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    /**
     * Tạo đơn hàng và trả về chi tiết thanh toán.
     */
    public function createPayment(Request $request)
    {
        try {
            // Bắt đầu transaction
            DB::beginTransaction();

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

            // Commit transaction
            DB::commit();

            // Lấy chi tiết đơn hàng
            $orderDetails = OrderDetail::where('order_id', $order->id)->get();

            // Trả về chi tiết đơn hàng và các URL hành động
            return response()->json([
                'message' => 'Dữ liệu đã được nhận thành công!',
                'received_data' => $request->all(),
                'order_id' => $order->id,
                'order_details' => $orderDetails,
            ], 200);

        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi
            DB::rollBack();

            // Log lỗi vào file log
            Log::error('Lỗi tạo đơn hàng: ' . $e->getMessage(), [
                'user_id' => $request->input('user_id'),
                'order_data' => $request->all(),
                'error' => $e->getTraceAsString(),
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
        $order = Order::find($order_id);

        if (!$order || $order->status !== 'pending') {
            return response()->json([
                'message' => 'Đơn hàng không tồn tại hoặc không hợp lệ.',
            ], 404);
        }

        try {
            // Bắt đầu transaction
            DB::beginTransaction();

            // Cập nhật trạng thái đơn hàng
            $order->update([
                'payment_status' => 'paid',
            ]);

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
                ->where('product_variant_id', $productVariant->id)
                ->delete();

            // Commit transaction
            DB::commit();

            return response()->json([
                'message' => 'Thanh toán thành công!',
                'order' => $order,
            ]);

        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi
            DB::rollBack();

            // Log lỗi
            Log::error('Lỗi khi xử lý thanh toán :', [
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
        $order = Order::find($order_id);

        if (!$order || $order->status !== 'pending') {
            return response()->json([
                'message' => 'Đơn hàng không tồn tại hoặc không hợp lệ.',
            ], 404);
        }

        try {
            // Bắt đầu transaction
            DB::beginTransaction();

            // Xóa chi tiết đơn hàng
            $order->orderDetails()->delete();

            // Xóa đơn hàng
            $order->delete();

            // Commit transaction
            DB::commit();

            return response()->json([
                'message' => 'Đơn hàng và các chi tiết liên quan đã được xóa!',
            ]);

        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi
            DB::rollBack();
            return response()->json([
                'message' => 'Đã có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.',
            ], 500);
        }
    }


}
