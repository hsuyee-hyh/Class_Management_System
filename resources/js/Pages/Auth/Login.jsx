import { useForm } from "@inertiajs/react";
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
            <div className="static">
                <div className="flex flex-col justify-center items-center  w-full p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="border border-gray-400 rounded-md p-2 w-48 md:w-96"
                                value={data.email}
                                onChange={handleChange}
                            />
                            {errors.email && (
                                <div className="text-red-500">
                                    {errors.email}
                                </div>
                            )}

                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="border border-gray-400 rounded-md p-2 w-48 md:w-96"
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <div className="text-red-500">
                                    {errors.password}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-700 text-white rounded-md p-2"
                            >
                                Login
                            </button>

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
                        </div>
                    </form>
                </div>
            </div>
            <span className="absolute top-60 right-80 mt-2">
                <a
                    href="/forgot-password"
                    className="border-b-3 border-b-blue-600 text-blue-500 font-bold
                hover:text-blue-700"
                >
                    Forgot Password?
                </a>
            </span>
        </>
    );
}
