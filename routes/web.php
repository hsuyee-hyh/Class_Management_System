<?php

use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('home');


// reset password
Route::get('/forgot-password', function () {
    return Inertia::render('Auth/ForgotPassword');
})->middleware('guest')->name('password.request');

Route::post('/forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);
    $status = Password::sendResetLink(
        $request->only('email')
    );

    return $status === Password::ResetLinkSent
        ? back()->with(['status' => __($status)])
        : back()->withErrors(['email' => __($status)]);
})->middleware('guest')->name('password.email');

Route::get('/reset-password/{token}', function (string $token) {
    return Inertia::render('Auth/ResetPassword', [
        'token' => $token
    ]);
})->middleware('guest')->name('password.reset');


Route::middleware('auth')->group(function () {
    Route::get('/profile/edit-password', [PasswordController::class, 'edit'])->name('profile.editPassword');
    Route::patch('/profile/edit-password', [PasswordController::class, 'update'])->name('profile.updatePassword');
    // Route::get('/profile', [ProfileController::class, 'editPassword'])->name('profile.editPassword');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__ . '/auth.php';
