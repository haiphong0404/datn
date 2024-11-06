<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rules;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset prompt (not typically used in API).
     */
    public function create(Request $request): JsonResponse
    {
        return response()->json(['message' => 'Password reset request endpoint.']);
    }

    /**
     * Handle an incoming new password request.
     */
    public function store(Request $request): JsonResponse
    {
      
         $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => ['required'],
        ], [
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp.',
            'password_confirmation.required' => 'Vui lòng nhập lại mật khẩu để xác nhận.',
        ]);

     
        $user = Password::getUser($request->only('email'));

    
        if (!$user) {
            return response()->json(['error' => 'Người dùng không tồn tại.'], 404); // Not Found
        }

    
        $user->forceFill([
       
            'password' => Hash::make($request->password),
        ])->save();

        event(new PasswordReset($user));

        return response()->json(['message' =>('Mật khẩu của bạn đã được đặt lại')], 200);
    }
}
