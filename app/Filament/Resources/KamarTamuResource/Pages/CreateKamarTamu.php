<?php

namespace App\Filament\Resources\KamarTamuResource\Pages;

use App\Filament\Resources\KamarTamuResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class CreateKamarTamu extends CreateRecord
{
    protected static string $resource = KamarTamuResource::class;

    protected function afterCreate(): void
    {
        $recipient = Auth::user();
        Notification::make()
            ->title('Kamar Tamu berhasil dibuat.')
            ->body("Ruang \"{$this->record->nama}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
            ->success()
            ->sendToDatabase($recipient);
    }
    protected function handleRecordCreationFailure(\Throwable $exception): void
    {
        Notification::make()
            ->title('Gagal menyimpan Kamar Tamu')
            ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
            ->danger()
            ->persistent()
            ->send();
    }
}
