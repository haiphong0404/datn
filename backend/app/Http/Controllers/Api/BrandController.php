<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class BrandController extends Controller
{
    use ImageUploadTrait;

    protected $brandService;

    public function __construct(BrandService $brandService)
    {
        $this->brandService = $brandService;
    }

    /**
     * Display a listing of the brands.
     */
    public function index(): JsonResponse
    {
        // Lấy danh sách tất cả các brands
        $brands = Brand::all();

        // Tạo một mảng để chứa dữ liệu các brand kèm ảnh Base64
        $brandsData = [];

        // Lặp qua từng brand để thêm dữ liệu vào mảng
        foreach ($brands as $brand) {
            // Lấy đường dẫn ảnh từ database
            $imagePath = $brand->image;

            // Gọi function để chuyển ảnh thành Base64
            $imageBase64 = $this->getImageAsBase64($imagePath);

            // Thêm thông tin brand và ảnh vào mảng
            $brandsData[] = [
                'id' => $brand->id,
                'name' => $brand->name,
                'description' => $brand->description,
                'image' => $imageBase64, // Thêm ảnh dưới dạng Base64
                'link' => $brand->link,
            ];
        }

        // Trả về dữ liệu danh sách brands dưới dạng JSON
        return response()->json($brandsData);
    }

    /**
     * Store a newly created brand in the database.
     */
    public function store(StoreBrandRequest $request): JsonResponse
    {
        $brand = $this->brandService->createBrand($request->except('image'), $request->file('image'));

        return response()->json(['message' => 'Brand created successfully.', 'brand' => $brand], 201); // Created
    }

    /**
     * Display the specified brand.
     */
    public function show(Brand $brand): JsonResponse
    {
        return response()->json($brand);
    }

    /**
     * Update the specified brand in the database.
     */
    public function update(UpdateBrandRequest $request, Brand $brand): JsonResponse
    {
        $this->brandService->updateBrand($brand, $request->except('image'), $request->file('image'));

        return response()->json(['message' => 'Brand updated successfully.']);
    }

    /**
     * Remove the specified brand from the database.
     */
    public function destroy(Brand $brand): JsonResponse
    {
        $this->brandService->deleteBrand($brand);

        return response()->json(['message' => 'Brand deleted successfully.']);
    }
    private function getImageAsBase64($imagePath)
    {
        // Kiểm tra nếu hình ảnh tồn tại trong thư mục public
        if ($imagePath && Storage::disk('public')->exists($imagePath)) {
            // Lấy nội dung hình ảnh
            $imageData = Storage::disk('public')->get($imagePath);

            // Lấy loại mime type
            $mimeType = mime_content_type(storage_path('app/public/' . $imagePath));

            // Mã hóa hình ảnh thành Base64
            return 'data:' . $mimeType . ';base64,' . base64_encode($imageData);
        }

        return null; // Nếu không có hình ảnh, trả về null
    }
}
