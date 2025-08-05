import SearchInputWidget from "../ClassWidgets/SearchInputWidget";
import SelectWidget from "../ClassWidgets/SelectWidget";

export default function CourseSearchForm({
    onSubmit,
    onChange,
    searchData,
    academicYearOptions,
    semesterOptions,
}) {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div className="flex flex-col md:flex-row flex-wrap justify-start items-center gap-2 md:gap-4 w-full">
                    {/* search by class name  */}
                    <SearchInputWidget
                        placeholder="Search Class Name"
                        name="coursename"
                        value={searchData.coursename }
                        onChange={onChange}
                        // onKeyDown={(e) => {
                        // if (e.key === "Enter") {
                        // handleSearch();
                        // }
                        // }}
                    />
                    {/* search by teacher name  */}
                    {/* <SearchInputWidget */}
                    {/* // placeholder="Search Teacher Name" */}
                    {/* // name="searchTeacher" */}
                    {/* // value={searchTeacher} */}
                    {/* // onChange={(e) => setSearchTeacher(e.target.value)} */}
                    {/* // /> */}

                    {/* Academic Year select box  */}
                    <SelectWidget
                        placeholder="Select Academic Year"
                        name="academicyear"
                        value={searchData.academicyear || null}
                        onChange={(value)=> onChange(
                            {target: {name: "academicyear", value} }
                        )}
                        options={academicYearOptions}
                    />

                    {/* Semester select box */}
                    <SelectWidget
                        placeholder="Select Semester "
                        name="semester"
                        value={searchData.semester || null}
                        onChange={(value)=> onChange(
                            {target: {
                                name: "semester",
                                value
                            }}
                        )}
                        options={semesterOptions}
                    />
                </div>
            </form>
        </>
    );
}
