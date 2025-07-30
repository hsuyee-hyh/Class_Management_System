<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        Log::info("EmailVerification Sent:", ["email verifi sent: "=> $request->all()]);
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()
            ->intended(route('home', absolute: false))
            ->with(
                ['registerationSuccess' => "Registeration Success!"]
            );
        }

        $request->user()->sendEmailVerificationNotification();

        return back()->with('status', 'verification-link-sent');
    }
}
