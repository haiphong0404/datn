<?php

namespace App\Http\Controllers\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\Request;

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
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 5); // Mặc định 5 bản ghi mỗi trang

        $brands = Brand::withTrashed()->when($search, function ($query, $search) {
            return $query->where('name', 'LIKE', "%{$search}%")
                ->orWhere('description', 'LIKE', "%{$search}%"); // Tìm thêm ở cột 'description' nếu cần
        })
            ->orderBy('created_at', 'desc') // Sắp xếp giảm dần theo thời gian tạo
            ->paginate($perPage);

        $noResults = $brands->isEmpty(); // Kiểm tra nếu không có kết quả tìm kiếm

        return view(self::PATH_VIEW . __FUNCTION__, compact('brands', 'noResults'));
    }


    /**
     * Hiển thị form để tạo một brand mới.
     */
    public function create()
    {
        return view(self::PATH_VIEW . __FUNCTION__);
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
        return view(self::PATH_VIEW . __FUNCTION__, compact('brand'));
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
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);

        if (!app(BrandService::class)->deleteBrand($brand)) {
            return redirect()->route('admin.brands.index')->with('error', 'Không thể xóa thương hiệu khi còn sản phẩm liên kết.');
        }

        return redirect()->route('admin.brands.index')->with('success', 'Xóa thương hiệu thành công.');
    }
    public function restore($id)
    {
        // Tìm thương hiệu đã bị xóa mềm
        $brand = Brand::withTrashed()->findOrFail($id);

        // Thực hiện khôi phục
        $brand->restore();

        return back()->with('success', 'Khôi phục thương hiệu thành công');
    }
}
