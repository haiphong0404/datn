<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVoucherRequest extends FormRequest
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
    public function rules()
    {
        $rules = [
            'code' => 'required|string|unique:vouchers,code',
            'start_date' => 'required|date',
            'expiration_date' => 'required|date|after_or_equal:start_date',
            'type' => 'required|string',
            'quantity' => 'required|integer|min:1',
        ];

        switch ($this->type) {
            case 'percentage':
                $rules['discount_percentage'] = 'required|numeric|min:0';
                $rules['max_discount_value'] = 'required|numeric|min:0';
                break;

            case 'fixed':
                $rules['discount_value'] = 'required|numeric|min:0';
                $rules['min_order_value'] = 'required|numeric|min:0';
                break;

            case 'category_discount':
                $rules['discount_percentage'] = 'required|numeric|min:0';
                $rules['category_id'] = 'required|exists:categories,id';
                break;

            case 'first_order':
                $rules['discount_value'] = 'required|numeric|min:0';
                $rules['min_order_value'] = 'required|numeric|min:0';
                break;
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'code.required' => 'Mã giảm giá là bắt buộc.',
            'code.string' => 'Mã giảm giá phải là một chuỗi.',
            'code.unique' => 'Mã giảm giá đã tồn tại.',

            'start_date.required' => 'Ngày bắt đầu là bắt buộc.',
            'start_date.date' => 'Ngày bắt đầu không hợp lệ.',

            'expiration_date.required' => 'Ngày hết hạn là bắt buộc.',
            'expiration_date.date' => 'Ngày hết hạn không hợp lệ.',
            'expiration_date.after_or_equal' => 'Ngày hết hạn phải sau hoặc bằng ngày bắt đầu.',

            'type.required' => 'Loại mã giảm giá là bắt buộc.',
            'type.string' => 'Loại mã giảm giá phải là một chuỗi.',

            'quantity.required' => 'Số lượng là bắt buộc.',
            'quantity.integer' => 'Số lượng phải là một số nguyên.',
            'quantity.min' => 'Số lượng phải lớn hơn hoặc bằng 1.',

            'min_order_value.required' => 'Giá trị tối thiểu của đơn hàng là bắt buộc.',
            'min_order_value.numeric' => 'Giá trị tối thiểu của đơn hàng phải là một số.',
            'min_order_value.min' => 'Giá trị tối thiểu của đơn hàng phải lớn hơn hoặc bằng 0.',

            'discount_percentage.required' => 'Phần trăm giảm giá là bắt buộc.',
            'discount_percentage.numeric' => 'Phần trăm giảm giá phải là một số.',
            'discount_percentage.min' => 'Phần trăm giảm giá phải lớn hơn hoặc bằng 0.',

            'max_discount_value.required' => 'Giá trị chiết khấu tối đa là bắt buộc.',
            'max_discount_value.numeric' => 'Giá trị chiết khấu tối đa phải là một số.',
            'max_discount_value.min' => 'Giá trị chiết khấu tối đa phải lớn hơn hoặc bằng 0.',

            'discount_value.required' => 'Giá trị giảm giá là bắt buộc.',
            'discount_value.numeric' => 'Giá trị giảm giá phải là một số.',
            'discount_value.min' => 'Giá trị giảm giá phải lớn hơn hoặc bằng 0.',

            'category_id.required' => 'Danh mục áp dụng là bắt buộc.',
            'category_id.exists' => 'Danh mục áp dụng không tồn tại.',
        ];
    }
}
