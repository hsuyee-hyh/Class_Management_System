import FileInput from "@/Components/Form/FileInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FormButton from "@/Components/Form/FormButton";
import { Button } from "antd";
import Selection from "@/Components/Form/Selection";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import { Spin } from "antd/lib";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    updateProfileError,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [previewImg, setPreviewImg] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [initials, setInitials] = useState(null);
    console.log(initials);

    const {
        data,
        setData,
        post,
        patch,
        errors,
        processing,
        recentlySuccessful,
    } = useForm({
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        phone: user.phone,
        photo: null,
        role: user.role,
    });

    useEffect(() => {
        if (user.fullname) {
            const parts = user.fullname
                .split(" ")
                .filter(Boolean) // remove extra space
                .slice(0, 2)
                .map((word) => word[0].toUpperCase());

            setInitials(parts.join("") || "NA");
        }
    }, [user.fullname]);

    // useEffect(() => {
    //     const handleLoad = () => setPageLoaded(true);

    //     if (document.readyState === "complete") {
    //         setPageLoaded(true);
    //     } else {
    //         window.addEventListener("load", handleLoad);
    //     }

    //     return () => window.removeEventListener("load", handleLoad);
    // }, []);
    // if (!pageLoaded) {
    //     return (
    //         <div
    //             style={{
    //                 height: "100vh",
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //             }}
    //         >
    //             <Spin size="large"></Spin>
    //         </div>
    //     );
    // }

    const submit = (e) => {
        e.preventDefault();

        post(
            route("profile.update"),
            {
                ...data,
                // _method: "patch", // override method to PATCH
            },
            {
                forceFormData: true,
            }
        );
    };
    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            setPreviewImg(URL.createObjectURL(file));
        }
        setData((prev) => ({
            ...prev,
            photo: file,
        }));
    }

    return (
        <section className=" w-[250px] mx-0  md:w-[400px] lg:w-[500px]">
            {updateProfileError && (
                <div className="fixed top-24 p-3 w-full bg-red-300 z-50">
                    {updateProfileError}
                </div>
            )}
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6 md:w-[400px] lg:w-[800px]"
                encType="multipart/form-data"
            >
                {/* photo & all infos */}
                <div className=" md:flex w-full">
                    {/* photo  */}
                    <div className="block md:hidden">
                        <div className="relative w-[200px]  justify-center items-center mb-4 rounded mx-auto">
                            {/* null photo  */}
                            {!(previewImg || user.photo) && (
                                <div className="relative w-[180px] h-[200px] rounded-3xl bg-gray-300 flex items-center justify-center text-5xl font-bold text-gray-600">
                                    {initials}
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
                                </div>
                            )}

                            {(previewImg || user.photo) && (
                                <div>
                                    <img
                                        src={
                                            previewImg
                                                ? previewImg
                                                : `/storage/${user.photo}`
                                        }
                                        alt=""
                                        style={{
                                            width: "180px",
                                            height: "auto",
                                        }}
                                        className="static rounded-3xl object-cover"
                                    />
                                    <label
                                        htmlFor="photo1"
                                        className="absolute bottom-0 right-2 w-full flex items-center justify-center text-yellow-500 text-sm bg-white bg-opacity-80 px-2 py-2 rounded-b cursor-pointer"
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
                    </div>
                    {/* all infos  */}
                    <div className="mr-16 space-y-5 w-full">
                        <div>
                            <InputLabel htmlFor="fullname" value="Full Name" />
                            <TextInput
                                id="fullname"
                                className="mt-1 block w-full"
                                value={data.fullname}
                                onChange={(e) =>
                                    setData("fullname", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="fullname"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.fullname}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="username" value="Username" />

                            <TextInput
                                id="username"
                                className="mt-1 block w-full"
                                value={data.username}
                                onChange={(e) =>
                                    setData("username", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="username"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.username}
                            />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="email"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.email}
                            />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="mt-2 text-sm text-gray-800">
                                    Your email address is unverified.
                                    <Link
                                        href={route("verification.send")}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        Click here to re-send the verification
                                        email.
                                    </Link>
                                </p>

                                {status === "verification-link-sent" && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to
                                        your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div>
                            <InputLabel htmlFor="phone" value="Phone Number" />
                            <TextInput
                                id="phone"
                                className="mt-1 block w-full"
                                value={data.phone}
                                onChange={(e) =>
                                    setData("phone", e.target.value)
                                }
                                required
                                autoComplete="phone"
                            />
                            <InputError
                                className="mt-2"
                                message={errors.phone}
                            />
                        </div>

                        <div>
                            <Selection
                                label="Role"
                                name="role"
                                value={data.role}
                                options={[
                                    { value: "student", label: "Student" },
                                    { value: "teacher", label: "Teacher" },
                                ]}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                error={errors.role}
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.role}
                            />
                        </div>
                    </div>

                    {/* photo  */}
                    <div className="hidden md:block md:w-full">
                        <div className="relative w-[200px]  justify-center items-center mb-4 rounded">
                            {!(previewImg || user.photo) && (
                                <div className="relative w-[180px] h-[200px] rounded-3xl bg-gray-300 flex items-center justify-center text-5xl font-bold text-gray-600">
                                    {initials}
                                    <label
                                        htmlFor="photo"
                                        className="absolute bottom-0 left-0 w-full flex items-center justify-center text-yellow-500 text-sm bg-white bg-opacity-90 px-2 py-2 rounded-b cursor-pointer"
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
                                            id="photo"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}

                            {(previewImg || user.photo) && (
                                <div>
                                    <img
                                        src={
                                            previewImg
                                                ? previewImg
                                                : `/storage/${user.photo}`
                                        }
                                        alt=""
                                        style={{
                                            width: "200px",
                                            height: "180px",
                                        }}
                                        className="static rounded-3xl object-cover"
                                    />
                                    <label
                                        htmlFor="photo"
                                        className="absolute bottom-0 left-0 w-full flex items-center justify-center text-yellow-500 text-sm bg-white bg-opacity-90 px-2 py-2 rounded-b cursor-pointer"
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
                                            id="photo"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 ">
                    <button
                        disabled={processing}
                        className="bg-yellow-300 hover:bg-yellow-500 focus:bg-yellow-500
                     font-semibold text-md py-3 px-5 rounded-lg"
                    >
                        Save
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
