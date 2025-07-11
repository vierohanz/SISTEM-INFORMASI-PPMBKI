<?php

namespace App\Filament\Resources\PendaftaranEventDivisiResource\Pages;

use App\Filament\Resources\PendaftaranEventDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class EditPendaftaranEventDivisi extends EditRecord
{
    protected static string $resource = PendaftaranEventDivisiResource::class;

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
            ->title('Pendaftaran Event berhasil diubah.')
            ->body('Data Pendaftaran Event telah berhasil diubah ke dalam sistem.')
            ->success()
            ->sendToDatabase($recipient);
    }
}
