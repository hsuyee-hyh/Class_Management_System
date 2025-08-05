import DateInput from "@/Components/Form/DateInput";
import FormButton from "@/Components/Form/FormButton";
import Selection from "@/Components/Form/Selection";
import TextInput from "@/Components/Form/TextInput";

export default function CourseCreationForm({
    onSubmit,
    onDataChange,
    onDateChange,
    data,
    startYear,
    endYear,
    errors,
    processing
}) {
    return (
        <>
            <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                className="space-y-4"
            >
                <TextInput
                    label="Course Name"
                    name="coursename"
                    value={data.coursename || ""}
                    onChange={onDataChange}
                    error={errors.coursename}
                    required
                />
                <TextInput
                    label="Description"
                    name="description"
                    value={data.description || ""}
                    onChange={onDataChange}
                    error={errors.description}
                    required
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
                />
                <div className="flex flex-col md:flex-row space-x-2 w-full">
                    <DateInput
                        name="startdate"
                        selectedDate={data.startdate}
                        onChange={onDateChange}
                        placeholder="Select Start Date"
                        error={errors.startdate}
                        // required={true}
                    />
                    <DateInput
                        name="enddate"
                        selectedDate={data.enddate}
                        onChange={onDateChange}
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
                    onChange={onDataChange}
                    error={errors.semester}
                    required
                />
                <FormButton
                    Label="Submit"
                    type="submit"
                    className="bg-yellow-200 text-white rounded-md p-2"
                    disabled={processing}
                ></FormButton>
            </form>
        </>
    );
}
