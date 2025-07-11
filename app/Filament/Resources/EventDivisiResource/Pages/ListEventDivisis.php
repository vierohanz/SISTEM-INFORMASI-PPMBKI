<?php

namespace App\Filament\Resources\EventDivisiResource\Pages;

use App\Filament\Resources\EventDivisiResource;
use App\Filament\Widgets\EventStatusOverview;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEventDivisis extends ListRecords
{
    protected static string $resource = EventDivisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
    // protected function getHeaderWidgets(): array
    // {
    //     return [
    //         EventStatusOverview::class,

    //     ];
    // }
}
