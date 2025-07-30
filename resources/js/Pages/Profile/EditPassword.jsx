import { router, useForm, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

export default function EditPassword() {
    // const { user } = usePage().props;
    // console.log(user);

    // const { data, setData, get, processing } = useForm({
    // password: user.password || "",
    // password_confirmation: user.password_confirmation || "",
    // });
    const { data, setData, patch, processing, errors } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const [visibleOld, setVisibleOld] = useState(false);
    const [eyeOpenOld, setEyeOpenOld] = useState(false);
    const [eyeCloseOld, setEyeCloseOld] = useState(true);

    const [visible, setVisible] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);
    const [eyeClose, setEyeClose] = useState(true);

    const [visible_confirm, setVisible_confirm] = useState(false);
    const [eyeOpen_confirm, setEyeOpen_confirm] = useState(false);
    const [eyeClose_confirm, setEyeClose_confirm] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        patch(route("profile.updatePassword"));
    }

    return (
        <>
            <h1>Edit Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center p-3 mb-4">
                    <div className="flex flex-col md:w-96 w-48">
                        <label htmlFor="current_password">
                            Current Password
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <div className="flex flex-row items-center relative">
                            <input
                                required
                                type={`${visibleOld ? "text" : "password"}`}
                                name="current_password"
                                id="current_password"
                                value={data.current_password}
                                onChange={(e) =>
                                    setData(e.target.name, e.target.value)
                                }
                                className="border border-gray-400 rounded-md p-2 w-full mb-2
                            "
                            />
                            {eyeOpenOld && (
                                <button
                                    className="absolute bottom-4 right-3"
                                    onClick={() => {
                                        setVisibleOld(!visible);
                                        setEyeOpenOld(false);
                                        setEyeCloseOld(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            )}

                            {eyeCloseOld && (
                                <button
                                    className="absolute bottom-4 right-3"
                                    onClick={() => {
                                        setVisibleOld(!visible);
                                        setEyeCloseOld(false);
                                        setEyeOpenOld(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                </button>
                            )}
                        </div>
                        {errors.current_password && (
                            <div className="text-red-500 mb-2">
                                {errors.current_password}
                            </div>
                        )}

                        <label htmlFor="password">
                            New Password
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <div className="flex flex-row items-center relative">
                            <input
                                required
                                type={`${visible ? "text" : "password"}`}
                                name="password"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData(e.target.name, e.target.value)
                                }
                                className="border border-gray-400 rounded-md p-2 w-full mb-2
                            "
                            />
                            {eyeOpen && (
                                <button
                                    className="absolute bottom-4 right-3"
                                    onClick={() => {
                                        setVisible(!visible);
                                        setEyeOpen(false);
                                        setEyeClose(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            )}

                            {eyeClose && (
                                <button
                                    className="absolute bottom-4 right-3"
                                    onClick={() => {
                                        setVisible(!visible);
                                        setEyeClose(false);
                                        setEyeOpen(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                </button>
                            )}
                        </div>
                        {errors.password && (
                            <div className="text-red-500 mb-2 mt-0">
                                {errors.password}
                            </div>
                        )}

                        <label htmlFor="password_confirmation">
                            Confirm Password
                            <span className="text-red-500 ml-2">*</span>
                        </label>
                        <div className="flex flex-row justify-center relative">
                            <input
                                required
                                type={`${
                                    visible_confirm ? "text" : "password"
                                }`}
                                name="password_confirmation"
                                id="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) =>
                                    setData(e.target.name, e.target.value)
                                }
                                className="border border-gray-400 rounded-md p-2 w-full mb-2"
                            />
                            {eyeOpen_confirm && (
                                <button
                                    className="absolute bottom-4 right-3"
                                    onClick={() => {
                                        setVisible_confirm(!visible_confirm);
                                        setEyeOpen_confirm(false);
                                        setEyeClose_confirm(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEye} />
                                </button>
                            )}

                            {eyeClose_confirm && (
                                <button
                                    className="absolute bottom-4 right-3"
                                    onClick={() => {
                                        setVisible_confirm(!visible_confirm);
                                        setEyeClose_confirm(false);
                                        setEyeOpen_confirm(true);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEyeSlash} />
                                </button>
                            )}
                        </div>
                        {errors.password_confirmation && (
                            <div className="text-red-500 mb-2 mt-0">
                                {errors.password_confirmation}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="bg-blue-700 text-white rounded-md p-2"
                            disabled={processing}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
