import { ArrowUpRight } from "lucide-react";

const customers = [
    {
        name: "Northstar Holdings",
        email: "finance@northstar.com",
        revenue: "$84,200",
        growth: "+12.4%",
    },
    {
        name: "Vertex Solutions",
        email: "billing@vertex.com",
        revenue: "$72,850",
        growth: "+9.8%",
    },
    {
        name: "Greenline Market",
        email: "accounts@greenline.com",
        revenue: "$61,400",
        growth: "+7.3%",
    },
    {
        name: "Orion Technologies",
        email: "payments@orion.com",
        revenue: "$54,900",
        growth: "+5.6%",
    },
];

const TopCustomers = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Top Customers
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Customers generating the highest revenue.
                    </p>
                </div>

                <button
                    type="button"
                    className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400"
                >
                    View all
                </button>
            </div>

            <div className="mt-6 space-y-3">
                {customers.map((customer, index) => (
                    <article
                        key={customer.email}
                        className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                {index + 1}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate font-semibold text-slate-900 dark:text-white">
                                    {customer.name}
                                </p>

                                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                                    {customer.email}
                                </p>
                            </div>
                        </div>

                        <div className="shrink-0 text-right">
                            <p className="font-bold text-slate-900 dark:text-white">
                                {customer.revenue}
                            </p>

                            <span className="mt-1 flex items-center justify-end gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                <ArrowUpRight size={14} />
                                {customer.growth}
                            </span>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default TopCustomers;