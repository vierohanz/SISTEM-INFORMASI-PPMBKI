<?php

namespace App\Filament\Resources\PendaftaranPsbResource\Pages;

use App\Filament\Resources\PendaftaranPsbResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class EditPendaftaranPsb extends EditRecord
{
    protected static string $resource = PendaftaranPsbResource::class;

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
            ->title('Pendaftaran PSB berhasil diubah.')
            ->body('Data Pendaftaran PSB telah berhasil diubah ke dalam sistem.')
            ->success()
            ->sendToDatabase($recipient);
    }
}
