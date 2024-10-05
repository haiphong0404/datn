<?php

use App\Http\Controllers\Admins\BrandController;
use App\Http\Controllers\Admins\CategoryController;
use App\Http\Controllers\Admins\CommentController;
use App\Http\Controllers\Admins\ProductController;
use App\Http\Controllers\Admins\ProductVariantController;
use App\Http\Controllers\Admins\UserController;
use App\Http\Controllers\AdminTestController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
| Route cho Web, dành cho phần admin và người dùng
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Route profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Đảm bảo route '/' không trùng lặp
Route::get('/', [AdminTestController::class, 'index'])->name('/');

// Route admin
Route::group(
    [
        'prefix' => 'admin',
        'as' => 'admin.',
//        'middleware' => 'auth' // Nếu cần middleware xác thực
        'middleware' => 'web'
    ],
    function () {
        Route::get('/', [AdminTestController::class, 'index'])->name('dashboard'); // Route dashboard admin
        Route::resource('brands', BrandController::class); // Route cho thương hiệu
        Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore');
        Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
        Route::post('comments/{id}/restore', [CommentController::class, 'restore'])->name('comments.restore');
        Route::resource('categories', CategoryController::class); // Route cho thể loại
        Route::resource('products', ProductController::class);   // Route cho sản phẩm
        Route::resource('products.variants', ProductVariantController::class); // Route cho biến thể sản phẩm
        Route::resource('user', UserController::class);  // Route cho người dùng
        Route::resource('comments', CommentController::class);  // Route cho bình luận
    }
);
