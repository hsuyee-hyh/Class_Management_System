import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { button } from "@material-tailwind/react";
import { useRef, useState } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const [isCurrentOpen, setIsCurrentOpen] = useState(false);
    const [isCurrentClose, setIsCurrentClose] = useState(true);

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isUpdateClose, setIsUpdateClose] = useState(true);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isConfirmClose, setIsconfirmClose] = useState(true);

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <div className="w-[300px] md:w-[400px] lg:w-[500px] ">
                <form
                    onSubmit={updatePassword}
                    className="mt-6 space-y-6 w-full"
                >
                    <div className="relative">
                        <InputLabel
                            htmlFor="current_password"
                            value="Current Password"
                        />

                        <div className="flex">
                            <TextInput
                                id="current_password"
                                ref={currentPasswordInput}
                                value={data.current_password}
                                onChange={(e) =>
                                    setData("current_password", e.target.value)
                                }
                                type={`${isCurrentOpen ? "text" : "password"}`}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                            />
                            <div className="absolute right-4 top-8">
                                {isCurrentOpen && (
                                    <button
                                        onClick={() => {
                                            setIsCurrentOpen(false);
                                            setIsCurrentClose(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                )}

                                {isCurrentClose && (
                                    <button
                                        onClick={() => {
                                            setIsCurrentOpen(true);
                                            setIsCurrentClose(false);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <InputError
                            message={errors.current_password}
                            className="mt-2"
                        />
                    </div>

                    <div className="relative">
                        <InputLabel htmlFor="password" value="New Password" />

                        <div>
                            <TextInput
                                id="password"
                                ref={passwordInput}
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                type={`${isUpdateOpen ? "text" : "password"}`}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <div className="absolute right-4 top-8">
                                {isUpdateOpen && (
                                    <button
                                        onClick={() => {
                                            setIsUpdateOpen(false);
                                            setIsUpdateClose(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                )}

                                {isUpdateClose && (
                                    <button
                                        onClick={() => {
                                            setIsUpdateClose(false);
                                            setIsUpdateOpen(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="relative">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />
                        <div>
                            <TextInput
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(
                                        "password_confirmation",
                                        e.target.value
                                    )
                                }
                                type={`${isConfirmOpen ? "text" : "password"}`}
                                className="mt-1 block w-full"
                                autoComplete="new-password"
                            />
                            <div className="absolute right-4 top-8">
                                {isConfirmOpen && (
                                    <button
                                        onClick={() => {
                                            setIsConfirmOpen(false);
                                            setIsconfirmClose(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </button>
                                )}

                                {isConfirmClose && (
                                    <button
                                        onClick={() => {
                                            setIsconfirmClose(false);
                                            setIsConfirmOpen(true);
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    </button>
                                )}
                            </div>
                        </div>

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex items-center gap-4">
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
            </div>
        </section>
    );
}
