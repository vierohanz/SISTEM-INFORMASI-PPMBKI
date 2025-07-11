<?php

namespace App\Filament\Resources\SewaKamarResource\Pages;

use App\Filament\Resources\SewaKamarResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CreateSewaKamar extends CreateRecord
{
    protected static string $resource = SewaKamarResource::class;
    protected function afterCreate(): void
    {
        $record = $this->record; // Ini adalah model Booking yang baru saja disimpan

        $layanan = $record->layanan_tamu; // relasi model

        $pesan = "Assalamu'alaikum Warahmatullahi Wabarakatuh,\n\nYth. Bapak/Ibu {$record->nama_tamu},\n\nJaza Kummulahukhoira telah melakukan pemesanan layanan tamu *{$layanan->nama}*. Permintaan kunjungan Anda telah kami terima untuk tanggal {$record->tanggal_datang} sampai {$record->tanggal_keluar}.\n\nKami akan menghubungi Anda kembali setelah proses verifikasi selesai.\n\nUntuk cek status atau informasi lebih lanjut, silakan kunjungi:\nhttps://ppmbki.ponpes.id\n\nWassalamu'alaikum Warahmatullahi Wabarakatuh.";

        $waResult = app(\App\Http\Controllers\TamuController::class)->sendWhatsappNotification($record->phone, $pesan);

        if ($waResult['status'] ?? false) {
            Log::info('✅ WA terkirim dari CreateBooking', [
                'to' => $record->phone,
                'nama' => $record->nama_tamu,
            ]);
        } else {
            Log::warning('⚠️ WA gagal dikirim dari CreateBooking', [
                'to' => $record->phone,
                'nama' => $record->nama_tamu,
                'reason' => $waResult['reason'] ?? 'Unknown',
            ]);
        }
        $recipient = Auth::user();
        if ($recipient) {
            Notification::make()
                ->title('Sewa kamar berhasil dibuat.')
                ->body("Sewa kamar oleh \"{$this->record->nama_tamu}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
                ->success()
                ->sendToDatabase($recipient);
        } else {
            Log::warning('User tidak terautentikasi saat akan mengirim notifikasi database.');
        }
    }
    // protected function afterCreate(): void
    // {
    //     $recipient = Auth::user();
    //     Notification::make()
    //         ->title('Sewa kamar berhasil dibuat.')
    //         ->body("Sewa kamar oleh \"{$this->record->nama_tamu}\" telah berhasil disimpan ke dalam sistem. Silakan cek kembali jika diperlukan.")
    //         ->success()
    //         ->sendToDatabase($recipient);
    // }
    // protected function handleRecordCreationFailure(\Throwable $exception): void
    // {
    //     Notification::make()
    //         ->title('Gagal menyimpan penyewa kamar')
    //         ->body('Terjadi kesalahan saat menyimpan data: ' . $exception->getMessage())
    //         ->danger()
    //         ->persistent()
    //         ->send();
    // }
}
