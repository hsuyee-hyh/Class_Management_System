<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Http\Services\CourseServices\CourseCreationService;
use App\Http\Services\CourseServices\CourseService;
use App\Models\Course;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CourseController extends Controller
{

    public function __construct(protected CourseService $courseService) {}

    public function select()
    {
        $courses = Course::latest()->paginate(10);
        return Inertia::render('Classes/Class', [
            'courses' => $courses,
            'isSearching' => false,
        ]);
    }

    public function store(CourseRequest $request): RedirectResponse
    {

        try {
            // user is admin or authenticated and verify
            if (Auth::check() && Auth::user()->role === 'admin') {
                $course = $this->courseService->createCourse($request);
            }
            return redirect(route('course', absolute: false))->with([
                'courseCreationSuccess' => "Course created successfully."
            ]);
        } catch (Exception $e) {
            Log::error("Course Creation Error @CourseController.store", [
                "courseCreationError" => $e->getMessage()
            ]);
            return redirect()->back()->withErrors([
                "courseCreationError" => "Course Creation Failes. Please Try Again."
            ]);
        }
    }

    public function search(Request $request)
    {
        $requestOldData = $request->all();

        $courses = Course::latest()->paginate(10);
        // search input
        $filterCourses = $this->courseService->searchCourse($request);
        if (!$filterCourses) {
            return Inertia::render('Classes/Class', [
                "courseNotFoundError" => "Course not found",
                "isSearching" => true,
            ]);
        }
        return Inertia::render('Classes/Class', [
            'requestOldData' => $requestOldData,
            'searchedCourses' => $filterCourses,
            'courses' => $courses,
            'isSearching' => true,
        ]);
    }
}
