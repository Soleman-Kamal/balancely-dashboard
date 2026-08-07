import { ChevronsLeft, Search, Building2 } from "lucide-react";

import profileImg from "@/assets/profile-image.jpg";

import PropTypes from "prop-types";

export const Header = ({ collapsed, setCollapsed }) => {
    return (
        <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
            {/* LEFT */}
            <div className="flex items-center gap-5">
                <button
                    className="btn-ghost size-11"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronsLeft className={collapsed ? "rotate-180 transition" : "transition"} />
                </button>

                <div className="hidden items-center gap-3 lg:flex">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                        <Building2 size={22} />
                    </div>

                    <div>
                        <h2 className="font-bold text-slate-900 dark:text-white">Balancely</h2>
                        <p className="text-sm text-slate-500">Enterprise Financial Management</p>
                    </div>
                </div>
            </div>

            {/* CENTER */}
            <div className="hidden w-[420px] xl:block">
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-slate-800">
                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search invoices, customers, transactions..."
                        className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-3 rounded-xl border border-slate-200 px-2 py-2 transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
                    <img
                        src={profileImg}
                        className="h-10 w-10 rounded-full object-cover"
                    />

                    <div className="hidden text-left lg:block">
                        <p className="font-semibold text-slate-900 dark:text-white">Soleman Kamal</p>
                        <p className="text-xs text-slate-500">Front-end Developer</p>
                    </div>
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};