<?php

use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\Auth\RegisteredUserController;
use App\Http\Controllers\Api\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;
use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\UserController;


use App\Http\Controllers\Api\Auth\PasswordResetLinkController;

//Route GET để lấy thông tin hướng dẫn về việc gửi yêu cầu đặt lại mật khẩu
Route::get('/password/reset-link', [PasswordResetLinkController::class, 'store'])
    ->name('api.password.email');
// Route để xử lý yêu cầu gửi liên kết đặt lại mật khẩu
Route::post('/password/reset-link', [PasswordResetLinkController::class, 'store'])
    ->name('api.password.email');
// Route để xác minh email
Route::get('/email/verify', VerifyEmailController::class)->name('verification.verify');
Route::middleware('auth:sanctum')->group(function () {
    // Route to show the confirm password message
    Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show']);

    // Route to confirm the user's password
    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);
});

//get dang ky
Route::get('register', [RegisteredUserController::class, 'store'])->name('register');
//post dang ky
Route::post('register', [RegisteredUserController::class, 'store'])->name('register');

// getlogin 
Route::get('login', [AuthenticatedSessionController::class, 'store'])->name('login');
// post login 
Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');
// get logout
Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
//post logout
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::apiResource('Apibrands', BrandController::class);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('api')->group(function () {

    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
});
Route::apiResource('user', UserController::class);
