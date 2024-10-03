<?php

use App\Http\Controllers\Admins\BrandController;
use App\Http\Controllers\Admins\CategoryController;
use App\Http\Controllers\Admins\CommentController;
use App\Http\Controllers\Admins\ProductController;
use App\Http\Controllers\Admins\UserController;
use App\Http\Controllers\AdminTestController;
use App\Http\Controllers\ProfileController;
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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';



Route::get('/', [AdminTestController::class, 'index'])->name('/');



Route::group(
    [
      'prefix' => 'admin',
      'as' => 'admin.',
    //   'middleware' =>'Admin'
    ],
    function () {
        Route::get('admin', [adminTestController::class, 'index'])->name('admin');
        Route::resource('/brands', BrandController::class);
        Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore');
        Route::post('products/{id}/restore', [ProductController::class, 'restore'])->name('products.restore');
        Route::post('comments/{id}/restore', [CommentController::class, 'restore'])->name('comments.restore');


$cruds = [
    'categories' => CategoryController::class,
    'products'=> ProductController::class,
];

foreach ($cruds as $obj => $controller) {
    Route::resource($obj, $controller);
}
Route::resource('user',UserController::class);
Route::resource('comments', CommentController::class);
Route::resource('admin/brands', BrandController::class);
        
     
    }
    
  
  );
  
route::group(
    [
      'prefix' => 'staff',
      'as' => 'staff.',
      'middleware' =>'staff'
    ],
    function () {
        Route::get('Admin', [AdminTestController::class, 'index'])->name('Admin');
     
    }
    
  
  );