<?php

namespace App\Filament\Resources\PsbResource\Pages;

use App\Filament\Resources\PsbResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditPsb extends EditRecord
{
    protected static string $resource = PsbResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
}
