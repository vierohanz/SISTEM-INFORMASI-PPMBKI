<?php

namespace App\Filament\Resources\EventDivisiResource\Pages;

use App\Filament\Resources\EventDivisiResource;
use Filament\Actions;

use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Auth;
use Filament\Notifications\Notification;

class CreateEventDivisi extends CreateRecord
{
    protected static string $resource = EventDivisiResource::class;


    protected function afterCreate(): void
    {
        $recipient = Auth::user();

        // Simpan notifikasi ke database
        Notification::make()
            ->title('Event divisi berhasil dibuat.')
            ->body("Divisi \"{$this->record->nama_divisi}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
            ->success()
            ->sendToDatabase($recipient);

        // Cetak ke console / log file
        logger()->info('[NOTIFIKASI FILAMENT]', [
            'to' => $recipient?->email ?? 'anonymous',
            'title' => 'Event divisi berhasil dibuat.',
            'body' => "Divisi \"{$this->record->nama_divisi}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.",
        ]);
    }
}
