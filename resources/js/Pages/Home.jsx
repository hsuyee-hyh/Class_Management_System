import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

export default function Home() {
    const [activeBtn, setActiveBtn] = useState(true);
    const { auth } = usePage().props;

    function handleLogout(event) {
        event.preventDefault();
        setActiveBtn(false);
        router.post("/logout");
    }

    function handleEditProfile(event) {
        event.preventDefault();
        setActiveBtn(false);
        get(route("profile.edit"));
    }

    function handleUpdatePassword(event){
        event.preventDefault();
        setActiveBtn(false);
        router.get("profile/edit-password");
        // get(route("profile.editPassword"));
    }

    return (
        <>
            <h1 className="text-2xl text-amber-700">
                Hello, {auth.user.fullname}
            </h1>

            <div className="">
                {/* <Link */}
                    {/* // href={route('profile.edit')} */}
                    {/* // as="button" */}
                    {/* //  className={`rounded-lg p-2 m-3 border */}
                        {/* // focus:bg-blue-700 focus:text-white */}
                        {/* // ${activeBtn ? "bg-blue-700 text-white" : ""}`} */}
                    {/* // onClick={() => setActiveBtn(false)} */}
                {/* //  */}
                {/* // > */}
                    {/* Edit Profile */}
                {/* </Link> */}
                <button onClick={() => router.get(route('profile.edit'))}
                    className={`rounded-lg p-2 m-3 border
                    focus:bg-blue-700 focus:text-white
                    ${activeBtn? "bg-blue-700 text-white": ""}`}>
                    Edit Profile
                </button>

                <button 
                    className={`rounded-lg p-2 m-3 border
                    focus:bg-blue-700 focus:text-white
                    `}
                    onClick={handleUpdatePassword}>
                        Update Password
                </button>

                <button
                    className="rounded-lg border p-2 ml-2
                    focus:bg-blue-700 focus:text-white"
                    // onClick={() => setActiveBtn(false)}
                    // onSubmit={handleLogout}
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <NavLink></NavLink>
        </>
    );
}
