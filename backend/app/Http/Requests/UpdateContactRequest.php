<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateContactRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $contactId = $this->route('contact');

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
                'max:15',
                Rule::unique('contacts', 'phone')->ignore($contactId),
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Tên không được để trống.',
            'email.unique' => 'Email này đã tồn tại.',
            'phone.unique' => 'Số điện thoại này đã tồn tại.',
        ];
    }
}
