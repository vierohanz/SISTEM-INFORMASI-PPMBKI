<?php

namespace App\Filament\Resources\DivisiResource\Pages;

use App\Filament\Resources\DivisiResource;
use Filament\Actions;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;

class CreateDivisi extends CreateRecord
{
    protected static string $resource = DivisiResource::class;
    protected function afterCreate(): void
    {
        $recipient = Auth::user();
        Notification::make()
            ->title('Divisi berhasil dibuat.')
            ->body("Divisi \"{$this->record->nama_divisi}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
            ->success()
            ->sendToDatabase($recipient);
    }
    // protected function handleRecordCreationFailure(\Throwable $exception): void
    // {
    //     Notification::make()
    //         ->title('Gagal menyimpan divisi')
    //         ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
    //         ->danger()
    //         ->persistent()
    //         ->send();
    // }
}
