import DateInput from "@/Components/Form/DateInput";
import FormButton from "@/Components/Form/FormButton";
import Selection from "@/Components/Form/Selection";
import TextInput from "@/Components/Form/TextInput";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "antd";
import { useState, useEffect } from "react";
import { router, useForm } from "@inertiajs/react";
import CourseModuleCreationForm from "./CourseModuleCreationForm";
import FileInput from "@/Components/Form/FileInput";

export default function CourseCreationForm({
    createdCourse,
    onCloseDrawer,
    CourseCreationSuccess,
    CourseCreationError,
}) {
    // console.log("CourseCreationForm rendered : ", );
    const { data, setData, get, post, processing, errors, reset } = useForm({
        coursename: "",
        description: "",
        coursephoto: "",
        academicyear: "",
        startdate: "",
        enddate: "",
        semester: "1st Semester",
    });

    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        if (startYear && endYear) {
            setData("academicyear", `${startYear}-${endYear + 1}`);
        }
    }, [startYear, endYear]);

    
    const handleDataChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

    const handleDateChange = (name, date) => {
        // start date define
        setData(name, date);
        const year = date.getFullYear();
        if (name == "startdate") {
            setStartYear(year);
        } else {
            setEndYear(year);
        }
    };

    // create: form submit
    const handleSubmit = (event) => {
        event.preventDefault();

        post(
            route("course.store"),
            {
                coursename: data.coursename,
                description: data.description,
                academicyear: data.academicyear,
                startdate: data.startdate,
                enddate: data.enddate,
                semester: data.semester,
            },
            {
                forceFormData: true,
                preserveState: false,
                onSuccess: () => {
                    message.success("Course created successfully");
                },
                onError: () => {
                    message.error("Failed to create course");
                },
            }
        );
        // setOpenDrawer(false);
        get(route("course.show"));
        reset();
    };

    return (
        <>
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
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-4"
            >
                {/* <div className="flex flex-row justify-end"> */}
                    {/* <button */}
                        {/* // type="button" */}
                        {/* // className="bg-yellow-300 hover:bg-yellow-500 focus:bg-yellow-500 */}
                {/* // rounded-lg px-5 py-2" */}
                        {/* // onClick={() => showDrawer()} */}
                    {/* // > */}
                        {/* <FontAwesomeIcon icon={faPlus} className="mr-2" /> */}
                        {/* Create Module */}
                    {/* </button> */}
                {/* </div> */}

                <TextInput
                    label="Course Name"
                    name="coursename"
                    value={data.coursename || ""}
                    onChange={handleDataChange}
                    error={errors.coursename}
                    required
                />
                <TextInput
                    label="Description"
                    name="description"
                    value={data.description || ""}
                    onChange={handleDataChange}
                    error={errors.description}
                    required
                />

                <FileInput
                    label="Course Photo"
                    name="coursephoto"
                    onChange={handleFileChange}
                    error={errors.coursephoto}
                />

                {/* <input type="date" value={data.academicyear} onChange={handleDateChange}/> */}

                <TextInput
                    label="Academic Year"
                    name="academicyear"
                    value={
                        startYear && endYear
                            ? `${startYear}-${endYear + 1}`
                            : "Please Select Start Date and End Date"
                    }
                    // onChange={(e) => setData('academicyear', `${startYear}."-".${endYear+1}`)}
                    error={errors.academicyear}
                    readOnly={true}
                    required
                />

                <div className="flex flex-col md:flex-row space-x-2 w-full">
                    <DateInput
                        name="startdate"
                        selectedDate={data.startdate}
                        onChange={handleDateChange}
                        placeholder="Select Start Date"
                        error={errors.startdate}
                        // required={true}
                    />
                    <DateInput
                        name="enddate"
                        selectedDate={data.enddate}
                        onChange={handleDateChange}
                        placeholder="Select End Date"
                        error={errors.enddate}
                        // required={true}
                    />
                </div>

                <Selection
                    label="Semester"
                    name="semester"
                    value={data.semester}
                    options={[
                        {
                            value: "1st Semester",
                            label: "1st Semester",
                        },
                        {
                            value: "2nd Semester",
                            label: "2nd Semester",
                        },
                    ]}
                    onChange={handleDataChange}
                    error={errors.semester}
                    required
                />

                <div className="flex flex-row justify-end space-x-4">
                    <button
                        type="submit"
                        className="w-20 bg-yellow-300  rounded-md px-4 py-2
                        hover:bg-yellow-500 focus:bg-yellow-500"
                        disabled={processing}
                    >
                        Create
                    </button>

                    <button
                        type="button"
                        className="w-20 bg-gray-300  rounded-md py-2
                        hover:bg-yellow-500 focus:bg-yellow-500"
                        disabled={processing}
                        onClick={()=> onCloseDrawer() }
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {/* <div>
                <Drawer
                    title="Create Module"
                    width={700}
                    closable={{ "aria-label": "Close Button" }}
                    open={openDrawer}
                    onClose={closeDrawer}
                >
                    <CourseModuleCreationForm></CourseModuleCreationForm>
                </Drawer>
            </div> */}
        </>
    );
}
