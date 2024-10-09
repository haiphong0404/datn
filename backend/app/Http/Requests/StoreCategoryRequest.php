<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Cho phép tất cả người dùng
    }

    public function rules()
    {
        $categoryId = $this->route('category'); // Lấy ID từ route

        return [
            'name' => 'required|string|max:255|unique:categories,name,' . $categoryId, // Bỏ qua tên hiện tại
            'description' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'name.required' =>"Tên thể loại không được để trống",
            'name.unique' => 'Tên thể loại đã tồn tại. Vui lòng chọn tên khác.',
        ];
    }

}
