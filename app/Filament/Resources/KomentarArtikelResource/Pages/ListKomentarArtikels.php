<?php

namespace App\Filament\Resources\KomentarArtikelResource\Pages;

use App\Filament\Resources\KomentarArtikelResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKomentarArtikels extends ListRecords
{
    protected static string $resource = KomentarArtikelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
