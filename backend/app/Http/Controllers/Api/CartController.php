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

class CartController extends Controller
{
    // Lấy danh sách giỏ hàng của người dùng
    public function index(Request $request)
    {
        $user = $request->user();

        $cart = Cart::where('user_id', $user->id)
            ->with(['items.productVariant.images', 'items.productVariant.color', 'items.productVariant.size'])
            ->first();

        if (!$cart) {
            return response()->json(['message' => 'Giỏ hàng trống'], 404);
        }

        $cartData = [
            'carts' => $cart->items->map(function ($item) {
                $productVariant = $item->productVariant;
                $image = $productVariant->images->first()->image ?? null;

                return [
                    'image' => $image,
                    'name' => $productVariant->product->name,
                    'color' => $productVariant->color->name,
                    'size' => $productVariant->size->name,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'total_price' => $item->price * $item->quantity,
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

        $cartItem = CartItem::updateOrCreate(
            [
                'cart_id' => $cart->id,
                'product_variant_id' => $productVariantId,
            ],
            [
                'quantity' => DB::raw("quantity + {$quantity}"), 
                'price' => $productVariant->price
            ]
        );

        return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng', 'cart_item' => $cartItem], 200);
    } catch (\Exception $e) {
        Log::error($e->getMessage());
        return response()->json(['message' => 'Đã có lỗi xảy ra, vui lòng thử lại'], 500);
    }
}

    

    // Xem chi tiết một giỏ hàng
    public function show(Cart $cart)
    {
        if ($cart->user_id !== Auth::id()) {
            return response()->json(['error' => 'Không có quyền truy cập'], 403);
        }
        return response()->json($cart->load('items'));
    }
}
