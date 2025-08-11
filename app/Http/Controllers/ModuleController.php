<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Http\Services\ModuleService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Pest\Laravel\json;

class ModuleController extends Controller
{
    protected $moduleService;

    public function __construct(ModuleService $moduleService)
    {
        $this->moduleService = $moduleService;
    }

    public function create(Request $request)
    {
        try {
            $createdCourse = $this->moduleService->create($request);
            return Inertia::render('Classes/Class')->with([
                'createdCourse' => $createdCourse,
            ]);
        } catch (Exception $e) {
            Log::error("@ModuleController.create", [
                "moduleCreationError" => $e->getMessage()
            ]);
            return redirect()->back();
        }
    }

    public function store(ModuleRequest $request, $id)
    {
        try {
            $module = $this->moduleService->createModule($request, $id);
            return redirect()->route('course.show',$id, 303)->with([
                'ModuleCreationSuccess' => 'Module created successfully!',
                'module' => $module,
            ]);
            // return Inertia::render('Classes/ShowClass', [
                // 'module' => $module,
                // 'ModuleCreationSuccess' => 'Module created successfully!'
            // ]);
        //    
           
           
           
        } catch (Exception $e) {
            Log::error("@ModuleController.create", [
                "ModuleCreationError" => $e->getMessage()
            ]);
            return redirect()->route('course.show',$id)->with([
                'ModuleCreationError' => 'Module creation failed.'
            ]);
            //  return Inertia::render('Classes/ShowClass', [
            //      'ModuleCreationError' => 'Module creation failed.'
            //  ]);

          
          
          
        }
    }


    public function uploadVideo(Request $request)
    {
        try {
            return $this->moduleService->uploadVideo($request);
        } catch (Exception $e) {
            Log::error("@ModuleController.uploadVideo", [
                "videoUploadError" => $e->getMessage()
            ]);
            return $this->moduleService->uploadVideo($request);
        }
    }

    public function uploadPresentation(Request $request)
    {
        try {
            return $this->moduleService->uploadPresentation($request);
        } catch (Exception $e) {
            Log::error("@ModuleController.uploadPresentation", [
                "presentationUploadError" => $e->getMessage()
            ]);
            return $this->moduleService->uploadPresentation($request);
        }
    }
}
