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
        // Lấy danh sách sản phẩm chưa bị xóa mềm
        $products = Product::with(['category', 'brand'])
            ->whereNull('deleted_at') // Đảm bảo chỉ lấy sản phẩm chưa bị xóa mềm
            ->get();

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Không có sản phẩm nào được tìm thấy!'
            ], 404);
        }

        return response()->json($products->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'description' => $product->description,
                'category' => $product->category ? $product->category->name : null,
                'brand' => $product->brand ? $product->brand->name : null,
                'image' => $this->getImageAsBase64($product->image), // Chuyển đổi hình ảnh sang Base64
                'category_id' => $product->category_id,
                'brand_id' => $product->brand_id,
            ];
        }), 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // Tìm sản phẩm chưa bị xóa mềm
        $product = Product::with(['category', 'brand'])
            ->where('id', $id)
            ->whereNull('deleted_at') // Đảm bảo sản phẩm chưa bị xóa mềm
            ->first();

        if (!$product) {
            return response()->json([
                'message' => 'Sản phẩm không tồn tại hoặc đã bị xóa!'
            ], 404);
        }

        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => round($product->price, 2),
            'category' => $product->category ? $product->category->name : null,
            'category_id' => $product->category ? $product->category->id : null,
            'brand' => $product->brand ? $product->brand->name : null,
            'image' => $this->getImageAsBase64($product->image), // Chuyển đổi hình ảnh sang Base64
        ], 200);
    }

    /**
     * Convert image to Base64.
     */
    private function getImageAsBase64($imagePath)
    {
        // Kiểm tra nếu hình ảnh tồn tại
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            // Lấy nội dung hình ảnh
            $imageData = Storage::disk('public')->get($imagePath);
            // Lấy loại mime type
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));
            // Mã hóa hình ảnh thành Base64
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null; // Nếu không có hình ảnh, trả về null
    }
}
