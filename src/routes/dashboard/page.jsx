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
    Banknote,
    Building2,
    CircleDollarSign,
    Clock3,
    CreditCard,
    Eye,
    FileText,
    Landmark,
    ReceiptText,
    TrendingDown,
    TrendingUp,
    WalletCards,
} from "lucide-react";

import { useTheme } from "@/hooks/use-theme";

import {
    financialOverviewData,
    recentTransactions,
    companyAccounts,
} from "@/constants";

import { Footer } from "@/layouts/footer";

const DashboardPage = () => {
    const { theme } = useTheme();

    const summaryCards = [
        {
            title: "Total Revenue",
            value: "$4,850,000",
            change: "12.5%",
            description: "Compared to last month",
            trend: "up",
            icon: CircleDollarSign,
        },
        {
            title: "Total Expenses",
            value: "$2,140,000",
            change: "4.2%",
            description: "Compared to last month",
            trend: "down",
            icon: ReceiptText,
        },
        {
            title: "Net Profit",
            value: "$2,710,000",
            change: "18.7%",
            description: "Current financial period",
            trend: "up",
            icon: TrendingUp,
        },
        {
            title: "Outstanding Invoices",
            value: "$684,500",
            change: "23 invoices",
            description: "Awaiting payment",
            trend: "neutral",
            icon: FileText,
        },
    ];

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const getStatusClasses = (status) => {
        const classes = {
            Completed:
                "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            Pending:
                "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
            Failed:
                "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
            Processing:
                "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        };

        return classes[status] || classes.Pending;
    };

    const getTransactionIcon = (type) => {
        if (type === "Income") {
            return (
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ArrowDownRight size={20} />
                </div>
            );
        }

        return (
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                <ArrowUpRight size={20} />
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-y-6">
            {/* Header */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 md:p-8">
                <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="relative flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
                    <div>
                        <div className="mb-3 flex items-center gap-x-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                            <Building2 size={18} />
                            Enterprise Financial Management
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 md:text-4xl">
                            Financial Overview
                        </h1>

                        <p className="mt-3 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
                            Monitor company revenue, expenses, cash flow,
                            invoices, accounts, and recent financial activity
                            from one centralized dashboard.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            className="flex items-center gap-x-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                        >
                            <FileText size={19} />
                            View Reports
                        </button>

                        <button
                            type="button"
                            className="flex items-center gap-x-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700"
                        >
                            <ReceiptText size={19} />
                            New Invoice
                        </button>
                    </div>
                </div>
            </section>

            {/* Summary Cards */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <article
                            key={card.title}
                            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white dark:text-emerald-400">
                                    <Icon size={24} />
                                </div>

                                <span
                                    className={`flex items-center gap-x-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        card.trend === "up"
                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                            : card.trend === "down"
                                              ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    }`}
                                >
                                    {card.trend === "up" && (
                                        <TrendingUp size={14} />
                                    )}

                                    {card.trend === "down" && (
                                        <TrendingDown size={14} />
                                    )}

                                    {card.trend === "neutral" && (
                                        <Clock3 size={14} />
                                    )}

                                    {card.change}
                                </span>
                            </div>

                            <div className="mt-6">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    {card.title}
                                </p>

                                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
                                    {card.value}
                                </p>

                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    {card.description}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </section>

            {/* Main financial chart and cash summary */}
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                <article className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
                    <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                                Revenue and Expenses
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Monthly financial performance
                            </p>
                        </div>

                        <select
                            defaultValue="2026"
                            className="w-fit rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                        >
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                        </select>
                    </div>

                    <div className="p-4">
                        <ResponsiveContainer
                            width="100%"
                            height={340}
                        >
                            <AreaChart
                                data={financialOverviewData}
                                margin={{
                                    top: 20,
                                    right: 10,
                                    left: 5,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="revenueColor"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#059669"
                                            stopOpacity={0.55}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#059669"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>

                                    <linearGradient
                                        id="expensesColor"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#f59e0b"
                                            stopOpacity={0.4}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#f59e0b"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    vertical={false}
                                    stroke={
                                        theme === "light"
                                            ? "#e2e8f0"
                                            : "#1e293b"
                                    }
                                />

                                <Tooltip
                                    formatter={(value) =>
                                        formatCurrency(value)
                                    }
                                    contentStyle={{
                                        backgroundColor:
                                            theme === "light"
                                                ? "#ffffff"
                                                : "#0f172a",
                                        borderColor:
                                            theme === "light"
                                                ? "#e2e8f0"
                                                : "#334155",
                                        borderRadius: "12px",
                                        color:
                                            theme === "light"
                                                ? "#0f172a"
                                                : "#f8fafc",
                                    }}
                                />

                                <XAxis
                                    dataKey="name"
                                    strokeWidth={0}
                                    stroke={
                                        theme === "light"
                                            ? "#64748b"
                                            : "#94a3b8"
                                    }
                                    tickMargin={12}
                                />

                                <YAxis
                                    strokeWidth={0}
                                    stroke={
                                        theme === "light"
                                            ? "#64748b"
                                            : "#94a3b8"
                                    }
                                    tickFormatter={(value) =>
                                        `$${value / 1000}k`
                                    }
                                    tickMargin={8}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="#059669"
                                    strokeWidth={3}
                                    fill="url(#revenueColor)"
                                />

                                <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    name="Expenses"
                                    stroke="#f59e0b"
                                    strokeWidth={3}
                                    fill="url(#expensesColor)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                {/* Cash Flow */}
                <article className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
                    <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                        <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                            Cash Flow Summary
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Current accounting period
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 p-5">
                        <div className="rounded-xl bg-emerald-500/10 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                                        Cash Inflow
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
                                        $5,125,000
                                    </p>
                                </div>

                                <ArrowDownRight className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>

                        <div className="rounded-xl bg-red-500/10 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-red-700 dark:text-red-400">
                                        Cash Outflow
                                    </p>

                                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
                                        $2,430,000
                                    </p>
                                </div>

                                <ArrowUpRight className="text-red-600 dark:text-red-400" />
                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Available Cash
                            </p>

                            <div className="mt-3 flex items-center gap-x-3">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                    <WalletCards size={21} />
                                </div>

                                <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
                                    $2,695,000
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="mt-auto w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                        >
                            View Cash Flow
                        </button>
                    </div>
                </article>
            </section>

            {/* Accounts overview */}
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                            Company Accounts
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Account balances across company financial channels
                        </p>
                    </div>

                    <Landmark className="text-emerald-600 dark:text-emerald-400" />
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
                    {companyAccounts.map((account) => (
                        <article
                            key={account.id}
                            className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-500/50 dark:border-slate-700"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    {account.type === "Bank" ? (
                                        <Landmark size={20} />
                                    ) : account.type === "Card" ? (
                                        <CreditCard size={20} />
                                    ) : (
                                        <Banknote size={20} />
                                    )}
                                </div>

                                <span
                                    className={`size-2.5 rounded-full ${
                                        account.status === "Active"
                                            ? "bg-emerald-500"
                                            : "bg-amber-500"
                                    }`}
                                />
                            </div>

                            <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                                {account.name}
                            </p>

                            <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-50">
                                {formatCurrency(account.balance)}
                            </p>

                            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                                {account.accountNumber}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Recent transactions */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex flex-col justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                            Recent Transactions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Latest income and expense transactions
                        </p>
                    </div>

                    <button
                        type="button"
                        className="w-fit text-sm font-semibold text-emerald-600 transition hover:text-emerald-700 dark:text-emerald-400"
                    >
                        View all transactions
                    </button>
                </div>

                <div className="overflow-x-auto [scrollbar-width:_thin]">
                    <table className="w-full min-w-[1000px]">
                        <thead className="bg-slate-50 dark:bg-slate-950">
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Transaction
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Account
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Category
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Date
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Amount
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {recentTransactions.map((transaction) => (
                                <tr
                                    key={transaction.id}
                                    className="border-b border-slate-200 transition last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
                                >
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-x-3">
                                            {getTransactionIcon(
                                                transaction.type,
                                            )}

                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-50">
                                                    {transaction.description}
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                                    {transaction.reference}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {transaction.account}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        {transaction.category}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                        {transaction.date}
                                    </td>

                                    <td
                                        className={`px-5 py-4 font-semibold ${
                                            transaction.type === "Income"
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : "text-red-600 dark:text-red-400"
                                        }`}
                                    >
                                        {transaction.type === "Income"
                                            ? "+"
                                            : "-"}
                                        {formatCurrency(transaction.amount)}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                                transaction.status,
                                            )}`}
                                        >
                                            {transaction.status}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4">
                                        <button
                                            type="button"
                                            aria-label={`View ${transaction.reference}`}
                                            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-emerald-500 hover:text-emerald-600 dark:border-slate-700 dark:text-slate-400"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DashboardPage;