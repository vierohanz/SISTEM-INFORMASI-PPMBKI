<?php

namespace App\Filament\Resources;

use App\Filament\Exports\BookingExporter;
use App\Filament\Imports\BookingImporter;
use App\Filament\Resources\SewaKamarResource\Pages;
use App\Filament\Resources\SewaKamarResource\RelationManagers;
use App\Models\booking; // Pastikan model booking sudah benar
use App\Models\layanan_tamu;
use App\Models\SewaKamar; // Pastikan ini adalah model untuk data Layanan Kamar, atau sesuaikan
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Closure; // Tambahkan ini untuk Closure pada validasi
use Carbon\Carbon; // Tambahkan ini untuk bekerja dengan tanggal
use Filament\Tables\Actions\ExportAction;
use Filament\Tables\Actions\ImportAction;

class SewaKamarResource extends Resource
{
    protected static ?string $model = booking::class;
    protected static ?string $navigationGroup = 'LAYANAN TAMU';
    protected static ?string $pluralLabel = 'Sewa Kamar';
    protected static ?string $label = 'Sewa Kamar';
    protected static ?string $slug = 'Sewa Kamar';
    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?string $navigationBadgeTooltip = 'Jumlah keseluruhan disewakan';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi Pemesanan')
                    ->description('Masukkan data tamu dan informasi jadwal pemesanan kamar.')
                    ->schema([
                        Grid::make(2)->schema([
                            Select::make('id_layanan_tamu')
                                ->label('Kamar Tamu')
                                ->relationship(
                                    name: 'layanan_tamu',
                                    titleAttribute: 'nama',
                                    modifyQueryUsing: fn($query) => $query->where('status', 'Aktif')
                                )
                                ->required()
                                ->live(),

                            TextInput::make('nama_tamu')
                                ->label('Nama Tamu')
                                ->required(),

                            TextInput::make('phone')
                                ->label('Nomor Telepon')
                                ->required()
                                ->tel(), // menggunakan field telepon (bukan numeric agar tidak error)

                            DatePicker::make('tanggal_datang')
                                ->label('Tanggal Datang')
                                ->required()
                                ->afterOrEqual('today')
                                ->reactive()
                                ->rules([
                                    function ($state, $get) {
                                        return function (string $attribute, $value, Closure $fail) use ($get) {
                                            $kamarId = $get('id_layanan_tamu');
                                            $tanggalDatang = Carbon::parse($value);
                                            $tanggalKeluar = Carbon::parse($get('tanggal_keluar'));

                                            if (!$kamarId || !$tanggalDatang || !$tanggalKeluar) return;

                                            if ($tanggalDatang->greaterThanOrEqualTo($tanggalKeluar)) {
                                                $fail('Tanggal Datang harus sebelum Tanggal Keluar.');
                                                return;
                                            }

                                            $count = booking::where('id_layanan_tamu', $kamarId)
                                                ->where(function ($query) use ($tanggalDatang, $tanggalKeluar) {
                                                    $query->where('tanggal_datang', '<', $tanggalKeluar)
                                                        ->where('tanggal_keluar', '>', $tanggalDatang);
                                                })
                                                ->when($get('id'), fn($query, $id) => $query->where('id', '!=', $id))
                                                ->whereIn('status', ['Pending', 'Diterima'])
                                                ->count();

                                            if ($count > 0) {
                                                $fail('Kamar ini sudah dipesan pada rentang tanggal tersebut.');
                                            }
                                        };
                                    }
                                ]),

                            DatePicker::make('tanggal_keluar')
                                ->label('Tanggal Keluar')
                                ->required()
                                ->after('tanggal_datang')
                                ->rules([
                                    function ($state, $get) {
                                        return function (string $attribute, $value, Closure $fail) use ($get) {
                                            $kamarId = $get('id_layanan_tamu');
                                            $tanggalDatang = Carbon::parse($get('tanggal_datang'));
                                            $tanggalKeluar = Carbon::parse($value);

                                            if (!$kamarId || !$tanggalDatang || !$tanggalKeluar) return;

                                            if ($tanggalKeluar->lessThanOrEqualTo($tanggalDatang)) {
                                                $fail('Tanggal Keluar harus setelah Tanggal Datang.');
                                                return;
                                            }

                                            $count = booking::where('id_layanan_tamu', $kamarId)
                                                ->where(function ($query) use ($tanggalDatang, $tanggalKeluar) {
                                                    $query->where('tanggal_datang', '<', $tanggalKeluar)
                                                        ->where('tanggal_keluar', '>', $tanggalDatang);
                                                })
                                                ->when($get('id'), fn($query, $id) => $query->where('id', '!=', $id))
                                                ->whereIn('status', ['Pending', 'Diterima'])
                                                ->count();

                                            if ($count > 0) {
                                                $fail('Kamar ini sudah dipesan pada rentang tanggal tersebut.');
                                            }
                                        };
                                    }
                                ]),

                            TextInput::make('kuantitas')
                                ->label('Kuantitas')
                                ->numeric()
                                ->required()
                                ->rules([
                                    function ($state, $get) {
                                        return function (string $attribute, $value, Closure $fail) use ($get) {
                                            $kamarId = $get('id_layanan_tamu');
                                            if (!$kamarId) return;

                                            $kamar = layanan_tamu::find($kamarId);
                                            if ($kamar && $value > (int) $kamar->kapasitas) {
                                                $fail("Kuantitas tidak boleh melebihi kapasitas kamar ({$kamar->kapasitas}).");
                                            }
                                        };
                                    }
                                ]),
                        ]),
                    ]),

