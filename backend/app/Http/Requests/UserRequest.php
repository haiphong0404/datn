<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . ($this->user ? $this->user->id : '')],
            'email' => ['required', 'email', 'unique:users,email,' . ($this->user ? $this->user->id : '')],
            'password' => ['required', 'string', 'min:6'],
            'avatar_img' => 'image|nullable|mimes:jpg,jpeg,png,gif|max:2048', // Chỉ cho phép các định dạng ảnh  
          'phone' => ['nullable', 'string', 'max:15','unique:users,phone,' . ($this->user ? $this->user->id : '')],
            'address' => ['nullable', 'string', 'max:255'],
            'role' => ['nullable', 'string', 'max:50'],
        ];
        
    }
    
    public function messages(): array
    {
        return [
            'username.required' => 'Vui lòng nhập tên đăng nhập.',
            'username.string' => 'Tên đăng nhập phải là một chuỗi.',
            'username.max' => 'Tên đăng nhập không được vượt quá 255 ký tự.',
            'username.unique' => 'Tên đã được sử dụng.',


            'email.required' => 'Vui lòng nhập email.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email đã được sử dụng.',

            'password.required' => 'Vui lòng nhập mật khẩu.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            // 'password.confirmed' => 'Mật khẩu xác nhận không khớp.',

            'avatar_img.image' => 'File tải lên phải là ảnh.',
            'avatar_img.mimes' => 'Chỉ cho phép các định dạng: jpg, jpeg, png, gif.',
            'avatar_img.max' => 'Kích thước ảnh không được vượt quá 2MB.',

            'phone.required' => 'Vui lòng nhập số điện thoại.',
            'phone.unique' => 'Số điện thoại đã được sử dụng.',
            'phone.max' => 'Số điện thoại không được vượt quá 15 ký tự.',


            'address.max' => 'Địa chỉ không được vượt quá 255 ký tự.',

            'role.max' => 'Vai trò không được vượt quá 50 ký tự.',
        ];
    }
}
