import { usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Alert } from "antd";

export default function Home({ loginSuccess, registerationSuccess }) {
    // const { loginSuccess } = usePage().props;
    const handleClose = () => {
        setVisible(false);
    };

    /* animation */
    const [fadeOut, setFadeOut] = useState(false);
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        if (showAlert) {
            // Start fade after 3s
            const fadeTimer = setTimeout(() => setFadeOut(true), 7000);
            // Remove Alert after animation (1s duration)
            const hideTimer = setTimeout(() => setShowAlert(false), 4000);

            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [showAlert]);

    return (
        <>
            {console.log("login in success status: " + loginSuccess)}
            {loginSuccess && showAlert && (
                <Alert
                    description={loginSuccess}
                    type="success"
                    className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 max-w-[400px] bg-yellow-100 text-white rounded shadow-lg ${
                        fadeOut ? "fade-out-up" : ""
                    }`}
                />
            )}
            {registerationSuccess && showAlert && (
                <Alert
                    description={registerationSuccess}
                    type="success"
                    className={`fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-blue-600 text-white rounded shadow-lg ${
                        fadeOut ? "fade-out-up" : ""
                    }`}
                />
            )}
            <h1> Hello Home</h1>
        </>
    );
}
