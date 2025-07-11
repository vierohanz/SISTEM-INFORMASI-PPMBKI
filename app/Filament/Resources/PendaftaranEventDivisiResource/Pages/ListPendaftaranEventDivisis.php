<?php

namespace App\Filament\Resources\PendaftaranEventDivisiResource\Pages;

use App\Filament\Resources\PendaftaranEventDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListPendaftaranEventDivisis extends ListRecords
{
    protected static string $resource = PendaftaranEventDivisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
