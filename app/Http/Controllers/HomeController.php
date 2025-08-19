<?php

namespace App\Http\Controllers;

use App\Http\Services\CourseServices\CourseService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    private $courseService;
    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }
    public function index()
    {
        return Inertia::render('Home/Home', [
            'courses' => $this->courseService->getAllCourses(),
        ]);
    }
}
