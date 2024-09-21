<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\View\View;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): View
    {
        return view('client.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'password_confirmation' => ['required'], // chỉ cần kiểm tra required, khớp với 'password' do 'confirmed'
            'phone' => ['required', 'string', 'regex:/^(0|\+84)[0-9]{9,10}$/'], // regex để kiểm tra số điện thoại bắt đầu bằng 84 hoặc +84
        ], [
            'username.required' => 'Tên đăng nhập là bắt buộc.',
            'username.max' => 'Tên đăng nhập không được vượt quá 255 ký tự.',
            'email.required' => 'Email là bắt buộc.',
            'email.lowercase' => 'Email phải được viết bằng chữ thường.',
            'email.email' => 'Email không đúng định dạng.',
            'email.unique' => 'Email này đã được sử dụng.',
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.confirmed' => 'Xác nhận mật khẩu không khớp.',
            'password_confirmation.required' => 'Vui lòng nhập lại mật khẩu để xác nhận.',
            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.regex' => 'Số điện thoại phải bắt đầu bằng +84 mã quốc gia.',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            
        ]);

        event(new Registered($user));

        Auth::login($user);

        return  redirect()->route('/');
    }
}
