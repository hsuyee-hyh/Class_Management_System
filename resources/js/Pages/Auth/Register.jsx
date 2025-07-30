import { router, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import FileInput from "@/Components/Form/FileInput";
import Selection from "@/Components/Form/Selection";
import TextInput from "@/Components/Form/TextInput";
import AccountLayout from "@/Layouts/AccountLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import FormButton from "@/Components/Form/FormButton";
import { Alert } from "antd";

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        fullname: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        photo: null,
        role: "student",
    });

    const [selectedOption, setSelectedOption] = useState("Student");

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        console.log("file" + file);
        setData((values) => ({
            ...values,
            photo: file,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        post(route("register"), {
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            password: data.password,
            confirmed_password: data.confirmed_password,
            phone: data.phone,
            photo: data.photo,
            role: data.role,
            forceFormData: true,
            onSuccess: () => reset(),
        });
    }
    return (
        <>
            {/* {processing && ( */}
            {/* // <Alert */}
            {/* // message="Loading ...." */}
            {/* // type="success" */}
            {/* // className="w-max-[400px] mx-auto my-4" */}
            {/* // /> */}
            {/* // )} */}

            {errors.registerationError && (
                <Alert
                    message="Error"
                    description={errors.registerationError}
                    type="error"
                    showIcon
                />
            )}
            <AccountLayout>
                <div className="mt-4">
                    <ApplicationLogo></ApplicationLogo>
                </div>
                <h1 className="text-2xl text-center font-bold">
                    Create an Account
                </h1>

                <div className="flex flex-col justify-center items-center w-[300px] md:w-[500px]">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="flex flex-col w-full w-[300px] md:w-[500px] space-y-4"
                    >
                        <TextInput
                            label="Full Name"
                            name="fullname"
                            value={data.fullname}
                            onChange={handleChange}
                            error={errors.fullname}
                            required
                        />
                        <TextInput
                            label="Username"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            error={errors.username}
                            required
                        />
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />
                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                            required
                        />
                        <TextInput
                            label="Confirm Password"
                            name="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={handleChange}
                            error={errors.password_confirmation}
                            required
                        />
                        <TextInput
                            label="Phone"
                            name="phone"
                            type="text"
                            value={data.phone}
                            onChange={handleChange}
                            error={errors.phone}
                        />
                        <Selection
                            label="Role"
                            name="role"
                            value={data.role}
                            options={[
                                { value: "student", label: "Student" },
                                { value: "teacher", label: "Teacher" },
                            ]}
                            onChange={(e) => setData("role", e.target.value)}
                            error={errors.role}
                            required
                        />
                        <FileInput
                            label="Photo"
                            name="photo"
                            onChange={handleFileChange}
                            error={errors.photo}
                        />
                        <FormButton
                            Label="Submit"
                            type="submit"
                            className="bg-blue-700 text-white rounded-md p-2"
                            disabled={processing}
                        ></FormButton>
                    </form>

                    <div className="mt-2">
                        Do you have an account?
                        <Link
                            href={route("login")}
                            className="ml-2 text-blue-700 font-bold underline
                            hover:text-blue-900"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </AccountLayout>
        </>
    );
}
