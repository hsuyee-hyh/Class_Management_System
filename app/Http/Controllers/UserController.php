<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Login', [
            'users' => User::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Register');
    }

    public function store(Request $request)
    {
        




        // if($validatedData['password'] !== $validatedData['password_confirmation']) {
        // return response()->json(['error' => 'Passwords do not match'], 422);
        // return to_route('/register');
        // }


        // return response()->json([
        // "message" => "user created"
        // ]);
        // User::create([
        // 'fullname' => $validatedData['fullname'],
        // 'username' => $validatedData['username'],
        // 'email' => $validatedData['email'],
        // 'password' => $validatedData['password'],
        // 'phone' =>$validatedData['phone']
        // ]);

        // return Inertia::location('/');
        // $user = new User();
        // $user->fullname = $validatedData['fullname'];
        // $user->username = $validatedData['username'];
        // $user->email = $validatedData['email'];
        // $user->password = $validatedData['password'];
        // $user->phone = $validatedData['phone'];
        // $user->save();

        // Return a response or redirect
        // return response()->json(['message' => 'User registered successfully'], 201);
        // return Inertia::render('Auth/Register', [
        // 'message' => 'User registered successfully',
        // 'user' => $user
        // ]);

        // return redirect()->route('/login')->with('message', 'User registered successfully');

        // return to_route('/')->with('message', 'User registered successfully');
    }
}
