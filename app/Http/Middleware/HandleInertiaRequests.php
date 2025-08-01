<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],

            /**
             * We can add more props to share with Inertia responses.
             * For example, we can share the current locale,
             * the current theme, or any other global data.
             * These props will be available in all Inertia responses.
             * So, you can use them in any Inertia component
             * without passing them explicitly.
             * For example, you can use `auth.user` in any component
             * to access the authenticated user.
             * Example, sharing status in session object:
             * 'status' => session('status'),
             */
            'status' => session('status'),

            'registerationError' => $request->session()->get("registerationError"),

            'loginSuccess' => $request->session()->get("loginSuccess"),
            'loginError' => $request->session()->get("loginError"),

            'updateProfileSuccess' => $request->session()->get("updateProfileSuccess"),
            'updateProfileError' => $request->session()->get("updateProfileError"),

            /**
             * Here's an example for sharing custom prop.
             */
            'my_custom_prop' => 'This is a custom prop',
        ];
    }
}
