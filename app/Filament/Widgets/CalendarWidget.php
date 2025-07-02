<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Saade\FilamentFullCalendar\Widgets\FullCalendarWidget;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class CalendarWidget extends FullCalendarWidget
{
    protected static ?string $heading = 'Kalender Booking';
    protected int | string | array $columnSpan = 'full';
    public Model|string|int|null $record = null;

    public function fetchEvents(array $fetchInfo): array
    {
        return Booking::with('layanan_tamu')
            ->where(function ($query) use ($fetchInfo) {
                $query->whereBetween('tanggal_datang', [$fetchInfo['start'], $fetchInfo['end']])
                    ->orWhereBetween('tanggal_keluar', [$fetchInfo['start'], $fetchInfo['end']])
                    ->orWhere(function ($q) use ($fetchInfo) {
                        $q->where('tanggal_datang', '<', $fetchInfo['start'])
                            ->where('tanggal_keluar', '>', $fetchInfo['end']);
                    });
            })
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'title' => $booking->nama_tamu . ' - ' . ($booking->layanan_tamu->nama ?? ''),
                    'start' => $booking->tanggal_datang,
                    'end' => Carbon::parse($booking->tanggal_keluar)->addDay()->toDateString(),
                    'color' => $this->getEventColor($booking->status),
                    'extendedProps' => [
                        'status' => $booking->status,
                        'kamar' => $booking->layanan_tamu->nama ?? '-',
                        'deskripsi' => $booking->deskripsi,
                        'jumlah_orang' => $booking->kuantitas
                    ],
                    'display' => 'block'
                ];
            })
            ->toArray();
    }

    public static function canView(): bool
    {
        return !request()->routeIs('filament.admin.pages.dashboard');
    }

    protected function getEventColor(string $status): string
    {
        return match (strtolower($status)) {
            'confirms', 'diterima' => '#22c55e',
            'pending' => '#facc15',
            'canceled', 'ditolak' => '#ef4444',
            default => '#94a3b8'
        };
    }

    public function getConfig(): array
    {
        return [
            'initialView' => 'dayGridMonth',
            'headerToolbar' => [
                'left' => 'prev,next today',
                'center' => 'title',
                'right' => 'dayGridMonth,timeGridWeek,timeGridDay'
            ],
            'navLinks' => true,
            'editable' => false,
            'selectable' => true,
            'eventDisplay' => 'block',
            'height' => 'auto',
            'contentHeight' => 600,
            'dayMaxEvents' => true,
            'eventTimeFormat' => [
                'hour' => '2-digit',
                'minute' => '2-digit',
                'hour12' => false
            ],
            'eventContent' => function ($eventInfo) {
                return [
                    'html' => '
                        <div class="fc-event-main">
                            <div class="fc-event-title">' . $eventInfo->event->title . '</div>
                            <div class="fc-event-desc">Kamar: ' . $eventInfo->event->extendedProps['kamar'] . '</div>
                            <div class="fc-event-status">Status: ' . ucfirst($eventInfo->event->extendedProps['status']) . '</div>
                        </div>
                    '
                ];
            }
        ];
    }

    public static function getStyles(): string
    {
        return <<<CSS
            .fc-event {
                cursor: pointer;
                padding: 3px 6px;
                margin: 2px;
                border-radius: 4px;
                font-size: 0.85rem;
                border: none;
            }
            .fc-event-main {
                padding: 2px;
                overflow: hidden;
            }
            .fc-event-title {
                font-weight: bold;
                margin-bottom: 2px;
                white-space: normal;
            }
            .fc-event-desc, .fc-event-status {
                font-size: 0.7rem;
                line-height: 1.2;
                white-space: normal;
            }
            .fc-daygrid-event {
                white-space: normal;
            }
            .fc-daygrid-block-event .fc-event-time {
                font-weight: bold;
            }
        CSS;
    }
}
