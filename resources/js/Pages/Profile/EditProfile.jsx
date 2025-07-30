import InputLabel from "@/Components/InputLabel";
import { useForm, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export default function EditProfile({ auth, my_custom_prop }) {
    const { user } = auth;

    /**
     * See `app/Http/Middleware/HandleInertiaRequests.php`
     * how `my_custom_prop` is passed to the Inertia response.
     */

    const { data, setData, errors, post, patch, processing } = useForm({
        name: user.name || "",
        fullname: user.fullname || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        photo: user.photo || "",
    });

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    function handleFileChange(event) {
        const file = event.target.files[0];
        setData((prev) => ({
            ...prev,
            photo: file,
        }));
    }

    return (
        <>
            <h1 className="text-center mt-4">My Profile</h1>
            <p className="text-center text-lg my-4">{my_custom_prop}</p>
            <form encType="multipart/form-data">
                <div className="flex flex-col justify-center items-center w-full p-3 mb-4">
                    {/* edit photo */}
                    <div className="relative w-[200px] flex justify-center items-center mb-4">
                        <img
                            src={`/storage/${user.photo}`}
                            alt="profile"
                            style={{
                                width: "200px",
                                height: "auto",
                            }}
                            className="static"
                        />
                        <label
                            htmlFor="photo"
                            className="absolute bottom-0 left-0 w-full flex items-center justify-center text-blue-700 text-sm bg-white bg-opacity-90 px-2 py-2 rounded-b cursor-pointer"
                        >
                            <span className="mr-2">
                                <FontAwesomeIcon icon={faEnvelope} />
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

                    <div className="flex flex-col">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            required
                            type="text"
                            name="fullname"
                            id="fullname"
                            value={data.fullname}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />
                        {errors.fullname && <div className="text-red-500">{errors.fullname}</div>}

                        <label htmlFor="username">Username</label>
                        <input
                            required
                            type="text"
                            name="username"
                            id="username"
                            value={data.username}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            value={data.email}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <label htmlFor="phone">Phone</label>
                        <input
                            required
                            type="text"
                            name="phone"
                            id="phone"
                            value={data.phone}
                            onChange={handleChange}
                            className="border border-gray-400 rounded-md p-2 w-48 md:w-96 mb-3"
                        />

                        <button
                            type="button"
                            className="bg-blue-700 p-2 rounded-md text-white"
                            onClick={() => patch(route('profile.update'))}
                            disabled={processing}
                        >
                            Save
                        </button>


                    </div>
                </div>
            </form>
        </>
    );
}
