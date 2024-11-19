<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function changePassword(Request $request)
    {
        // Xác thực thông tin người dùng
        $user = Auth::user();

        // Kiểm tra dữ liệu đầu vào
        $request->validate([
            'oldpassword' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'oldpassword.required' => 'Mật khẩu hiện tại là bắt buộc.',
            'password.required' => 'Mật khẩu mới là bắt buộc.',
            'password.min' => 'Mật khẩu mới phải có ít nhất 8 ký tự.',
            'password.confirmed' => 'Xác nhận mật khẩu mới không khớp.',
        ]);

        // Kiểm tra mật khẩu hiện tại
        if (!Hash::check($request->oldpassword, $user->password)) {
            throw ValidationException::withMessages([
                'oldpassword' => ['Mật khẩu hiện tại không đúng.'],
            ]);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->password);
        $user->save();

        // Trả về phản hồi thành công
        return response()->json([
            'message' => 'Mật khẩu đã được thay đổi thành công.',
        ]);
    }
}