                Section::make('Deskripsi dan Status')
                    ->description('Tambahkan catatan dan status dari pemesanan.')
                    ->schema([
                        Textarea::make('deskripsi')
                            ->label('Deskripsi')
                            ->maxLength(255),

                        ToggleButtons::make('status')
                            ->label('Status')
                            ->required()
                            ->inline()
                            ->options([
                                'Pending' => 'Pending',
                                'Diterima' => 'Diterima',
                                'Ditolak' => 'Ditolak',
                            ])
                            ->colors([
                                'Pending' => 'warning',
                                'Diterima' => 'success',
                                'Ditolak' => 'danger',
                            ]),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->headerActions([
                ImportAction::make()
                    ->importer(BookingImporter::class),
                ExportAction::make()
                    ->exporter(BookingExporter::class)
            ])
            ->columns([
                TextColumn::make('layanan_tamu.nama')
                    ->label('Nama Kamar')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_tamu')
                    ->label('Nama Tamu')
                    ->searchable()

                    ->toggleable(),
                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->wrap()
                    ->toggleable(),

                TextColumn::make('tanggal_datang')
                    ->label('Tanggal Datang')
                    ->date('d M Y')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('tanggal_keluar')
                    ->label('Tanggal Keluar')
                    ->date('d M Y')
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('kuantitas')
                    ->label('Jumlah Orang')
                    ->numeric()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->wrap()
                    ->color(fn(string $state): string => match (strtolower($state)) {
                        'diterima' => 'success',
                        'pending' => 'warning',
                        'ditolak' => 'danger',
                        default => 'gray',
                    })
                    ->toggleable(),

                TextColumn::make('deskripsi')
                    ->label('Deskripsi')
                    ->limit(50)
                    ->wrap()
                    ->tooltip(fn($record) => $record->deskripsi)
                    ->toggleable(),
            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),

                SelectFilter::make('id_layanan_tamu')
                    ->label('Filter Kamar')
                    ->relationship('layanan_tamu', 'nama')
                    ->searchable()
                    ->preload(),
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
            'index' => Pages\ListSewaKamars::route('/'),
            'create' => Pages\CreateSewaKamar::route('/create'),
            'edit' => Pages\EditSewaKamar::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
    public static function getNavigationBadge(): ?string
    {
        return (string) booking::count();
    }
}
