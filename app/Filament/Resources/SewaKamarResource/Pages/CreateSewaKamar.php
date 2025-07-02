<?php

namespace App\Filament\Resources\SewaKamarResource\Pages;

use App\Filament\Resources\SewaKamarResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class CreateSewaKamar extends CreateRecord
{
    protected static string $resource = SewaKamarResource::class;
    protected function afterCreate(): void
    {
        $recipient = Auth::user();
        Notification::make()
            ->title('Sewa kamar berhasil dibuat.')
            ->body("Sewa kamar oleh \"{$this->record->nama_tamu}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
            ->success()
            ->sendToDatabase($recipient);
    }
    protected function handleRecordCreationFailure(\Throwable $exception): void
    {
        Notification::make()
            ->title('Gagal menyimpan penyewa kamar')
            ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
            ->danger()
            ->persistent()
            ->send();
    }
}
