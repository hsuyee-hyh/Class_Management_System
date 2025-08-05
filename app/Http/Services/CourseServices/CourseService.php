<?php

namespace App\Http\Services\CourseServices;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CourseService
{

    public function createCourse(CourseRequest $request)
    {
        try {
            $formattedStartDate = Carbon::parse($request->start_date)->format('Y-m-d');
            $formattedEndDate = Carbon::parse($request->end_date)->format('Y-m-d');

            $validatedData = $request->validated();            // create and insert
            $course = Course::create([
                'course_name' => $validatedData['coursename'],
                'description' => $validatedData['description'],
                'start_date' => $formattedStartDate,
                'end_date' => $formattedEndDate,
                'academic_year' => $validatedData['academicyear'],
                'semester' => $validatedData['semester'],
            ]);
            return $course;
        } catch (Exception $e) {
            Log::error("@CourseCreationService.createCourse", [
                "courseCreationError" => $e->getMessage()
            ]);
        }
    }

    public function searchCourse(Request $request)
    {
        try {
            // input
            $coursename = $request->input('coursename');
            $academicyear = $request->input('academicyear');
            $semester = $request->input('semester');

            //query
            $courses = Course::query()
                ->when( $coursename, fn($q) => $q->where('course_name', 'like',"%$coursename%") )
                ->when($academicyear, fn($q)=>$q->where('academic_year', '=', $academicyear))
                ->when($semester, fn($q)=>$q->where('semester', '=', $semester))                    
                ->paginate(10);

            // return
            Log::info("@CourseController.searchCourse", [
                "searchParameter" => $coursename.$academicyear.$semester,
                "filterCourses" => $courses
            ]);
            return $courses;
        } catch (Exception $e) {
            Log::error("@CourseController.searchCourse", [
                "courseSearchError" => $e->getMessage()
            ]);
        }
    }
}
