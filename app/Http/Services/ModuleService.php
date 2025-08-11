<?php

namespace App\Http\Services;

use App\Http\Requests\ModuleRequest;
use App\Models\Module;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ModuleService
{
    /**
     * Create a new module.
     *
     * @param array $data
     * @return Module
     */


    public function create(Request $request)
    {
        Log::info("@ModuleService.create", [
            "requestData" => $request->all()
        ]);
        return $request->get('createdCourse');
    }
    public function createModule(ModuleRequest $request, $courseId)
    {
        $videoPaths = [];
        try {
            // Validate the data
            $validatedData = $request->validated();
            $validatedData['moduleNo'] = (int) $validatedData['moduleNo'];

            // dd($validatedData);

            // insert into db
            $module = Module::create([
                'module_no' => $validatedData['moduleNo'],
                'title' => array_key_exists('title', $validatedData) ? $validatedData['title'] : null,
                'video_path' => array_key_exists('videoFiles', $validatedData) ? $validatedData['videoFiles'] : null, //array
                'video_origin_path' => array_key_exists('videoOriginPaths', $validatedData)? $validatedData['videoOriginPaths'] : null,
                'presentation_path' => array_key_exists('presentationFilePath', $validatedData) ? $validatedData['presentationFilePath'] : null,
                'presentation_origin_path' => array_key_exists('presentationOriginPath', $validatedData) ? $validatedData['presentationOriginPath'] : null,
                'course_id' => $courseId,
            ]);
            Log::info("@ModuleService.createModule", ["module" => $module]);
            return $module;
        } catch (Exception $e) {
            Log::error("@ModuleService.createModule", [
                "moduleCreationError" => $e->getMessage()
            ]);
        }
    }

    public function uploadVideo(Request $request)
    {
        try {
            $originalName = $request->file('videoFiles')->getClientOriginalName();
            
            $path = $request->file('videoFiles') ?
                $request->file('videoFiles')->store('module-videos', 'public') : null;
            Log::info("@ModuleService.uploadVideo", [
                "videoPath" => '/storage/' . $path,
                "videoOriginPath" => $originalName
            ]);
            return response()->json([
                'videoPath' => '/storage/' . $path,
                'videoOriginPath' => $originalName
            ]);
        } catch (Exception $e) {
            Log::error("@ModuleService.uploadVideo", [
                "videoUploadError" => $e->getMessage()
            ]);
            return response()->json([
                'VideoUploadError' => 'Upload failed',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadPresentation(Request $request)
    {
        try {
            $validated = $request->validate([
                'presentationFile' => 'file|mimes:pdf'
            ]);
            if ($validated['presentationFile']) {
                $originalName = $validated['presentationFile']->getClientOriginalName();

                $path = $request->file('presentationFile') ?
                    $request->file('presentationFile')->store('module-presentations', 'public') : null;
                return response()->json([
                    'presentationPath' => '/storage/' . $path,
                    'presentationOriginPath' => $originalName
                ]);
            }
        } catch (Exception $e) {
            Log::error("@ModuleService.uploadPresentation", [
                "presentationUploadError" => $e->getMessage()
            ]);
            return response()->json([
                "presentationUploadError" => "FileUploadFailed",
                "message" => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update an existing module.
     *
     * @param Module $module
     * @param array $data
     * @return Module
     */
    public function updateModule(Module $module, array $data): Module
    {
        $module->update($data);
        return $module;
    }

    /**
     * Delete a module.
     *
     * @param Module $module
     * @return void
     */
    public function deleteModule(Module $module): void
    {
        $module->delete();
    }
}
