<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Storage;

class OrderDetailController extends Controller
{
    public function getOrderDetails($order_id)
    {
        // Tìm đơn hàng với các thông tin liên quan
        $order = Order::with([
            'orderDetails.productVariant.product',
            'orderDetails.productVariant.images',
            'orderDetails.productVariant'  // Đảm bảo bạn lấy cả thông tin variant
        ])->find($order_id);
    
        // Kiểm tra nếu đơn hàng không tồn tại
        if (!$order) {
            return response()->json(['error' => 'Đơn hàng không tồn tại'], 404);
        }

        // Lấy thông tin người dùng (email) từ bảng Users
        $user = $order->user; // assuming the relationship 'user' exists in the Order model

        // Chuẩn bị dữ liệu để trả về
        $orderDetails = $order->orderDetails->map(function ($detail) {
            $product = $detail->productVariant->product;
            $images = $detail->productVariant->images;
            $variant = $detail->productVariant;  // Lấy thông tin của variant

            

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
                'variantImages' => $this->getImageAsBase64($variant->image),
                'color' => $variant->color,  // Lấy màu sắc từ variant
                'size' => $variant->size,    // Lấy kích thước từ variant
            ];
        });

        // Dữ liệu đơn hàng để trả về, bao gồm email của người đặt hàng
        $response = [
            "order_date" => $order->order_date,
            "status" => $order->status,
            "user_id" => $order->user_id,
            "total_amount" => $order->total_amount,
            "name" => $order->name,
            "phone" => $order->phone,
            "address" => $order->address,
            "infor" => $order->infor,
            "payment_status" => $order->payment_status,
            "email" => $user->email,  // Add email field
            "products" => $orderDetails
        ];

        return response()->json($response);
    }

    /**
     * Hàm lấy ảnh dưới dạng base64
     */
    private function getImageAsBase64($imagePath)
    {
        // Kiểm tra nếu hình ảnh tồn tại
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            // Lấy nội dung hình ảnh
            $imageData = Storage::disk('public')->get($imagePath);
            // Lấy loại mime type bằng cách sử dụng FFMpeg hoặc PHP
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath)); // Sửa tại đây
            // Mã hóa hình ảnh thành Base64
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null; // Nếu không có hình ảnh, trả về null
    }

}