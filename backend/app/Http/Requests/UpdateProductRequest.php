<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cho phép mọi yêu cầu, bạn có thể điều chỉnh theo yêu cầu của mình
    }

    public function rules()
    {
        $productId = $this->route('product');
        $rules = [
            'name' => 'required|string|max:255|unique:products,name,' . $productId, // Bỏ qua tên hiện tại
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
        ];

        // Chỉ yêu cầu hình ảnh khi thêm mới sản phẩm
        if ($this->isMethod('post')) {
            $rules['image'] = 'required|image|mimes:jpeg,png,jpg,gif'; // Giới hạn kích thước tối đa 2MB
        } else { // Khi cập nhật sản phẩm
            $rules['image'] = 'nullable|image|mimes:jpeg,png,jpg,gif'; // Hình ảnh là tùy chọn
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên sản phẩm là bắt buộc.',
            'category_id.required' => 'Thể loại là bắt buộc.',
            'brand_id.required' => 'Thương hiệu là bắt buộc.',
            'image.required' => 'Ảnh sản phẩm là bắt buộc.',
            'image.image' => 'File tải lên phải là hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, gif.',

        ];
    }

}
