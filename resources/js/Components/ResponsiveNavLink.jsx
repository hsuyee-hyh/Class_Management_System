import { Link, usePage } from '@inertiajs/react';

export default function ResponsiveNavLink({
    componentName,
    activeLink,
    setActiveLink,
    active = false,
    className = '',
    children,
    ...props
}) {
    const component = usePage();
    const isActive = activeLink === componentName;

    const handleClick = () => {
        setActiveLink(componentName);
    }

    return (
        <Link
            {...props}
            onClick={handleClick}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                isActive
                    ? 'border-yellow-500 bg-yellow-100 text-gray-700 focus:border-yellow-700 focus:bg-yellow-200 focus:text-gray-800'
                    : 'border-transparent text-gray-700 hover:border-gray-500 hover:bg-gray-100 hover:text-gray-800 focus:border-gray-500 focus:bg-gray-200 focus:text-gray-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
