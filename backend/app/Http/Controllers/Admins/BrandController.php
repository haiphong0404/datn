<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use App\Traits\ImageUploadTrait;

class BrandController extends Controller
{
    use ImageUploadTrait;

    const PATH_VIEW = 'admin.brands.';

    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    /**
     * Hiển thị danh sách các thương hiệu.
     */
    public function index()
    {
        $brands = Brand::query()->orderBy('created_at', 'desc')->paginate(5);

        return view(self::PATH_VIEW.__FUNCTION__, compact('brands'));
    }

    /**
     * Hiển thị form để tạo một brand mới.
     */
    public function create()
    {
        return view(self::PATH_VIEW.__FUNCTION__);
    }

    /**
     * Thêm một brand mới vào cơ sở dữ liệu.
     */
    public function store(StoreBrandRequest $request)
    {
        // Gọi phương thức createbrand từ brandService để xử lý lưu trữ brand mới.
        $this->brandService->createBrand($request->except('image'), $request->file('image'));

        return redirect()->route('admin.brands.index')->with('success', 'Thêm mới thương hiệu thành công');
    }

    /**
     * Hiển thị form để chỉnh sửa một brand cụ thể.
     */
    public function edit(Brand $brand)
    {
        return view(self::PATH_VIEW.__FUNCTION__, compact('brand'));
    }

    /**
     * Cập nhật thông tin của một brand.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        // Gọi phương thức updateBrand từ BrandService để xử lý cập nhật thông tin brand.
        $this->brandService->updateBrand($brand, $request->except('image'), $request->file('image'));

        return redirect()->route('admin.brands.index')->with('success', 'Cập nhật thương hiệu thành công');
    }

    /**
     * Xóa một store cụ thể khỏi cơ sở dữ liệu.
     */
    public function destroy(Brand $brand)
    {
        // Gọi phương thức deleteBrand từ BrandService để xóa mềm thương hiệu và các sản phẩm liên quan.
        $this->brandService->deleteBrand($brand);

        return back()->with('success', 'Xóa thương hiệu thành công');
    }
}