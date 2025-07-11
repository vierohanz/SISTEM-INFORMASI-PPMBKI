<?php

namespace App\Filament\Resources\PendaftaranEventDivisiResource\Pages;

use App\Filament\Resources\PendaftaranEventDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class CreatePendaftaranEventDivisi extends CreateRecord
{
    protected static string $resource = PendaftaranEventDivisiResource::class;

    protected function afterCreate(): void
    {
        $recipient = Auth::user();
        Notification::make()
            ->title('Pendaftaran Event berhasil dibuat.')
            ->body("Pendaftaran event \"{$this->record->event->judul}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
            ->success()
            ->sendToDatabase($recipient);
    }
    protected function handleRecordCreationFailure(\Throwable $exception): void
    {
        Notification::make()
            ->title('Gagal menyimpan Pendaftaran Event')
            ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
            ->danger()
            ->persistent()
            ->send();
    }
}
