<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCategoryRequest;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10); // Số bản ghi mỗi trang (mặc định 10)

        // Truy vấn danh sách thể loại với tìm kiếm và phân trang
        $categories = Category::withTrashed()
            ->when($search, function ($query, $search) {
                $query->where('name', 'LIKE', "%{$search}%");
            })
            ->orderBy('created_at', 'desc') // Sắp xếp giảm dần theo ngày tạo
            ->paginate($perPage);

        // Trả về view với dữ liệu đã xử lý
        return view('admin.categories.category', compact('categories', 'search'));
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        try {
            // Tạo thể loại mới
            Category::create($request->validated());

            // Thông báo thành công
            return redirect()->route('admin.categories.index')->with('success', 'Thêm mới thể loại thành công!');
        } catch (\Exception $e) {
            // Thông báo lỗi nếu có vấn đề
            return redirect()->back()->with('error', 'Có lỗi xảy ra, vui lòng thử lại!');
        }
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
    public function edit(string $id)
    {
        $category = Category::findOrFail($id);
        return view('admin.categories.edit', compact('category'));

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreCategoryRequest $request, $id)
    {
        try {
            $category = Category::findOrFail($id);
            $category->update($request->validated());

            return redirect()->route('admin.categories.index')->with('success', 'Cập nhật thể loại thành công!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Có lỗi xảy ra, vui lòng thử lại!');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            // Tìm và thực hiện soft delete thể loại
            $category = Category::findOrFail($id);
            if ($category->products()->exists()) {
                return redirect()->route('admin.categories.index')
                    ->with('error', 'Không thể xóa vì danh mục này còn chứa sản phẩm!');
            }
            $category->delete();

            return redirect()->route('admin.categories.index')->with('success', 'Xóa thể loại thành công!');
        } catch (\Exception $e) {
            return redirect()->route('admin.categories.index')->with('error', 'Có lỗi xảy ra, vui lòng thử lại!');
        }
    }
    public function restore($id)
    {
        try {
            $category = Category::withTrashed()->findOrFail($id);
            $category->restore();

            return redirect()->route('admin.categories.index')->with('success', 'Phục hồi thể loại thành công!');
        } catch (\Exception $e) {
            return redirect()->route('admin.categories.index')->with('error', 'Có lỗi xảy ra, vui lòng thử lại!');
        }
    }



}
