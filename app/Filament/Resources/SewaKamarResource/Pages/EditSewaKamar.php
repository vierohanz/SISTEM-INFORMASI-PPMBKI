<?php

namespace App\Filament\Resources\SewaKamarResource\Pages;

use App\Filament\Resources\SewaKamarResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class EditSewaKamar extends EditRecord
{
    protected static string $resource = SewaKamarResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
            Actions\ForceDeleteAction::make(),
            Actions\RestoreAction::make(),
        ];
    }
    // protected function afterSave(): void
    // {
    //     $recipient = Auth::user();
    //     Notification::make()
    //         ->title('Sewa kamar berhasil diubah.')
    //         ->body('Data sewa kamar telah berhasil diubah ke dalam sistem.')
    //         ->success()
    //         ->sendToDatabase($recipient);
    // }
}
