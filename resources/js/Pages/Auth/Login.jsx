import ApplicationLogo from "@/Components/ApplicationLogo";
import FormButton from "@/Components/Form/FormButton";
import TextInput from "@/Components/Form/TextInput";
import AccountLayout from "@/Layouts/AccountLayout";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Flex, Progress } from "antd";

export default function Login({ status, loginError }) {
    const [visible, setVisible] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        rememberme: false,
    });

    useEffect(() => {
        if (loginError) {
            setVisible
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [loginError]);

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
            <AccountLayout>
                <ApplicationLogo></ApplicationLogo>
                <div className="relative">
                    {visible && loginError && (
                        <div
                            className="absolute left-1/3 z-10 p-3 px-10 bg-green-100 text-green-700 py-2 rounded
                        transition-opacity ease-out duration-100"
                        >
                            {loginError}
                        </div>
                    )}
                   
                </div>
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
