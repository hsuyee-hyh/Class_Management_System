<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ModuleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->role==='admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'moduleNo' => 'required|string',
            'title' => 'nullable|string|max:255',
            'videoFiles' => 'nullable|array',
            'videoFiles.*' => 'required|string',
            'videoOriginPaths' => 'nullable|array',
            'videoOriginPaths.*' => 'required|string',

            'presentationFilePath' => 'nullable|string',
            'presentationOriginPath' => 'nullable|string',
            'courseId' => 'required|exists:courses,id',
        ];
    }
}
