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
} from "antd";
import { useEffect, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";

import CourseSearchForm from "./Partials/CourseSearchForm";
import CourseCreationForm from "./Partials/CourseCreationForm";
import ResultTable from "./Partials/ResultTable";

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

    console.log("Created Course from Class: ", createdCourse);

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
            route("course.show", course.id),
            {},
            {
                preserveState: true,
            }
        );
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
                        type="button"
                        onClick={() => handleShowButton(record)}
                        className="text-yellow-600"
                    >
                        Show
                    </Button>
                    <Button
                        type="link"
                        onClick={() => console.log("Edit button clicked")}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => console.log("delete clicked")}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // table: pagination page
    const handlePageChange = (page, pageSize) => {
        Inertia.get(route("course.select"), { page }, { preserveState: true });
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
                            {CourseCreationSuccess && (
                                <>
                                    <div className="mx-auto mt-10">
                                        <Alert
                                            message={CourseCreationSuccess}
                                            type="success"
                                            showIcon
                                            className="mb-4"
                                        />
                                    </div>
                                </>
                            )}

                            {CourseCreationError && (
                                <>
                                    <div className="mx-auto mt-10">
                                        <Alert
                                            message={CourseCreationError}
                                            type="error"
                                            showIcon
                                            className="mb-4"
                                        />
                                    </div>
                                </>
                            )}
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
                            {/* class list table 2 */}
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
                                ></ResultTable>
                            )}
                        </PageContainer>
                    </div>
                </ConfigProvider>
            </AuthenticatedLayout>
        </>
    );
}
