<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PsbResource\Pages;
use App\Filament\Resources\PsbResource\RelationManagers;
use App\Models\psb;
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
use Filament\Support\Enums\FontWeight;
use Filament\Tables;
use Filament\Tables\Actions\Action;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\Layout\Stack;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PsbResource extends Resource
{
    protected static ?string $model = psb::class;
    protected static ?string $navigationIcon = 'heroicon-o-pencil-square';
    protected static ?string $navigationGroup = 'SANTRI BARU';
    protected static ?string $pluralLabel = 'PSB';
    protected static ?string $label = 'PSB';
    protected static ?string $slug = 'psb';
    protected static ?int $navigationSort = -1;
    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Divisi')
                    ->schema([
                        Select::make('id_divisi')
                            ->label('Divisi')
                            ->native(false)
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
                    ]),

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
                Tables\Filters\TrashedFilter::make(),
                SelectFilter::make('tahun')
                    ->label('Filter Tahun')
                    ->options(
                        fn() => psb::select('tahun')
                            ->distinct()
                            ->orderByDesc('tahun')
                            ->pluck('tahun', 'tahun')
                    )
                    ->native(false),
                SelectFilter::make('divisi_id')
                    ->label('Filter Divisi')
                    ->relationship('divisi', 'nama_divisi') // relasi dan field label-nya
                    ->native(false)
            ])
            ->paginated([6, 12, 24, 'all'])
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
            'index' => Pages\ListPsbs::route('/'),
            'create' => Pages\CreatePsb::route('/create'),
            'edit' => Pages\EditPsb::route('/{record}/edit'),
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
