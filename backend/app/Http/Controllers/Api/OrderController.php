<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class OrderController extends Controller
{

public function acb($user_id)
{
    $orders = DB::table('orders')
        ->join('users', 'users.id', '=', 'orders.user_id')
        ->join('carts', 'carts.user_id', '=', 'users.id')
        ->join('cart_items', 'cart_items.cart_id', '=', 'carts.id')
        ->join('product_variants', 'product_variants.id', '=', 'cart_items.product_variant_id')
        ->join('products', 'products.id', '=', 'product_variants.product_id')
        ->join('vouchers', 'vouchers.user_id', '=', 'users.id')
        ->where('orders.user_id', $user_id)
        ->select(
            'orders.*',
            'users.username',
            'users.email',
            'users.address as useraddress',
            'users.phone as userphone',
            'users.avatar_img',
            'product_variants.size_id',
            'product_variants.color_id',
            'products.name',
            'products.description',
            'products.image',
            'vouchers.code'
        )
        ->get();

    // Chuyển đổi các ảnh thành chuỗi Base64
    $orders->transform(function ($order) {
        $order->avatar_img = $this->getImageAsBase64($order->avatar_img);
        $order->image = $this->getImageAsBase64($order->image);
        return $order;
    });

    return response()->json($orders);
}

// Hàm hỗ trợ chuyển đổi hình ảnh sang chuỗi Base64
private function getImageAsBase64($imagePath)
{
    // Kiểm tra nếu hình ảnh tồn tại
    if ($imagePath && Storage::disk('public')->exists($imagePath)) {
        // Lấy nội dung hình ảnh
        $imageData = Storage::disk('public')->get($imagePath);
        // Lấy loại mime type của hình ảnh
        $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));
        // Mã hóa hình ảnh thành Base64
        return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
    }

    return null; // Nếu không có hình ảnh, trả về null
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      

      
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
     
    }


    /**
     * Remove the specified resource from storage.
     */
   
}