<?php

namespace App\Filament\Widgets;

use Filament\Forms\Concerns\InteractsWithForms;
use Illuminate\Contracts\Support\Htmlable;
use Webbingbrasil\FilamentMaps\Widgets\MapWidget as BaseMapWidget;
use Webbingbrasil\FilamentMaps\Polygone;
use Webbingbrasil\FilamentMaps\Marker;
use Webbingbrasil\FilamentMaps\Actions;

class MapWidget extends BaseMapWidget
{
    use InteractsWithForms;

    protected string|Htmlable|null $heading = 'Peta Lokasi PPM';
    protected string $height = '500px';
    protected static ?int $sort = 2;
    protected int|string|array $columnSpan = 2;
    protected bool $hasBorder = false;

    public function getCenter(): array
    {
        return [-7.049212, 110.420410];
    }

    public function getZoom(): int
    {
        return 16;
    }

    public function getPolygones(): array
    {
        return [
            Polygone::make('Wilayah PPM')
                ->latlngs([
                    [-7.049500, 110.420000],
                    [-7.049000, 110.421000],
                    [-7.048800, 110.420500],
                    [-7.049500, 110.420000],
                ])
                ->options([
                    'color' => 'blue',
                    'weight' => 2,

                ])
                ->popup('Wilayah PPM'),
        ];
    }

    public function getMarkers(): array
    {
        return [
            Marker::make('PPM')
                ->lat(-7.049212)
                ->lng(110.420410)
                ->popup("
    <div style='min-width: 200px; font-family: sans-serif;'>
        <div style='font-weight: bold; font-size: 16px; margin-bottom: 5px;'>🏫 Pondok Pesantren Mahasiswa</div>
        <div style='font-size: 14px; color: #555;'>PPM Bina Khoirul Insan, Jl. Ngesrep Tim. V No.8, Sumurboto, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50269<br>Kota Semarang</div>
        <hr style='margin: 8px 0;'>
        <div style='font-size: 13px;'>
            <strong>Koordinat:</strong><br>
            -7.049212, 110.420410
        </div>
    </div>
")

        ];
    }

    public function getActions(): array
    {
        return [
            Actions\ZoomAction::make(),
            Actions\CenterMapAction::make()
                ->centerTo([-7.049212, 110.420410])
                ->zoom(16),
        ];
    }
}
