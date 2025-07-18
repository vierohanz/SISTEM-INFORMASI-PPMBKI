<?php

namespace App\Filament\Imports;

use App\Models\Divisi;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;

class DivisiImporter extends Importer
{
    protected static ?string $model = Divisi::class;

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('foto')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('nama_divisi')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
            ImportColumn::make('deskripsi')
                ->requiredMapping()
                ->rules(['required', 'max:255']),
        ];
    }

    public function resolveRecord(): ?Divisi
    {
        // return Divisi::firstOrNew([
        //     // Update existing records, matching them by `$this->data['column_name']`
        //     'email' => $this->data['email'],
        // ]);

        return new Divisi();
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = 'Your divisi import has completed and ' . number_format($import->successful_rows) . ' ' . str('row')->plural($import->successful_rows) . ' imported.';

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= ' ' . number_format($failedRowsCount) . ' ' . str('row')->plural($failedRowsCount) . ' failed to import.';
        }

        return $body;
    }
}
