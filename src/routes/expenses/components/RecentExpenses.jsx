import { useEffect, useState } from "react";

import {
    CircleCheck,
    Clock3,
    MoreHorizontal,
    XCircle,
} from "lucide-react";

const statusStyles = {
    Completed: {
        icon: CircleCheck,
        className:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
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
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        const loadExpenses = () => {
            const storedExpenses = JSON.parse(
                localStorage.getItem("balancely-expenses") || "[]",
            );

            setExpenses(storedExpenses);
        };

        loadExpenses();

        const handleExpensesUpdated = (event) => {
            setExpenses(event.detail);
        };

        window.addEventListener(
            "expenses-updated",
            handleExpensesUpdated,
        );

        window.addEventListener(
            "storage",
            loadExpenses,
        );

        return () => {
            window.removeEventListener(
                "expenses-updated",
                handleExpensesUpdated,
            );

            window.removeEventListener(
                "storage",
                loadExpenses,
            );
        };
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(Number(value || 0));
    };

    const formatDate = (date) => {
        if (!date) return "-";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(`${date}T00:00:00`));
    };

    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                <div>
                    <h2 className="font-semibold text-slate-900 dark:text-white">
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
                <table className="w-full min-w-[900px] text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Expense
                            </th>

                            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Vendor
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
                        {expenses.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-14 text-center text-sm text-slate-500"
                                >
                                    No expenses yet.
                                </td>
                            </tr>
                        ) : (
                            expenses
                                .slice(0, 8)
                                .map((expense) => {
                                    const status =
                                        statusStyles[expense.status] ||
                                        statusStyles.Pending;

                                    const StatusIcon = status.icon;

                                    return (
                                        <tr
                                            key={expense.id}
                                            className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                                        >
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">
                                                        {expense.description}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                        EXP-{String(expense.id).slice(-6)}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {expense.vendor || "No Vendor"}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {expense.category}
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                                {formatDate(expense.date)}
                                            </td>

                                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                                                {formatCurrency(expense.amount)}
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
                                                    aria-label={`Open actions for ${expense.description}`}
                                                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                                                >
                                                    <MoreHorizontal size={19} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default RecentExpenses;