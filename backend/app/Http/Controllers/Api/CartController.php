<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\User;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getCart()
{
    try {
        $user = auth()->user();

        if (!$user) {
            return response()->json(['message' => 'Vui lòng đăng nhập để xem giỏ hàng'], 401);
        }

        $cart = Cart::where('user_id', $user->id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Giỏ hàng trống'], 200);
        }

        $cart = CartItem::where('cart_id', $cart->id)
            ->with('productVariant')
            ->get();

        $totalPrice = $cart->sum(function ($item) {
            return $item->quantity * $item->price;
        });

        return response()->json([
            'cart' => $cart,
            'total_price' => $totalPrice
        ], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Có lỗi xảy ra: ' . $e->getMessage()], 500);
    }
}

    
    
    public function addToCart(Request $request)
    {
        $user = auth()->user();
        if ($user) {
            $productVariant  = ProductVariant::find($request->product_variant_id);
            if (!$productVariant) {
                return response()->json(['message' => 'Sản phẩm không tồn tại '], 404);
            }

            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_variant_id', $productVariant->id)
                ->first();
            if ($cartItem) {
                $cartItem->quantity += $request->quantity;
                $cartItem->save();
                // return response()->json(['message' => 'Cập nhật giỏ hàng thành công!'], 200);
            } else {
                CartItem::create([
                    'cart_id' => $cart->id,
                    'product_variant_id' => $productVariant->id,
                    'quantity' => $request->quantity ?? 1,
                    'price' => $productVariant->price,
                ]);
            }
            return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng'], 200);
        } else {
            return response()->json(['message' => 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng'], 401);
        }
    }


    /**
     * Show the form for creating a new resource.
     */
    
    public function destroy(string $id)
    {
        //
    }
}
