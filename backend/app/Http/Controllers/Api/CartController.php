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

                return [
                    'id_cart_item' => $item->id,
                    'id_productVariant' => $productVariant->id,
                    'productId' => $productVariant->product->id,
                    'image' => $this->getImageAsBase64($image), // Lấy ảnh và chuyển sang định dạng Base64
                    'name' => $productVariant->product->name, // Tên sản phẩm
                    'size' => $productVariant->size->name ?? null, // Kích thước
                    'color' => $productVariant->color->name ?? null, // Màu sắc
                    'quantity' => $item->quantity, // Số lượng trong giỏ hàng
                    'price' => round($productVariant->price, 2), // Giá tiền của biến thể sản phẩm
                    'stock' => $productVariant->quantity,
                ];
            })
        ];

        return response()->json($cartData);
    }


    public function addToCart(Request $request)
{
    try {
        $productVariantId = $request->input('product_variant_id');
        $quantity = $request->input('quantity', 1);

        // Kiểm tra dữ liệu đầu vào
        if (!$productVariantId || !is_numeric($productVariantId)) {
            return response()->json(['message' => 'ID sản phẩm không hợp lệ'], 400);
        }
        if ($quantity <= 0) {
            return response()->json(['message' => 'Số lượng phải lớn hơn 0'], 400);
        }

        $productVariant = ProductVariant::find($productVariantId);
        if (!$productVariant) {
            return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
        }

        // Nếu chưa đăng nhập, trả về dữ liệu giỏ hàng tạm thời
        if (!$request->user()) {
            $cartData = [
                'product_variant_id' => $productVariantId,
                'quantity' => $quantity,
                'price' => round($productVariant->price, 2),
            ];

            return response()->json([
                'message' => 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Sản phẩm đã được lưu vào giỏ hàng tạm thời.',
                'cart_data' => $cartData
            ], 401);
        }

        // Lưu giỏ hàng vào cơ sở dữ liệu cho người dùng đã đăng nhập
        $user = $request->user();
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartItem = CartItem::updateOrCreate(
            [
                'cart_id' => $cart->id,
                'product_variant_id' => $productVariantId,
            ],
            [
                'quantity' => DB::raw('quantity + ' . $quantity),
                'price' => round($productVariant->price, 2),
            ]
        );

        return response()->json(['message' => 'Sản phẩm đã được thêm vào giỏ hàng', 'cart_item' => $cartItem], 200);
    } catch (\Exception $e) {
        Log::error('Lỗi thêm sản phẩm vào giỏ hàng: ' . $e->getMessage());
        return response()->json(['message' => 'Đã có lỗi xảy ra, vui lòng thử lại'], 500);
    }
}

