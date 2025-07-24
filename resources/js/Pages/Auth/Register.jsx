import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Register() {
    // console.log(useForm());
    // const [values, setValues] = useState({
    // fullname: "",
    // username: "",
    // email: "",
    // password: "",
    // confirm_password: "",
    // phone: "",
    // photo: null,
    // });

    const { data, setData, post, processing, errors } = useForm({
        fullname: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        photo: null,
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
        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("username", data.username);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("phone", data.phone);
        formData.append("photo", data.photo);
        post("/register", data, {
            forceFormData: true,
        });
    }
    return (
        <>
            <h1 className="text-2xl text-center mt-7 font-bold">Register</h1>

            <div className="flex flex-col justify-center items-center  w-full p-3">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-col">
                        <label htmlFor="fullname" className="">
                            Full Name
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={data.fullname}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />
                        {errors.fullname && <div>{errors.email} </div>}

                        <label htmlFor="username" className="">
                            Username
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            name="username"
                            id="username"
                            value={data.username}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="email" className="">
                            Email
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="password" className="">
                            Password
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            value={data.password}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="confirm_password" className="">
                            Confirm Password
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <input
                            required
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            value={data.confirm_password}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="role">Role</label>
                        <select
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                            value={selectedOption}
                            onChange={(event) =>
                                setSelectedOption(event.target.value)
                            }
                        >
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                        </select>

                        <label htmlFor="phone" className="">
                            Phone
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <input
                            required
                            type="text"
                            name="phone"
                            id="phone"
                            value={data.phone}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="photo" className="">
                            Photo
                        </label>
                        <input
                            type="file"
                            name="photo"
                            id="photo"
                            // value={values.phone}
                            onChange={handleFileChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <button
                            type="submit"
                            className="bg-blue-700 text-white rounded-md p-2"
                            disabled={processing}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
