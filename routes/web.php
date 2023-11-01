<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TransaksiController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\MemberController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
});


Route::get('/dashboard', function () {
    $user=\Auth::user()->is_admin;
    if($user==1){
        return redirect('/profile');
    }else{
        return redirect('/member/profil');
    }

    // return Inertia::render('Dashboard');

})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/member/profil',[MemberController::class, 'profil'])->name('member.profil');
    Route::post('/member/update',[MemberController::class, 'update'])->name('member.update');

    Route::group(['middleware' => ['admin']], function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::get('/admin',[AdminController::class, 'index'])->name('admin.index');
        Route::get('/admin/create',[AdminController::class, 'create'])->name('admin.create');
        Route::post('/admin/store',[AdminController::class, 'store'])->name('admin.store');
        Route::get('/admin/{member}/edit',[AdminController::class, 'edit'])->name('admin.edit');
        Route::post('/admin/update',[AdminController::class, 'update'])->name('admin.update');
        Route::delete('/admin/{id}/delete',[AdminController::class, 'delete'])->name('admin.delete');

        Route::get('/member',[MemberController::class, 'index'])->name('member.index');
        Route::get('/member/create',[MemberController::class, 'create'])->name('member.create');
        Route::post('/member/store',[MemberController::class, 'store'])->name('member.store');
        Route::get('/member/{member}/edit',[MemberController::class, 'edit'])->name('member.edit');
        Route::get('/member/{member}/detail',[MemberController::class, 'detail'])->name('member.detail');
        // Route::post('/member/update',[MemberController::class, 'update'])->name('member.update');
        Route::delete('/member/{id}/delete',[MemberController::class, 'delete'])->name('member.delete');

    });





    Route::get('/logout', [ProfileController::class, 'logout'])->name('logout');
});

require __DIR__.'/auth.php';
