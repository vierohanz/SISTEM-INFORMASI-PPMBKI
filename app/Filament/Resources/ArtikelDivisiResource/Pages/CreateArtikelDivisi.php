<?php

namespace App\Filament\Resources\ArtikelDivisiResource\Pages;

use App\Filament\Resources\ArtikelDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class CreateArtikelDivisi extends CreateRecord
{
    protected static string $resource = ArtikelDivisiResource::class;

    // protected function afterCreate(): void
    // {
    //     $recipient = Auth::user();
    //     Notification::make()
    //         ->title('Artikel Divisi berhasil dibuat.')
    //         ->body("Artikel \"{$this->record->judul}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
    //         ->success()
    //         ->sendToDatabase($recipient);
    // }
    // protected function handleRecordCreationFailure(\Throwable $exception): void
    // {
    //     Notification::make()
    //         ->title('Gagal menyimpan Artikel')
    //         ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
    //         ->danger()
    //         ->persistent()
    //         ->send();
    // }
}
