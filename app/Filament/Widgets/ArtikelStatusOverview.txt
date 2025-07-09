<?php

namespace App\Filament\Widgets;

use App\Models\artikel_divisi;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Card;

class ArtikelStatusOverview extends StatsOverviewWidget
{
    protected function getCards(): array
    {
        $total = artikel_divisi::count();

        // Grafik artikel yang dibuat per bulan selama 6 bulan terakhir
        $monthlyCounts = [];

        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonths($i)->month;
            $year = now()->subMonths($i)->year;

            $monthlyCounts[] = artikel_divisi::whereMonth('created_at', $month)
                ->whereYear('created_at', $year)
                ->count();
        }

        return [
            Card::make('Total Artikel', $total)
                ->description('Jumlah semua artikel')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('success')
                ->chart($monthlyCounts),
        ];
    }

    // Optional: supaya tidak muncul di dashboard jika tidak perlu
    public static function canView(): bool
    {
        return !request()->routeIs('filament.admin.pages.dashboard');
    }
}
