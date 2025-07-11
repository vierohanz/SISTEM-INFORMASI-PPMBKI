<?php

namespace App\Filament\Pages\Auth;

use Exception;
use Filament\Facades\Filament;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\Password;
use Illuminate\Contracts\Auth\CanResetPassword;
use App\Notifications\ResetPasswordNotification;
use DanHarrin\LivewireRateLimiting\Exceptions\TooManyRequestsException;
use Filament\Notifications\Auth\ResetPassword as ResetPasswordNotifications;
use Filament\Pages\Auth\PasswordReset\RequestPasswordReset as BaseRequestPasswordReset;

class RequestPasswordReset extends BaseRequestPasswordReset
{
    protected $messages = [
        'reset' => 'Kata sandi Anda telah direset!',
        'sent' => 'Kami telah mengirim tautan reset kata sandi ke email Anda!',
        'throttled' => 'Silakan tunggu sebelum mencoba lagi.',
        'token' => 'Token reset kata sandi tidak valid.',
        'user' => 'Kami tidak dapat menemukan pengguna dengan alamat email tersebut.',
    ];
    public function request(): void
    {
        try {
            $this->rateLimit(2);
        } catch (TooManyRequestsException $exception) {
            Notification::make()
                ->title(__('filament-panels::pages/auth/password-reset/request-password-reset.notifications.throttled.title', [
                    'seconds' => $exception->secondsUntilAvailable,
                    'minutes' => ceil($exception->secondsUntilAvailable / 60),
                ]))
                ->body(array_key_exists('body', __('filament-panels::pages/auth/password-reset/request-password-reset.notifications.throttled') ?: []) ? __('filament-panels::pages/auth/password-reset/request-password-reset.notifications.throttled.body', [
                    'seconds' => $exception->secondsUntilAvailable,
                    'minutes' => ceil($exception->secondsUntilAvailable / 60),
                ]) : null)
                ->danger()
                ->send();

            return;
        }

        $data = $this->form->getState();
        $status = Password::broker(Filament::getAuthPasswordBroker())->sendResetLink(
            $data,
            function (CanResetPassword $user, string $token): void {
                if (! method_exists($user, 'notify')) {
                    $userClass = $user::class;
                    throw new Exception("Model [{$userClass}] does not have a [notify()] method.");
                }

                $notification = new ResetPasswordNotification($token);
                $notification->url = Filament::getResetPasswordUrl($token, $user);
                $user->notify($notification);
            },
        );

        $messages = [
            Password::RESET_LINK_SENT => 'Link reset password telah dikirim ke email Anda.',
            Password::INVALID_USER => 'Kami tidak dapat menemukan pengguna dengan email tersebut.',
            Password::INVALID_TOKEN => 'Token reset password tidak valid atau telah kedaluwarsa.',
            Password::RESET_THROTTLED => 'Terlalu banyak permintaan reset. Silakan coba beberapa saat lagi.',
        ];

        // Tampilkan notifikasi sesuai hasil
        if ($status === Password::RESET_LINK_SENT) {
            Notification::make()
                ->title('Berhasil')
                ->body($messages[$status])
                ->success()
                ->send();
        } else {
            Notification::make()
                ->title('Gagal')
                ->body($messages[$status] ?? 'Terjadi kesalahan saat mengirim link reset password.')
                ->danger()
                ->send();
        }
        $this->form->fill();
    }
}
