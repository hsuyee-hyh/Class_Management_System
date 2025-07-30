import ApplicationLogo from "@/Components/ApplicationLogo";
import FormButton from "@/Components/Form/FormButton";
import TextInput from "@/Components/Form/TextInput";
import AccountLayout from "@/Layouts/AccountLayout";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Flex, Progress } from "antd";

export default function Login({ status }) {
    const [percent, setPercent] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        rememberme: false,
    });

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        if (key == "rememberme") {
            setData(key, event.target.checked);
        }
        setData(key, value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        post(route("login"), {
            onFinish: () => {
                reset("password");
            },
        });
    }

    return (
        <>
            {/* {processing && ( */}
            {/* // <div className="flex justify-center items-center"> */}
            {/* <div type="button" class="bg-yellow-100 w-full max-h-20 mx-20 my-4 p-4"> */}
            {/* <span className="text-center">Loading...</span> */}
            {/* </div> */}
            {/* </div> */}
            {/* // )} */}

            {status && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded m-10">
                    {status}
                </div>
            )}
            <AccountLayout>
                <ApplicationLogo></ApplicationLogo>
                <h1 className="text-2xl font-bold mb-4">
                    Login to your Account
                </h1>

                <div className="flex flex-col justify-center items-center w-[300px] md:w-[500px]">
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col w-full w-[300px] md:w-[500px] space-y-4"
                    >
                        <TextInput
                            label="Email"
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                            required
                        />

                        <TextInput
                            label="Password"
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleChange}
                            error={errors.password}
                            required
                        />

                        <FormButton Label="Login"></FormButton>

                        <div className="flex justify-between mt-2">
                            <span>
                                <input
                                    type="checkbox"
                                    id="remember"
                                    name="remember"
                                    value={data.remember}
                                    onChange={(e) =>
                                        setData("remember", e.target.checked)
                                    }
                                />
                                <label htmlFor="remember"> Remember me?</label>
                            </span>

                            <a
                                href="/forgot-password"
                                className=" text-yellow-700 font-bold
                                    hover:text-yellow-900"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>

                    <div className="mt-2">
                        Don't you have an account?
                        <Link
                            href={route("register")}
                            className="ml-2 text-blue-700 font-bold underline
        hover:text-blue-900"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </AccountLayout>
        </>
    );
}
