<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class AuthenticatedSessionController extends Controller
{
  /**
   * Display the login view.
   */
  public function create(): View
  {
    return view('auth.login');
  }

  /**
   * Handle an incoming authentication request.
   */
  public function store(Request $request): RedirectResponse
  {
    // Xác thực dữ liệu đầu vào
    $request->validate(
      [
        'email' => 'required|email',
        'password' => 'required|min:6',
      ],
      [
        'email.required' => 'Vui lòng nhập email',
        'email.email' => 'Email không đúng định dạng',
        'password.required' => 'Vui lòng nhập mật khẩu',
        'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự',
      ]
    );

    // Xác thực thông tin đăng nhập
    $credentials = $request->only('email', 'password');
    $remember = $request->has('remember'); // Ghi nhớ đăng nhập nếu có

    if (Auth::attempt($credentials, $remember)) {
      // Đăng nhập thành công: Lấy thông tin người dùng
      $user = Auth::user();

      // Phân quyền và chuyển hướng
      if ($user->role === 'admin') {
        $request->session()->regenerate(); // Tái tạo session
        return redirect()->route('admin.index')->with('success', 'Đăng nhập thành công!');
      } elseif ($user->role === 'staff') {
        $request->session()->regenerate(); // Tái tạo session
        return redirect()->route('admin.index')->with('success', 'Đăng nhập thành công!');
      } else {
        // Nếu vai trò không hợp lệ, đăng xuất và thông báo lỗi
        Auth::logout();
        return redirect()->route('login')->with(['error' => 'Bạn không có quyền truy cập vào hệ thống.']);
      }
    }

    // Nếu thông tin đăng nhập không đúng
    return redirect()->back()->withErrors(['password' => 'Email hoặc mật khẩu không đúng, vui lòng thử lại!']);
  }








  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/login');
  }
}
