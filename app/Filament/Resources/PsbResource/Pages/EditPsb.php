<?php

namespace App\Filament\Resources\PsbResource\Pages;

use App\Filament\Resources\PsbResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

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
    protected function afterSave(): void
    {
        $recipient = Auth::user();
        Notification::make()
            ->title('PSB berhasil diubah.')
            ->body('Data PSB telah berhasil diubah ke dalam sistem.')
            ->success()
            ->sendToDatabase($recipient);
    }
}
