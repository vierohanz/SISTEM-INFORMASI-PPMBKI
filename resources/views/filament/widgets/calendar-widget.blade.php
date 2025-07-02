<div class="bg-white dark:bg-gray-800 rounded-xl w-full shadow p-4 mb-6">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Kalender Booking</h2>

    <div class="fullcalendar-wrapper">
        {{ $this->getCalendarWidget() }}
    </div>
</div>

<style>
    .fullcalendar-wrapper {
        min-height: 450px;
    }

    .fc-event {
        cursor: pointer;
        margin: 2px;
        padding: 2px 4px;
        font-size: 0.85rem;
        border-radius: 4px;
        white-space: normal;
    }

    .fc-daygrid-event {
        border: none;
    }

    .fc-daygrid-event-dot {
        display: none;
    }

    .fc-toolbar-title {
        font-size: 1.1rem;
        font-weight: 600;
    }

    .fc-button {
        background-color: #3b82f6 !important;
        border-color: #3b82f6 !important;
    }

    .dark .fc {
        --fc-border-color: theme('colors.gray.700');
        --fc-neutral-bg-color: theme('colors.gray.800');
        --fc-page-bg-color: theme('colors.gray.800');
        --fc-list-event-hover-bg-color: theme('colors.gray.700');
    }
</style>
