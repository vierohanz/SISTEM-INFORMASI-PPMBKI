<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\PSBController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return inertia::render('Index');
});

Route::get('/{any}', function () {
    return Inertia::render('Index');
})->where('any', '.*');

Route::get('/memory-limit', function () {
    return ini_get('memory_limit');
});

// //Article
// Route::get('/article', [ArtikelController::class, 'index'])->name('article.index');
// Route::get('/article/latest', [ArtikelController::class, 'latest'])->name('article.latest');
// Route::get('/article/{id}', [ArtikelController::class, 'showAsId'])->name('article.show');

// //Event
// Route::get('/event', [ArtikelController::class, 'index'])->name('event.index');
// Route::get('/event/latest', [ArtikelController::class, 'latest'])->name('event.latest');
// Route::get('/event/{id}', [ArtikelController::class, 'showAsId'])->name('event.show');

// //PSB
// Route::get('/psb', [PSBController::class, 'index'])->name('psb.index');
// Route::get('/psb/latest', [PSBController::class, 'latest'])->name('psb.latest');
// Route::get('/psb/{id}', [PSBController::class, 'showAsId'])->name('psb.show');
// Route::post('/psb/{id}/pendaftaran', [PsbController::class, 'storePendaftaran'])->name('psb.pendaftaran');
