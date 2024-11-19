<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderDetailController extends Controller
{
    public function getOrderDetails($order_id)
    {
        // Truy vấn dữ liệu
        $data = DB::table('order_details')
        ->leftJoin('orders', 'orders.id', '=', 'order_details.order_id')
        ->leftJoin('product_variants', 'product_variants.id', '=', 'order_details.product_variant_id')
        ->leftJoin('products', 'products.id', '=', 'product_variants.product_id')
        ->leftJoin('images', 'images.product_variant_id', '=', 'product_variants.id')
        ->where('order_details.order_id', $order_id)
        ->select(
            'order_details.*',
            'orders.*',
            'product_variants.*',
            'products.name',
            'products.description',
            'products.image',
            'products.category_id',
            'products.brand_id',
            'images.image as product_variants.images',
        )
        ->get();
    
      
        $orderDetails = $data->map(function ($detail) {
            $detail->image = $this->getImageAsBase64($detail->image);
            return $detail;
        });

        return response()->json($orderDetails);
    }

   
    private function getImageAsBase64($imagePath)
    {
        $path = public_path($imagePath); 
        if (file_exists($path)) {
            $imageData = file_get_contents($path);
            return base64_encode($imageData);
        }

        return null; // Trả về null nếu hình ảnh không tồn tại
    }
}