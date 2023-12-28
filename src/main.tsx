import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router";
import "./index.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1E293B",
                        colorLinkActive: "#334154",
                        colorBgLayout: "#10172A",
                        colorTextSecondary: "#FFFFFFB3",
                    },
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
