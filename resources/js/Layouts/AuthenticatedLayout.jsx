import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const { component } = usePage();

    const [activeLink, setActiveLink] = useState("Home/Home");
    const [initials, setInitials] = useState(null);

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

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="fixed top-0 inset-x-0 z-50 border-b border-gray-100 bg-white ">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between ">
                        {/* logo & navlink  */}
                        <div className="flex">
                            {/* logo  */}
                            <div className="flex shrink-0 items-center mt-10">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            {/* navlink  */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    name="home"
                                    componentName="Home/Home"
                                    activeLink={activeLink}
                                    setActiveLink={setActiveLink}
                                    href={route("home")}
                                    active={route().current("home")}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    name="course"
                                    componentName="Course"
                                    activeLink={activeLink}
                                    setActiveLink={setActiveLink}
                                    href={route("course")}
                                    active={route().current("course")}
                                >
                                    Course
                                </NavLink>
                            </div>
                        </div>

                        {/* profile  */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    {/* Dropdown trigger  */}
                                    <Dropdown.Trigger>
                                        {/* profile  */}
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 
                                                text-sm font-medium leading-4 text-gray-500 
                                                transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {!user.photo && (
                                                    <div className="relative w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-600 mr-3">
                                                        {initials}
                                                    </div>
                                                )}
                                                {user.photo && (
                                                    <img
                                                        src={`storage/${user.photo}`}
                                                        alt=""
                                                        className="w-8 h-8 rounded-full mr-2"
                                                    />
                                                )}
                                                {user.fullname}

                                                {/* profile svg  */}
                                                {/* <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="application"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg> */}
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    {/* Dropdown trigger content  */}
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                            className="hover:bg-yellow-300 focus:bg-yellow-300"
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="hover:bg-yellow-300 focus:bg-yellow-300"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? "inline-flex"
                                                : "hidden"
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive navlink & Responsive profile  */}
                <div
                    className={
                        (showingNavigationDropdown ? "block" : "hidden") +
                        " sm:hidden mt-7"
                    }
                >
                    {/* Responsive navlink  */}
                    <div className="space-y-2 pb-3 pt-2">
                        <ResponsiveNavLink
                            componentName="Home/Home"
                            activeLink={activeLink}
                            setActiveLink={setActiveLink}
                            href={route("home")}
                            active={route().current("home")}
                        >
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            componentName="Course"
                            activeLink={activeLink}
                            setActiveLink={setActiveLink}
                            href={route("course")}
                            active={route().current("course")}
                        >
                            Course
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive profile  */}
                    <div className="border-t border-gray-200 pb-1 pt-4">
                        {/* responsive profile photo  */}
                        <div className="px-4">
                            <div className="flex items-center">
                                <img
                                    src="storage/photos/54tjL0kYFWOtAuBCjekLmLTsyoE3Ai3j39XlEEkI.jpg"
                                    alt="profile"
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <div className="text-base font-medium text-gray-800">
                                    {user.username}
                                </div>

                                {/* <div className="text-sm font-medium text-gray-500"> */}
                                {/* {user.email} */}
                                {/* </div> */}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                componentName="Profile/EditProfile"
                                activeLink={activeLink}
                                setActiveLink={setActiveLink}
                                href={route("profile.edit")}
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                componentName=""
                                activeLink={activeLink}
                                setActiveLink={setActiveLink}
                                method="post"
                                href={route("logout")}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
