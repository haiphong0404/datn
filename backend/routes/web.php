<?php

use App\Http\Controllers\Admins\BrandController;
<<<<<<< HEAD
use App\Http\Controllers\Admins\CategoryController;
use App\Http\Controllers\Admins\ProductController;
=======
use App\Http\Controllers\Admins\CommentController;
use App\Http\Controllers\Admins\UserController;
>>>>>>> b99007719a0471530802d257112f5f982d347c20
use App\Http\Controllers\AdminTestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', [AdminTestController::class, 'index'])->name('/');
<<<<<<< HEAD

Route::resource('admin/brands', BrandController::class);
Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore');
Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');



$cruds = [
    'categories' => CategoryController::class,
    'products'=> ProductController::class,
];

foreach ($cruds as $obj => $controller) {
    Route::resource($obj, $controller);
}
=======
Route::resource('user',UserController::class);
Route::resource('comments', CommentController::class);
// Route để khôi phục bình luận đã xóa mềm
Route::post('comments/{id}/restore', [CommentController::class, 'restore'])->name('comments.restore');
Route::resource('admin/brands', BrandController::class);
>>>>>>> b99007719a0471530802d257112f5f982d347c20
