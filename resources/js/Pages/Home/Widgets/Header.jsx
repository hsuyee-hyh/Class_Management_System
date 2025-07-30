import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Alert, Dropdown, Space } from "antd";
export default function Header() {
    // dropdown
    const [open, setOpen] = useState(false);
    const handleMenuClick = (e) => {
        if (e.key === "2") {
            setOpen(false);
        }
    };
    const handleOpenChange = (nextOpen, info) => {
        if (info.source === "trigger" || nextOpen) {
            setOpen(nextOpen);
        }
    };

    const items = [
        {
            label: (
                <span className="hover:text-yellow-500 px-4 py-2">Profile</span>
            ),
            key: "1",
        },
        {
            label: (
                <span className="hover:text-yellow-500 px-4 py-2">Logout</span>
            ),
            key: "2",
        },
    ];

    // collapse
    const [isCollapseOpen, setIsCollapseOpen] = useState(true);
    const toggleCollapse = () => {
        setIsCollapseOpen(false);
    };
    return (
        <>
            <header>
                <nav className="flex justify-between items-center p-5 px-10 h-14">
                    
                    {/* Logo + Hamburger container */}
                    <div className="flex items-center justify-between md:w-auto md:mr-28">
                        {/* Logo */}
                        <div className="w-8 h-8 md:w-10 md:h-10">
                            <ApplicationLogo />
                        </div>

                        {/* Hamburger icon */}
                        <button
                            onClick={() => setIsCollapseOpen(!isCollapseOpen)}
                            className="md:hidden text-gray-700 focus:outline-none text-2xl ml-24 mt-7"
                        >
                            ☰
                        </button>
                    </div>

                    {/* Responsive Menu */}
                    <div
                        className={`
        ${isCollapseOpen ? "hidden" : "flex"}
        flex-col absolute top-20 left-0 w-full bg-white bg-opacity-70

        md:flex md:flex-row md:items-center md:mr-auto md:mt-6
        md:static md:w-auto md:bg-transparent
        z-40 p-4 md:p-0
    `}
                    >
                        {/* HOME */}
                        <div className="relative group">
                            <a
                                href="#"
                                className="block px-4 py-2 focus:text-yellow-500 hover:text-yellow-500"
                            >
                                Home
                            </a>

                            {/* Dropdown */}
                            <div
                                className="hidden md:absolute md:top-full md:left-0 md:mt-1 md:bg-white md:border md:rounded-md md:shadow-lg md:w-48 
                       md:group-hover:flex md:group-hover:flex-col z-50"
                            >
                                <a
                                    href="#"
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-yellow-500"
                                >
                                    Option 1
                                </a>
                                <a
                                    href="#"
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-yellow-500"
                                >
                                    Option 2
                                </a>
                                <a
                                    href="#"
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-yellow-500"
                                >
                                    Option 3
                                </a>
                            </div>

                            {/* Small screen dropdown*/}
                            <div className="md:hidden pl-4 mt-1">
                                <a
                                    href="#"
                                    className="block py-1 hover:text-yellow-500"
                                >
                                    Option 1
                                </a>
                                <a
                                    href="#"
                                    className="block py-1 hover:text-yellow-500"
                                >
                                    Option 2
                                </a>
                                <a
                                    href="#"
                                    className="block py-1 hover:text-yellow-500"
                                >
                                    Option 3
                                </a>
                            </div>
                        </div>

                        {/* COURSE */}
                        <div className="relative group mt-3 md:mt-0">
                            <a
                                href="#"
                                className="block px-4 py-2 focus:text-yellow-500 hover:text-yellow-500"
                            >
                                Course
                            </a>

                            {/* Dropdown for md */}
                            <div
                                className="hidden md:absolute md:top-full md:left-0 md:mt-1 md:bg-white md:border md:rounded-md md:shadow-lg md:w-48 
                       md:group-hover:flex md:group-hover:flex-col z-50"
                            >
                                <a
                                    href="#"
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-yellow-500"
                                >
                                    Option 1
                                </a>
                                <a
                                    href="#"
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-yellow-500"
                                >
                                    Option 2
                                </a>
                                <a
                                    href="#"
                                    className="px-4 py-2 hover:bg-gray-100 hover:text-yellow-500"
                                >
                                    Option 3
                                </a>
                            </div>

                            {/* drop down for sm */}
                            <div className="md:hidden pl-4 mt-1">
                                <a
                                    href="#"
                                    className="block py-1 hover:text-yellow-500"
                                >
                                    Option 1
                                </a>
                                <a
                                    href="#"
                                    className="block py-1 hover:text-yellow-500"
                                >
                                    Option 2
                                </a>
                                <a
                                    href="#"
                                    className="block py-1 hover:text-yellow-500"
                                >
                                    Option 3
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* profile & notification */}
                    <div className="flex items-center space-x-6 mr-5 mt-7">
                        <FontAwesomeIcon icon={faBell} />
                        <Dropdown
                            trigger={["hover"]}
                            menu={{
                                items,
                                onClick: handleMenuClick,
                            }}
                            onOpenChange={handleOpenChange}
                            open={open}
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <img
                                        src="storage/photos/JJhKlNcqqFxfcqGX3ZBt08xoLsLX3AUVfqdsCWVg.jpg"
                                        alt=""
                                        className="w-8 h-8 rounded-full md:rounded-full"
                                    />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </nav>
            </header>
        </>
    );
}
