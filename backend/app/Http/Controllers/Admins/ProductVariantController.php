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
        // Lấy sản phẩm cùng với các biến thể và ảnh của từng biến thể
        $product = Product::with(['variants.images'])->findOrFail($productId);

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
            return back()->withErrors(['error' => 'Biến thể với kích thước và màu sắc này đã tồn tại.'])
                ->withInput();
        }

        // Tạo biến thể mới
        $variant = new ProductVariant();
        $variant->product_id = $productId;
        $variant->size_id = $request->size_id;
        $variant->color_id = $request->color_id;
        $variant->price = $request->price;
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
    public function update(UpdateProductVariantRequest $request, $productId, $variantId)
    {
        // Tìm biến thể hiện tại
        $variant = ProductVariant::findOrFail($variantId);

        // Kiểm tra xem có biến thể nào khác với cùng size_id và color_id không
        $existingVariant = ProductVariant::where('product_id', $productId)
            ->where('size_id', $request->size_id)
            ->where('color_id', $request->color_id)
            ->where('id', '!=', $variantId) // Loại trừ biến thể hiện tại
            ->first();

        if ($existingVariant) {
            return back()->withErrors(['error' => 'Biến thể với kích thước và màu sắc này đã tồn tại.'])
                ->withInput();
        }

        // Cập nhật thông tin biến thể
        $variant->update([
            'size_id' => $request->size_id,
            'color_id' => $request->color_id,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        // Xử lý hình ảnh mới nếu có
        if ($request->hasFile('variant_images')) {
            $variant->images()->delete(); // Xóa ảnh cũ
            foreach ($request->file('variant_images') as $image) {
                $imagePath = $image->store('variant_images', 'public');
                $variant->images()->create(['image' => $imagePath]);
            }
        }

        // Tính lại số lượng tổng cho sản phẩm cha
        $product = Product::findOrFail($productId);
        $product->update(['total_quantity_in_stock' => $product->variants->sum('quantity')]);
        $product->update(['incoming_quantity' => $product->variants->sum('quantity')]);

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
        // Xóa biến thể
        $variant->delete();
        // Cập nhật tổng số lượng sản phẩm
        $product = Product::findOrFail($productId);
        $totalQuantity = $product->variants()->sum('quantity'); // Tính lại tổng số lượng
        $product->total_quantity_in_stock = $totalQuantity; // Cập nhật tổng số lượng
        $product->incoming_quantity = $totalQuantity;
        $product->save();

        return redirect()->route('admin.products.variants.index', $productId)
            ->with('success', 'Biến thể đã được xóa thành công.');
    }

}
