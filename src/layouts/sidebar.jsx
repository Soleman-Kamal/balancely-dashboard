import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import { navbarLinks } from "@/constants";

import { cn } from "@/utils/cn";

import PropTypes from "prop-types";

export const Sidebar = forwardRef(({ collapsed }, ref) => {
    return (
        <aside
            ref={ref}
            className={cn(
                "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-r border-slate-300 bg-white [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] dark:border-slate-700 dark:bg-slate-900",
                collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
                collapsed ? "max-md:-left-full" : "max-md:left-0",
            )}
        >
            <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-5 dark:border-slate-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-lg">B</div>

                {!collapsed && (
                    <div>
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Balancely</h2>

                        <p className="text-xs text-slate-500">Enterprise Finance</p>
                    </div>
                )}
            </div>
            <div className="flex w-full flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
                {navbarLinks.map((navbarLink) => (
                    <nav
                        key={navbarLink.title}
                        className={cn("sidebar-group", collapsed && "md:items-center")}
                    >
                        <p
                            className={cn(
                                "mb-2 px-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-400",
                                collapsed && "md:w-[45px] md:text-center",
                            )}
                        >
                            {navbarLink.title}
                        </p>
                        {navbarLink.links.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.path}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                                        collapsed && "justify-center md:w-[48px]",

                                        isActive
                                            ? "bg-emerald-600 text-white shadow-lg"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-emerald-600 dark:text-slate-300 dark:hover:bg-slate-800",
                                    )
                                }
                            >
                                <link.icon
                                    size={22}
                                    className="flex-shrink-0"
                                />
                                {!collapsed && <p className="whitespace-nowrap">{link.label}</p>}
                            </NavLink>
                        ))}
                    </nav>
                ))}
            </div>
            {!collapsed && (
                <div className="m-4 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-500 p-5 text-white">
                    <p className="text-sm font-semibold">Financial Health</p>

                    <h3 className="mt-2 text-3xl font-bold">94%</h3>

                    <p className="mt-2 text-xs text-emerald-100">Company performance is excellent this month.</p>
                </div>
            )}
        </aside>
    );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
    collapsed: PropTypes.bool,
};
