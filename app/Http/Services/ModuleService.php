<?php

namespace App\Http\Services;

use App\Http\Requests\ModuleRequest;
use App\Models\Module;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ModuleService
{
    /**
     * Create a new module.
     *
     * @param array $data
     * @return Module
     */


    public function create(Request $request, ModuleRequest $moduleRequest, $courseId)
    {
        Log::info("@ModuleService.create", [
            "requestData" => $request->all(),
        ]);
        return [
            'createdCourse' => $request->get('createdCourse')
        ];
    }


    public function createModule(Request $request, ModuleRequest $moduleRequest, $courseId)
    {
        $videoPaths = [];
        try {

            // edit form request 
            if ($request->input('formName') === 'editForm') {
                Log::info("ModuleController@store", [
                    "editRequest" => $request->input('formName'),
                ]);
                //validated
                $validatedData = $moduleRequest->validated();
                $validatedData['moduleNo'] = (int) $validatedData['moduleNo'];
                // dd($validatedData);
                // update
                $module = Module::where('module_no', $validatedData['moduleNo'])->update([
                    'module_no' => $validatedData['moduleNo'],
                    'title' => $validatedData['title'],
                    'video_path' => array_key_exists('videoFiles', $validatedData) ? $validatedData['videoFiles'] : null,
                    'video_origin_path' => array_key_exists('videoOriginPaths', $validatedData) ? $validatedData['videoOriginPaths'] : null,
                    'presentation_path' => array_key_exists('presentationFilePath', $validatedData) ? $validatedData['presentationFilePath'] : null,
                    'presentation_origin_path' => array_key_exists('presentationOriginPath', $validatedData) ? $validatedData['presentationOriginPath'] : null,
                    'course_id' => $validatedData['courseId'],
                ]);
                Log::info("ModuleController@store", [
                    'moduleUpdateSuccess' => "Module update successfully.",
                ]);

                return [
                    'updatedModule' => $module
                ];
            }


            // create form request 
            if ($request->input('formName') === 'createForm') {

                // Validate the data
                $validatedData = $moduleRequest->validated();
                $validatedData['moduleNo'] = (int) $validatedData['moduleNo'];

                // duplicate module check
                $foundModule = Module::where('module_no', $validatedData['moduleNo'])
                    ->where('course_id', $courseId)
                    ->first();
                if ($foundModule) {
                    Log::info("@ModuleService.createModule", ["foundModule" => $foundModule]);
                    return [
                        'existedModule' => $foundModule
                    ];
                }

                // dd($validatedData);

                // insert into db
                $module = Module::create([
                    'module_no' => $validatedData['moduleNo'],
                    'title' => array_key_exists('title', $validatedData) ? $validatedData['title'] : null,
                    'video_path' => array_key_exists('videoFiles', $validatedData) ? $validatedData['videoFiles'] : null, //array
                    'video_origin_path' => array_key_exists('videoOriginPaths', $validatedData) ? $validatedData['videoOriginPaths'] : null,
                    'presentation_path' => array_key_exists('presentationFilePath', $validatedData) ? $validatedData['presentationFilePath'] : null,
                    'presentation_origin_path' => array_key_exists('presentationOriginPath', $validatedData) ? $validatedData['presentationOriginPath'] : null,
                    'course_id' => $courseId,
                ]);
                Log::info("@ModuleService.createModule", ["module" => $module]);
                return [
                    'createdModule' => $module,
                ];
            }
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
                $request->file('videoFiles')->store('course/module-videos', 'public') : null;
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
                    $request->file('presentationFile')->store('course/module-presentations', 'public') : null;
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


    public function deletePresentation($moduleNo, $filePath)
    {
        try {
            // find
            $presentation = Module::where('module_no', $moduleNo)
                ->where('presentation_path', $filePath)
                ->first();

            // delete from storage
            if ($presentation || Storage::disk('public')->exists($presentation->presentation_path)) {
                Storage::disk('public')->delete($presentation->presentation_path);
                return $presentation;
            } else {
                return response()->json([
                    'error' => "File not found"
                ], 404);
            }

            // update null to presentation_path from db
            $presentation->presentation_path = null;
            $presentation->presentation_origin_path = null;
            $presentation->save();
            Log::info("ModuleController@deletePresentation", [
                'success' => $presentation,
            ]);
        } catch (Exception $e) {
            Log::error("ModuleController@deletePresentation", [
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function deleteModule($courseId, $moduleNo)
    {
        try {
            // find
            $module = Module::where('course_id', $courseId)
                ->where('module_no', $moduleNo)
                ->first();
            Log::info("ModuleService@deletModule", [
                "foundModule" => $module,
            ]);
            // delete video and file from storage
            if (!$module) {
                return redirect()->back()->withErrors([
                    'moduleNotFoundError' => 'Module not found',
                ]);
                // return response()->json([
                // 'error' => "module not found",
                // ], 404);
            }

            if ($module->video_path) {


                foreach ($module->video_path as $path) {
                    $relativePath = str_replace('/storage', '', $path);
                    Log::info("ModuleService@deletModule", [
                        'relative path' => $relativePath,
                    ]);
                    if (Storage::disk('public')->exists($relativePath)) {
                        Storage::disk('public')->delete($path);
                    }
                }
            }
            if (Storage::disk('public')->exists('/storage' . $module->presentation_path)) {
                Storage::disk('public')->delete($module->presentation_path);
            }
            // delete from db
            $module->delete();
            return $module;
        } catch (Exception $e) {
            Log::error("ModuleService@deletModule", [
                'error' => $e->getMessage(),
            ]);
            return response()->json([
                'error' => "Module deleted failed."
            ]);
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
}
