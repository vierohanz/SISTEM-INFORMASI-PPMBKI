<?php

namespace App\Filament\Exports;

use App\Models\KamarTamu;
use App\Models\layanan_tamu;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;

class KamarTamuExporter extends Exporter
{
    protected static ?string $model = layanan_tamu::class;

    public static function getColumns(): array
    {
        return [
            ExportColumn::make('id')
                ->label('ID'),
            ExportColumn::make('foto'),
            ExportColumn::make('nama'),
            ExportColumn::make('kapasitas'),
            ExportColumn::make('status'),
            ExportColumn::make('deskripsi'),
            ExportColumn::make('created_at'),
            ExportColumn::make('updated_at'),
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your kamar tamu export has completed and ' . number_format($export->successful_rows) . ' ' . str('row')->plural($export->successful_rows) . ' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to export.';
        }

        return $body;
    }
}
