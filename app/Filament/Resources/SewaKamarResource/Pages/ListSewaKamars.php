<?php

namespace App\Filament\Resources\SewaKamarResource\Pages;

use App\Filament\Resources\SewaKamarResource;
use App\Filament\Widgets\CalendarWidget;
use Filament\Resources\Pages\ListRecords;
use Filament\Actions;

class ListSewaKamars extends ListRecords
{
    protected static string $resource = SewaKamarResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }

    // protected function getHeaderWidgets(): array
    // {
    //     return [
    //         CalendarWidget::class,
    //     ];
    // }
}
