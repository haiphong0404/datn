<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Brand;
use App\Models\Category;
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
        $search = $request->input('search');

        $products = Product::withTrashed()
            ->with(['category' => function ($query) {
                $query->withTrashed();
            }, 'brand' => function ($query) {
                $query->withTrashed();
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
            ->paginate(10); // Phân trang, mỗi trang 10 sản phẩm


        // Kiểm tra nếu không có sản phẩm nào được tìm thấy
        if ($products->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm nào.'
            ], 404);
        }

        // Trả về dữ liệu sản phẩm cùng thông tin phân trang
        return response()->json([
            'success' => true,
            'data' => $products->items(), // Dữ liệu sản phẩm
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'total' => $products->total(),
                'per_page' => $products->perPage(),
            ]
        ], 200);
    }



    /**
     * Display the specified resource.
     */
    public function show($id)
{
    try {
        // Lấy sản phẩm theo ID, kể cả sản phẩm đã bị xóa mềm
        $product = Product::withTrashed()
            ->with(['category' => function($query) {
                $query->withTrashed(); // Lấy cả category đã bị xóa mềm
            }, 'brand' => function($query) {
                $query->withTrashed(); // Lấy cả brand đã bị xóa mềm
            }])
            ->findOrFail($id); // Tìm sản phẩm theo ID hoặc báo lỗi 404

        // Trả về thông tin chi tiết của sản phẩm
        return response()->json([
            'success' => true,
            'data' => $product
        ], 200);
    } catch (\Exception $e) {
        // Trả về lỗi nếu không tìm thấy sản phẩm
        return response()->json([
            'success' => false,
            'message' => 'Không tìm thấy sản phẩm!',
            'error' => $e->getMessage()
        ], 404);
    }
}


    /**
     * Show the form for editing the specified resource.
     */
}
