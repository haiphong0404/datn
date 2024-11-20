<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'api/*',  // Bỏ qua CSRF cho tất cả các route API
        'login',  // Bỏ qua CSRF cho route đăng nhập
        'logout', // Bỏ qua CSRF cho route đăng xuất
        'register', // Bỏ qua CSRF cho route đăng ký
        'password/reset-link', // Bỏ qua CSRF cho route gửi email đặt lại mật khẩu
        'change-password', // Bỏ qua CSRF cho route đặt lại mật khẩu
    ];
}