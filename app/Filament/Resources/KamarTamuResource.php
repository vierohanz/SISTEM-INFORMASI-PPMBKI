<?php

namespace App\Filament\Resources;

use App\Filament\Exports\KamarTamuExporter;
use App\Filament\Imports\KamarTamuImporter;
use App\Filament\Resources\KamarTamuResource\Pages;
use App\Filament\Resources\KamarTamuResource\RelationManagers;
use App\Models\KamarTamu;
use App\Models\layanan_tamu;
use Filament\Tables\Actions\ImportAction;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ExportAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class KamarTamuResource extends Resource
{
    protected static ?string $model = layanan_tamu::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-library';
    protected static ?string $navigationGroup = 'LAYANAN TAMU';
    protected static ?string $pluralLabel = 'Kamar Tamu';
    protected static ?string $label = 'Kamar Tamu';
    protected static ?string $slug = 'kamar tamu';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Kamar')
                    ->description('Masukkan informasi detail mengenai kamar tamu.')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('nama')
                                    ->label('Nama kamar')
                                    ->unique('layanan_tamu', 'nama', ignoreRecord: true)
                                    ->validationMessages([
                                        'required' => 'Nama kamar wajib diisi.',
                                        'unique' => 'Nama kamar ini sudah digunakan. Silakan gunakan Divisi lain.',
                                    ])
                                    ->required(),

                                TextInput::make('kapasitas')
                                    ->label('Kapasitas')
                                    ->numeric()
                                    ->validationMessages([
                                        'required' => 'Kapasitas wajib diisi.',
                                    ])
                                    ->required(),

                                ToggleButtons::make('status')
                                    ->inline()
                                    ->options([
                                        'Aktif' => 'Aktif',
                                        'Tidak Aktif' => 'Tidak aktif',
                                    ])
                                    ->label('Status')
                                    ->required(),
                                Textarea::make('deskripsi')
                                    ->label('Deskripsi')
                                    ->minLength(2)
                                    ->maxLength(225)
                                    ->validationMessages([
                                        'required' => 'Deskripsi wajib diisi.',
                                        'max' => 'Deskripsi tidak boleh lebih dari 255 karakter.',
                                        'maxLength' => 'Deskripsi maksimal 255 karakter.',
                                    ])
                                    ->required(),
                            ]),
                    ]),


                // Section::make('Foto Kamar')
                //     ->description('Unggah gambar kamar yang sesuai.')
                //     ->schema([
                //         FileUpload::make('foto')
                //             ->image()
                //             ->disk('public')
                //             ->maxSize(1000)
                //             ->visibility('public')
                //             ->reorderable()
                //             ->imageEditor()
                //             ->imageEditorAspectRatios([
                //                 '16:9',
                //                 '4:3',
                //                 '1:1',
                //             ]),
                //     ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            // ->headerActions([
            //     ImportAction::make()
            //         ->importer(KamarTamuImporter::class),
            //     ExportAction::make()
            //         ->exporter(KamarTamuExporter::class)
            // ])
            ->columns([
                // ImageColumn::make('foto')
                //     ->disk('public')
                //     ->size(120)
                //     ->square()
                //     ->defaultImageUrl(asset('images/default.png'))
                //     ->toggleable()
                //     ->stacked()
                //     ->extraImgAttributes(['style' => 'aspect-ratio: 1 / 1; object-fit: cover; border-radius: 0']),
                TextColumn::make('nama')
                    ->label('Nama kamar')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('kapasitas')
                    ->label('Kapasitas')
                    ->searchable()
                    ->toggleable()
                    ->wrap(),
                TextColumn::make('status')
                    ->label('Status')
                    ->searchable()
                    ->toggleable()
                    ->wrap()
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'Aktif' => 'success',
                        'Tidak Aktif' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('deskripsi')
                    ->label('Deskripsi')
                    ->searchable()
                    ->toggleable()
                    ->wrap(),

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
            'index' => Pages\ListKamarTamus::route('/'),
            'create' => Pages\CreateKamarTamu::route('/create'),
            'edit' => Pages\EditKamarTamu::route('/{record}/edit'),
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
