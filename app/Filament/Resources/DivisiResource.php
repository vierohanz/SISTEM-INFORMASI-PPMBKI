<?php

namespace App\Filament\Resources;

use App\Filament\Exports\DivisiExporter;
use App\Filament\Imports\DivisiImporter;
use App\Filament\Resources\DivisiResource\Pages;
use App\Filament\Resources\DivisiResource\RelationManagers;
use App\Models\divisi;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ExportAction;
use Filament\Tables\Actions\ImportAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class DivisiResource extends Resource
{
    protected static ?string $model = divisi::class;
    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';
    // protected static ?string $navigationGroup = 'DEPARTEMEN';
    protected static ?string $pluralLabel = 'Divisi';
    protected static ?string $label = 'Divisi';
    protected static ?string $slug = 'divisi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(1)->schema([
                    FileUpload::make('foto')
                        ->image()
                        ->columnSpan(1)
                        ->disk('public')
                        ->imageEditor(),
                    TextInput::make('nama_divisi')
                        ->label('Divisi')
                        ->columnSpan(1)
                        ->placeholder('Masukkan nama divisi')
                        ->unique('divisi', 'nama_divisi', ignoreRecord: true)
                        ->validationMessages([
                            'required' => 'Divisi wajib diisi.',
                            'unique' => 'Divisi ini sudah digunakan. Silakan gunakan Divisi lain.',
                        ])
                        ->required(),
                ]),
                Textarea::make('deskripsi')
                    ->minLength(2)
                    ->maxLength(225)
                    ->columnSpanFull()
                    ->validationMessages([
                        'required' => 'Deskripsi wajib diisi.',
                        'max' => 'Deskripsi tidak boleh lebih dari 255 karakter.',
                        'maxLength' => 'Deskripsi maksimal 255 karakter.',
                    ])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->headerActions([
                ImportAction::make()
                    ->importer(DivisiImporter::class),
                ExportAction::make()
                    ->exporter(DivisiExporter::class)
            ])
            ->columns([
                ImageColumn::make('foto')
                    ->disk('public')
                    ->size(120)
                    ->square()
                    ->defaultImageUrl(asset('images/default.png'))
                    ->toggleable()
                    ->extraImgAttributes(['style' => 'aspect-ratio: 1 / 1; object-fit: cover; border-radius: 0']),
                TextColumn::make('nama_divisi')
                    ->label('Divisi')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('deskripsi')
                    ->label('Deskripsi')
                    ->searchable()
                    ->toggleable()
                    ->wrap()
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
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
            'index' => Pages\ListDivisis::route('/'),
            'create' => Pages\CreateDivisi::route('/create'),
            'edit' => Pages\EditDivisi::route('/{record}/edit'),
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
