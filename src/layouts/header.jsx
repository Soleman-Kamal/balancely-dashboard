import { ChevronsLeft, Search, Bell, Command, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/hooks/use-theme";
import profileImg from "@/assets/profile-image.jpg";

import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: "Soleman Kamal",
        role: "Frontend Engineer",
        image: profileImg,
    });

    useEffect(() => {
        const loadProfile = () => {
            const stored = localStorage.getItem("balancely-profile");

            if (stored) {
                const parsed = JSON.parse(stored);

                setProfile({
                    name: parsed.name || "Soleman Kamal",
                    role: parsed.role || "Frontend Engineer",
                    image: parsed.image || profileImg,
                });
            }
        };

        loadProfile();

        const handleProfileUpdate = (event) => {
            setProfile(event.detail);
        };

        window.addEventListener("profile-updated", handleProfileUpdate);

        return () => {
            window.removeEventListener("profile-updated", handleProfileUpdate);
        };
    }, []);
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    return (
        <header className="relative flex h-[88px] items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-950">
            {/* LEFT */}
            <div className="flex items-center gap-4">
                <button
                    className="btn-ghost size-11"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180 transition" : "transition"} />
                </button>

                <div className="hidden items-center gap-3 lg:flex">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sm font-black tracking-tight text-white dark:bg-white dark:text-slate-900">
                        SK
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold tracking-tight text-slate-900 dark:text-white">Balancely</h2>

                            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                                Finance
                            </span>
                        </div>

                        <p className="text-xs text-slate-500 dark:text-slate-400">Built by {profile.name}</p>
                    </div>
                </div>
            </div>

            {/* CENTER */}
            <div className="hidden w-[420px] xl:block">
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-400 focus-within:bg-white dark:border-slate-700 dark:bg-slate-900 dark:focus-within:bg-slate-950">
                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search invoices, customers, transactions..."
                        className="h-11 w-full bg-transparent px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
                    />

                    <div className="hidden items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-400 dark:border-slate-700 dark:bg-slate-800 2xl:flex">
                        <Command size={12} />
                        <span>K</span>
                    </div>
                </div>
            </div>

            {/* RIGHT */}
            {/* RIGHT */}
            <div className="flex items-center gap-3">
                {/* THEME */}
                <button
                    type="button"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    aria-label="Toggle theme"
                    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
                </button>

                {/* NOTIFICATIONS */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        aria-label="Notifications"
                    >
                        <Bell size={19} />

                        <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 dark:border-slate-950" />
                    </button>

                    {notificationsOpen && (
                        <div className="absolute right-0 top-14 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
                            <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Notifications</h3>

                                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-500 dark:bg-red-500/10">
                                        3 new
                                    </span>
                                </div>
                            </div>

                            <div className="flex min-h-[180px] items-center justify-center px-6 py-8">
                                <div className="text-center">
                                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                        <Bell
                                            size={18}
                                            className="text-slate-400"
                                        />
                                    </div>

                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">No notifications yet</p>

                                    <p className="mt-1 text-xs text-slate-400">New updates will appear here.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFILE INFO */}
                <div className="hidden text-right md:block">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{profile.name}</p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">{profile.role}</p>
                </div>

                {/* PROFILE */}
                <button
                    type="button"
                    onClick={() => navigate("/settings")}
                    className="group relative rounded-full"
                    title="Account settings"
                >
                    <div className="rounded-full border-2 border-transparent p-[2px] transition group-hover:border-emerald-500">
                        <img
                            src={profile.image}
                            alt={profile.name}
                            className="h-11 w-11 rounded-full object-cover"
                        />
                    </div>

                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};
