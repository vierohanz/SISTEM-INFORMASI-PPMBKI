<?php

namespace App\Filament\Exports;

use App\Models\pendaftaran_psb;
use App\Models\PendaftaranPsb;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class PendaftaranPsbExporter extends Exporter
{
    protected static ?string $model = pendaftaran_psb::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('psb.judul')->label('PSB'),

            ExportColumn::make('nama_lengkap'),
            ExportColumn::make('nama_panggilan'),
            ExportColumn::make('email'),
            ExportColumn::make('kota_lahir'),
            ExportColumn::make('tanggal_lahir'),
            ExportColumn::make('kota'),
            ExportColumn::make('jenis_kelamin'),
            ExportColumn::make('phone'),

            ExportColumn::make('anak_keberapa'),
            ExportColumn::make('jumlah_saudara'),
            ExportColumn::make('tempat_tinggal'),
            ExportColumn::make('pos'),

            ExportColumn::make('nama_ayah'),
            ExportColumn::make('phone_ayah'),
            ExportColumn::make('nama_ibu'),
            ExportColumn::make('phone_ibu'),
            ExportColumn::make('nama_wali')->label('Wali'),
            ExportColumn::make('phone_wali')->label('HP Wali'),

            ExportColumn::make('kampus'),
            ExportColumn::make('jurusan'),
            ExportColumn::make('angkatan'),
            ExportColumn::make('beasiswa'),

            ExportColumn::make('bawa_kendaraan'),
            ExportColumn::make('kendaraan'),

            ExportColumn::make('golongan_darah'),
            ExportColumn::make('tinggi_badan'),
            ExportColumn::make('berat_badan'),

            ExportColumn::make('bakat'),
            ExportColumn::make('pengalaman_sekolah'),

            ExportColumn::make('created_at')->label('Dibuat'),
            ExportColumn::make('updated_at')->label('Diperbarui'),
        ];
    }


    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your pendaftaran psb export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
