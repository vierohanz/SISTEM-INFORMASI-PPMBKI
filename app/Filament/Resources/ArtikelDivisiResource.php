<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ArtikelDivisiResource\Pages;
use App\Filament\Resources\ArtikelDivisiResource\RelationManagers;
use App\Models\artikel_divisi;
use App\Models\ArtikelDivisi;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Support\Enums\FontWeight;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Tables\Columns\Layout\Stack;
use Filament\Tables\Columns\Layout\Split;
use Filament\Tables\Columns\Layout\Panel;
use Filament\Tables\Actions\Action;

class ArtikelDivisiResource extends Resource
{
    protected static ?string $model = artikel_divisi::class;
    protected static ?string $navigationIcon = 'heroicon-o-book-open';
    protected static ?string $navigationGroup = 'ARTIKEL';
    protected static ?string $pluralLabel = 'Artikel Divisi';
    protected static ?string $label = 'Artikel Divisi';
    protected static ?string $slug = 'artikel divisi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Divisi')
                    ->schema([
                        Select::make('id_divisi')
                            ->label('Divisi')
                            ->relationship(
                                name: 'divisi',
                                titleAttribute: 'nama_divisi',
                            )
                            ->required()
                            ->live(),
                    ]),

                Section::make('Informasi Umum')
                    ->schema([
                        TextInput::make('judul')
                            ->label('Judul')
                            ->required(),
                        FileUpload::make('foto')
                            ->label('Foto')
                            ->directory('uploads/foto')
                            ->image()
                            ->multiple()
                            ->maxSize(1000)
                            ->reorderable()
                            ->required(),
                        DatePicker::make('tanggal_upload')
                            ->label('Tanggal Upload')
                            ->required(),
                        Textarea::make('deskripsi')
                            ->label('Deskripsi')
                            ->rows(10)
                            ->cols(20)
                            ->required(),
                    ]),

                // Section::make('Detail Tambahan')
                //     ->schema([

                //         TextInput::make('komentar')
                //             ->label('Komentar'),
                //     ]),
            ])
            ->columns(1);
    }



    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Stack::make([
                    // Gambar thumbnail (hanya tampil jika ada)
                    ImageColumn::make('foto')
                        ->label('')
                        ->getStateUsing(fn($record) => is_array($record->foto) ? $record->foto[0] : $record->foto)
                        ->disk('public')
                        ->height(180)
                        ->width('100%')
                        ->extraImgAttributes(['class' => 'rounded-t-xl object-cover w-full h-40']),

                    // Title dan URL
                    Stack::make([
                        TextColumn::make('judul')
                            ->weight(FontWeight::Bold)
                            ->wrap()
                            ->limit(40),

                        TextColumn::make('divisi.nama_divisi')
                            ->color('gray')
                            ->limit(40),

                        TextColumn::make('deskripsi')
                            ->color('gray')
                            ->size('sm')
                            ->limit(50)
                            ->wrap(),
                    ])
                ])->space(3),
            ])
            ->filters([])
            ->paginated([6, 12, 24, 'all'])
            ->contentGrid([
                'md' => 2,
                'xl' => 3,
            ])
            ->actions([
                Action::make('visit')
                    ->label('Visit link')
                    ->icon('heroicon-o-link')
                    ->color('gray')
                    ->url(fn($record) => '#'),

                Tables\Actions\EditAction::make()
                    ->label('Edit')
                    ->icon('heroicon-o-pencil')
                    ->color('warning'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListArtikelDivisis::route('/'),
            'create' => Pages\CreateArtikelDivisi::route('/create'),
            'edit' => Pages\EditArtikelDivisi::route('/{record}/edit'),
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
