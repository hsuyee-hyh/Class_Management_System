<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailBase;
use Illuminate\Notifications\Messages\MailMessage;

class CustomVerifyEmail extends VerifyEmailBase
{
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->from('support@yourdomain.com', 'Class Management System Support')
            ->subject('Please Verify Your Email Address')
            ->greeting('Hello!')
            ->line('Thanks for registering. Please verify your email by clicking the button below.')
            ->action('Verify Email', $this->verificationUrl($notifiable))
            ->line('If you did not create an account, no further action is needed.');
    }
}
