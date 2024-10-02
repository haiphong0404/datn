<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use App\Traits\ImageUploadTrait;
use Illuminate\Http\JsonResponse;

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
        $brands = Brand::query()->orderBy('created_at', 'desc')->paginate(5);

        return response()->json($brands);
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
}