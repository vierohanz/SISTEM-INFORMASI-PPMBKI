<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventDivisiResource\Pages;
use App\Filament\Resources\EventDivisiResource\RelationManagers;
use App\Models\divisi;
use App\Models\event;
use App\Models\EventDivisi;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

use Filament\Tables\Columns\Layout\Stack;
use Filament\Support\Enums\FontWeight;
use Filament\Tables\Actions\Action;
use Filament\Tables\Filters\TrashedFilter;

class EventDivisiResource extends Resource
{
    protected static ?string $model = event::class;
    protected static ?string $navigationIcon = 'heroicon-o-window';
    protected static ?string $navigationGroup = 'EVENT';
    protected static ?string $pluralLabel = 'Event Divisi';
    protected static ?string $label = 'Event Divisi';
    protected static ?string $slug = 'event divisi';

    public static function form(Form $form): Form
    {
        return $form

            ->schema([
                Select::make('id_divisi')
                    ->label('Divisi')
                    ->native(false)
                    ->relationship(
                        name: 'divisi',
                        titleAttribute: 'nama_divisi',
                    )
                    ->required()
                    ->searchable()
                    ->preload(),

                TextInput::make('judul')
                    ->label('Judul')
                    ->required(),

                // FileUpload::make('foto')
                //     ->label('Foto')
                //     ->maxSize(1000)
                //     ->maxFiles(3)
                //     ->directory('uploads/foto')
                //     ->image()
                //     ->multiple()
                //     ->reorderable()
                //     ->required(),

                DatePicker::make('tanggal_upload')
                    ->label('Tanggal Upload')
                    ->required(),

                ToggleButtons::make('status')
                    ->label('Status')
                    ->inline()
                    ->required()
                    ->options([
                        'Aktif' => 'Aktif',
                        'Tidak Aktif' => 'Tidak Aktif',
                    ])
                    ->colors([
                        'Aktif' => 'success',
                        'Tidak Aktif' => 'danger',
                    ]),

                Textarea::make('deskripsi')
                    ->label('Deskripsi')
                    ->rows(10)
                    ->cols(20)
                    ->required(),

                TextInput::make('tahun')
                    ->label('Tahun')
                    ->numeric()
                    ->required(),
            ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Stack::make([
                    // Gambar Utama
                    ImageColumn::make('foto')
                        ->label('')
                        ->getStateUsing(fn($record) => is_array($record->foto) ? $record->foto[0] : $record->foto)
                        ->disk('public')
                        ->height(180)
                        ->width('100%')
                        ->extraImgAttributes(['class' => 'rounded-t-xl object-cover w-full h-40']),

                    // Konten Informasi
                    Stack::make([
                        TextColumn::make('judul')
                            ->weight(FontWeight::Bold)
                            ->wrap()
                            ->limit(50)
                            ->label('Judul'),

                        TextColumn::make('divisi.nama_divisi')
                            ->label('Nama Divisi')
                            ->color('gray')
                            ->limit(40)
                            ->searchable()
                            ->sortable(),

                        TextColumn::make('deskripsi')
                            ->label('Deskripsi')
                            ->color('gray')
                            ->size('sm')
                            ->limit(100)
                            ->tooltip(fn($record) => $record->deskripsi)
                            ->wrap()
                            ->searchable(),
                        TextColumn::make('tahun')
                            ->label('Tahun')
                            ->size('sm')
                            ->color('gray')
                            ->wrap()
                            ->sortable()
                            ->searchable(),

                        TextColumn::make('status')
                            ->label('Status')
                            ->badge()
                            ->wrap()
                            ->searchable()
                            ->color(fn(string $state): string => match ($state) {
                                'Aktif' => 'success',
                                'Tidak Aktif' => 'danger',
                                default => 'gray',
                            }),
                    ])->space(1),
                ])->space(3),
            ])
            ->contentGrid([
                'md' => 2,
                'xl' => 3,
            ])
            ->paginated([6, 12, 24, 'all'])
            ->filters([
                TrashedFilter::make(),
                SelectFilter::make('tahun')
                    ->label('Filter Tahun')
                    ->options(
                        fn() => event::select('tahun')
                            ->distinct()
                            ->orderByDesc('tahun')
                            ->limit(10)
                            ->pluck('tahun', 'tahun')
                    )
                    ->native(false),
                SelectFilter::make('divisi_id')
                    ->label('Filter Divisi')
                    ->relationship('divisi', 'nama_divisi')
                    ->searchable()
                    ->preload(false) // biar gak langsung load semua
                    ->native(false)
            ])
            ->actions([
                Action::make('visit')
                    ->label('Visit')
                    ->icon('heroicon-o-eye')
                    ->color('gray')
                    ->url(fn($record) => '#'),

                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListEventDivisis::route('/'),
            'create' => Pages\CreateEventDivisi::route('/create'),
            'edit' => Pages\EditEventDivisi::route('/{record}/edit'),
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
