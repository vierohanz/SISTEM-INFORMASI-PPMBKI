<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PendaftaranEventDivisiResource\Pages;
use App\Filament\Resources\PendaftaranEventDivisiResource\RelationManagers;
use App\Models\divisi;
use App\Models\event;
use App\Models\pendaftaran_event;
use App\Models\PendaftaranEventDivisi;
use Filament\Forms;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PendaftaranEventDivisiResource extends Resource
{
    protected static ?string $model = pendaftaran_event::class;

    protected static ?string $navigationGroup = 'EVENT';
    protected static ?string $pluralLabel = 'Pendaftaran Event';
    protected static ?string $label = 'Pendaftaran Event';
    protected static ?string $slug = 'pendaftaran event';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Data Event')
                    ->columns(1)
                    ->schema([
                        Select::make('id_event')
                            ->label('Event')
                            ->required()
                            ->native(false)
                            ->relationship(
                                name: 'event',
                                titleAttribute: 'judul',
                                modifyQueryUsing: fn($query) => $query->where('status', 'Aktif')
                            ),
                    ]),

                Section::make('Informasi Pribadi')
                    ->columns(2)
                    ->schema([
                        TextInput::make('nama_lengkap')
                            ->label('Nama Lengkap')
                            ->required()
                            ->maxLength(255),

                        Select::make('jenis_kelamin')
                            ->label('Jenis Kelamin')
                            ->required()
                            ->options([
                                'Laki-laki' => 'Laki-laki',
                                'Perempuan' => 'Perempuan',
                            ])
                            ->native(false),

                        TextInput::make('asal_kelompok')
                            ->label('Asal Kelompok')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('phone')
                            ->label('Phone')
                            ->required()
                            ->numeric(),
                    ]),
            ]);
    }


    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('event.judul')
                    ->label('Event')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_lengkap')
                    ->label('Nama Lengkap')
                    ->searchable()
                    ->toggleable()
                    ->sortable(),
                TextColumn::make('asal_kelompok')
                    ->label('Asal Kelompok')
                    ->searchable()
                    ->toggleable()
                    ->wrap(),
                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->toggleable()
                    ->wrap(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
                SelectFilter::make('event_id')
                    ->label('Filter Event')
                    ->options(
                        event::pluck('judul', 'id')
                    )
                    ->searchable()
                    ->preload()
                    ->query(function ($query, array $data) {
                        if ($data['value']) {
                            $query->where('id_event', $data['value']);
                        }
                    }),
                SelectFilter::make('divisi')
                    ->label('Filter Divisi')
                    ->options(
                        divisi::pluck('nama_divisi', 'id')
                    )
                    ->searchable()
                    ->preload()
                    ->query(function ($query, array $data) {
                        if ($data['value']) {
                            $query->whereHas('event.divisi', function ($q) use ($data) {
                                $q->where('id', $data['value']);
                            });
                        }
                    }),

                SelectFilter::make('tahun')
                    ->label('Filter Tahun')
                    ->options(
                        event::select('tahun')
                            ->distinct()
                            ->orderByDesc('tahun')
                            ->pluck('tahun', 'tahun')
                    )
                    ->searchable()
                    ->preload()
                    ->query(function ($query, array $data) {
                        if ($data['value']) {
                            $query->whereHas('event', function ($q) use ($data) {
                                $q->where('tahun', $data['value']);
                            });
                        }
                    }),
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
            'index' => Pages\ListPendaftaranEventDivisis::route('/'),
            'create' => Pages\CreatePendaftaranEventDivisi::route('/create'),
            'edit' => Pages\EditPendaftaranEventDivisi::route('/{record}/edit'),
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
