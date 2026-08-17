import { useEffect, useMemo, useState } from "react";

import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    ArrowDownRight,
    ArrowUpRight,
    Download,
    FileText,
    TrendingUp,
    WalletCards,
} from "lucide-react";

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const FinancialReportsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [selectedYear, setSelectedYear] = useState("2026");

    useEffect(() => {
        const loadData = () => {
            const storedTransactions = JSON.parse(
                localStorage.getItem("balancely-transactions") || "[]",
            );

            const storedInvoices = JSON.parse(
                localStorage.getItem("balancely-invoices") || "[]",
            );

            setTransactions(storedTransactions);
            setInvoices(storedInvoices);
        };

        loadData();

        const handleTransactionsUpdated = (event) => {
            setTransactions(event.detail);
        };

        window.addEventListener(
            "transactions-updated",
            handleTransactionsUpdated,
        );

        window.addEventListener("storage", loadData);

        return () => {
            window.removeEventListener(
                "transactions-updated",
                handleTransactionsUpdated,
            );

            window.removeEventListener("storage", loadData);
        };
    }, []);

    const completedTransactions = transactions.filter(
        (transaction) => transaction.status === "Completed",
    );

    const totalRevenue = completedTransactions
        .filter((transaction) => transaction.type === "Income")
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount || 0),
            0,
        );

    const totalExpenses = completedTransactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount || 0),
            0,
        );

    const netProfit = totalRevenue - totalExpenses;

    const outstandingInvoices = invoices
        .filter((invoice) => invoice.status === "Pending")
        .reduce(
            (sum, invoice) =>
                sum + Number(invoice.total || 0),
            0,
        );

    const reportData = useMemo(() => {
        return monthNames.map((month, monthIndex) => {
            const monthlyTransactions =
                completedTransactions.filter((transaction) => {
                    if (!transaction.date) return false;

                    const date = new Date(
                        `${transaction.date}T00:00:00`,
                    );

                    return (
                        String(date.getFullYear()) === selectedYear &&
                        date.getMonth() === monthIndex
                    );
                });

            const revenue = monthlyTransactions
                .filter(
                    (transaction) =>
                        transaction.type === "Income",
                )
                .reduce(
                    (sum, transaction) =>
                        sum + Number(transaction.amount || 0),
                    0,
                );

            const expenses = monthlyTransactions
                .filter(
                    (transaction) =>
                        transaction.type === "Expense",
                )
                .reduce(
                    (sum, transaction) =>
                        sum + Number(transaction.amount || 0),
                    0,
                );

            return {
                name: month,
                revenue,
                expenses,
            };
        });
    }, [completedTransactions, selectedYear]);

    const categoryData = useMemo(() => {
        const categories = {};

        completedTransactions.forEach((transaction) => {
            const category =
                transaction.category || "Uncategorized";

            if (!categories[category]) {
                categories[category] = {
                    category,
                    income: 0,
                    expenses: 0,
                };
            }

            if (transaction.type === "Income") {
                categories[category].income += Number(
                    transaction.amount || 0,
                );
            }

            if (transaction.type === "Expense") {
                categories[category].expenses += Number(
                    transaction.amount || 0,
                );
            }
        });

        return Object.values(categories).sort(
            (a, b) =>
                b.income +
                b.expenses -
                (a.income + a.expenses),
        );
    }, [completedTransactions]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const exportReport = () => {
        const rows = [
            [
                "Metric",
                "Value",
            ],
            [
                "Total Revenue",
                totalRevenue,
            ],
            [
                "Total Expenses",
                totalExpenses,
            ],
            [
                "Net Profit",
                netProfit,
            ],
            [
                "Outstanding Invoices",
                outstandingInvoices,
            ],
            [],
            [
                "Category",
                "Income",
                "Expenses",
            ],
            ...categoryData.map((item) => [
                item.category,
                item.income,
                item.expenses,
            ]),
        ];

        const csv = rows
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value ?? "").replace(/"/g, '""')}"`,
                    )
                    .join(","),
            )
            .join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = `balancely-financial-report-${selectedYear}.csv`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* HEADER */}
            <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        Reports
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Financial Reports
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Analyze company revenue, expenses and profitability.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <select
                        value={selectedYear}
                        onChange={(event) =>
                            setSelectedYear(event.target.value)
                        }
                        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    >
                        <option value="2026">2026</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                    </select>

                    <button
                        type="button"
                        onClick={exportReport}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <Download size={17} />
                        Export
                    </button>
                </div>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <ArrowDownRight size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Revenue
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Total Revenue
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(totalRevenue)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                            <ArrowUpRight size={20} />
                        </div>

                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                            Expenses
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Total Expenses
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(totalExpenses)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <TrendingUp size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            Profit
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Net Profit
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(netProfit)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <FileText size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            Outstanding
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Pending Invoices
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(outstandingInvoices)}
                    </p>
                </article>
            </section>

            {/* CHART */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                        Revenue vs Expenses
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Monthly financial performance for {selectedYear}.
                    </p>
                </div>

                <div className="px-4 py-6">
                    <ResponsiveContainer
                        width="100%"
                        height={340}
                    >
                        <AreaChart data={reportData}>
                            <defs>
                                <linearGradient
                                    id="reportRevenue"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.2}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0}
                                    />
                                </linearGradient>

                                <linearGradient
                                    id="reportExpenses"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#ef4444"
                                        stopOpacity={0.15}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#ef4444"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                vertical={false}
                                strokeDasharray="3 3"
                                stroke="#e2e8f0"
                            />

                            <XAxis
                                dataKey="name"
                                strokeWidth={0}
                                tickMargin={12}
                            />

                            <YAxis
                                strokeWidth={0}
                                tickFormatter={(value) =>
                                    `$${value / 1000}k`
                                }
                            />

                            <Tooltip
                                formatter={(value) =>
                                    formatCurrency(value)
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                name="Revenue"
                                stroke="#10b981"
                                strokeWidth={2.5}
                                fill="url(#reportRevenue)"
                            />

                            <Area
                                type="monotone"
                                dataKey="expenses"
                                name="Expenses"
                                stroke="#ef4444"
                                strokeWidth={2.5}
                                fill="url(#reportExpenses)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </section>

            {/* CATEGORY SUMMARY */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                        Category Summary
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Income and expenses grouped by financial category.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead className="bg-slate-50 dark:bg-slate-950/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Category
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Income
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Expenses
                                </th>

                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Net
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categoryData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-14 text-center text-sm text-slate-500"
                                    >
                                        No financial data available.
                                    </td>
                                </tr>
                            ) : (
                                categoryData.map((item) => (
                                    <tr
                                        key={item.category}
                                        className="border-t border-slate-100 dark:border-slate-800"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {item.category}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                            {formatCurrency(item.income)}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-red-600 dark:text-red-400">
                                            {formatCurrency(item.expenses)}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                            {formatCurrency(
                                                item.income -
                                                    item.expenses,
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default FinancialReportsPage;