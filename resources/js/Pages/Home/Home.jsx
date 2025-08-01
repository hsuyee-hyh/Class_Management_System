import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ContentSection from "./Widgets/ContentSection";
import Footer from "./Widgets/Footer";
import { Spin } from "antd";
import { useState, useEffect } from "react";

export default function Home() {
    const [pageLoaded, setPageLoaded] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        // Listen for full page load (images, scripts, etc.)
        const handleLoad = () => setPageLoaded(true);

        if (document.readyState === "complete") {
            setPageLoaded(true);
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);
    
    const loading = !(pageLoaded && dataLoaded);

    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Spin size="large" tip="Loading">
                    <div ></div>
                </Spin>
            </div>
        );
    }
    return (
        <>
            <AuthenticatedLayout>
                <ContentSection></ContentSection>
                <Footer></Footer>
            </AuthenticatedLayout>
        </>
    );
}
