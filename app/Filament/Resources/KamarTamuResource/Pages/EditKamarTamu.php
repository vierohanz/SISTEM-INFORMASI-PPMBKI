<?php

namespace App\Filament\Resources\KamarTamuResource\Pages;

use App\Filament\Resources\KamarTamuResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class EditKamarTamu extends EditRecord
{
    protected static string $resource = KamarTamuResource::class;
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
            ->title('Kamar Tamu berhasil diubah.')
            ->body('Data Kamar Tamu telah berhasil diubah ke dalam sistem.')
            ->success()
            ->sendToDatabase($recipient);
    }
}
