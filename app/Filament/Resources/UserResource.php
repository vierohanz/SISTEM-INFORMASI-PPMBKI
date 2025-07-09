<?php

namespace App\Filament\Resources;

use App\Filament\Exports\UsersExporter;
use App\Filament\Resources\UserResource\Pages;
use App\Filament\Resources\UserResource\RelationManagers;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Notifications\Auth\VerifyEmail;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Actions\ExportAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Validation\Rule;
use stdClass;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Users';
    protected static ?string $slug = 'users';
    protected static ?string $label = 'Users';
    protected static ?string $pluralLabel = 'Users';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')
                    ->label('Name Lengkap')
                    ->required(),
                TextInput::make('email')
                    ->label('Email')
                    ->email()
                    ->rule(function ($record) {
                        return [
                            'required',
                            'email',
                            'max:255',
                            Rule::unique('users', 'email')->ignore($record?->id),
                        ];
                    })
                    ->validationMessages([
                        'required' => 'Email wajib diisi.',
                        'email' => 'Format email tidak valid.',
                        'unique' => 'Email ini sudah digunakan. Silakan gunakan email lain.',
                        'max' => 'Email tidak boleh lebih dari 255 karakter.',
                    ])
                    ->required(),
                DatePicker::make('email_verified_at')
                    ->label('Verifikasi Email'),
                TextInput::make('password')
                    ->label('Password')
                    ->required(),
                Select::make('roles')
                    ->relationship('roles', 'name')
                    ->multiple()
                    ->preload()
                    ->searchable(),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('No')
                    ->label('No')
                    ->getStateUsing(static function (stdClass $rowLoop): string {
                        return (string) $rowLoop->iteration;
                    })
                    ->rowIndex(),
                TextColumn::make('name')
                    ->label('Nama Lengkap')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('Email')
                    ->icon('heroicon-m-envelope')
                    ->searchable()
                    ->sortable(),
                IconColumn::make('email_verified_at')
                    ->label('Verifikasi Email')
                    ->boolean()
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->tooltip(function ($record) {
                        return $record->email_verified_at
                            ? 'Terverifikasi pada ' . $record->email_verified_at->format('d-m-Y H:i')
                            : 'Belum diverifikasi';
                    }),

            ])
            ->filters([
                Tables\Filters\TrashedFilter::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->paginated([3, 12, 24, 'all'])
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
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
