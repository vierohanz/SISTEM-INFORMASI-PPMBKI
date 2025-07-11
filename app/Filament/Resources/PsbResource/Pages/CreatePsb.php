<?php

namespace App\Filament\Resources\PsbResource\Pages;

use App\Filament\Resources\PsbResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification;

class CreatePsb extends CreateRecord
{
    protected static string $resource = PsbResource::class;

    // protected function afterCreate(): void
    // {
    //     $recipient = Auth::user();
    //     Notification::make()
    //         ->title('PSB berhasil dibuat.')
    //         ->body("PSB \"{$this->record->tahun}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
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
