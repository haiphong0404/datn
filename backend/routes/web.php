<?php

use App\Http\Controllers\Admins\ArticlesController;
use App\Http\Controllers\Admins\BannerController;
use App\Http\Controllers\Admins\BrandController;
use App\Http\Controllers\Admins\CategoryController;
use App\Http\Controllers\Admins\CommentController;
use App\Http\Controllers\Admins\ContactController;
use App\Http\Controllers\Admins\OrderController;
use App\Http\Controllers\Admins\ProductController;
use App\Http\Controllers\Admins\ProductVariantController;
use App\Http\Controllers\Admins\UserController;
use App\Http\Controllers\AdminTestController;
use App\Http\Controllers\Admins\ProfileControllers;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admins\VoucherController;
use App\Http\Controllers\StatisticsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Route cho Web, dành cho phần admin và người dùng
*/

Route::get('/', function () {
    return redirect()->route('login');
});


// Route profile
Route::middleware(['auth','check.status'])->group(function () {
    Route::get('/staff', [StatisticsController::class, 'index'])->name('admin.index');
    Route::get('/admin', [StatisticsController::class, 'index'])->name('admin.index');
    Route::get('profile', [ProfileControllers::class, 'index'])->name('admin.profile');
    Route::get('/profile/edit', [ProfileControllers::class, 'edit'])->name('admin.profile.edit');
    Route::put('/profile', [ProfileControllers::class, 'update'])->name('admin.profile.update');
    Route::delete('/profile', [ProfileControllers::class, 'destroy'])->name('admin.profile.destroy');
});

// Route::post('/admin/logout', [ProfileControllers::class, 'logout'])->name('logout');

// Đảm bảo route '/' không trùng lặp
require __DIR__ . '/auth.php';

// Group chung cho Admin và Staff
Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['auth', 'checkRole:admin,staff','check.status']], function () {
    // Quản lý thương hiệu
    Route::resource('brands', BrandController::class)->middleware('checkRole:admin');
    Route::post('brands/{id}/restore', [BrandController::class, 'restore'])->name('brands.restore')->middleware('checkRole:admin');

    // Quản lý danh mục
    Route::resource('categories', CategoryController::class)->middleware('checkRole:admin');
    Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore')->middleware('checkRole:admin');

    // Quản lý sản phẩm
    Route::resource('products', ProductController::class);
    Route::resource('products.variants', ProductVariantController::class);
    Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');

    // Quản lý bình luận
    Route::resource('comments', CommentController::class)->middleware('checkRole:admin');
    Route::post('comments/{id}/restore', [CommentController::class, 'restore'])->name('comments.restore')->middleware('checkRole:admin');


    // Quản lý người dùng
    Route::resource('user', UserController::class);
    Route::patch('/user/{id}/toggle-status', [UserController::class, 'toggleStatus'])->name('user.toggleStatus')->middleware('checkRole:admin');

    // Quản lý liên hệ
    Route::resource('contacts', ContactController::class)->middleware('checkRole:admin');

    // Quản lý bài viết
    Route::resource('articles', ArticlesController::class)->middleware('checkRole:admin');

    // Quản lý banner
    Route::resource('banners', BannerController::class)->middleware('checkRole:admin');
    Route::post('banners/{id}/restore', [BannerController::class, 'restore'])->name('banners.restore')->middleware('checkRole:admin');

    // Quản lý voucher
    Route::resource('vouchers', VoucherController::class)->middleware('checkRole:admin');

    // Quản lý đơn hàng (Cả admin và staff)
    Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::put('/orders/{order}/updateStatus', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
    Route::put('/orders/{order}/updatePaymentStatus', [OrderController::class, 'updatePaymentStatus'])->name('orders.updatePaymentStatus');
    Route::get('/orders/{order}/details', [OrderController::class, 'show'])->name('orders.show');
    Route::get('/get-variants/{productId}', [OrderController::class, 'getVariants'])->name('products.variants');
    Route::get('/search-products', [OrderController::class, 'search'])->name('products.search');
    Route::put('/products/{product}/update-variants', [ProductController::class, 'updateVariants'])->name('products.updateVariants')->middleware('checkRole:admin');
});
