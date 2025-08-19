import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Alert, Card, Col, Drawer, Row } from "antd";
import { Button, message, Modal, Progress, Upload } from "antd";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBoxOpen,
    faEnvelope,
    faPen,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { PlayCircleOutlined } from "@ant-design/icons";
import CourseModuleCreationForm from "./Partials/CourseModuleCreationForm";
import CourseEditForm from "./Partials/CourseEditForm";

export default function ShowClass({
    foundCourse,
    groupModules,
    ModuleCreationSuccess,
    ModuleCreationError,
}) {
    console.log("foundCourse is ", foundCourse);
    console.log("groupModules from ShowClass.jsx: ", groupModules);

    // const { ModuleCreationSuccess, ModuleCreationError } = usePage().props;
    console.log("ModuleCreationSuccess", ModuleCreationSuccess);
    const [successMessage, setSuccessMessage] = useState(ModuleCreationSuccess);
    const [errorMessage, setErrorMessage] = useState(ModuleCreationError);

    const [openDrawer, setOpenDrawer] = useState(false);
    const [openEditCourseDrawer, setOpenEditCourseDrawer] = useState(false);

    const [visible, setVisible] = useState(false);
    const [videoModalOpen, setVideoModalOpen] = useState(false);

    const [initials, setInitials] = useState(null);

    useEffect(() => {
        if (foundCourse && foundCourse.photo === null) {
            const parts = foundCourse.course_name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((char) => char[0].toUpperCase());
            setInitials(parts.join("") || "NA");
        }
    }, [groupModules]);

    useEffect(() => {
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
    }, [ModuleCreationSuccess, ModuleCreationError]);

    // initial for img

    const showDrawer = () => {
        setOpenDrawer(true);
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
        resetForm();
        router.get(
            route("course.show", { id: foundCourse.id }),
            {},
            { preserveState: false, replace: true }
        );
    };

    return (
        <>
            <AuthenticatedLayout>
                <div className="mt-24 ">
                    {successMessage && (
                        <div className="w-1/3 mx-auto mt-10 transition-opacity duration-500 ease-in-out">
                            <Alert
                                message={successMessage}
                                type="success"
                                showIcon
                            />
                        </div>
                    )}

                    {ModuleCreationError && (
                        <div className="w-1/3 mx-auto mt-10">
                            <Alert
                                message={ModuleCreationError}
                                type="error"
                                showIcon
                            />
                        </div>
                    )}
                    {/* edit and create module buttons */}
                    <div className="flex justify-end mr-5 md:mr-[150px] lg:mr-[300px] mb-4 space-x-4">
                        <button
                            type="button"
                            className="bg-yellow-300 rounded-md px-4 py-2 hover:bg-yellow-500 focus:bg-yellow-500
               text-sm mt-3"
                            onClick={() => setOpenEditCourseDrawer(true)}
                            // onClick={showEditCourseDrawer}
                        >
                            <FontAwesomeIcon icon={faPen} className="mr-2" />
                            Edit Course
                        </button>
                    </div>

                    <div className="flex flex-col">
                        <Card className=" py-5 md:px-40">
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
                            <div className="flex justify-end mr-5 md:mr-[150px] lg:mr-[280px] mb-4 space-x-4">
                                <button
                                    type="submit"
                                    className=" bg-yellow-300  rounded-md px-4 py-2
                        hover:bg-yellow-500 focus:bg-yellow-500 mt-3 mb-4 "
                                    onClick={showDrawer}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    />
                                    Create Module
                                </button>

                                {/* edit module  */}
                                {/* <button
                                    type="submit"
                                    className=" bg-yellow-300  rounded-md px-4 py-2
                        hover:bg-yellow-500 focus:bg-yellow-500 mt-3 mb-4 md:mr-48
                        "
                                    onClick={showDrawer}
                                >
                                    <FontAwesomeIcon
                                        icon={faPen}
                                        className="mr-2"
                                    />
                                    Edit Module
                                </button> */}

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
                                    ></CourseModuleCreationForm>
                                </Drawer>

                                <Drawer
                                    title="Edit Course"
                                    width={700}
                                    closable={{ "aria-label": "Close Button" }}
                                    open={openEditCourseDrawer}
                                    onClose={() =>
                                        setOpenEditCourseDrawer(false)
                                    }
                                >
                                    <CourseEditForm
                                        foundCourse={foundCourse}
                                    ></CourseEditForm>
                                </Drawer>
                            </div>

                            <div className="md:px-40 ">
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
                                                <h3 className="mb-4 flex flex-row">
                                                    <div className="text-md font-semibold">
                                                        Module No ({" "}
                                                        <strong>
                                                            {moduleNo}
                                                        </strong>{" "}
                                                        ) :
                                                    </div>
                                                    {modules.map((module) => (
                                                        <span className="ml-4 text-md ">
                                                            {module.title}
                                                        </span>
                                                    ))}
                                                </h3>
                                                {modules &&
                                                    modules.map((module) => (
                                                        <>
                                                            {/* video path  */}
                                                            <div className="mb-2 ">
                                                                {module.video_origin_path ? (
                                                                    module.video_origin_path.map(
                                                                        (
                                                                            video,
                                                                            index
                                                                        ) => {
                                                                            const filename =
                                                                                video
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .pop();

                                                                            return (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="flex flex-col md:flex-row items-center md:space-x-4 md:space-y-2"
                                                                                >
                                                                                    <div className="flex flex-col md:flex-row items-center">
                                                                                        {/* preview video */}
                                                                                        <div
                                                                                            className="w-20 h-20 mr-4 mt-4 mb-2 flex items-center justify-center bg-gray-200 rounded-lg cursor-pointer hover:shadow-xl transition"
                                                                                            onClick={() => {
                                                                                                setVideoModalOpen(
                                                                                                    true
                                                                                                );
                                                                                                setCurrentVideo(
                                                                                                    video
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <PlayCircleOutlined
                                                                                                style={{
                                                                                                    fontSize:
                                                                                                        "25px",
                                                                                                    color: "#1f2937",
                                                                                                }}
                                                                                            />
                                                                                        </div>

                                                                                        <Modal
                                                                                            open={
                                                                                                videoModalOpen
                                                                                            }
                                                                                            onCancel={() =>
                                                                                                setVideoModalOpen(
                                                                                                    false
                                                                                                )
                                                                                            }
                                                                                            footer={
                                                                                                null
                                                                                            }
                                                                                            title={
                                                                                                filename
                                                                                            }
                                                                                            width="80%"
                                                                                            height={
                                                                                                800
                                                                                            }
                                                                                            centered
                                                                                            className="mt-4"
                                                                                        >
                                                                                            <video
                                                                                                src={
                                                                                                    video
                                                                                                }
                                                                                                controls
                                                                                                className="w-full "
                                                                                                autoPlay
                                                                                            />
                                                                                        </Modal>

                                                                                        <div>
                                                                                            {" "}
                                                                                            {
                                                                                                filename
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )
                                                                ) : (
                                                                    <></>
                                                                    // <div>No Videos available</div>
                                                                )}
                                                            </div>

                                                            <div>
                                                                {module.presentation_origin_path && (
                                                                    <>
                                                                        <div className="flex flex-col space-y-4 md:flex-row items-center space-x-4">
                                                                            <Button
                                                                                onClick={() =>
                                                                                    setVisible(
                                                                                        true
                                                                                    )
                                                                                }
                                                                            >
                                                                                {" "}
                                                                                <span className="text-gray-500">
                                                                                    View
                                                                                    PDF
                                                                                </span>
                                                                            </Button>
                                                                            <div className=" text-sm pb-4">
                                                                                {module.presentation_origin_path
                                                                                    .split(
                                                                                        "/"
                                                                                    )
                                                                                    .pop()}
                                                                            </div>
                                                                        </div>
                                                                        <Modal
                                                                            open={
                                                                                visible
                                                                            }
                                                                            onCancel={() =>
                                                                                setVisible(
                                                                                    false
                                                                                )
                                                                            }
                                                                            footer={
                                                                                null
                                                                            }
                                                                            title="Presentation Preview"
                                                                            width="100%"
                                                                            className="mt-4"
                                                                        >
                                                                            <iframe
                                                                                src={
                                                                                    module.presentation_origin_path
                                                                                }
                                                                                width="100%"
                                                                                height={
                                                                                    600
                                                                                }
                                                                            />
                                                                        </Modal>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </>
                                                    ))}
                                            </Card>
                                        )
                                    )}
                            </div>
                            {/* {groupModules.modules.length==0 && (
                            <div className="flex flex-col justify-center text-center h-52  text-gray-500">
                                <FontAwesomeIcon
                                    icon={faBoxOpen}
                                    className="self-center w-12 h-12"
                                />
                                No Module Created for this Course
                            </div>
                        )} */}

                            <div></div>
                        </Card>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
