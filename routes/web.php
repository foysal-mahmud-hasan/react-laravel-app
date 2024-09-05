<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
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
Route::post('save-signup', [CustomerController::class, 'Save'])->name('save-signup');
Route::get('get-data', [CustomerController::class, 'GetData'])->name('get-data');
Route::get('edit-info/{id}', [CustomerController::class, 'Edit'])->name('edit-info');
Route::post('update-info', [CustomerController::class, 'EditUpdate'])->name('update-info');
Route::get('delete-info/{id}', [CustomerController::class, 'Delete'])->name('delete-info');
