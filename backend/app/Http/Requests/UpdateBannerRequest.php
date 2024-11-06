<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBannerRequest extends FormRequest
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
            'image_url' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'title' => 'required|string|max:255',
            'sub_title' => 'required|string|max:255',
            'span_title' => 'required|string|max:255',    
        ];
    }

    /**
     * Get the custom error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'image_url.required' => 'Bạn cần tải lên một hình ảnh.',
            'image_url.image' => 'File tải lên phải là định dạng hình ảnh.',
            'image_url.mimes' => 'Hình ảnh phải có định dạng: jpeg, png, jpg, hoặc gif.',
            'image_url.max' => 'Hình ảnh không được vượt quá 2MB.',
            'title.required' => 'Tiêu đề không được để trống.',
            'title.string' => 'Tiêu đề phải là chuỗi ký tự.',
            'title.max' => 'Tiêu đề không được vượt quá 255 ký tự.',
            'sub_title.required' => 'Subtitle đề không được để trống.',
            'sub_title.string' => 'Subtitle đề phải là chuỗi ký tự.',
            'sub_title.max' => 'Subtitle đề không được vượt quá 255 ký tự.',
            'span_title.required' => 'Spantitle đề không được để trống.',
            'span_title.string' => 'Spantitle đề phải là chuỗi ký tự.',
            'span_title.max' => 'Spantitle đề không được vượt quá 255 ký tự.',

        ];
    }
}
