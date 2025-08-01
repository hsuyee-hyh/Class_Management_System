<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Services\UserServices\ProfileService;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Exception;
use Illuminate\Http\Client\Request as ClientRequest;

class ProfileController extends Controller
{

    public function __construct(protected ProfileService $profileService) {}
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        // return Inertia::render('Profile/EditProfile', [
        //     'user' => $request->user(),
        //     // 'photo_url' => asset('storage/'.$request->user()->photo),
        //     'photo_url' => $request->user()->photo,
        //     'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        //     'status' => session('status'),
        // ]);
        /**
         * You don't need to pass these global props
         * to the Inertia response, because they are
         * already defined in the `app/Http/Middleware/HandleInertiaRequests.php`
         * file.
         * Inertia automatically passes the `auth`, which is currently authenticated
         * user `user`, and `photo_url`, `mustVerifyEmail` are parts of `user`
         * object so, you can access in JSX component using `auth.user.photo_url`, and
         * `auth.user.mustVerifyEmail`.
         * You can also share `status` from the middleware.
         * With this approach, you can just return the Inertia response
         * with the component name without needing to pass the props explicitly.
         */
        return Inertia::render('Profile/Profile');
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        try {

            // $request->user()->fill($request->validated());
            // if ($request->user()->isDirty('email')) {
            // $request->user()->email_verified_at = null;
            // }
            $user = $this->profileService->update($request->validated(), $request );
            return Redirect::route('profile.edit')->with([
                'updateProfileSuccess' => "Update Profile Success!"
            ]);
        } catch (Exception $e) {
            Log::error("Update Profile Error @ProfileController: ", ["updateProfileError" => $e->getmessage()]);
            return redirect()->back()->withErrors(["updateProfileError" => "Profile Update Failed!"]);
        }
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
