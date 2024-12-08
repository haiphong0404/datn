<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
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
                'price' => round($variant->price, 2),
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
    public function checkQuantity(Request $request)
    {
        // Validate input data
        $validator = Validator::make($request->all(), [
            '*.product_variant_id' => 'required|exists:product_variants,id',
            '*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Dữ liệu không hợp lệ.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $requestedVariants = $request->all();
        $insufficientVariants = [];

        foreach ($requestedVariants as $variant) {
            $variantId = $variant['product_variant_id'];
            $quantityRequested = $variant['quantity'];

            // Tìm biến thể theo ID
            $productVariant = ProductVariant::find($variantId);

            // Kiểm tra số lượng
            $size = $productVariant->size->name ?? 'Chưa xác định';  // Lấy tên size nếu có
        $color = $productVariant->color->name ?? 'Chưa xác định'; // Lấy tên màu nếu có

        // Kiểm tra số lượng
        if ($productVariant->quantity < $quantityRequested) {
            $insufficientVariants[] = [
                'product_variant_id' => $variantId,
                'size' => $size,
                'color' => $color,
                'available_quantity' => $productVariant->quantity,
                'requested_quantity' => $quantityRequested,
                'message' => 'Số lượng không đủ.',
            ];
        }
        }

        if (!empty($insufficientVariants)) {
            return response()->json([
                'success' => false,
                'message' => 'Một số sản phẩm không đủ số lượng.',
                'insufficient_variants' => $insufficientVariants,
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Tất cả sản phẩm đều đủ số lượng.',
        ], 200);
    }
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
            'price' => round($variant->price, 2),
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
