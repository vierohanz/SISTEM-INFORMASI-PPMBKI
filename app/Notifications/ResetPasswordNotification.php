<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use Filament\Facades\Filament;
use Illuminate\Support\Facades\Lang;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(private readonly string $token) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Notifikasi Atur Ulang Kata Sandi')
            ->greeting("Halo {$notifiable->name},")
            ->line('Anda menerima email ini karena kami menerima permintaan untuk mengatur ulang kata sandi akun Anda.')
            ->action('Atur Ulang Kata Sandi', $this->resetUrl($notifiable))
            ->line('Tautan untuk mengatur ulang kata sandi ini akan kedaluwarsa dalam :count menit.', [
                'count' => config('auth.passwords.' . config('auth.defaults.passwords') . '.expire'),
            ])
            ->line('Jika Anda tidak meminta pengaturan ulang kata sandi, abaikan email ini.');
    }

    protected function resetUrl(mixed $notifiable): string
    {
        return Filament::getResetPasswordUrl($this->token, $notifiable);
    }
}
