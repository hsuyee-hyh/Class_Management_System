import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { route } from "ziggy-js";
import "../css/app.css";
import React from "react";
import { ConfigProvider } from "antd";
import enUS from 'antd/es/locale/en_US';

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // resolve: (name) => {
    // const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
    // return pages[`./Pages/${name}.jsx`];
    // },
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        // route.setZiggy(window.ziggy)
        const root = createRoot(el);

        root.render(
            <React.StrictMode>
                <ConfigProvider locale={enUS}>
                    <App {...props} />
                </ConfigProvider>
            </React.StrictMode>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
