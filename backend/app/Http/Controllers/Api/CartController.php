<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CartController extends Controller
{
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
    // Lấy danh sách giỏ hàng của người dùng
    public function index(Request $request)
    {
        $user = $request->user();

        $cart = Cart::where('user_id', $user->id)
            ->with(['items.productVariant.images', 'items.productVariant.color', 'items.productVariant.size'])
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Giỏ hàng trống'], 404);
        }

        $cartData = [
            'carts' => $cart->items->map(function ($item) {
                $productVariant = $item->productVariant;
                $image = $productVariant->images->first()->image ?? null;
                $variants = $productVariant->product->variants->map(function ($variant) {
                    return [
                        'id' => $variant->id,
                        'color' => $variant->color->name ?? null,
                        'size' => $variant->size->name ?? null,
                        'price' => round($variant->price, 2),
                    ];
                });
        
                return [
                    'image' => $this->getImageAsBase64($image),
                    'name' => $productVariant->product->name,
                    'current_variant' => [
                        'id' => $productVariant->id,
                        'color' => $productVariant->color->name ?? null,
                        'size' => $productVariant->size->name ?? null,
                        'price' => round($productVariant->price, 2),
                        'quantity' => $item->quantity,
                        'total_price' => $item->price * $item->quantity,
                    ],
                    'variants' => $variants,
                ];
            })
        ];        

        return response()->json($cartData);
    }

    public function addToCart(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng'], 401);
            }

            $user = $request->user();
            $productVariantId = $request->input('product_variant_id');
            $quantity = $request->input('quantity', 1);

            $productVariant = ProductVariant::find($productVariantId);
            if (!$productVariant) {
                return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
            }

            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_variant_id', $productVariantId)
            ->first();
            $cartItem = CartItem::updateOrCreate(
                [
                    'cart_id' => $cart->id,
                    'product_variant_id' => $productVariantId,
                ],
                [
                    'quantity' => $cartItem ? $cartItem->quantity + $quantity : $quantity,
                    'price' => round($productVariant->price, 2),
                ]
            );

            return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng', 'cart_item' => $cartItem], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Đã có lỗi xảy ra, vui lòng thử lại'], 500);
        }
    }
    public function updateCart(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Bạn cần đăng nhập để cập nhật giỏ hàng'], 401);
            }

            $user = $request->user();
            $productVariantId = $request->input('product_variant_id');
            $quantity = $request->input('quantity');
            $colorId = $request->input('color_id'); 
            $sizeId = $request->input('size_id');   

            if (!is_numeric($quantity) || $quantity <= 0) {
                return response()->json(['message' => 'Số lượng không hợp lệ'], 400);
            }

            $productVariant = ProductVariant::find($productVariantId);
            if (!$productVariant) {
                return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
            }

            $cart = Cart::where('user_id', $user->id)->first();
            if (!$cart) {
                return response()->json(['message' => 'Giỏ hàng trống'], 404);
            }

            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_variant_id', $productVariantId)
                ->first();

            if (!$cartItem) {
                return response()->json(['message' => 'Sản phẩm không có trong giỏ hàng'], 404);
            }
            if ($colorId) {
                $cartItem->color_id = $colorId; 
            }
            if ($sizeId) {
                $cartItem->size_id = $sizeId; // Giả sử bạn có cột size_id trong bảng cart_item
            }
            $cartItem->quantity = $quantity;
            $cartItem->save();

            return response()->json(['message' => 'Giỏ hàng đã được cập nhật', 'cart_item' => $cartItem], 200);
        } catch (\Exception $e) {
            Log::error('Error updating cart: ' . $e->getMessage());
            return response()->json([
                'message' => 'Đã có lỗi xảy ra, vui lòng thử lại',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function removeFromCart(Request $request)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng'], 401);
            }

            $user = $request->user();
            $productVariantId = $request->input('product_variant_id');

            $cart = Cart::where('user_id', $user->id)->first();
            if (!$cart) {
                return response()->json(['message' => 'Giỏ hàng trống'], 404);
            }

            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_variant_id', $productVariantId)
                ->first();

            if (!$cartItem) {
                return response()->json(['message' => 'Sản phẩm không có trong giỏ hàng'], 404);
            }

            $cartItem->delete();

            return response()->json(['message' => 'Sản phẩm đã được xóa khỏi giỏ hàng'], 200);
        } catch (\Exception $e) {
            Log::error('Error removing item from cart: ' . $e->getMessage());
            return response()->json(['message' => 'Đã có lỗi xảy ra, vui lòng thử lại'], 500);
        }
    }
}
