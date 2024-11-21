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
use App\Http\Controllers\ProfileController;
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
Route::middleware('auth')->group(function () {
    Route::get('/admin', [StatisticsController::class, 'index'])->name('admin.index');
    Route::get('profile', [ProfileControllers::class, 'index'])->name('admin.profile');
    Route::get('/profile/edit', [ProfileControllers::class, 'edit'])->name('admin.profile.edit');
    Route::put('/profile', [ProfileControllers::class, 'update'])->name('admin.profile.update');
    Route::delete('/profile', [ProfileControllers::class, 'destroy'])->name('admin.profile.destroy');
});

            // Route::post('/admin/logout', [ProfileControllers::class, 'logout'])->name('logout');

// Đảm bảo route '/' không trùng lặp
require __DIR__ . '/auth.php';

// Route admin
Route::group(
    [
        'prefix' => 'admin',
        'as' => 'admin.',
        // 'middleware' => ['auth', 'admin'] // Nếu cần middleware xác thực
    ],
    function () {
        Route::resource('brands', BrandController::class); // Route cho thương hiệu
        Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore');
        Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
        Route::post('comments/{id}/restore', [CommentController::class, 'restore'])->name('comments.restore');
        Route::resource('categories', CategoryController::class); // Route cho thể loại
        Route::resource('products', ProductController::class);   // Route cho sản phẩm
        Route::resource('products.variants', ProductVariantController::class); // Route cho biến thể sản phẩm
        Route::resource('user', UserController::class);  // Route cho người dùng
        Route::resource('comments', CommentController::class);  // Route cho bình luận
        Route::resource('contacts', ContactController::class);
        Route::resource('articles', ArticlesController::class); // Route cho bài viết
        Route::resource('banners', BannerController::class); // Route cho banner
        Route::post('banners/{id}/restore', [BannerController::class, 'restore'])->name('banners.restore');
        Route::resource('/vouchers', VoucherController::class);

        // Route chức năng order và order detail
        Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create'); // Hiển thị form tạo order
        Route::post('/orders', [OrderController::class, 'store'])->name('orders.store'); // Lưu thông tin order
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::put('/orders/{order}/updateStatus', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
        Route::put('/orders/{order}/updatePaymentStatus', [OrderController::class, 'updatePaymentStatus'])->name('orders.updatePaymentStatus');
        Route::get('/orders/{order}/details', [OrderController::class, 'show'])->name('orders.show');
        // Route để lấy danh sách biến thể của sản phẩm
        Route::get('/get-variants/{productId}', [OrderController::class, 'getVariants'])->name('products.variants');
        // Route để tìm kiếm sản phẩm
        Route::get('/search-products', [OrderController::class, 'search'])->name('products.search');
        Route::resource('admin/vouchers', VoucherController::class);
    }
);

Route::group(
    [
        'prefix' => 'staff',
        'as' => 'staff.',
//        'middleware' => 'staff'
    ],
    function () {
        Route::get('Admin', [AdminTestController::class, 'index'])->name('Admin');
        Route::resource('brands', BrandController::class); // Route cho thương hiệu
        Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore');
        Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
        Route::post('comments/{id}/restore', [CommentController::class, 'restore'])->name('comments.restore');
        Route::resource('categories', CategoryController::class); // Route cho thể loại
        Route::resource('products', ProductController::class);   // Route cho sản phẩm
        Route::resource('products.variants', ProductVariantController::class); // Route cho biến thể sản phẩm
        Route::resource('user', \App\Http\Controllers\Staff\UserController::class);  // Route cho người dùng
        Route::resource('comments', CommentController::class);  // Route cho bình luận
        Route::resource('contacts', ContactController::class);
        Route::resource('articles', ArticlesController::class);// Route cho bài viết
        Route::resource('banners',BannerController::class);// Route cho banner
        Route::post('banners/{id}/restore', [BannerController::class, 'restore'])->name('banners.restore');
        Route::get('/orders/create', [OrderController::class, 'create'])->name('orders.create'); // Hiển thị form tạo order
        Route::post('/orders', [OrderController::class, 'store'])->name('orders.store'); // Lưu thông tin order
        Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
        Route::put('/orders/{order}/updateStatus', [OrderController::class, 'updateStatus'])->name('orders.updateStatus');
        Route::get('/orders/{order}/details', [OrderController::class, 'show'])->name('orders.show');
        Route::get('/get-variants/{productId}', [OrderController::class, 'getVariants'])->name('products.variants');
        Route::get('/search-products', [OrderController::class, 'search'])->name('products.search');
    }
);
// Route::middleware(['auth', 'checkRole:admin,staff'])->group(function () {
//     Route::resource('admin/vouchers', VoucherController::class);
// });
