<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBannerRequest;
use App\Http\Requests\UpdateBannerRequest;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10); // Mặc định 10 bản ghi

        // Sử dụng withTrashed để lấy cả các banner đã xóa mềm
        $banners = Banner::withTrashed()
            ->when($search, function ($query, $search) {
                return $query->where('title', 'LIKE', "%{$search}%");
            })
            ->orderBy('id', 'desc') // Sắp xếp giảm dần theo cột 'id'
            ->paginate($perPage);
        $noResults = $banners->isEmpty();

        return view('admin.banner.list', compact('banners', 'noResults'));
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Trả về view để tạo banner mới
        return view('admin.banner.add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBannerRequest $request)
    {
        if ($request->hasFile('image_url')) {
            $file = $request->file('image_url')->store('uploads/banners', 'public');
        } else {
            $file = null;
        }

        // Lưu hình ảnh
        // $imagePath = $request->file('image')->store('uploads/banners', 'public');

        // Tạo banner mới
        Banner::create([
            'image_url' => $file,
            'title' => $request->title ?? null,
            'sub_title' => $request->sub_title ?? null,
            'span_title' => $request->span_title ?? null,
        ]);

        return redirect()->route('admin.banners.index')->with('success', 'Banner đã được thêm thành công!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Lấy banner theo id
        $banner = Banner::findOrFail($id);
        return view('admin.banner.show', compact('banner'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Tìm banner theo id để chỉnh sửa
        $banner = Banner::findOrFail($id);
        return view('admin.banner.edit', compact('banner'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBannerRequest $request, string $id)
    {
        $banner = Banner::findOrFail($id);
        if ($request->hasFile('image_url')) {
            if ($banner->image_url) {
                Storage::disk('public')->delete($banner->image_url);
            }
            $banner->image_url = $request->file('image_url')->store('uploads/banners', 'public');
        }

        $banner->title = $request->title;
        $banner->sub_title = $request->sub_title;
        $banner->span_title = $request->span_title;


        $banner->save();

        return redirect()->route('admin.banners.index')->with('success', 'Banner đã được cập nhật thành công!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();
        return redirect()->route('admin.banners.index')->with('success', 'Banner đã được xóa thành công (xóa mềm)!');
    }
    public function restore($id)
    {
        $banner = Banner::withTrashed()->findOrFail($id);
        $banner->restore();
        return redirect()->route('admin.banners.index')->with('success', 'Banner đã được khôi phục thành công!');
    }
}
