<?php

use App\Http\Controllers\Api\ArticlesController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductVariantController;
use App\Http\Controllers\Api\SizeController;
use App\Http\Controllers\PaymentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\Auth\RegisteredUserController;
use App\Http\Controllers\Api\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;
use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\Auth\PasswordResetLinkController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderDetailController;
use App\Http\Controllers\Api\VoucherController;
use App\Http\Controllers\Api\Auth\NewPasswordController;
use App\Http\Controllers\Api\Auth\ForgotPasswordController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\BannerController;

Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail']);
Route::post('password/reset', [ResetPasswordController::class, 'reset']);
Route::post('/password/reset/store', [NewPasswordController::class, 'store'])->name('password.update');
Route::get('/password/reset-link', [PasswordResetLinkController::class, 'store'])
    ->name('api.password.email');
Route::post('/password/reset-link', [PasswordResetLinkController::class, 'store'])
    ->name('api.password.email');
Route::get('/email/verify', VerifyEmailController::class)->name('verification.verify');
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/confirm-password', [ConfirmablePasswordController::class, 'show']);
    Route::post('/confirm-password', [ConfirmablePasswordController::class, 'store']);
});
Route::get('register', [RegisteredUserController::class, 'store'])->name('register');
Route::post('register', [RegisteredUserController::class, 'store'])->name('register');
Route::get('login', [AuthenticatedSessionController::class, 'store'])->name('login');
Route::post('login', [AuthenticatedSessionController::class, 'store'])->name('login');
Route::get('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
Route::apiResource('Apibrands', BrandController::class);
Route::apiResource('Apiarticles', ArticlesController::class); // bài viết
Route::get('/Apiarticle/{id}', [ArticlesController::class, 'storeone']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('api')->group(function () {
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('products', ProductController::class);
});
Route::apiResource('user', UserController::class);
Route::get('order-details/{order_id}', [OrderDetailController::class, 'getOrderDetails']);
Route::apiResource('order-details', OrderDetailController::class);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('comments/{product_id}', [CommentController::class, 'store']);
    Route::put('comments/{id}', [CommentController::class, 'update']);
    Route::delete('comments/{id}', [CommentController::class, 'destroy']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::put('/cart/update', [CartController::class, 'updateCart']);
    Route::delete('/cart/remove', [CartController::class, 'removeFromCart']);
    Route::delete('/cart/remove/{product_variant_id}', [CartController::class, 'removeFromCart']);
    Route::apiResource('order', OrderController::class );

});
Route::get('comments/{product_id}', [CommentController::class, 'index']);
Route::get('products/{productId}/variants', [ProductVariantController::class, 'index']);
Route::get('/variants/{id}', [ProductVariantController::class, 'show']);
Route::get('/sizes', [SizeController::class, 'index']);
Route::get('/colors', [ColorController::class, 'index']);
Route::get('contacts', [ContactController::class, 'index']); // Lấy danh sách tất cả contacts
Route::get('contacts/{id}', [ContactController::class, 'show']); // Lấy contact theo ID
Route::get('/banners', [BannerController::class, 'index']);
Route::apiResource('order', OrderController::class );
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'index']);
    Route::put('/cart/update/{id_cart_item}', [CartController::class, 'updateCart']);
    Route::delete('/cart/remove/{product_variant_id}', [CartController::class, 'removeFromCart']);
    Route::apiResource('order', OrderController::class);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::post('/cart/sync', [CartController::class, 'syncCart']);
});
Route::get('orders', [OrderController::class, 'abc']);
Route::post('/apply-voucher', [VoucherController::class, 'applyVoucher']);
Route::post('/payment/create', [PaymentController::class, 'createPayment']);
Route::post('/payment/success/{order_id}', [PaymentController::class, 'paymentSuccess']);
Route::post('/payment/cancel/{order_id}', [PaymentController::class, 'paymentCancel']);
Route::post('order/{order_id}/status', [OrderDetailController::class, 'updateOrderStatus']);
