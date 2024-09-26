<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminTestController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
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

Route::get('/', [AdminTestController::class, 'indexx'])->name('/');
Route::get('/dashboard', function () {
  return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


require __DIR__.'/auth.php';

Route::post('post-login', [AuthenticatedSessionController::class, 'postlogin'])->name('postlogin');

route::group(
    [
      'prefix' => 'admin',
      'as' => 'admin.',
      'middleware' =>'Admin'
    ],
    function () {
        Route::get('admin', [adminTestController::class, 'index'])->name('admin');
        
     
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

