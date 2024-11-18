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

            // Lấy ảnh sản phẩm chính nếu có
            $productImageBase64 = $product->image ? $this->getImageAsBase64('storage/' . $product->image) : null;

            // Lấy ảnh của từng variant nếu có
            $variantImagesBase64 = $images->map(function ($img) {
                return $img->image ? $this->getImageAsBase64('storage/' . $img->image) : null;
            });

            return [
                'product_variant_id' => $detail->product_variant_id,
                'quantity' => $detail->quantity,
                'price' => $detail->price,
                'product' => [
                    'name' => $product->name,
                    'description' => $product->description,
                    'category_id' => $product->category_id,
                    'brand_id' => $product->brand_id,
                    'image' => $productImageBase64,
                ],
                'variantImages' => $variantImagesBase64,
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
        // Kiểm tra xem ảnh có tồn tại trong thư mục `storage` không
        if (Storage::exists($imagePath)) {
            $imageData = Storage::get($imagePath);
            return base64_encode($imageData);
        } elseif (file_exists(public_path('storage/' . $imagePath))) {
            // Kiểm tra nếu ảnh tồn tại trong thư mục `public/storage`
            $imageData = file_get_contents(public_path('storage/' . $imagePath));
            return base64_encode($imageData);
        } elseif (file_exists(public_path($imagePath))) {
            // Kiểm tra nếu ảnh tồn tại trong thư mục `public`
            $imageData = file_get_contents(public_path($imagePath));
            return base64_encode($imageData);
        }
        return null; // Trả về null nếu hình ảnh không tồn tại
    }
}