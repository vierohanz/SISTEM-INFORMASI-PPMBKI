<?php

namespace App\Filament\Imports;

use App\Models\Booking;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;

class BookingImporter extends Importer
{
    protected static ?string $model = Booking::class;

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('id_layanan_tamu')
                ->requiredMapping()
                ->numeric()
                ->rules(['required', 'integer']),
            ImportColumn::make('nama_tamu')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('phone')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('tanggal_datang')
                ->requiredMapping()
                ->rules(['required', 'date']),
            ImportColumn::make('tanggal_keluar')
                ->requiredMapping()
                ->rules(['required', 'date']),
            ImportColumn::make('kuantitas')
                ->requiredMapping()
                ->numeric()
                ->rules(['required', 'integer']),
            ImportColumn::make('deskripsi')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('status')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
        ];
    }

    public function resolveRecord(): ?Booking
    {
        // return Booking::firstOrNew([
        //     // Update existing records, matching them by `$this->data['column_name']`
        //     'email' => $this->data['email'],
        // ]);

        return new Booking();
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = 'Your booking import has completed and ' . number_format($import->successful_rows) . ' ' . str('row')->plural($import->successful_rows) . ' imported.';

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to import.';
        }

        return $body;
    }
}
