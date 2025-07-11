<?php

namespace App\Filament\Resources\PendaftaranPsbResource\Pages;

use App\Filament\Resources\PendaftaranPsbResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification;

class CreatePendaftaranPsb extends CreateRecord
{
    protected static string $resource = PendaftaranPsbResource::class;
    // protected function afterCreate(): void
    // {
    //     $recipient = Auth::user();
    //     Notification::make()
    //         ->title('Pendaftaran PSB berhasil dibuat.')
    //         ->body("Pendaftaran PSB \"{$this->record->tahun}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
    //         ->success()
    //         ->sendToDatabase($recipient);
    // }
    // protected function handleRecordCreationFailure(\Throwable $exception): void
    // {
    //     Notification::make()
    //         ->title('Gagal menyimpan PSB')
    //         ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
    //         ->danger()
    //         ->persistent()
    //         ->send();
    // }
}
