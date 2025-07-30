<?php

namespace App\Http\Services\UserServices;

use App\Models\Enums\UserRole;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class RegisterUser
{
    /**
     * Handle the user registration logic.
     *
     * @param array $data
     * @return \App\Models\User
     */
    public function register(array $data)
    {
        $photoPath = $data['photo'] ? $data['photo']->store('photos', 'public') : null;
        if ($photoPath) {
            Log::info("Photo Path", ["photoPath" => $photoPath]);
        } else {
            Log::info("No photo uploaded.");
        }

        try {
            $user = User::create([
                'fullname' => $data['fullname'],
                'username' => $data['username'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'phone' => $data['phone'],
                'photo' => $photoPath,
                'role' => $data['role'] ?? UserRole::STUDENT->value, // Default to 'user' if role is not provided
            ]);

            event(new Registered($user));

            return $user;
        } catch (\Exception $e) {
            Log::error("User registration failed", ['error' => $e->getMessage()]);
            throw $e; // Re-throw the exception to handle it in the controller
        }
    }
}
