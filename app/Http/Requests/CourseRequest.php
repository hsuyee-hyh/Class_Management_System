<?php

namespace App\Http\Requests;

use App\Models\Enums\Semester;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class CourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'coursename' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'photo' => 'nullable',
            'startdate' => 'required|date', 
            'enddate' => 'required|date|after_or_equal:startdate',
            'academicyear' => 'required',
            'semester' => Rule::in([
                Semester::FIRST_SEMESTER,
                Semester::SECOND_SEMESTER,
            ])
        ];
    }

   
   
   
}
