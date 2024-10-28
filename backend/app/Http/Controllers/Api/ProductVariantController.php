<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the variants for a given product.
     */
    public function index($productId)
    {
        // Lấy sản phẩm cùng với biến thể
        $product = Product::with(['variants.size', 'variants.color', 'variants.images'])->findOrFail($productId);

        // Kiểm tra nếu sản phẩm có biến thể
        if ($product->variants->isEmpty()) {
            return response()->json([
                'message' => 'Không có biến thể nào cho sản phẩm này!'
            ], 404);
        }

        return response()->json($product->variants->map(function ($variant) {
            return [
                'id' => $variant->id,
                'size' => $variant->size ? $variant->size->name : null,
                'color' => $variant->color ? $variant->color->name : null,
                'price' => $variant->price,
                'quantity' => $variant->quantity,
                'images' => $variant->images->map(function ($image) {
                    return $this->getImageAsBase64($image->image); // Chuyển đổi hình ảnh sang Base64
                }),
            ];
        }), 200);
    }
    /**
     * Display the specified variant.
     */
    public function show($id)
    {
        // Tìm biến thể theo ID và kèm theo thông tin sản phẩm cha
        $variant = ProductVariant::with(['size', 'color', 'images', 'product'])->findOrFail($id);

        return response()->json([
            'id' => $variant->id,
            'product' => [
                'id' => $variant->product->id,
                'name' => $variant->product->name, // Lấy tên sản phẩm cha
            ],
            'size' => $variant->size ? $variant->size->name : null,
            'color' => $variant->color ? $variant->color->name : null,
            'price' => $variant->price,
            'quantity' => $variant->quantity,
            'images' => $variant->images->map(function ($image) {
                return $this->getImageAsBase64($image->image); // Chuyển đổi hình ảnh sang Base64
            }),
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
