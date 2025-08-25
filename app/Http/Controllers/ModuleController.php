<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Http\Services\ModuleService;
use App\Models\Module;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

use function Pest\Laravel\json;

class ModuleController extends Controller
{
    protected $moduleService;

    public function __construct(ModuleService $moduleService)
    {
        $this->moduleService = $moduleService;
    }

    public function create(Request $request, ModuleRequest $moduleRequest, $courseId)
    {
        try {
            // $createdCourse = $this->moduleService->createModule($moduleRequest, $courseId);
            $result = $this->moduleService->create($request, $moduleRequest, $courseId);
            return Inertia::render('Classes/Class')->with([
                'createdCourse' => $result['createdCourse'],

            ]);
        } catch (Exception $e) {
            Log::error("@ModuleController.create", [
                "moduleCreationError" => $e->getMessage()
            ]);
            return redirect()->back();
        }
    }

    public function store(Request $request, ModuleRequest $moduleRequest, $id)
    {
        try {
            $result = $this->moduleService->createModule($request, $moduleRequest, $id);

            // update
            if (isset($result['updatedModule']) && array_key_exists('updatedModule', $result) && $result['updatedModule']) {
                return redirect()->back()->with([
                    'moduleUpdateSuccess' => "Module update successfully.",
                ]);
            }

            // find
            if (isset($result['existedModule']) && array_key_exists('existedModule', $result) &&  $result['existedModule']) {
                Log::info("ModuleController@store", [
                    "existedModule" => $result['existedModule']
                ]);
                return redirect()->back()->with([
                    'moduleExisted' => 'Module already existed. Please edit that module.',
                ]);
            }

            // create
            if (isset($result['createdModule'])) {
                return redirect()->back()->with([
                    'ModuleCreationSuccess',
                    'Module created successfully!'
                ]);
            }
        } catch (Exception $e) {
            Log::error("@ModuleController.store", [
                "ModuleCreationError" => $e->getMessage()
            ]);
            return redirect()->route('course.edit', $id)
                ->with('ModuleCreationError', 'Module creation failed.');
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




    public function deletePresentation(Request $request, $moduleNo, $filePath)
    {
        if ($request->header('X-Inertia') == 'false') {
            $presentation = $this->moduleService->deletePresentation($moduleNo, $filePath);

            return response()->json([
                'message' => 'Presentation file deleted successfully.'
            ]);
        }
    }

    public function deleteModule($courseId, $moduleNo)
    {
        try {
            $module = $this->moduleService->deleteModule($courseId, $moduleNo);

            // return json
            return redirect()->back()->with([
                'moduleDeleteSuccess' => 'Module is deleted successfully'
            ]);
        } catch (Exception $e) {
            Log::error("ModuleController@deletModule", [
                'error' => $e->getMessage(),
            ]);
            // return response()->json([
            // 'error' => "Module deleted failed."
            // ]);
            return redirect()->back()->withErrors([
                'moduleDeleteError' => 'Something went wrong. Try again later.'
            ]);
        }
    }

    // public function deleteVideo($moduleNo, $videoIndex)
    // {
    //     try {
    //         // retrieve videos 
    //         $moduleData = Module::where('module_no', $moduleNo)->firstOrFail();
    //         $videos = $moduleData->video_path ?? [];
    //         $originVideos = $moduleData->video_origin_path ?? [];

    //         Log::info("ModuleController@deleteVideo",[

    //             "videos" => $videos,
    //             "originVideos" => $originVideos
    //         ]);
    //         if (!is_array($videos) || !array_key_exists($videoIndex, $originVideos)) {
    //             return response()->json([
    //                 'message' => 'Video not found.'
    //             ]);
    //         }

    //         // delete from public storage
    //         Storage::delete($videos[$videoIndex]);

    //         // delte from array
    //         unset($videos[$videoIndex]);
    //         $videos = array_values($videos);

    //         unset($originVideos[$videoIndex]);
    //         $originVideos = array_values($originVideos);

    //         // delete database data
    //         $moduleData->video_path = $videos;
    //         $moduleData->video_origin_path = $originVideos;

    //         // return json
    //         return response()->json([
    //             'message' => 'Video deleted successfully.',
    //         ]);
    //     } catch (Exception $e) {
    //         Log::error("ModuleController@deleteVideo", [
    //             "error" => $e->getMessage(),
    //         ]);
    //         return response()->json([
    //             'error' => $e->getMessage(),
    //         ]);
    //     }
    // }
}
