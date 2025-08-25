import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Alert, Card, Drawer } from "antd";
import { Button, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faPen,
    faPlus,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { PlayCircleOutlined } from "@ant-design/icons";
import CourseModuleCreationForm from "./Partials/CourseModuleCreationForm";
import CourseEditForm from "./Partials/CourseEditForm";
import CourseModuleEditForm from "./Partials/CourseModuleEditForm";
import { router } from "@inertiajs/react";

export default function ShowClass({
    foundCourse,
    groupModules,
    moduleExisted,
    ModuleCreationSuccess,
    ModuleCreationError,
    deletePresentationSuccess,
}) {
    const [moduleExistedMsg, setModuleExistedMsg] = useState(moduleExisted);
    const [successMessage, setSuccessMessage] = useState(ModuleCreationSuccess);
    const [errorMessage, setErrorMessage] = useState(ModuleCreationError);
    const [deleteMsg, setDeleteMsg] = useState(deletePresentationSuccess);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [openEditCourseDrawer, setOpenEditCourseDrawer] = useState(false);
    const [openEditModuleDrawer, setOpenEditModuleDrawer] = useState(false);

    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [currentVideoName, setCurrentVideoName] = useState(null);

    const [initials, setInitials] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedDeleteModule, setSelectedDeleteModule] = useState(null);

    useEffect(() => {
        if (foundCourse && foundCourse.photo === null) {
            const parts = foundCourse.course_name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((char) => char[0].toUpperCase());
            setInitials(parts.join("") || "NA");
        }
    }, [foundCourse]);

    useEffect(() => {
        if (moduleExisted) {
            const timer = setTimeout(() => {
                setModuleExistedMsg(null);
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (ModuleCreationSuccess) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }

        if (ModuleCreationError) {
            const timer1 = setTimeout(() => {
                setErrorMessage(null);
            }, 3000);
            return () => clearTimeout(timer1);
        }

        if (deletePresentationSuccess) {
            const timer3 = setTimeout(() => {
                setDeleteMsg(null);
            }, 3000);
            return () => clearTimeout(timer3);
        }
    }, [
        moduleExisted,
        ModuleCreationSuccess,
        ModuleCreationError,
        deletePresentationSuccess,
    ]);

    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const showEditModuleDrawer = (module) => {
        setSelectedModule(module);
        setOpenEditModuleDrawer(true);
    };

    const closeEditModuleDrawer = () => {
        setOpenEditModuleDrawer(false);
    };

    const openPdfModal = (path) => {
        const pdfUrl = `${window.location.origin}${path}`;
        window.open(pdfUrl, "_blank");
    };

    const openVideoModal = (path, namePath) => {
        setVideoModalOpen(true);
        setCurrentVideo(`${window.location.origin}${path}`);
        const name = namePath.split("/").pop();
        setCurrentVideoName(name);
    };

    // delete modal
    const showDeleteModal = (module) => {
        setIsDeleteModalOpen(true);
        setSelectedDeleteModule(module);
    };
    // const handleOk = async () => {
    //     try{
    //         const url = route('course.module.delete',{
    //             courseid : selectedDeleteModule.course_id,
    //             moduleno: selectedDeleteModule.module_no,
    //         });

    //         const response = await axios.delete(url, {
    //             headers:{
    //                 "X-Inertia" : "false",
    //                 Accept: "application/json",
    //             },
    //             withCredentials: true,
    //         });

    //         setIsDeleteModalOpen(false);
    //         message.success("Module is deleted successfully");

    //     }catch(error){
    //         message.error("Failed to delete module.");
    //     }
    // };

    const handleOk = async () => {
        router.delete(route("course.module.delete", { courseid: selectedDeleteModule.course_id, moduleno : selectedDeleteModule.module_no }), {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                message.success("Module is deleted successfully.");
            },
            onError: (errors) => {
                if (errors.moduleNotFoundError) {
                    message.error(errors.courseNotFoundError);
                } else if (errors.moduleDeleteError) {
                    message.error(errors.courseDeleteError);
                } else {
                    message.error("Failed to delete the course.");
                }
            },
        });
    };
    const handleCancel = () => {
        setIsDeleteModalOpen(false);
    };

    return (
        <AuthenticatedLayout>
            <div className="mt-48 ">
                {moduleExistedMsg && (
                    <div className="w-1/3 mx-auto mt-10 transition-opacity duration-500 ease-in-out">
                        <Alert
                            message={moduleExistedMsg}
                            type="warning"
                            showIcon
                        />
                    </div>
                )}
                {ModuleCreationSuccess && (
                    <div className="w-1/3 mx-auto mt-10 transition-opacity duration-500 ease-in-out">
                        <Alert
                            message={ModuleCreationSuccess}
                            type="success"
                            showIcon
                        />
                    </div>
                )}

                {errorMessage && (
                    <div className="w-1/3 mx-auto mt-10">
                        <Alert message={errorMessage} type="error" showIcon />
                    </div>
                )}

                {deleteMsg && (
                    <Alert message={deleteMsg} type="success" showIcon />
                )}

                {/* edit course buttons */}
                <div className="flex justify-end mr-5 md:mr-[150px] lg:mr-[300px] mb-4 space-x-4">
                    <button
                        type="button"
                        className="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 focus:bg-yellow-500 text-sm mt-3"
                        onClick={() => setOpenEditCourseDrawer(true)}
                    >
                        <FontAwesomeIcon icon={faPen} className="mr-2" />
                        Edit Course
                    </button>
                </div>

                <div className="flex flex-col">
                    <Card className="py-5 md:px-40">
                        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
                            <div className="flex-shrink-0 w-1/4 flex items-center justify-center mr-10">
                                {foundCourse.photo ? (
                                    <img
                                        src={`/storage/${foundCourse.photo}`}
                                        alt={foundCourse.course_name}
                                        className="w-[300px] md:w-[400px] h-52 object-cover rounded-lg border"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-48 bg-gray-200 rounded-lg border text-3xl font-bold text-gray-500">
                                        {initials}
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 flex-col justify-center md:self-auto grid md:grid-cols-2 gap-2 w-full">
                                <div className="flex flex-col gap-2">
                                    <p>
                                        <span className="text-gray-500 mr-2">
                                            Course Name:
                                        </span>
                                        {foundCourse.course_name}
                                    </p>
                                    <p>
                                        <span className="text-gray-500 mr-2">
                                            Description:
                                        </span>
                                        {foundCourse.description}
                                    </p>
                                    <p>
                                        <span className="text-gray-500 mr-2">
                                            Start Date:
                                        </span>
                                        {foundCourse.start_date}
                                    </p>
                                    <p>
                                        <span className="text-gray-500 mr-2">
                                            End Date:
                                        </span>
                                        {foundCourse.end_date}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>
                                        <span className="text-gray-500 mr-2">
                                            Academic Year:
                                        </span>
                                        {foundCourse.academic_year}
                                    </p>
                                    <p>
                                        <span className="text-gray-500 mr-2">
                                            Semester:
                                        </span>
                                        {foundCourse.semester}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="mt-10">
                        {/* button container */}
                        <div className="flex justify-end mr-5 md:mr-[138px] lg:mr-[280px] mb-4 space-x-4">
                            <button
                                type="submit"
                                className="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 focus:bg-yellow-500 mt-3 mb-4"
                                onClick={showDrawer}
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="mr-2"
                                />
                                Create Module
                            </button>

                            {/* module creation  */}
                            <Drawer
                                title="Create Module"
                                width={700}
                                closable={{ "aria-label": "Close Button" }}
                                open={openDrawer}
                                onClose={closeDrawer}
                            >
                                <CourseModuleCreationForm
                                    foundCourse={foundCourse}
                                    groupModules={groupModules || null}
                                    onCloseDrawer={closeDrawer}
                                />
                            </Drawer>

                            {/* course edit  */}
                            <Drawer
                                title="Edit Course"
                                width={700}
                                closable={{ "aria-label": "Close Button" }}
                                open={openEditCourseDrawer}
                                onClose={() => setOpenEditCourseDrawer(false)}
                            >
                                <CourseEditForm foundCourse={foundCourse} />
                            </Drawer>
                        </div>

                        <div className="md:px-40">
                            {groupModules &&
                                Object.keys(groupModules).length === 0 && (
                                    <div className="flex flex-col justify-center text-center h-52 text-gray-500">
                                        <FontAwesomeIcon
                                            icon={faBoxOpen}
                                            className="self-center w-12 h-12"
                                        />
                                        No Module Created for this Course
                                    </div>
                                )}

                            {groupModules &&
                                Object.entries(groupModules).map(
                                    ([moduleNo, modules]) => (
                                        <Card
                                            key={moduleNo}
                                            className="py-5 px-10 mb-5 border-2 border-gray-200"
                                        >
                                            {modules.map((module) => (
                                                <div key={module.id}>
                                                    <div className="flex justify-end lg:mr-20 space-x-3">
                                                        <button
                                                            type="button"
                                                            className="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 focus:bg-yellow-500 text-sm mt-3"
                                                            onClick={() =>
                                                                showEditModuleDrawer(
                                                                    module
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faPen}
                                                                className="mr-2"
                                                            />
                                                            Edit
                                                        </button>

                                                        <button
                                                            type="button"
                                                            className="bg-red-700 text-white rounded-md px-4 py-2 hover:bg-red-800 focus:bg-red-800 text-sm mt-3"
                                                            onClick={() =>
                                                                showDeleteModal(
                                                                    module
                                                                )
                                                            }
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                                className="mr-2"
                                                            />
                                                            Delete
                                                        </button>
                                                    </div>

                                                    <div className="text-md font-semibold">
                                                        Module No (
                                                        <strong>
                                                            {module.module_no}
                                                        </strong>
                                                        ) : {module.title}
                                                    </div>

                                                    {/* video path  */}
                                                    <div className="flex flex-col">
                                                        <div className="mb-2">
                                                            {module.video_path &&
                                                                module.video_path.map(
                                                                    (
                                                                        video,
                                                                        index
                                                                    ) => {
                                                                        const filename =
                                                                            module.video_origin_path[
                                                                                index
                                                                            ]
                                                                                ?.split(
                                                                                    "/"
                                                                                )
                                                                                .pop() ||
                                                                            "video";

                                                                        return (
                                                                            <div
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="flex flex-col md:flex-row items-center md:space-x-4 md:space-y-2 mt-3"
                                                                            >
                                                                                <div className="flex flex-col md:flex-row items-center md:space-x-4 w-full mb-4">
                                                                                    {/* Video Preview */}
                                                                                    <div
                                                                                        className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer hover:shadow-xl transition"
                                                                                        onClick={() =>
                                                                                            openVideoModal(
                                                                                                video,
                                                                                                module
                                                                                                    .video_origin_path[
                                                                                                    index
                                                                                                ]
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <PlayCircleOutlined
                                                                                            style={{
                                                                                                fontSize:
                                                                                                    "25px",
                                                                                                color: "#1f2937",
                                                                                            }}
                                                                                        />
                                                                                    </div>

                                                                                    {/* File Info and Download */}
                                                                                    <div className="flex flex-col w-full mt-2 md:mt-0">
                                                                                        {/* File Name */}
                                                                                        <div className="text-sm text-gray-800">
                                                                                            {
                                                                                                filename
                                                                                            }
                                                                                        </div>

                                                                                        {/* Download Link */}
                                                                                        <div className="mt-1">
                                                                                            <a
                                                                                                href={`${window.location.origin}${video}`}
                                                                                                download
                                                                                                className="text-blue-600 hover:text-blue-800 underline text-sm"
                                                                                            >
                                                                                                Download
                                                                                            </a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}
                                                        </div>

                                                        {/* presentation path  */}
                                                        {module.presentation_path && (
                                                            <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-6 space-y-4 md:space-y-0 py-4">
                                                                {/* View Button */}
                                                                <Button
                                                                    onClick={() =>
                                                                        openPdfModal(
                                                                            module.presentation_path
                                                                        )
                                                                    }
                                                                    className="text-white bg-yellow-600 hover:bg-blue-700"
                                                                >
                                                                    View PDF
                                                                </Button>

                                                                {/* File Name & Download */}
                                                                <div className="text-sm text-gray-700">
                                                                    <span className="font-medium">
                                                                        {module.presentation_origin_path
                                                                            ?.split(
                                                                                "/"
                                                                            )
                                                                            .pop()}
                                                                    </span>
                                                                    <a
                                                                        href={`${window.location.origin}${module.presentation_path}`}
                                                                        download
                                                                        className="ml-4 text-blue-600 underline hover:text-blue-800"
                                                                    >
                                                                        Download
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </Card>
                                    )
                                )}

                            {/* video modal  */}
                            <Modal
                                open={videoModalOpen}
                                onCancel={() => setVideoModalOpen(false)}
                                footer={null}
                                title={currentVideoName}
                                width="80%"
                                centered
                                className="mt-4"
                            >
                                <video
                                    src={currentVideo}
                                    controls
                                    className="w-full"
                                    autoPlay
                                />
                            </Modal>

                            {/* module delete modal  */}
                            <Modal
                                title="Delete Module"
                                open={isDeleteModalOpen}
                                footer={null}
                                centered
                            >
                                <p>Are you sure to delete that whole module?</p>

                                <div className="flex justify-end space-x-4 mt-4">
                                    <Button
                                        className="bg-yellow-300 hover:bg-yellow-500 focus:bg-yellow-500"
                                        onClick={handleOk}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                        className="bg-gray-200 w-20 hover:bg-gray-400 focus:bg-gray-400"
                                        onClick={handleCancel}
                                    >
                                        No
                                    </Button>
                                </div>
                            </Modal>

                            {/* edit drawer  */}
                            <Drawer
                                title="Edit Module"
                                width={700}
                                closable={{
                                    "aria-label": "Close Button",
                                }}
                                open={openEditModuleDrawer}
                                onClose={closeEditModuleDrawer}
                            >
                                <CourseModuleEditForm
                                    foundCourse={foundCourse}
                                    module={selectedModule}
                                    onCloseDrawer={closeEditModuleDrawer}
                                />
                            </Drawer>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
