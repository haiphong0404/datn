<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'products' => 'required|array',
            'products.*.variant_id' => 'required|exists:product_variants,id',
            'products.*.quantity' => 'required|integer|min:1',
            'products.*.price' => 'required|numeric|min:0',
        ];
    }

    public function messages()
    {
        return [
            'user_id.required' => 'ID người dùng là bắt buộc.',
            'user_id.exists' => 'Người dùng không tồn tại trong hệ thống.',
            'name.required' => 'Tên khách hàng là bắt buộc.',
            'name.max' => 'Tên khách hàng không được vượt quá 255 ký tự.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',
            'address.required' => 'Địa chỉ giao hàng là bắt buộc.',
            'address.max' => 'Địa chỉ giao hàng không được vượt quá 255 ký tự.',
            'products.required' => 'Bạn phải thêm ít nhất một sản phẩm vào đơn hàng.',
            'products.*.variant_id.required' => 'Mỗi sản phẩm phải có một biến thể được chọn.',
            'products.*.variant_id.exists' => 'Biến thể sản phẩm không tồn tại trong hệ thống.',
            'products.*.quantity.required' => 'Số lượng sản phẩm là bắt buộc.',
            'products.*.quantity.integer' => 'Số lượng sản phẩm phải là một số nguyên.',
            'products.*.quantity.min' => 'Số lượng sản phẩm phải ít nhất là 1.',
            'products.*.price.required' => 'Giá sản phẩm là bắt buộc.',
            'products.*.price.numeric' => 'Giá sản phẩm phải là một số hợp lệ.',
            'products.*.price.min' => 'Giá sản phẩm phải lớn hơn hoặc bằng 0.',
        ];
    }
}
