<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContactRequest extends FormRequest
{
    /**
     * Xác định người dùng có quyền sử dụng request này không.
     */
    public function authorize()
    {
        return true; // Để true nếu không kiểm tra quyền truy cập
    }

    /**
     * Quy tắc xác thực cho request.
     */
    public function rules()
    {
        $contactId = $this->route('contact'); // Lấy id từ URL nếu đang trong quá trình cập nhật

        return [
            'name' => 'required|max:255',
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('contacts', 'email')->ignore($contactId),
            ],
            'phone' => [
                'required',
                'max:11',
                Rule::unique('contacts', 'phone')->ignore($contactId),
            ],
        ];
    }

    /**
     * Thông báo lỗi bằng tiếng Việt.
     */
    public function messages()
    {
        return [
            'name.required' => 'Tên không được để trống.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',
            'email.required' => 'Email không được để trống.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email này đã tồn tại.',
            'phone.required' => 'Số điện thoại không được để trống.',
            'phone.unique' => 'Số điện thoại này đã tồn tại.',
            'phone.max' => 'Số điện thoại không được vượt quá 11 ký tự.',
        ];
    }
}
