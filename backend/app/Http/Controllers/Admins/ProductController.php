<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Color;
use App\Models\Image;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');

        $products = Product::withTrashed() // Lấy cả sản phẩm đã xóa mềm
        ->with(['category' => function ($query) {
            $query->withTrashed(); // Lấy cả category đã bị xóa mềm
        }, 'brand' => function ($query) {
            $query->withTrashed(); // Lấy cả brand đã bị xóa mềm
        }])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'LIKE', "%{$search}%")
                        ->orWhereHas('category', function ($query) use ($search) {
                            $query->where('name', 'LIKE', "%{$search}%");
                        })
                        ->orWhereHas('brand', function ($query) use ($search) {
                            $query->where('name', 'LIKE', "%{$search}%");
                        })
                        ->orWhere('created_at', 'LIKE', "%{$search}%");
                });
            })
            ->get();

        return view('admin.products.index', compact('products'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all(); // Lấy tất cả thể loại
        $brands = Brand::all(); // Lấy tất cả thương hiệu
        $sizes = Size::all();
        $colors = Color::all();


        return view('admin.products.create', compact('categories', 'brands', 'sizes', 'colors'));
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        // Bắt đầu transaction
        DB::beginTransaction();

        try {
            // Xử lý hình ảnh cho sản phẩm chính
            $file = $request->hasFile('image') ? $request->file('image')->store('uploads/products', 'public') : null;

            // Tạo sản phẩm mới
            $product = Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
                'price' => $request->price,
                'image' => $file,
                'total_quantity_in_stock' => array_sum($request->variant_quantities),
            ]);

            // Xử lý các biến thể
            foreach ($request->sizes as $index => $sizeId) {
                // Kiểm tra và lưu kích thước mới
                if ($sizeId === 'new') {
                    $size = Size::create(['name' => $request->new_sizes[$index]]);
                    $sizeId = $size->id; // Cập nhật id của kích thước mới
                }

                // Kiểm tra và lưu màu mới
                $colorId = $request->colors[$index];
                if ($colorId === 'new') {
                    $color = Color::create(['name' => $request->new_colors[$index]]);
                    $colorId = $color->id; // Cập nhật id của màu mới
                }

                // Lưu biến thể sản phẩm
                $variant = ProductVariant::create([
                    'product_id' => $product->id,
                    'size_id' => $sizeId,
                    'color_id' => $colorId,
                    'price' => $request->variant_prices[$index],
                    'quantity' => $request->variant_quantities[$index],
                ]);

                // Xử lý hình ảnh cho biến thể
                if ($request->hasFile('variant_images')) {
                    foreach ($request->file('variant_images') as $image) {
                        $imagePath = $image->store('variant_images', 'public');
                        $variant->images()->create(['image' => $imagePath]);
                    }
                }
            }

            // Commit transaction nếu mọi thứ thành công
            DB::commit();

            return redirect()->route('admin.products.index')->with('success', 'Sản phẩm và biến thể đã được thêm mới thành công!');

        } catch (\Exception $e) {
            // Rollback transaction nếu có lỗi xảy ra
            DB::rollback();

            // Ghi lại lỗi
            \Log::error('Error storing product: ' . $e->getMessage());

            return redirect()->back()->with('error', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    }




    /**
     * Display the specified resource.
     */
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        $categories = Category::all();
        $brands = Brand::all();

        return view('admin.products.edit', compact('product', 'categories', 'brands'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);

        // Chỉ cập nhật hình ảnh nếu có hình ảnh mới được tải lên
        if ($request->hasFile('image')) {
            $file = $request->file('image')->store('uploads/products', 'public');
            $product->image = $file; // Cập nhật hình ảnh mới
        }

        // Cập nhật thông tin sản phẩm
        $product->name = $request->name;
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->price = $request->price;
        $product->save();

        return redirect()->route('admin.products.index')->with('success', 'Sản phẩm đã được cập nhật thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // Tìm sản phẩm theo ID
        $product = Product::findOrFail($id);

        // Xóa hình ảnh nếu có
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        // Xóa mềm sản phẩm
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Sản phẩm đã được xóa thành công!');
    }

    public function restore($id)
    {
        $product = Product::withTrashed()->findOrFail($id);
        $product->restore();

        return redirect()->route('admin.products.index')->with('success', 'Sản phẩm đã được khôi phục thành công!');
    }


}
