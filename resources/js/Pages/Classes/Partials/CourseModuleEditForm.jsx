import TextInput from "@/Components/Form/TextInput";
import {
    EyeOutlined,
    FilePdfOutlined,
    PlusOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { Alert, Button, message, Modal, Progress, Space, Upload } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function CourseModuleEditForm({ foundCourse, module }) {
    const { errors } = useForm();
    const { ModuleCreationSuccess, ModuleCreationError } = usePage().props;

    const [courseId, setCourseId] = useState(foundCourse.id);
    const [moduleNo, setModuleNo] = useState(module.module_no);
    const [title, setTitle] = useState(module.title);

    const [videoFiles, setVideoFiles] = useState(module?.video_path || []); // local File objects
    const [uploading, setUploading] = useState(false);
    const [videoPaths, setVideoPaths] = useState(module?.video_path || []); // after uploaded videoPaths from backend
    const [videoOriginPaths, setVideoOriginPaths] = useState(module?.video_origin_path || []); // original file names after upload
// const [uploadProgress, setUploadProgress] = useState({}); // uid: percent

    const [presentationFile, setPresentationFile] = useState(
        module?.presentation_path
    ); // upload
    const [presentationFilePath, setPresentationFilePath] = useState(
        module?.presentation_path || ""
    ); // submit
    const [presentationOriginPath, setPresentationOriginPath] = useState(module?.presentation_origin_path || ""); // original file name after upload
   

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]); // upload video lists

    const [visible, setVisible] = useState(true);
    const [videoVisible, setVideoVisible] = useState(true);
    const [videos, setVideos] = useState(module.video_origin_path);

    // each module state
    useEffect(() => {
        setModuleNo(module.module_no);
        setTitle(module.title);
        setPresentationFile(module.presentation_path);
        setPresentationFilePath(module.presentation_path || "");
        setPresentationOriginPath(module.presentation_origin_path || "");
        setFileList(module?.video_path || []);
        setVideos(module.video_origin_path || []);
    }, [module]);

    useEffect(() => {
        if (module?.video_origin_path?.length && module?.video_path.length) {
            const initialFiles = module.video_origin_path.map(
                (name, index) => ({
                    uid: `existing-${index}`,
                    name: name,
                    url: module.video_path[index],
                    isExisting: true,
                    status: "done", // Mark as done
                })
            );
            setFileList(initialFiles);
        }
    }, [module]);

    // get CSRF token from meta tag
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        const src = URL.createObjectURL(file.originFileObj);
        setPreviewImage(src);
        setPreviewTitle(file.name || "Video Preview");
        setPreviewVisible(true);
    };

    const handleFileChange = ({ fileList }) => {
        setFileList(fileList);
        // setNewVideos(fileList);
        // Set all uploaded files as an array in form data
        const selectedVideos = fileList
            .map((file) => file.originFileObj)
            .filter(Boolean); // Ensure file exists (remove null or undefined)
        setVideoFiles(selectedVideos);
    };

    // handle video upload
    // Async upload handler for Upload component
    const handleVideoUpload = async ({
        file,
        onSuccess,
        onError,
        onProgress,
    }) => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("videoFiles", file);

            const response = await axios.post(
                route("course.module.uploadVideo"),
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": csrfToken,
                        Accept: "application/json",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percent = Math.round(
                            (progressEvent.loaded / progressEvent.total) * 100
                        );
                        setUploadProgress((prev) => ({
                            ...prev,
                            [file.uid]: percent,
                        }));
                        if (onProgress) {
                            onProgress({ percent }, file);
                        }
                    },
                }
            );

            // Update the file in fileList with response data
            setFileList((prevList) =>
                prevList.map((f) =>
                    f.uid === file.uid
                        ? {
                              ...f,
                              status: "done",
                              url: response.data.videoPath,
                              name: response.data.videoOriginPath,
                              response: response.data, // Store the full response
                          }
                        : f
                )
            );

            message.success(`${file.name} uploaded successfully`);
            console.log("video upload filelist: ", fileList);
            setUploading(false);
            setUploadProgress((prev) => ({ ...prev, [file.uid]: 100 }));
            if (onSuccess) onSuccess(response.data, file);
        } catch (error) {
            if (err.response && err.response.status === 403) {
                message.error("Unauthorized: Please login to upload videos.");
            } else if (
                err.response?.status === 419 ||
                err.response?.data?.message?.includes("CSRF")
            ) {
                message.error("Session Expired. Please Refresh the Page.");
            } else {
                message.error(`${file.name} upload failed.`);
            }

            setUploading(false);
            setUploadProgress((prev) => ({ ...prev, [file.uid]: 0 }));
            if (onError) onError(error);
        }
    };

    const handleVideoRemove = (file) => {
        setFileList((prevList) => prevList.filter((f) => f.uid !== file.uid));
        message.success("Video is removed.");
    };
    // handle file upload for presentation files
    const handleFileUpload = async ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append("presentationFile", file);

        try {
            setUploading(true);
            const response = await axios.post(
                route("course.module.uploadPresentation"),
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-CSRF-TOKEN": csrfToken,
                        Accept: "application/json",
                    },
                    onUploadProgress: (event) => {
                        const percent = Math.round(
                            (event.loaded / event.total) * 100
                        );
                        setProgress(percent);
                    },
                }
            );

            // set path for form submit
            // console.log(response);
            setPresentationFilePath(response.data.presentationPath);
            setPresentationOriginPath(response.data.presentationOriginPath);

            setUploading(false);
            message.success("File uploaded successfully");
            onSuccess(response.data);
        } catch (err) {
            if (err.response && err.response.status === 403) {
                message.error("Unauthorized: Please login to upload file.");
            } else if (
                err.response?.status === 419 ||
                err.response?.data?.message?.includes("CSRF")
            ) {
                message.error("Session Expired. Please Refresh the Page.");
            } else {
                message.error(`${file.name} upload failed.`);
            }
            setUploading(false);
            onError(err);
        }
    };

    const beforePresentationFileUpload = (file, fileList) => {
        const isPdf = file.type === "application/pdf";
        if (!isPdf) {
            message.error("Only PDF files are allowed.");
            return Upload.LIST_IGNORE;
        }

        if (fileList.length > 1) {
            message.warning("Only one presentation file can be uploaded.");
            return Upload.LIST_IGNORE;
        }

        return true;
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="mt-8 ">Upload</div>
        </div>
    );

    // Update your handleFormSubmit function
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("courseId", courseId);
        formData.append("formName", "editForm");
        formData.append("moduleNo", moduleNo);

        if (title) {
            formData.append("title", title);
        }

        // Handle video files - both existing and new
        fileList.forEach((file, index) => {
            if (file.isExisting) {
                // For existing files, use the stored URL and name
                formData.append(`videoFiles[${index}]`, file.url);
                formData.append(`videoOriginPaths[${index}]`, file.name);
            } else if (file.response) {
                // For newly uploaded files that completed upload
                formData.append(
                    `videoFiles[${index}]`,
                    file.response.videoPath
                );
                formData.append(
                    `videoOriginPaths[${index}]`,
                    file.response.videoOriginPath
                );
            } else if (file.originFileObj) {
                // For files that are still uploading or haven't been processed
                // You might want to handle this case - either wait for upload or show error
                message.error(
                    `File ${file.name} is still uploading. Please wait.`
                );
                return; // Prevent form submission
            }
        });

        if (presentationFilePath) {
            formData.append("presentationFilePath", presentationFilePath);
        }

        if (presentationOriginPath) {
            formData.append("presentationOriginPath", presentationOriginPath);
        }

        router.post(route("course.module.store", foundCourse.id), formData, {
            forceFormData: true,
            preserveState: false,
            onSuccess: () => {
                message.success("Module updated successfully");
            },
            onError: (errors) => {
                message.error("Module update failed");
            },
        });
    };

    const handleFileRemove = async (filePath) => {
        try {
            const url = route("course.module.deletePresentation", {
                moduleno: moduleNo,
                filepath: filePath,
            });

            const response = await axios.delete(url, {
                headers: {
                    "X-Inertia": "false",
                    Accept: "application/json",
                },
                withCredentials: true, // Send cookies if needed
            });

            // On success, update local state and show message
            setPresentationFilePath(null);
            setPresentationFile(null);
            setPresentationOriginPath(null);

            message.success("File removed successfully");
        } catch (error) {
            if (error.response && error.response.status === 404) {
                message.error("File not found.");
            } else {
                message.error("Failed to remove file.");
            }
        }
    };

    return (
        <>
            <div>
                {ModuleCreationSuccess && (
                    <Alert
                        message={ModuleCreationSuccess}
                        type="success"
                        showIcon
                    />
                )}
                {ModuleCreationError && (
                    <Alert
                        message={ModuleCreationError}
                        type="error"
                        showIcon
                    />
                )}

                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div>
                        <input
                            type="hidden"
                            name="courseId"
                            value={foundCourse.id}
                        />
                        <input type="hidden" name="formName" value="editForm" />
                        <TextInput
                            label="Module No (eg.1)"
                            name="moduleNo"
                            value={module.module_no}
                            onChange={(e) => setModuleNo(e.target.value)}
                            error={errors.moduleno}
                            required
                        />
                    </div>

                    <div className="mt-3">
                        <TextInput
                            label="Module Title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            error={errors.title}
                            // required
                        />
                    </div>

                    {/* video file  */}
                    <div className="mt-3">
                        <label className="mb-2">Upload video</label>
                        <div className="text-yellow-500 font-semibold">
                            ( ** mp4 file only ** )
                        </div>

                        <div className="border border-gray-400 h-70 rounded-lg p-5 mt-2">
                            {errors.videoFiles && (
                                <div className="text-red-500 text-sm">
                                    {errors.videoFiles}
                                </div>
                            )}

                            <Upload
                                name="videoFiles"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={({ fileList }) =>
                                    setFileList(fileList)
                                }
                                onRemove={handleVideoRemove}
                                multiple={false}
                                customRequest={handleVideoUpload}
                                progress={{
                                    strokeWidth: 3,
                                    showInfo: true,
                                }}
                                showPreviewIcon={false}
                                beforeUpload={(file, fileList) => {
                                    if (fileList.length >= 8) {
                                        message.error(
                                            "You can only upload up to 8 videos."
                                        );
                                        return Upload.LIST_IGNORE;
                                    }
                                }}
                            >
                                {fileList?.length >= 8 ? null : uploadButton}
                            </Upload>

                            {/* Progress bar for each uploading file */}
                            {/* {fileList.map((file) => {
                                return uploadProgress[file.uid] &&
                                    uploadProgress[file.uid] < 100 ? (
                                    <div key={file.uid} className="mt-2">
                                        <Progress
                                            percent={uploadProgress[file.uid]}
                                            size="small"
                                        />
                                    </div>
                                ) : null;
                            })} */}

                            <Modal
                                open={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                            >
                                <video
                                    src={previewImage}
                                    controls
                                    className="w-full object-cover rounded-lg"
                                />

                                {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {fileList.map((src, index) => (
                                        <div
                                            key={index}
                                            className="border-2 border-yellow-400 rounded-lg p-2 shadow-md bg-black w-full h-40 overflow-hidden"
                                        >
                                            <video
                                                src={previewImage}
                                                controls
                                                className="w-full h-full object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div> */}
                            </Modal>
                        </div>
                    </div>

                    {/* pdf file  */}
                    <div className="mt-3 flex flex-col">
                        <label>
                            Upload Presentation File{" "}
                            <span className="text-yellow-600">
                                (only 1 file can upload)
                            </span>
                            <div className="text-yellow-500 font-semibold">
                                ( ** PDF file only **)
                            </div>
                        </label>
                        <div
                            className="mt-2 border border-gray-400 rounded-lg
                            py-2 px-5"
                        >
                            <Upload
                                name="presentationFile"
                                customRequest={handleFileUpload}
                                accept=".pdf"
                                maxCount={1}
                                beforeUpload={beforePresentationFileUpload}
                                onRemove={() =>
                                    handleFileRemove(presentationFilePath)
                                }
                                fileList={
                                    presentationFilePath
                                        ? [
                                              {
                                                  // uid: 'current-presentation',
                                                  name:
                                                      presentationOriginPath ||
                                                      module.presentation_origin_path ||
                                                      "Presentation File",
                                                  status: "done",
                                                  url: presentationFilePath,
                                              },
                                          ]
                                        : []
                                }
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload File
                                </Button>
                            </Upload>

                            

                        </div>
                    </div>

                    {/* buttons  */}
                    <div className="flex flex-row justify-end space-x-4">
                        <button
                            type="submit"
                            className="w-20 bg-yellow-300  rounded-md px-4 py-2
                        hover:bg-yellow-500 focus:bg-yellow-500 mt-3"
                        >
                            Update
                        </button>

                        <button
                            type="button"
                            className="w-20 bg-gray-300  rounded-md px-4 py-2
hover:bg-yellow-500 focus:bg-yellow-500 mt-3"
                            onClick={() => onCloseDrawer()}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
