<?php

namespace App\Filament\Resources\KomentarArtikelResource\Pages;

use App\Filament\Resources\KomentarArtikelResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditKomentarArtikel extends EditRecord
{
    protected static string $resource = KomentarArtikelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
