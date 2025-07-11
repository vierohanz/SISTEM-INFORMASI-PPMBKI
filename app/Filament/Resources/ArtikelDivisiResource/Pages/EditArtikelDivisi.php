<?php

namespace App\Filament\Resources\ArtikelDivisiResource\Pages;

use App\Filament\Resources\ArtikelDivisiResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

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

    protected function afterSave(): void
    {
        $recipient = Auth::user();
        Notification::make()
            ->title('Artikel berhasil diubah.')
            ->body('Data Artikel telah berhasil diubah ke dalam sistem.')
            ->success()
            ->sendToDatabase($recipient);
    }
}
