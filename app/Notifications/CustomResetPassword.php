<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CustomResetPassword extends Notification
{
    use Queueable;

    public $token;
    /**
     * Create a new notification instance.
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->from('support@yourdomain.com', 'Class Management System Support')
            ->greeting('Hello!')
            ->line('We received a request to reset your password.')
            ->action('Reset Password', url(config('app.url') . route('password.reset', [
                'token' => $this->token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false)))
            ->line('Thank you for using our application. 
            This link will expire in 60 minutes.
            If you didn’t request this, please ignore this email.')
            ->line('Best regards,')
            ->salutation('Class Management System Support Team');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
