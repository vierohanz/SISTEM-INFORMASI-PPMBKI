<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KomentarEventDivisiResource\Pages;
use App\Filament\Resources\KomentarEventDivisiResource\RelationManagers;
use App\Models\komentar_event;
use App\Models\KomentarEventDivisi;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class KomentarEventDivisiResource extends Resource
{
    protected static ?string $model = komentar_event::class;
    protected static ?string $navigationGroup = 'EVENT';
    protected static ?string $pluralLabel = 'Komentar Event';
    protected static ?string $label = 'Komentar Event';
    protected static ?string $slug = 'komentar event';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Pilih Event')
                    ->schema([
                        Select::make('id_event')
                            ->label('Event Divisi')
                            ->relationship(
                                name: 'event',
                                titleAttribute: 'judul',
                            )
                            ->native(false)
                            ->required()
                            ->reactive(), // Wajib agar bisa trigger perubahan
                    ]),

                Section::make('Komentar')
                    ->schema([
                        Select::make('id_parent')
                            ->label('Balasan dari Komentar')
                            ->options(function ($get) {
                                $eventId = $get('id_event');
                                if (!$eventId) return [];

                                return komentar_event::where('id_event', $eventId)
                                    ->whereNull('id_parent')
                                    ->pluck('konten', 'id');
                            })
                            ->native(false)
                            ->placeholder('Kosongkan jika ini komentar utama'),

                        TextInput::make('nama')
                            ->label('Nama')
                            ->required(),

                        Textarea::make('konten')
                            ->label('Isi Komentar')
                            ->rows(5)
                            ->required(),
                    ]),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('Id')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('event.divisi.nama_divisi')
                    ->label('Divisi')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('event.judul')
                    ->label('Judul Artikel')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('id_parent')
                    ->label('Parent')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('nama')
                    ->label('Nama')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('konten')
                    ->label('Konten')
                    ->searchable()
                    ->toggleable()
                    ->limit(100)
                    ->wrap()
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->paginated([6, 12, 24, 'all'])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\ForceDeleteBulkAction::make(),
                    Tables\Actions\RestoreBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListKomentarEventDivisis::route('/'),
            'create' => Pages\CreateKomentarEventDivisi::route('/create'),
            'edit' => Pages\EditKomentarEventDivisi::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
