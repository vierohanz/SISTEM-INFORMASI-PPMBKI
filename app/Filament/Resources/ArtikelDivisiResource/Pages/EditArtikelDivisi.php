<?php

namespace App\Filament\Resources\ArtikelDivisiResource\Pages;

use App\Filament\Resources\ArtikelDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditArtikelDivisi extends EditRecord
{
    protected static string $resource = ArtikelDivisiResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
