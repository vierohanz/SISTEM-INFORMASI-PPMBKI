<?php

use App\Http\Controllers\ArticleCommentController;
use App\Http\Controllers\ArtikelController;
use App\Http\Controllers\EventCommentController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PSBController;
use App\Http\Controllers\TamuController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Article
Route::get('/article', [ArtikelController::class, 'index'])->name('article.index');
Route::get('/article/latest', [ArtikelController::class, 'latest'])->name('article.latest');
Route::get('/article/{id}', [ArtikelController::class, 'showAsId'])->name('article.show');
Route::get('/article/{id}/comments', [ArticleCommentController::class, 'index']);
Route::get('/article/comments/{id}', [ArticleCommentController::class, 'show']);
Route::post('/article/{id}/comments', [ArticleCommentController::class, 'store']);
//Event
Route::get('/event', [EventController::class, 'index'])->name('event.index');
Route::get('/event/latest', [EventController::class, 'latest'])->name('event.latest');
Route::get('/event/{id}', [EventController::class, 'showAsId'])->name('event.show');
Route::get('/event/{id}/comments', [EventCommentController::class, 'index']);
Route::get('/event/comments/{id}', [EventCommentController::class, 'show']);
Route::post('/event/{id}/comments', [EventCommentController::class, 'store']);


//PSB
Route::get('/psb', [PSBController::class, 'index'])->name('psb.index');
Route::get('/psb/latest', [PSBController::class, 'latest'])->name('psb.latest');
Route::get('/psb/{id}', [PSBController::class, 'showAsId'])->name('psb.show');
Route::post('/psb/{id}/pendaftaran', [PSBController::class, 'storePendaftaran']);

//Layanan Tamu
Route::get('/tamu', [TamuController::class, 'index'])->name('tamu.index');
Route::get('/tamu/{id}', [TamuController::class, 'show'])->name('tamu.show');
Route::post('/tamu/{id}/booking', [TamuController::class, 'store'])->name('booking.store');
