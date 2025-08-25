import "../../../css/app.css";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import {
    faAngleDown,
    faArrowDown,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Alert,
    Button,
    ConfigProvider,
    Drawer,
    Popconfirm,
    Space,
    Table,
    Modal,
    message,
} from "antd";
import { useEffect, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";

import CourseSearchForm from "./Partials/CourseSearchForm";
import CourseCreationForm from "./Partials/CourseCreationForm";
import ResultTable from "./Partials/ResultTable";
import { select } from "@material-tailwind/react";

export default function Course() {
    const {
        courses = {},
        createdCourse = {},
        searchedCourses = {},
        requestOldData = {},
        courseNotFoundError,
        isSearching,
        CourseCreationSuccess,
        CourseCreationError,
    } = usePage().props;

    const coursesAllList = courses?.data ?? [];
    const searchList = searchedCourses?.data ?? [];
    const [openDrawer, setOpenDrawer] = useState(false);
    const [search, setSearch] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null); // Track which course to delete

    // search: data
    const {
        data: searchData,
        setData: setSearchData,
        get: searchGet,
        reset: resetSearch,
    } = useForm({
        coursename: requestOldData?.coursename || "",
        academicyear: requestOldData?.academicyear || "",
        semester: requestOldData?.semester || "",
    });

    /* search form things */
    // search: academic year select option
    const uniqueYears = Array.from(
        new Set(coursesAllList.map((course) => course.academic_year))
    );

    const academicYearOptions = uniqueYears.map((year) => ({
        label: year,
        value: year,
    }));

    // search: semester select options
    const semesterOptions = [
        { label: "1st Semester", value: "1st Semester" },
        { label: "2nd Semester", value: "2nd Semester" },
    ];

    // search: handle data change
    const handleSearchDataChange = (e) => {
        setSearchData(e.target.name, e.target.value);
        setSearch(true); // show table list
    };

    // search: form submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchGet(
            route("course.search"),
            {
                search: searchData,
            },
            {
                preserveState: true,
                replace: false,
                onSuccess: () => {
                    console.log("after search submit button: " + searchData);
                },
            }
        );
    };

    // search : reset
    const handleReset = () => {
        setSearch(false);
        resetSearch();

        searchGet(
            route("course"),
            {},
            {
                preserveState: false,
                replace: true,
                only: [],
            }
        );
    };

    // drawer
    const showDrawer = () => {
        setOpenDrawer(true);
        router.get(route("course.create"), {}, { preserveState: true });
    };

    const closeDrawer = () => {
        setOpenDrawer(false);
        router.get(
            route("course"),
            {},
            { preserveState: false, replace: true }
        );
    };

    const handleShowButton = (course) => {
        router.get(
            route("course.edit", course.id),
            {},
            {
                preserveState: true,
            }
        );
    };

    // delete Modal
    const handleDeleteButton = (course) => {
        setSelectedCourse(course);
        setIsModalOpen(true);
        console.log("selected course: ", course);
    };

    const handleOk = async () => {
        router.delete(route("course.delete", { id: selectedCourse.id }), {
            onSuccess: () => {
                setIsModalOpen(false);
                message.success("Course is deleted successfully.");
            },
            onError: (errors) => {
                if (errors.courseNotFoundError) {
                    message.error(errors.courseNotFoundError);
                } else if (errors.courseDeleteError) {
                    message.error(errors.courseDeleteError);
                } else {
                    message.error("Failed to delete the course.");
                }
            },
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedCourse(null);
    };

    // table: table list
    const columns = [
        {
            title: "Course Name",
            dataIndex: "course_name",
            key: "coursename",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Academic Year",
            dataIndex: "academic_year",
            key: "academicyear",
        },
        {
            title: "Semester",
            dataIndex: "semester",
            key: "semester",
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "startdate",
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "enddate",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => handleShowButton(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        className="border-none text-red-600 hover:text-red-800"
                        onClick={() => handleDeleteButton(record)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    // table: pagination page
    const handlePageChange = (page, pageSize) => {
        router.get(route("course"), { page }, { preserveState: true });
    };

    return (
        <>
            <AuthenticatedLayout>
                <ConfigProvider
                    theme={{
                        components: {
                            Radio: {
                                buttonBg: "#ffffff",
                                buttonColor: "#000000",
                                buttonCheckedBg: "#fef08a",
                                buttonCheckedColor: "#000000",
                            },
                            Select: {
                                optionActiveBg: "transparent",
                                optionSelectedBg: "transparent",
                                controlOutline: "none",
                                boxShadow: "none",
                                colorBorder: "#DDDAD0",
                                colorTextPlaceholder: "#7A7A73",
                                fontSize: "16px",
                            },
                        },
                        token: {
                            colorPrimary: "#fef08a",
                            colorPrimaryHover: "#fef08a",
                        },
                    }}
                >
                    {/* create course form  */}
                    <div>
                        <PageContainer
                            header={{
                                title: "Class List",
                            }}
                        >
                            {/* create button  */}
                            <div className="flex justify-end">
                                <button
                                    className="bg-yellow-300 hover:bg-yellow-500 focus:bg-yellow-500
                                rounded-lg px-4 py-2 mb-3 mt-10                               
                                w-full sm:w-auto
                                "
                                    onClick={() => showDrawer()}
                                    aria-label="Create Class Button"
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    ></FontAwesomeIcon>
                                    Create Class
                                </button>

                                <Drawer
                                    title="Create Class"
                                    width={600}
                                    closable={{ "aria-label": "Close Button" }}
                                    open={openDrawer}
                                    onClose={closeDrawer}
                                >
                                    {/* form  */}
                                    <CourseCreationForm
                                        createdCourse={createdCourse}
                                        onCloseDrawer={closeDrawer}
                                    ></CourseCreationForm>
                                </Drawer>
                            </div>


                            {/*  Search by className, teachername, academic year/semester */}
                            <ProCard split="vertical" wrap className="">
                                <ProCard
                                    colSpan={{
                                        xs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "80%",
                                        xl: "80%",
                                    }}
                                >
                                    <CourseSearchForm
                                        onSubmit={handleSearchSubmit}
                                        onChange={handleSearchDataChange}
                                        searchData={searchData}
                                        academicYearOptions={
                                            academicYearOptions
                                        }
                                        semesterOptions={semesterOptions}
                                    ></CourseSearchForm>
                                </ProCard>

                                {/* search/ reset radio group  */}
                                <ProCard
                                    colSpan={{
                                        xs: "100%",
                                        sm: "100%",
                                        md: "100%",
                                        lg: "20%",
                                        xl: "20%",
                                    }}
                                >
                                    <div className="flex flex-row space-x-2">
                                        <button
                                            className="w-20 bg-yellow-200 px-4 py-2 border-2 rounded-md
                                                 focus:bg-yellow-200 active:bg-yellow-200 "
                                            onClick={handleSearchSubmit}
                                        >
                                            Search
                                        </button>
                                        <button
                                            className="w-20 bg-yellow-200 px-4 py-2 border-2 rounded-md
                                                focus:bg-yellow-200 active:bg-yellow-200"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </ProCard>
                            </ProCard>


                            {/* search list table */}
                            {isSearching && searchList.length > 0 && (
                                <ResultTable
                                    list={searchList}
                                    columns={columns}
                                    data={searchedCourses}
                                    onPageChange={handlePageChange}
                                ></ResultTable>
                            )}

                            {isSearching && searchList.length == 0 && (
                                <div className="text-gray-600 text-center bg-gray-300 py-5 px-2">
                                    Course Not Found
                                </div>
                            )}

                            {!isSearching && coursesAllList.length > 0 && (
                                <ResultTable
                                    list={coursesAllList}
                                    columns={columns}
                                    data={courses}
                                    onPageChange={handlePageChange}
                                ></ResultTable>
                            )}
                        </PageContainer>
                    </div>
                </ConfigProvider>

                {/* Move Modal outside of ConfigProvider to ensure proper rendering */}
                <Modal
                    title="Delete Course"
                    open={isModalOpen}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            No
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            className="bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 text-white border-none"
                            onClick={handleOk}
                        >
                            Confirm
                        </Button>,
                    ]}
                    centered
                >
                    <p>
                        Are you sure you want to delete the course "
                        <strong>{selectedCourse?.course_name}</strong>"?
                    </p>
                </Modal>
            </AuthenticatedLayout>
        </>
    );
}
