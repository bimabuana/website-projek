<?php
use App\Http\Controllers\DeviceControlController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Inertia Routes (UI Pages)
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::get('/controlpanel', fn () => Inertia::render('ControlPanel'))->name('controlpanel');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| API Routes (JSON responses only)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'api']) // bisa juga tambah throttle:api jika dibutuhkan
    ->prefix('api')
    ->name('api.')
    ->group(function () {
        Route::get('/current-mode', [DeviceControlController::class, 'getLatestStatus']);
        Route::post('/update-mode', [DeviceControlController::class, 'updateMode']);
        Route::post('/control-pump', [DeviceControlController::class, 'controlPump']);
        Route::post('/set-volume', [DeviceControlController::class, 'setVolumeAuto']);
    });

require __DIR__.'/auth.php';
