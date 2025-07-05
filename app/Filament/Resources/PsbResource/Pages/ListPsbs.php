<?php

namespace App\Filament\Resources\PsbResource\Pages;

use App\Filament\Resources\PsbResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPsbs extends ListRecords
{
    protected static string $resource = PsbResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
