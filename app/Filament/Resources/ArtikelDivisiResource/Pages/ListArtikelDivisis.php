<?php

namespace App\Filament\Resources\ArtikelDivisiResource\Pages;

use App\Filament\Resources\ArtikelDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListArtikelDivisis extends ListRecords
{
    protected static string $resource = ArtikelDivisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
