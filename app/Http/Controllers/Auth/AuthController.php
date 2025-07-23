<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function Index(){
        if(Auth::guest()){
            return redirect("/login");
        }
        return Inertia::render('Home');
    }

    public function Register()
    {
        return Inertia::render('Register');
    }

    public function PostRegister(Request $request)
    {
        Log::info('test', ['test' => "this is testing for log"]);
        // dd($request->all());
        // Validate the request data
        try {
            $validatedData = $request->validate([
                'fullname' => 'required|string|max:255',
                'username' => 'required|string|unique:users',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'phone' => 'nullable|string',
                'photo' => 'nullable|file|mimes:jpg,png,pdf|max:2048'
            ]);
            //  if file upload
            $photoPath = $request->hasFile('photo') ?
                $request->file('photo')->store('photos', 'public') : null;
            Log::info('photopath', ['photopath' => $photoPath]);

            // Create a new user instance
            User::create([
                'fullname' => $validatedData['fullname'],
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'phone' => $validatedData['phone'],
                'photo' => $photoPath
            ]);
            Log::info('User created');
            return redirect()->route('home');
            dd($photoPath);
        } catch (\Illuminate\Validation\ValidationException $e) {
            dd($e->errors()); // 🔍 Shows validation error messages
        }
    }


    public function Login()
    {
        return Inertia::render('Login');
    }

    public function PostLogin(Request $request)
    {
        $error = [];

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        $remember = $request->boolean('rememberme');
        Log::info("remember me info", [
            "rememberme" => $remember
        ]);

        // check if email exists
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error['email'] = "Email not found";
        } else {
            $error['email'] = "";
        }

        // check credential and rememberme
        if (!Auth::attempt($credentials, $remember)) {
            $error['password'] = "Incorrect Password";
            Log::error("login error", [
                "loginerror" => $error
            ]);
            if (!empty($error)) {
                return Inertia::render('Login', [
                    'errors' => [
                        'email' => $error['email'],
                        'password' => $error['password']
                    ]
                ]);
            }
        }
        $request->session()->regenerate();
        return redirect()->intended('/');
    }
}
