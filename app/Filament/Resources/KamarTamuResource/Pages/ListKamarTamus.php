<?php

namespace App\Filament\Resources\KamarTamuResource\Pages;

use App\Filament\Resources\KamarTamuResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListKamarTamus extends ListRecords
{
    protected static string $resource = KamarTamuResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
