import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ProCard } from "@ant-design/pro-components";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Label } from "@headlessui/react";
import { Head, usePage } from "@inertiajs/react";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import "../../../css/app.css";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function EditProfile1({ auth, updateProfileSuccess, updateProfileError }) {
    const [selectedKey, setSelectedKey] = useState("1");
    const [activePanel, setActivePanel] = useState("1");
    const [visible, setVisible] = useState(false);
    

    // status timer
    useEffect(() => {
        if (updateProfileSuccess) {
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [updateProfileSuccess]);

    const menuItems = [
        {
            key: "1",
            icon: (
                <FontAwesomeIcon icon={faUser} className="text-yellow-500 " />
            ),
            label: <span>Basic Information</span>,
            className: "custom-profile-menu-item",
        },
        {
            key: "2",
            icon: <FontAwesomeIcon icon={faLock} />,
            label: <span>Password</span>,
            className: "custom-profile-menu-item",
        },
    ];

    const handleClick = (e) => {
        setSelectedKey(e.key);
        setActivePanel(e.key);
    };

    return (
        <>
            <AuthenticatedLayout>
                <Head title="profile"></Head>
                <div className="relative">
                    {visible && updateProfileSuccess && (
                        <div
                            className="absolute top-0 left-1/3 z-50 
                            bg-green-200 rounded-lg
                            p-2 px-28
                            transition-opacity duration-1000 ease-out"
                        >
                            {updateProfileSuccess}
                        </div>
                    )}
                    { (visible && updateProfileError) && (
                        <div
                            className="absolute top-0 left-1/3 z-50 
                            bg-green-200 rounded-lg
                            p-2 px-28
                            transition-opacity duration-1000 ease-out"
                        >
                            {updateProfileError}
                        </div>
                    )}
                    <ProCard className="mt-24" gutter={8} wrap>
                        {/* side menu  */}
                        <ProCard
                            colSpan={{
                                xs: "100%",
                                sm: "20%",
                                md: "30%",
                                lg: "30%",
                            }}
                        >
                            <Menu
                                selectedKeys={[selectedKey]}
                                defaultSelectedKeys={["1"]}
                                mode="inline"
                                items={menuItems}
                                onClick={handleClick}
                            />
                        </ProCard>

                        {/* active panel  */}
                        <ProCard
                            colSpan={{
                                xs: "100%",
                                sm: "80%",
                                md: "70%",
                                lg: "70%",
                            }}
                            bordered
                            layout=""
                        >
                            {activePanel == 1 && (
                                <UpdateProfileInformationForm auth={auth} />
                            )}

                            {activePanel == 2 && (
                                <UpdatePasswordForm auth={auth} />
                            )}
                        </ProCard>
                    </ProCard>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
