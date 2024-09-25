<?php

use App\Http\Controllers\Admins\BrandController;
use App\Http\Controllers\Admins\CategoryController;
use App\Http\Controllers\Admins\ProductController;
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
