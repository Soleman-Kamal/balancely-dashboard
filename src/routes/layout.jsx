import { Outlet } from "react-router-dom";

import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";

import { Sidebar } from "@/layouts/sidebar";
import { Header } from "@/layouts/header";

import { cn } from "@/utils/cn";
import { useEffect, useRef, useState } from "react";

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(!isDesktopDevice);

    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
            {/* Mobile overlay */}
            <div
                className={cn(
                    "pointer-events-none fixed inset-0 -z-10 bg-slate-950 opacity-0 backdrop-blur-sm transition-all duration-300",
                    !collapsed &&
                        "max-md:pointer-events-auto max-md:z-50 max-md:opacity-50",
                )}
            />

            {/* Sidebar */}
            <Sidebar
                ref={sidebarRef}
                collapsed={collapsed}
            />

            {/* Main content */}
            <div
                className={cn(
                    "min-h-screen transition-[margin] duration-300 ease-in-out",
                    collapsed ? "md:ml-[72px]" : "md:ml-[260px]",
                )}
            >
                <Header
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                />

                <main className="h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-slate-100 px-4 py-5 transition-colors dark:bg-slate-950 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-[1600px]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;