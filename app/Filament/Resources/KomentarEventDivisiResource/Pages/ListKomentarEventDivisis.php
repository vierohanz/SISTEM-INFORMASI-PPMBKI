<?php

namespace App\Filament\Resources\KomentarEventDivisiResource\Pages;

use App\Filament\Resources\KomentarEventDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKomentarEventDivisis extends ListRecords
{
    protected static string $resource = KomentarEventDivisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
