import { Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";
export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        // if (key == 'rememberme'){
        // setData({ ...data, rememberme: event.target.checked });
        // }
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    }

    // useEffect(() => {
    // console.log("Errors received: " + errors.email);
    // }, errors.email);
    //
    return (
        <>
            <h1 className="text-2xl text-center mt-7 font-bold">Login</h1>

            {console.log(errors.email)}
            {console.log(errors.password)}

            <div className="flex flex-col justify-center items-center w-48 md:w-[500px] p-3 mx-auto">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full w-48 md:w-[500px] p-2 mx-auto"
                >
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        className="border border-gray-400 rounded-md p-2 w-full mt-2 "
                        value={data.email}
                        onChange={handleChange}
                    />
                    {errors.email && (
                        <div className="text-red-500 w-full">
                            {errors.email}
                        </div>
                    )}

                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        className="border border-gray-400 rounded-md p-2 w-full mt-2"
                        onChange={handleChange}
                    />
                    {errors.password && (
                        <div className="text-red-500 w-full">
                            {errors.password}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-700 text-white rounded-md w-full p-2 mt-2"
                    >
                        Login
                    </button>

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
                            className="border-b-3 border-b-blue-600 text-blue-500 font-bold
                                    hover:text-blue-700"
                        >
                            Forgot Password?
                        </a>
                    </div>
                </form>

                <div>
                    Don't you have an account?  
                    <Link
                        href={route('register')}
                        className="ml-2 text-blue-500 font-bold underline
        hover:text-blue-700"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </>
    );
}
