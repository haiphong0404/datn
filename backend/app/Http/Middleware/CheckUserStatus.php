<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CheckUserStatus
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Kiểm tra nếu người dùng đã đăng nhập
        if (Auth::check()) {
            $user = Auth::user();

            // Nếu trạng thái tài khoản không phải là 'active', đăng xuất và thông báo lỗi
            if ($user->status !== 'active') {
                Auth::logout();
                return redirect()->route('login')->with(['error' => 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên để biết thêm thông tin.']);
            }
        }

        return $next($request); // Tiếp tục request nếu không có vấn đề
    }
}
