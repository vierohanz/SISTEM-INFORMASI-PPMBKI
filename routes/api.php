<?php

use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PSBController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


//Article
Route::get('/article', [ArtikelController::class, 'index'])->name('article.index');
Route::get('/article/latest', [ArtikelController::class, 'latest'])->name('article.latest');
Route::get('/article/{id}', [ArtikelController::class, 'showAsId'])->name('article.show');

//Event
Route::get('/event', [EventController::class, 'index'])->name('event.index');
Route::get('/event/latest', [EventController::class, 'latest'])->name('event.latest');
Route::get('/event/{id}', [EventController::class, 'showAsId'])->name('event.show');

//PSB
Route::get('/psb', [PSBController::class, 'index'])->name('psb.index');
Route::get('/psb/latest', [PSBController::class, 'latest'])->name('psb.latest');
Route::get('/psb/{id}', [PSBController::class, 'showAsId'])->name('psb.show');
Route::post('/psb/{id}/pendaftaran', [PSBController::class, 'storePendaftaran']);

//Layanan Tamu
