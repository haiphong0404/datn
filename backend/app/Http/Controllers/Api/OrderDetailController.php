<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;

class OrderDetailController extends Controller
{
    /**
     * Hàm lấy ảnh dưới dạng base64
     */
    private function getImageAsBase64($imagePath)
    {
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            $imageData = Storage::disk('public')->get($imagePath);
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null;
    }

    /**
     * Lấy danh sách trạng thái cho phép chuyển đổi
     */
    public function getAllowedTransitions()
    {
        return [
            'pending' => ['cancelled'], // Chỉ có thể hủy từ trạng thái pending
            'processing' => [],        // Không cho phép chuyển đổi từ trạng thái processing
            'completed' => [],         // Trạng thái completed không thể thay đổi
        ];
    }

    /**
     * Cập nhật trạng thái đơn hàng
     */
    public function updateOrderStatus(Request $request, $order_id)
    {
        // Lấy thông tin đơn hàng từ database theo order_id
        $order = Order::find($order_id);

        if (!$order) {
            // Nếu không tìm thấy đơn hàng, trả về lỗi 404
            return response()->json([
                'success' => false,
                'message' => 'Đơn hàng không tồn tại.',
            ], 404);
        }

        // Lấy trạng thái mới từ request body
        $newStatus = $request->input('newStatus');
        if (!$newStatus) {
            // Nếu không có trạng thái mới trong request body, trả về lỗi
            return response()->json([
                'success' => false,
                'message' => 'Trạng thái mới không được cung cấp.',
            ], 400);
        }

        $currentStatus = $order->status;
        $allowedTransitions = $this->getAllowedTransitions();

        // Kiểm tra trạng thái mới có hợp lệ không
        if (!isset($allowedTransitions[$currentStatus]) || !in_array($newStatus, $allowedTransitions[$currentStatus])) {
            return response()->json([
                'success' => false,
                'message' => 'Trạng thái chuyển đổi không hợp lệ.',
            ], 400);
        }

        // Nếu trạng thái mới là "cancelled"
        if ($newStatus === 'cancelled') {
            // Khôi phục số lượng sản phẩm từ các chi tiết đơn hàng
            foreach ($order->orderDetails as $orderDetail) {
                $productVariant = ProductVariant::find($orderDetail->product_variant_id);
                if ($productVariant) {
                    try {
                        // Cập nhật lại số lượng của biến thể sản phẩm
                        $productVariant->quantity += $orderDetail->quantity;
                        $productVariant->save();
        
                        // Cập nhật tổng số lượng tồn kho của sản phẩm
                        $product = Product::findOrFail($productVariant->product_id);
                        $product->total_quantity_in_stock += $orderDetail->quantity;
                        $product->save();
                    } catch (\Exception $e) {
                        Log::error("Lỗi cập nhật số lượng sản phẩm: {$e->getMessage()}");
                        return response()->json([
                            'success' => false,
                            'message' => 'Lỗi khi khôi phục số lượng sản phẩm.',
                        ], 500);
                    }
                } else {
                    // Nếu không tìm thấy biến thể sản phẩm, ghi log
                    Log::warning("Không tìm thấy biến thể sản phẩm với ID: {$orderDetail->product_variant_id}");
                    continue; // Bỏ qua và xử lý các sản phẩm khác
                }
            }
        }
        

        // Cập nhật trạng thái đơn hàng
        $order->status = $newStatus;
        $order->save();

        // Trả về phản hồi thành công với thông tin đơn hàng đã được cập nhật
        return response()->json([
            'success' => true,
            'message' => 'Cập nhật trạng thái thành công.',
            'order' => $order,
        ]);
    }
    

    /**
     * Lấy thông tin chi tiết đơn hàng
     */
    public function getOrderDetails($order_id)
    {
        $order = Order::with([
            'orderDetails.productVariant.product',
            'orderDetails.productVariant.images',
            'orderDetails.productVariant.color',
            'orderDetails.productVariant.size',
        ])->find($order_id);

        if (!$order) {
            return response()->json(['error' => 'Đơn hàng không tồn tại'], 404);
        }

        $user = $order->user;

        $orderDetails = $order->orderDetails->map(function ($detail) {
            $product = $detail->productVariant->product;
            $images = $detail->productVariant->images;
            $variant = $detail->productVariant;

            return [
                'product_variant_id' => $detail->product_variant_id,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'product' => [
                    'name' => $product->name,
                    'description' => $product->description,
                    'category_id' => $product->category_id,
                    'brand_id' => $product->brand_id,
                    'image' => $this->getImageAsBase64($product->image),
                ],
                'color' => $variant->color,
                'size' => $variant->size,
                'variant_images' => $images->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'base64_image' => $this->getImageAsBase64($image->image),
                        'product_variant_id' => $image->product_variant_id,
                    ];
                }),
            ];
        });

        return response()->json([
            "order_date" => $order->order_date,
            "shipping_fee" => $order->shipping_fee,
            "voucher_discount" => $order->voucher_discount,
            "status" => $order->status,
            "user_id" => $order->user_id,
            "total_amount" => $order->total_amount,
            "name" => $order->name,
            "phone" => $order->phone,
            "address" => $order->address,
            "infor" => $order->infor,
            "payment_status" => $order->payment_status,
            "email" => $user->email,
            "products" => $orderDetails,
        ]);
    }
}