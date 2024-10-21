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

        // Lấy tất cả các thể loại, bao gồm cả đã xóa
        if ($search) {
            $categories = Category::withTrashed()
                ->where('name', 'LIKE', "%{$search}%")
                ->get();
        } else {
            $categories = Category::withTrashed()->get();
        }

        return view('admin.categories.category', compact('categories'));
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

            return redirect()->route('categories.index')->with('success', 'Cập nhật thể loại thành công!');
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
