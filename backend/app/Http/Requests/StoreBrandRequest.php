<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBrandRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|unique:brands,name',
            'description' => 'required|string',
            'link' => 'required|url',
            'image' => 'required|image',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên không được bỏ trống.',
            'name.min' => 'Tên phải có ít nhất 2 ký tự.',
            'name.unique' => 'Tên này đã tồn tại.',
            'link.required' => 'Địa chỉ bản đồ không được bỏ trống.',
            'link.url' => 'Địa chỉ bản đồ không hợp lệ.',
            'image.required' => 'Hình ảnh không được để trống.',
            'image.image' => 'File tải lên phải là một hình ảnh.',
            'description.required' => 'Mô tả không được bỏ trống.',
        ];
    }
}
