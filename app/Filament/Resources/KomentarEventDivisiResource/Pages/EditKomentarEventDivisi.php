<?php

namespace App\Filament\Resources\KomentarEventDivisiResource\Pages;

use App\Filament\Resources\KomentarEventDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKomentarEventDivisi extends EditRecord
{
    protected static string $resource = KomentarEventDivisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
