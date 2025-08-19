import TextInput from "@/Components/Form/TextInput";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Alert, Button, message, Modal, Progress, Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function CourseModuleCreationForm({
    foundCourse,
    groupModules,
    onCloseDrawer,
}) {
    const { errors } = useForm();
    const { ModuleCreationSuccess, ModuleCreationError } = usePage().props;

    const [courseId, setCourseId] = useState(foundCourse.id);
    const [moduleNo, setModuleNo] = useState(null);
    const [title, setTitle] = useState("");

    const [videoFiles, setVideoFiles] = useState([]); // local File objects
    const [uploading, setUploading] = useState(false);
    const [videoPaths, setVideoPaths] = useState([]); // after uploaded videoPaths from backend
    const [videoOriginPaths, setVideoOriginPaths] = useState([]); // original file names after upload
    const [uploadProgress, setUploadProgress] = useState({}); // uid: percent

    const [presentationFile, setPresentationFile] = useState(null); // upload
    const [presentationFilePath, setPresentationFilePath] = useState(""); // submit
    const [presentationOriginPath, setPresentationOriginPath] = useState(""); // original file name after upload

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState([]);

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
                        if (onProgress) onProgress({ percent });
                    },
                }
            );
            //  update fileList with video path
            // append VideoPaths to send when form submit
            setVideoPaths((prev) => [...prev, response?.data?.videoPath]);
            setVideoOriginPaths((prev) => [
                ...prev,
                response?.data?.videoOriginPath,
            ]);
            // setFileList((prevList) =>
            // prevList.map((f) =>
            // f.uid === file.uid
            // ? {
            //   ...f,
            //   status: "done",
            //   }
            // : f
            // )
            // );

            message.success(`${file.name} uploaded successfully`);
            setUploading(false);
            setUploadProgress((prev) => ({ ...prev, [file.uid]: 100 }));
            if (onSuccess) onSuccess(null, file);
        } catch (error) {
            if (error.response && error.response.status === 403) {
                message.error("Unauthorized: Please login to upload videos.");
            } else if (
                error.response?.status === 419 ||
                error.response?.data?.message?.includes("CSRF")
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
                        // setProgress(percent);
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
            if (err.response && error.response.status === 403) {
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

    // const beforeUpload = (file) => {
    //     const newName = `module-${data.moduleno}-video.mp4`;
    //     const renamedFile = new File([file], newName, {
    //         type: file.type,
    //     });
    //     setData("video", renamedFile);
    //     setFileList((prevList) => [
    //         ...prevList,
    //         {
    //             ...file,
    //             originFileObj: renamedFile,
    //             name: newName,
    //         },
    //     ]);
    // };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="mt-8 ">Upload</div>
        </div>
    );

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("courseId", courseId);
        formData.append("moduleNo", moduleNo);
        if (title) {
            formData.append("title", title);
        }
        // got uploaded successful video file path links
        if (videoPaths.length > 0) {
            videoPaths.forEach((url, index) => {
                formData.append(`videoFiles[${index}]`, url); //append to db
            });
        }
        if (videoOriginPaths.length > 0) {
            videoOriginPaths.forEach((url, index) => {
                formData.append(`videoOriginPaths[${index}]`, url);
            });
        }

        if (presentationFilePath) {
            formData.append("presentationFilePath", presentationFilePath);
        }

        if (presentationOriginPath) {
            formData.append("presentationOriginPath", presentationOriginPath);
        }

        Inertia.post(route("course.module.store", foundCourse.id), formData, {
            forceFormData: true,
            preserveState: false,
            onSuccess: () => {
                // console.log("onSucess message alert");
                message.success("Module created successfully");
                // props.onCloseDrawer();
                // form.resetFields();
                // props.onFlashMessageShow("Module created successfully");
                // window.location.href = route("course.show", foundCourse.id);
            },
            onError: (errors) => {
                message.error("Module creation failed");
                // console.log("Modle Creation Error: ", errors);
                // props.onFlashMessageShow("Module creation failed");
            },
        });
        router.get(route("course.show", foundCourse.id));
        reset();
        resetForm();
    };

    return (
        <>
            <div>
                {console.log(ModuleCreationSuccess)}
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
                        <TextInput
                            label="Module No (eg.1)"
                            name="moduleNo"
                            value={moduleNo}
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

                    <div className="mt-3">
                        <label className="mb-2">
                            Upload video (Max 8 videos can be uploaded.)
                        </label>
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
                                onChange={handleFileChange}
                                multiple={false}
                                customRequest={handleVideoUpload}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            {/* Progress bar for each uploading file */}
                            {fileList.map((file) =>
                                uploadProgress[file.uid] &&
                                uploadProgress[file.uid] < 100 ? (
                                    <div key={file.uid} className="mt-2">
                                        <Progress
                                            percent={uploadProgress[file.uid]}
                                            size="small"
                                        />
                                    </div>
                                ) : null
                            )}

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

                    <div className="mt-3 flex flex-col">
                        <label>
                            Upload Presentation File{" "}
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
                                // action
                                customRequest={handleFileUpload}
                                accept=".pdf"
                                maxCount={1}
                                beforeUpload={beforePresentationFileUpload}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload File
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end space-x-4">
                        <button
                            type="submit"
                            className="w-20 bg-yellow-300  rounded-md px-4 py-2
                        hover:bg-yellow-500 focus:bg-yellow-500 mt-3"
                        >
                            Create
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
