<?php

namespace App\Filament\Resources\PendaftaranPsbResource\Pages;

use App\Filament\Resources\PendaftaranPsbResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPendaftaranPsbs extends ListRecords
{
    protected static string $resource = PendaftaranPsbResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
