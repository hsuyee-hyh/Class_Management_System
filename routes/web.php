
<?php
require __DIR__ . '/auth.php';

use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Home/Home');
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


// profile
Route::middleware('auth')->group(function () {
    Route::get('/profile/edit-password', [PasswordController::class, 'edit'])->name('profile.editPassword');
    Route::patch('/profile/edit-password', [PasswordController::class, 'update'])->name('profile.updatePassword');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// course
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/course', [CourseController::class, 'select'])->name('course');
    Route::get('/course/create', [CourseController::class, 'create'])->name('course.create');
    Route::post('/course/create', [CourseController::class, 'store'])->name('course.store');
    Route::get('/course/search', [CourseController::class, 'search'])->name('course.search');
    Route::get('course/show/{id}', [CourseController::class, 'show'])->name('course.show');
    Route::post('course/show/{id}', [ModuleController::class, 'store'])->name('course.module.store');

    Route::get('/course/module/create', [ModuleController::class, 'create'])->name('course.module.create');
    Route::post('/course/module/upload-video', [ModuleController::class, 'uploadVideo'])
        ->name('course.module.uploadVideo');
    Route::post('/course/module/upload-presentation', [ModuleController::class, 'uploadPresentation'])
        ->name('course.module.uploadPresentation');

});
// Route::post('/course', [ModuleController::class, 'store'])
// ->middleware(['auth', 'verified'])
// ->name('course.module.store');

    





