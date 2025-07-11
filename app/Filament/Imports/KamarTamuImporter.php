<?php

namespace App\Filament\Imports;

use App\Models\KamarTamu;
use App\Models\layanan_tamu;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;

class KamarTamuImporter extends Importer
{
    protected static ?string $model = layanan_tamu::class;

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('nama')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('kapasitas')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('deskripsi')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('status')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
        ];
    }

    public function resolveRecord(): ?layanan_tamu
    {
        // return KamarTamu::firstOrNew([
        //     // Update existing records, matching them by `$this->data['column_name']`
        //     'email' => $this->data['email'],
        // ]);

        return new layanan_tamu();
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = 'Your kamar tamu import has completed and ' . number_format($import->successful_rows) . ' ' . str('row')->plural($import->successful_rows) . ' imported.';

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to import.';
        }

        return $body;
    }
}
