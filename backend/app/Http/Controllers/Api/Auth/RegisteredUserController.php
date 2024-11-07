<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration prompt (typically not used in API).
     */
    public function create(): JsonResponse
    {
        return response()->json(['message' => 'Bạn phải đăng kí tài khoản.']);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => ['required'], // Confirm password field
            'phone' => ['required', 'string', 'regex:/^(0|\+84)[0-9]{9,10}$/'],
        ], [
            'username.required' => 'Tên đăng nhập là bắt buộc.',
            'username.max' => 'Tên đăng nhập không được vượt quá 255 ký tự.',
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email này đã được sử dụng.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp.',
            'password_confirmation.required' => 'Vui lòng nhập lại mật khẩu để xác nhận.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.regex' => 'Số điện thoại phải bắt đầu bằng +84 mã quốc gia.',
        ]);

        // Create a new user
        $user = User::create([
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'phone' => $validatedData['phone'],
        ]);

        // Trigger the Registered event
        event(new Registered($user));

        // Return success response
        return response()->json(['message' => 'Đăng kí thành công'], 201);
    }
}