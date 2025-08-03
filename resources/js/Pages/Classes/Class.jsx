import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageContainer, ProCard, ProLayout } from "@ant-design/pro-components";
import {
    faAngleDown,
    faArrowDown,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    ConfigProvider,
    Drawer,

} from "antd";
import { useState } from "react";
import "../../../css/app.css";
import TextInput from "@/Components/Form/TextInput";
import Selection from "@/Components/Form/Selection";
import { useForm } from "@inertiajs/react";
import FormButton from "@/Components/Form/FormButton";
import SearchInputWidget from "./ClassWidgets/SearchInputWidget";
import RadioButtonGroupWidget from "./ClassWidgets/RadioButtonGroupWidget";
import SelectWidget from "./ClassWidgets/SelectWidget";

export default function Course() {
    const [searchClassTerm, setSearchClassTerm] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const { data, setData, post, processing, errors, reset } = useForm({
        classname: "",
        description: "",
        academicyear: "",
        semester: "",
    });
    const dataList = [
        "Apple",
        "Banana",
        "Orange",
        "Mango",
        "Pineapple",
        "Blueberry",
        "Strawberry",
        "Watermelon",
        "Grape",
    ];

    const filteredList = dataList.filter((item) => {
        const searchWords = searchValue
            .toLowerCase()
            .split(" ")
            .filter(Boolean);
        const itemText = item.toLowerCase();

        return searchWords.some((word) => itemText.includes(searchWords));
    });

    const semesterItems = [
        {
            value: "1",
            label: "1st Semester",
        },
        {
            value: "2",
            label: "2nd Semester",
        },
    ];

    const academicYearItems = [
        {
            value: "1",
            label: "2019-2020",
        },
        {
            value: "2",
            label: "2020-2021",
        },
    ];

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    }
    const handleItemSelect = (value) => {
        setSearchValue(value);
    }
    

    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const closeDrawer = () => {
        setOpenDrawer(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        post(route(), {
            classname: data.classname,
            description: data.description,
            academicyear: data.academicyear,
            semester: data.semester,

            forceFormData: true,
            onSuccess: () => reset(),
        });
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
                                fontSize:"16px"
                            },
                        },
                        token: {
                            colorPrimary: "#fef08a",
                            colorPrimaryHover: "#fef08a",
                        },
                    }}
                >
                    {/* create button && search boxes  */}
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
                                    onClick={showDrawer}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        className="mr-2"
                                    ></FontAwesomeIcon>
                                    Create Class
                                </button>

                                <Drawer
                                    title="Create Class"
                                    width={700}
                                    closable={{ "aria-label": "Close Button" }}
                                    onClose={closeDrawer}
                                    open={openDrawer}
                                >
                                    <form
                                        onSubmit={handleSubmit}
                                        encType="multipart/form-data"
                                        className="space-y-4"
                                    >
                                        <TextInput
                                            label="Class Name"
                                            name="classname"
                                            value={data.classname}
                                            onChange={(e) => e.target.value}
                                            error={errors.classname}
                                            required
                                        />
                                        <TextInput
                                            label="Description"
                                            name="description"
                                            value={data.description}
                                            onChange={(e) => e.target.value}
                                            error={errors.description}
                                            required
                                        />

                                        {/* <input type="date" value={data.academicyear} onChange={handleDateChange}/> */}
                                        <Selection
                                            label="Academic Year"
                                            name="academicyear"
                                            value={data.academicyear}
                                            options={[
                                                {
                                                    value: "2019-2020",
                                                    label: "2029-2020",
                                                },
                                                {
                                                    value: "2020-2021",
                                                    label: "2020-2021",
                                                },
                                            ]}
                                            onChange={(e) => e.target.value}
                                            error={errors.academicyear}
                                            required
                                        />

                                        <Selection
                                            label="Semester"
                                            name="semester"
                                            value={data.semester}
                                            options={[
                                                {
                                                    value: "1st semester",
                                                    label: "1st Semester",
                                                },
                                                {
                                                    value: "2nd semester",
                                                    label: "2nd Semester",
                                                },
                                            ]}
                                            onChange={(e) => e.target.value}
                                            error={errors.academicyear}
                                            required
                                        />
                                        <FormButton
                                            Label="Submit"
                                            type="submit"
                                            className="bg-yellow-200 text-white rounded-md p-2"
                                            disabled={processing}
                                        ></FormButton>
                                    </form>
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
                                    <div className="flex flex-col md:flex-row flex-wrap justify-start items-center gap-2 md:gap-4 w-full">
                                        {/* search by class name  */}
                                        <SearchInputWidget
                                            placeholder="Search Class Name"
                                            value={searchClassTerm}
                                            onInputChange = {handleInputChange}
                                            onItemSelect = {handleItemSelect}
                                            filteredList={filteredList}
                                        />
                                        {/* search by teacher name  */}
                                        <SearchInputWidget
                                            placeholder="Search Teacher Name"
                                            // value={searchTeacherTerm}
                                            // onChange={(e) => setTeacherTerm(e.target.value)}
                                        />

                                        {/* Academic Year select box  */}
                                        <SelectWidget
                                            placeholder="Select Academic Year"
                                            options = {academicYearItems}
                                        />

                                        {/* Semester select box */}
                                        <SelectWidget
                                            placeholder="Select Semester"
                                            options={semesterItems}
                                        />
                                    </div>
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
                                    <RadioButtonGroupWidget
                                    options={['Search', 'Reset']}
                                    defaultValue="Search"
                                    />
                                </ProCard>
                            </ProCard>
                            {/* class list table 2 */}
                        </PageContainer>
                    </div>
                </ConfigProvider>
            </AuthenticatedLayout>
        </>
    );
}
