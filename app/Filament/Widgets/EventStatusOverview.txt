<?php

namespace App\Filament\Widgets;

use App\Models\event;
use Filament\Widgets\Widget;
use Filament\Widgets\StatsOverviewWidget\Card;
use Filament\Widgets\StatsOverviewWidget;


use Illuminate\Support\Carbon;

class EventStatusOverview extends StatsOverviewWidget
{
    protected static ?string $pollingInterval = null;

    protected function getCards(): array
    {
        $aktif = event::where('status', 'Aktif')->count();
        $tidakAktif = event::where('status', 'Tidak Aktif')->count();

        // Contoh: Ambil data aktif per bulan (6 bulan terakhir)
        $monthlyAktif = [];
        $monthlyTidakAktif = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i)->month;
            $year = now()->subMonths($i)->year;

            $monthlyAktif[] = event::where('status', 'Aktif')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->count();

            $monthlyTidakAktif[] = event::where('status', 'Tidak Aktif')
                ->whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->count();
        }

        return [
            Card::make('Event Aktif', $aktif)
                ->description('Total event aktif')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart($monthlyAktif),

            Card::make('Event Tidak Aktif', $tidakAktif)
                ->description('Total event tidak aktif')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->color('danger')
                ->chart($monthlyTidakAktif),
        ];
    }
    public static function canView(): bool
    {
        return !request()->routeIs('filament.admin.pages.dashboard');
    }
}