public function syncCartWithDatabase(Request $request)
{
    try {
        // Kiểm tra người dùng đã đăng nhập chưa
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Bạn cần đăng nhập để đồng bộ giỏ hàng'], 401);
        }

        // Lấy dữ liệu giỏ hàng tạm thời từ request (frontend gửi lên)
        $cartData = $request->input('cart_data', []);
        if (empty($cartData)) {
            return response()->json(['message' => 'Dữ liệu giỏ hàng trống'], 400);
        }

        // Lấy hoặc tạo mới giỏ hàng cho người dùng
        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        // Lặp qua từng sản phẩm trong giỏ hàng tạm thời
        foreach ($cartData as $item) {
            $productVariantId = $item['product_variant_id'] ?? null;
            $quantity = $item['quantity'] ?? 0;

            // Bỏ qua item nếu thiếu dữ liệu cần thiết
            if (!$productVariantId || $quantity <= 0) {
                continue;
            }

            $productVariant = ProductVariant::find($productVariantId);
            if (!$productVariant) {
                continue; // Nếu sản phẩm không tồn tại, bỏ qua item này
            }

            // Tạo mới hoặc cập nhật CartItem
            CartItem::updateOrCreate(
                [
                    'cart_id' => $cart->id,
                    'product_variant_id' => $productVariantId,
                ],
                [
                    'quantity' => $quantity,
                    'price' => round($productVariant->price, 2),
                ]
            );
        }

        return response()->json(['message' => 'Giỏ hàng đã được đồng bộ thành công'], 200);
    } catch (\Exception $e) {
        // Ghi log lỗi và trả về thông báo lỗi chung
        Log::error('Lỗi đồng bộ giỏ hàng: ' . $e->getMessage());
        return response()->json(['message' => 'Đã có lỗi xảy ra khi đồng bộ giỏ hàng'], 500);
    }
}


    public function updateCart(Request $request, $id_cart_item)
    {
        try {
            // Kiểm tra người dùng đã đăng nhập
            if (!$request->user()) {
                return response()->json(['message' => 'Bạn cần đăng nhập để cập nhật giỏ hàng'], 401);
            }
    
            $user = $request->user();
            $quantity = $request->input('quantity'); // Số lượng mới cần cập nhật
    
            // Kiểm tra giá trị số lượng hợp lệ
            if (!is_numeric($quantity) || $quantity <= 0) {
                return response()->json(['message' => 'Số lượng không hợp lệ'], 400);
            }
    
            // Tìm giỏ hàng của người dùng
            $cart = Cart::where('user_id', $user->id)->first();
            if (!$cart) {
                return response()->json(['message' => 'Giỏ hàng trống'], 404);
            }
    
            // Tìm sản phẩm trong giỏ hàng theo id_cart_item
            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('id', $id_cart_item)
                ->first();
    
            if (!$cartItem) {
                return response()->json(['message' => 'Sản phẩm không có trong giỏ hàng'], 404);
            }
    
            // Lấy thông tin sản phẩm biến thể
            $productVariant = $cartItem->productVariant;
    
            // Kiểm tra số lượng tồn kho
            if ($cartItem->quantity + $quantity > $productVariant->quantity) {
                return response()->json(['message' => 'Số lượng sản phẩm trong kho không đủ'], 400); // Thông báo lỗi khi không đủ tồn kho
            }
    
            // Cập nhật lại số lượng sản phẩm trong giỏ hàng
            $cartItem->quantity = $quantity;
            $cartItem->save();
    
            // Trả về thông tin giỏ hàng đã được cập nhật
            return response()->json([
                'message' => 'Giỏ hàng đã được cập nhật',
                'cart_item' => $cartItem
            ], 200);
    
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật giỏ hàng: ' . $e->getMessage());
            return response()->json([
                'message' => 'Đã có lỗi xảy ra, vui lòng thử lại',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function removeFromCart(Request $request, $product_variant_id)
    {
        try {
            if (!$request->user()) {
                return response()->json(['message' => 'Bạn cần đăng nhập để xóa sản phẩm khỏi giỏ hàng'], 401);
            }

            $user = $request->user();

            // Tìm giỏ hàng của người dùng
            $cart = Cart::where('user_id', $user->id)->first();
            if (!$cart) {
                return response()->json(['message' => 'Giỏ hàng trống'], 404);
            }

            // Tìm sản phẩm cần xóa trong giỏ hàng
            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_variant_id', $product_variant_id)
                ->first();

            if (!$cartItem) {
                return response()->json(['message' => 'Sản phẩm không có trong giỏ hàng'], 404);
            }

            // Xóa sản phẩm khỏi giỏ hàng
            $cartItem->delete();
    
            // Tìm lại giỏ hàng đã cập nhật
            $updatedCart = Cart::where('user_id', $user->id)
                ->with(['items.productVariant.images', 'items.productVariant.color', 'items.productVariant.size'])
                ->first();
    
            // Nếu giỏ hàng trống, trả về thông báo
            if ($updatedCart->items->isEmpty()) {
                return response()->json(['message' => 'Giỏ hàng trống'], 200);
            }
    
            // Trả về thông tin giỏ hàng còn lại
            return response()->json([
                'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng',
                'carts' => $updatedCart->items->map(function ($item) {
                    $productVariant = $item->productVariant;
                    $image = $productVariant->images->first()->image ?? null;
    
                    return [
                        'id_cart_item' => $item->id,
                        'id_productVariant' => $productVariant->id,
                        'productId' => $productVariant->product->id,
                        'image' => $this->getImageAsBase64($image), // Lấy ảnh và chuyển sang định dạng Base64
                        'name' => $productVariant->product->name, // Tên sản phẩm
                        'size' => $productVariant->size->name ?? null, // Kích thước
                        'color' => $productVariant->color->name ?? null, // Màu sắc
                        'quantity' => $item->quantity, // Số lượng trong giỏ hàng
                        'price' => round($productVariant->price, 2), // Giá tiền của biến thể sản phẩm
                        'stock' => $productVariant->quantity,
                    ];
                })
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error removing item from cart: ' . $e->getMessage());
            return response()->json(['message' => 'Đã có lỗi xảy ra, vui lòng thử lại'], 500);
        }
    }
}
