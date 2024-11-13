<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateProductVariantRequest;
use App\Models\Color;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Http\Request;

class ProductVariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($productId)
    {
        // Lấy sản phẩm cùng với các biến thể (theo thứ tự id mới nhất) và ảnh của từng biến thể
        $product = Product::with(['variants' => function ($query) {
            $query->orderBy('id', 'desc');
        }, 'variants.images'])->findOrFail($productId);

        return view('admin.products.show', compact('product'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create($productId)
    {
        // Tìm sản phẩm theo ID
        $product = Product::findOrFail($productId);

        // Lấy tất cả các kích thước và màu sắc có sẵn để chọn
        $sizes = Size::all();
        $colors = Color::all();

        // Trả về view với các biến đã chuẩn bị
        return view('admin.product_variants.create', compact('product', 'sizes', 'colors'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $productId)
    {
        // Xác thực dữ liệu đầu vào
        $request->validate([
            'size_id' => 'required|exists:sizes,id',
            'color_id' => 'required|exists:colors,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'variant_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Kích thước tối đa 2MB
        ]);

        // Kiểm tra xem có biến thể nào khác với cùng size_id và color_id hay không
        $existingVariant = ProductVariant::where('product_id', $productId)
            ->where('size_id', $request->size_id)
            ->where('color_id', $request->color_id)
            ->first();

        if ($existingVariant) {
            return back()->withErrors(['error' => 'Sản phẩm với kích thước và màu sắc này đã tồn tại.'])
                ->withInput();
        }

        // Tạo biến thể mới
        $variant = new ProductVariant();
        $variant->product_id = $productId;
        $variant->size_id = $request->size_id === 'new' ? null : $request->size_id;
        $variant->color_id = $request->color_id === 'new' ? null : $request->color_id;
        $variant->price = round($request->price, 2);
        $variant->quantity = $request->quantity;
        $variant->save();

        // Tính tổng số lượng nhập vào và tổng số lượng trong kho
        $product = Product::findOrFail($productId);

        // Cập nhật incoming_quantity
        // Giả sử incoming_quantity được cộng dồn lên mỗi khi có biến thể mới
        $product->incoming_quantity += $variant->quantity; // Cộng thêm số lượng nhập vào
        $product->total_quantity_in_stock = $product->total_quantity_in_stock + $variant->quantity; // Cập nhật số lượng trong kho

        $product->save();

        // Lưu hình ảnh nếu có
        if ($request->hasFile('variant_images')) {
            foreach ($request->file('variant_images') as $image) {
                $imagePath = $image->store('variant_images', 'public');
                $variant->images()->create(['image' => $imagePath]);
            }
        }

        return redirect()->route('admin.products.variants.index', $productId)
            ->with('success', 'Biến thể đã được thêm thành công.');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($productId, $variantId)
    {
        $product = Product::findOrFail($productId);
        $variant = ProductVariant::with('images')->findOrFail($variantId);
        $sizes = Size::all();
        $colors = Color::all();
        return view('admin.product_variants.edit', compact('product', 'variant', 'colors', 'sizes'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $productId, $variantId)
    {
        // Xác thực dữ liệu đầu vào
        $request->validate([
            'size_id' => 'required',
            'color_id' => 'required',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'variant_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Kích thước tối đa 2MB
        ]);

        // Tìm biến thể hiện tại
        $variant = ProductVariant::findOrFail($variantId);

        // Kiểm tra và thêm size mới nếu cần
        if ($request->size_id === 'new' && $request->new_size) {
            $newSize = Size::firstOrCreate(['name' => $request->new_size]);
            $sizeId = $newSize->id;
        } else {
            $sizeId = $request->size_id;
            if (!Size::where('id', $sizeId)->exists()) {
                return back()->withErrors(['error' => 'Kích thước không tồn tại.'])->withInput();
            }
        }

        // Kiểm tra và thêm color mới nếu cần
        if ($request->color_id === 'new' && $request->new_color) {
            $newColor = Color::firstOrCreate(['name' => $request->new_color]);
            $colorId = $newColor->id;
        } else {
            $colorId = $request->color_id;
            if (!Color::where('id', $colorId)->exists()) {
                return back()->withErrors(['error' => 'Màu sắc không tồn tại.'])->withInput();
            }
        }

        // Kiểm tra biến thể trùng lặp
        $existingVariant = ProductVariant::where('product_id', $productId)
            ->where('size_id', $sizeId)
            ->where('color_id', $colorId)
            ->where('id', '!=', $variantId)
            ->first();

        if ($existingVariant) {
            return back()->withErrors(['error' => 'Biến thể với kích thước và màu sắc này đã tồn tại.'])->withInput();
        }

        // Tính toán chênh lệch số lượng để cập nhật incoming_quantity và total_quantity_in_stock
        $quantityDifference = $request->quantity - $variant->quantity;

        // Cập nhật thông tin biến thể
        $variant->update([
            'size_id' => $sizeId,
            'color_id' => $colorId,
            'price' => round($request->price, 2),
            'quantity' => $request->quantity,
        ]);

        // Cập nhật số lượng tổng của sản phẩm cha
        $product = Product::findOrFail($productId);

        // Chỉ cập nhật `total_quantity_in_stock` và `incoming_quantity` khi có sự thay đổi trong số lượng thực tế
        if ($quantityDifference > 0) {
            // Tăng `incoming_quantity` và `total_quantity_in_stock` khi số lượng tăng
            $product->total_quantity_in_stock += $quantityDifference; // Tăng số lượng trong kho
            $product->incoming_quantity += $quantityDifference; // Tăng số lượng nhập vào kho
        } elseif ($quantityDifference < 0) {
            // Giảm `total_quantity_in_stock` khi số lượng giảm
            $product->total_quantity_in_stock += $quantityDifference; // Giảm số lượng trong kho
        }

        $product->save();

        return redirect()->route('admin.products.variants.index', $productId)
            ->with('success', 'Cập nhật biến thể thành công');
    }




    /**
     * Remove the specified resource from storage.
     */
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($productId, $variantId)
    {
        // Tìm biến thể theo ID
        $variant = ProductVariant::findOrFail($variantId);

        // Lấy số lượng của biến thể bị xóa
        $quantityToRemove = $variant->quantity;

        // Xóa biến thể
        $variant->delete();

        // Cập nhật tổng số lượng của sản phẩm
        $product = Product::findOrFail($productId);

        // Giảm tổng số lượng trong kho (total_quantity_in_stock) và số lượng nhập vào (incoming_quantity)
        $product->total_quantity_in_stock -= $quantityToRemove;
        $product->incoming_quantity -= $quantityToRemove;

        // Lưu lại thay đổi
        $product->save();

        return redirect()->route('admin.products.variants.index', $productId)
            ->with('success', 'Biến thể đã được xóa thành công.');
    }


}
