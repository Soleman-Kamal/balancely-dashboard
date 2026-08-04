import {
    CircleCheck,
    Clock3,
    MoreHorizontal,
    XCircle,
} from "lucide-react";

const expenses = [
    {
        id: "EXP-1024",
        title: "Office Equipment",
        category: "Operations",
        date: "Jul 15, 2026",
        amount: "$8,450",
        status: "Paid",
    },
    {
        id: "EXP-1023",
        title: "Cloud Services",
        category: "Technology",
        date: "Jul 14, 2026",
        amount: "$6,800",
        status: "Pending",
    },
    {
        id: "EXP-1022",
        title: "Marketing Campaign",
        category: "Marketing",
        date: "Jul 12, 2026",
        amount: "$12,600",
        status: "Paid",
    },
    {
        id: "EXP-1021",
        title: "Delivery Services",
        category: "Logistics",
        date: "Jul 10, 2026",
        amount: "$4,250",
        status: "Rejected",
    },
    {
        id: "EXP-1020",
        title: "Employee Training",
        category: "Human Resources",
        date: "Jul 08, 2026",
        amount: "$7,300",
        status: "Pending",
    },
];

const statusStyles = {
    Paid: {
        icon: CircleCheck,
        className:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    Pending: {
        icon: Clock3,
        className:
            "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
    },
    Rejected: {
        icon: XCircle,
        className:
            "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
    },
};

const RecentExpenses = () => {
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 dark:border-slate-800">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Recent Expenses
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Latest company expense records and their payment status.
                    </p>
                </div>

                <button
                    type="button"
                    className="text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                >
                    View all
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Expense
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Category
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Date
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Status
                            </th>

                            <th className="px-6 py-4" />
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {expenses.map((expense) => {
                            const status = statusStyles[expense.status];
                            const StatusIcon = status.icon;

                            return (
                                <tr
                                    key={expense.id}
                                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">
                                                {expense.title}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                {expense.id}
                                            </p>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                        {expense.category}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                        {expense.date}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                        {expense.amount}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                                        >
                                            <StatusIcon size={14} />
                                            {expense.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            aria-label={`Open actions for ${expense.title}`}
                                            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                        >
                                            <MoreHorizontal size={19} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default RecentExpenses;