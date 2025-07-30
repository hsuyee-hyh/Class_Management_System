import { Link, usePage } from "@inertiajs/react";
import { setActive } from "@material-tailwind/react/components/Tabs/TabsContext";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

export default function NavLink({
    name,
    componentName,
    activeLink,
    setActiveLink,
    active,
    className = "",
    children,
    ...props
}) {
    const { component } = usePage();
    
    const isActive = componentName === activeLink;
    const handleClick = () => {
        setActiveLink(componentName); // update active state and pass NavLink as props
    }; 
    return (
        <Link
            {...props}
            href={route(name)}
            onClick={handleClick}
            className={
                "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none " +
                (isActive
                    ? "border-yellow-400 text-gray-900 focus:border-yellow-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 focus:border-gray-300 focus:text-gray-700") +
                className
            }
        >
            {children}
        </Link>
    );
}
