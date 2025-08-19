import DateInput from "@/Components/Form/DateInput";
import FileInput from "@/Components/Form/FileInput";
import TextInput from "@/Components/Form/TextInput";
import Selection from "@/Components/Form/Selection";
import { useForm, router, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CourseEditForm({ foundCourse }) {
    const { data, setData, get, post, processing, errors, reset } = useForm({
        formName: "editForm",
        coursename: foundCourse.course_name,
        description: foundCourse.description,
        photo: foundCourse.photo,
        academicyear: foundCourse.academic_year,
        startdate: foundCourse.start_date,
        enddate: foundCourse.end_date,
        semester: foundCourse.semester,
    });
    const [startYear, setStartYear] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [initials, setInitials] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);

    useEffect(() => {
        if (startYear && endYear) {
            setData("academicyear", `${startYear}-${endYear}`);
        }
    }, [startYear, endYear]);

    useEffect(() => {
        if (!data.photo) {
            const part = data.coursename
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((word) => word[0].toUpperCase());
            setInitials(part.join("") || "NA");
        }
    }, [data.photo]);

    const handleDataChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
        setData("photo", file);
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
            route("course.update", { id: foundCourse.id }),
            {
                formName: "editForm",
                coursename: data.coursename,
                description: data.description,
                photo: data.photo,
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
                    router.get(route("course.edit", createdCourse.id));
                },
                onError: () => {
                    message.error("Failed to create course");
                },
            }
        );
        setOpenDrawer(false);
        // get(route("course.edit"));
        reset();
    };

    const onClickCancel = () => {
        
        setOpenDrawer(false);
        router.get(route('course.edit',{id: foundCourse.id}));
    }

    return (
        <>
            <div>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="space-y-4"
                >
                   
                   
                    <div className="flex flex-row space-x-10">
                        <div className="ml-5">
                            {!(previewImg || foundCourse.photo) && (
                                <div className="relative w-[180px] h-[200px] rounded-3xl bg-gray-300 flex items-center justify-center text-5xl font-bold text-gray-600">
                                    <label
                                        htmlFor="photo1"
                                        className="absolute bottom-0 right-2 w-full flex items-center justify-center text-yellow-500 text-sm bg-transparent bg-opacity-50 px-2 py-2 rounded-b cursor-pointer"
                                    >
                                        <span className="mr-2">
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />
                                        </span>
                                        Edit Photo
                                        <input
                                            type="file"
                                            name="photo"
                                            id="photo1"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>

                                    {initials}
                                </div>
                            )}

                            {(previewImg || foundCourse.photo) && (
                                <div>
                                    <img
                                        src={
                                            previewImg
                                                ? previewImg
                                                : `/storage/${foundCourse.photo}`
                                        }
                                        alt="course-photo"
                                        className="relative rounded-3xl object-cover w-[180px] h-[200px]"
                                    />
                                    
                                    <label
                                        htmlFor="photo1"
                                        className="  w-full flex items-center justify-center text-yellow-500 text-sm bg-white bg-opacity-80 px-2 py-2 rounded-b cursor-pointer"
                                    >
                                        <span className="mr-2">
                                            <FontAwesomeIcon
                                                icon={faEnvelope}
                                            />
                                        </span>
                                        Edit Photo
                                        <input
                                            type="file"
                                            name="photo"
                                            id="photo1"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>

                        <div>
                            <input
                                type="hidden"
                                name="formName"
                                value="EditForm"
                                // onChange={() => setData('formName', e.target.value)}
                            />
                        </div>
                        <div className="space-y-4">
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
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="w-20 bg-gray-300  rounded-md py-2
                                    hover:bg-yellow-500 focus:bg-yellow-500"
                                    disabled={processing}
                                    onClick={onClickCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
