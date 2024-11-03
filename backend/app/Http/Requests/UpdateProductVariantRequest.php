<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductVariantRequest extends FormRequest
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
            'size_id' => 'required|exists:sizes,id',
            'color_id' => 'required|exists:colors,id',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'variant_images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
