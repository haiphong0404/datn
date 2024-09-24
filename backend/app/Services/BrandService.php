<?php

namespace App\Services;

use App\Models\Brand;
use App\Traits\ImageUploadTrait;
use Illuminate\Support\Facades\Storage;

class BrandService
{
    use ImageUploadTrait;

    /**
     * Lưu thương hiệu mới.
     */
    public function createBrand(array $data, $file = null)
    {
        if ($file) {
            // Sử dụng phương thức handleImage từ Trait để xử lý upload ảnh
            $data['image'] = $this->uploadFile($file, 'image_brands');
        }

        return Brand::query()->create($data);
    }

    /**
     * Cập nhật thương hiệu.
     */
    public function updateBrand(Brand $brand, array $data, $file = null)
    {
        // Nếu có ảnh mới
        if ($file) {
            // Sử dụng phương thức handleImage từ Trait để xử lý upload và xóa ảnh cũ
            $data['image'] = $this->handleImage($file, $brand->image, 'image_brands');
        }

        // Cập nhật thông tin của cửa hàng
        $brand->update($data);

    }

    /**
     * Xóa thương hiệu.
     */
    public function deleteBrand(Brand $brand)
    {
        // Xóa sản phẩm liên quan khi xóa thương hiệu
        $brand->products()->delete(); // Xóa mềm tất cả sản phẩm thuộc thương hiệu

        // Xóa ảnh khi xóa thương hiệu (nếu có)
        if ($brand->image && Storage::exists('public/'.$brand->image)) {
            Storage::delete('public/'.$brand->image);
        }

        return $brand->delete(); // Xóa mềm thương hiệu
    }
}