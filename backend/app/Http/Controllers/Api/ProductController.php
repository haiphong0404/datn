<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = Product::with(['category', 'brand'])->get();
        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Không có sản phẩm nào được tìm thấy!'
            ], 404);
        }

        return response()->json($products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'category' => $product->category ? $product->category->name : null,
                'brand' => $product->brand ? $product->brand->name : null,
                'image' => $this->getImageAsBase64($product->image), // Chuyển đổi hình ảnh sang Base64
            ];
        }), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::with(['category', 'brand'])->findOrFail($id);

        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'category' => $product->category ? $product->category->name : null,
            'brand' => $product->brand ? $product->brand->name : null,
            'image' => $this->getImageAsBase64($product->image), // Chuyển đổi hình ảnh sang Base64
        ], 200);
    }

    /**
     * Convert image to Base64.
     */ private function getImageAsBase64($imagePath)
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



    /**
     * Show the form for editing the specified resource.
     */
}
