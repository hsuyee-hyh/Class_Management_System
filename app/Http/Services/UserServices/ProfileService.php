<?php

namespace App\Http\Services\UserServices;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProfileService
{

    public function update(array $data, Request $request)
    {
        $photoPath = $request->hasFile('photo')? $request->file('photo')->store('profile-photos', 'public') : $data['photo'];

        try {
            
            $user = $request->user();

            $updateData = [
                'fullname' => $data['fullname'],
                'username' => $data['username'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'role' => $data['role'],
            ];
            if($photoPath){
                $updateData['photo'] = $photoPath;
            }
            $user->update($updateData);
            return $user;
        } catch (Exception $e) {
            Log::error("User Profile Update failed", ['profileUpdateError' => $e->getMessage()]);
            throw $e;
        }
    }
}
