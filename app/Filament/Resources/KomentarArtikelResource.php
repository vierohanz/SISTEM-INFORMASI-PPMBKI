<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KomentarArtikelResource\Pages;
use App\Filament\Resources\KomentarArtikelResource\RelationManagers;
use App\Models\komentar_artikel;
use App\Models\KomentarArtikel;
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

class KomentarArtikelResource extends Resource
{
    protected static ?string $model = komentar_artikel::class;
    // protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-bottom-center-text';
    protected static ?string $navigationGroup = 'ARTIKEL';
    protected static ?string $pluralLabel = 'Komentar Artikel';
    protected static ?string $label = 'Komentar Artikel';
    protected static ?string $slug = 'komentar artikel';
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Pilih Artikel')
                    ->schema([
                        Select::make('id_artikel_divisi')
                            ->label('Artikel Divisi')
                            ->relationship(
                                name: 'artikel_divisi',
                                titleAttribute: 'judul',
                            )
                            ->native(false)
                            ->required()
                            ->reactive(), // <-- penting
                    ]),

                Section::make('Komentar')
                    ->schema([
                        Select::make('id_parent')
                            ->label('Balasan dari Komentar')
                            ->options(function (callable $get) {
                                $artikelId = $get('id_artikel_divisi');

                                if (!$artikelId) {
                                    return [];
                                }

                                return komentar_artikel::where('id_artikel_divisi', $artikelId)
                                    ->whereNull('id_parent')
                                    ->pluck('konten', 'id');
                            })
                            ->native(false)
                            ->placeholder('Kosongkan jika ini komentar utama')
                            ->searchable()
                            ->reactive(),

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
                TextColumn::make('artikel_divisi.divisi.nama_divisi')
                    ->label('Divisi')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('artikel_divisi.judul')
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
            'index' => Pages\ListKomentarArtikels::route('/'),
            'create' => Pages\CreateKomentarArtikel::route('/create'),
            'edit' => Pages\EditKomentarArtikel::route('/{record}/edit'),
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
