<?php

namespace App\Filament\Resources;

use App\Filament\Exports\PendaftaranPsbExporter;
use App\Filament\Resources\PendaftaranPsbResource\Pages;
use App\Filament\Resources\PendaftaranPsbResource\RelationManagers;
use App\Models\pendaftaran_psb;
use App\Models\PendaftaranPsb;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ExportAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class PendaftaranPsbResource extends Resource
{
    protected static ?string $model = pendaftaran_psb::class;
    // protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationGroup = 'SANTRI BARU';
    protected static ?string $pluralLabel = 'Pendaftaran PSB';
    protected static ?string $label = 'Pendaftaran PSB';
    protected static ?string $slug = 'pendaftaran psb';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Informasi PSB')
                    ->columns(1)
                    ->schema([
                        Select::make('id_psb')
                            ->label('PSB')
                            ->required()
                            ->native(false)
                            ->relationship(
                                name: 'psb',
                                titleAttribute: 'judul',
                                modifyQueryUsing: fn($query) => $query->where('status', 'Aktif')
                            ),
                    ]),

                Section::make('Identitas Diri')
                    ->columns(2)
                    ->schema([
                        TextInput::make('email')->email()->required()->maxLength(255),
                        TextInput::make('nama_lengkap')->required()->maxLength(255),
                        TextInput::make('nama_panggilan')->required()->maxLength(255),
                        TextInput::make('kota_lahir')->required()->maxLength(255),
                        DatePicker::make('tanggal_lahir')->required(),
                        TextInput::make('kota')->required()->maxLength(255),
                        Select::make('jenis_kelamin')
                            ->native(false)
                            ->options(['Laki-laki' => 'Laki-laki', 'Perempuan' => 'Perempuan'])
                            ->required(),
                        TextInput::make('phone')->tel()->required()->maxLength(255),
                    ]),

                Section::make('Data Keluarga')
                    ->columns(3)
                    ->schema([
                        TextInput::make('anak_keberapa')->numeric()->required(),
                        TextInput::make('jumlah_saudara')->numeric()->required(),
                        TextInput::make('tempat_tinggal')->required()->maxLength(255),
                        Textarea::make('alamat')->required()->maxLength(65535),
                        TextInput::make('pos')->numeric()->required(),
                    ]),

                Section::make('Orang Tua & Wali')
                    ->columns(2)
                    ->schema([
                        TextInput::make('nama_ayah')->required()->maxLength(255),
                        TextInput::make('pekerjaan_ayah')->required()->maxLength(255),
                        TextInput::make('phone_ayah')->tel()->required()->maxLength(255),
                        TextInput::make('nama_ibu')->required()->maxLength(255),
                        TextInput::make('pekerjaan_ibu')->required()->maxLength(255),
                        TextInput::make('phone_ibu')->tel()->required()->maxLength(255),
                        TextInput::make('nama_wali')->maxLength(255),
                        TextInput::make('pekerjaan_wali')->maxLength(255),
                        TextInput::make('phone_wali')->tel()->maxLength(255),
                    ]),

                Section::make('Pendidikan & Kampus')
                    ->columns(2)
                    ->schema([
                        TextInput::make('kampus')->maxLength(255),
                        TextInput::make('jalur_masuk')->maxLength(255),
                        Select::make('beasiswa')->native(false)->options(['Iya' => 'Iya', 'Tidak' => 'Tidak']),
                        TextInput::make('jurusan')->maxLength(255),
                        TextInput::make('angkatan')->numeric(),
                        TextInput::make('tau_ppm_dari_mana')->maxLength(255),
                    ]),

                Section::make('Transportasi')
                    ->columns(2)
                    ->schema([
                        Select::make('bawa_kendaraan')
                            ->native(false)
                            ->options(['Iya' => 'Iya', 'Tidak' => 'Tidak'])
                            ->required(),
                        Select::make('kendaraan')
                            ->native(false)
                            ->options(['Mobil' => 'Mobil', 'Motor' => 'Motor', 'Lainnya' => 'Lainnya'])
                            ->nullable(),
                    ]),

                Section::make('Kesehatan')
                    ->columns(2)
                    ->schema([
                        Select::make('golongan_darah')->native(false)
                            ->options(['A' => 'A', 'B' => 'B', 'AB' => 'AB', 'O' => 'O']),
                        TextInput::make('tinggi_badan')->required()->maxLength(20),
                        TextInput::make('berat_badan')->required()->maxLength(20),
                        Textarea::make('riwayat_kesehatan')->maxLength(65535),
                    ]),

                Section::make('Tentang Diri')
                    ->columns(2)
                    ->schema([
                        Textarea::make('deskripsi_diri')->required()->maxLength(65535),
                        Textarea::make('latar_belakang_keluarga')->required()->maxLength(65535),
                        Textarea::make('prestasi')->maxLength(65535),
                        Textarea::make('minat')->maxLength(65535),
                        Select::make('bakat')->native(false)
                            ->options(['Desain' => 'Desain', 'Teknologi' => 'Teknologi', 'Pendidikan' => 'Pendidikan', 'Olahraga' => 'Olahraga']),
                        Select::make('pengalaman_sekolah')
                            ->options(['OSIS' => 'OSIS', 'Kepanitiaan' => 'Kepanitiaan', 'Lainnya' => 'Lainnya']),
                        TextInput::make('instagram')->maxLength(255),
                    ]),

                Section::make('Upload Dokumen')
                    ->columns(1)
                    ->schema([
                        FileUpload::make('upload_biodata_calon_santri')
                            ->required()
                            ->acceptedFileTypes(['application/pdf'])
                            ->disk('public')
                            ->maxSize(3048)

                            ->directory('biodata_santri'),

                        FileUpload::make('upload_bukti_diterima_kuliah')
                            ->acceptedFileTypes(['application/pdf', 'image/*'])
                            ->disk('public')

                            ->maxSize(3048)
                            ->directory('bukti_kuliah')
                            ->nullable(),

                        FileUpload::make('upload_foto_setengah_badan')
                            ->required()
                            ->multiple()
                            ->maxSize(3048)
                            ->acceptedFileTypes(['image/*'])
                            ->disk('public')
                            ->directory('foto_santri')
                            ->image(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->headerActions([
                ExportAction::make()
                    ->exporter(PendaftaranPsbExporter::class)
            ])
            ->columns([
                TextColumn::make('psb.judul')
                    ->label('PSB')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_lengkap')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_panggilan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('email')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('kota_lahir')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('tanggal_lahir')
                    ->date()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('kota')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('jenis_kelamin')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('phone')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('anak_keberapa')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('jumlah_saudara')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('tempat_tinggal')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('pos')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_ayah')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('phone_ayah')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_ibu')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('phone_ibu')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('nama_wali')
                    ->label('Wali')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('phone_wali')
                    ->label('HP Wali')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('kampus')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('jurusan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('angkatan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('beasiswa')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('bawa_kendaraan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('kendaraan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('golongan_darah')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('tinggi_badan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('berat_badan')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('bakat')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('pengalaman_sekolah')
                    ->searchable()
                    ->sortable()
                    ->toggleable(),

                TextColumn::make('created_at')
                    ->dateTime()
                    ->label('Dibuat')
                    ->sortable()
                    ->toggleable(),
            ])

            ->filters([
                Tables\Filters\TrashedFilter::make(),
                SelectFilter::make('id_psb')
                    ->label('Filter PSB')
                    ->relationship('psb', 'judul')
                    ->native(false)
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
            'index' => Pages\ListPendaftaranPsbs::route('/'),
            'create' => Pages\CreatePendaftaranPsb::route('/create'),
            'edit' => Pages\EditPendaftaranPsb::route('/{record}/edit'),
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
