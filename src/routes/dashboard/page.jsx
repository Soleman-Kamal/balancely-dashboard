import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    ArrowRight,
    ArrowUpRight,
    Banknote,
    Building2,
    CircleDollarSign,
    Clock3,
    CreditCard,
    Eye,
    FileText,
    Landmark,
    Plus,
    ReceiptText,
    TrendingDown,
    TrendingUp,
    WalletCards,
} from "lucide-react";

import { useTheme } from "@/hooks/use-theme";

import {
    financialOverviewData,
    companyAccounts,
} from "@/constants";

import { Footer } from "@/layouts/footer";

const DashboardPage = () => {
    const { theme } = useTheme();

    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        // PROFILE
        const storedProfile = localStorage.getItem(
            "balancely-profile",
        );

        if (storedProfile) {
            const profile = JSON.parse(storedProfile);

            if (profile.name) {
                setUserName(profile.name);
            }
        }

        // TRANSACTIONS
        const loadTransactions = () => {
            const storedTransactions = JSON.parse(
                localStorage.getItem(
                    "balancely-transactions",
                ) || "[]",
            );

            setTransactions(storedTransactions);
        };

        loadTransactions();

        const handleTransactionsUpdated = (event) => {
            setTransactions(event.detail);
        };

        window.addEventListener(
            "transactions-updated",
            handleTransactionsUpdated,
        );

        window.addEventListener(
            "storage",
            loadTransactions,
        );

        return () => {
            window.removeEventListener(
                "transactions-updated",
                handleTransactionsUpdated,
            );

            window.removeEventListener(
                "storage",
                loadTransactions,
            );
        };
    }, []);

    const totalRevenue = transactions
        .filter(
            (transaction) =>
                transaction.type === "Income" &&
                transaction.status === "Completed",
        )
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0,
        );

    const totalExpenses = transactions
        .filter(
            (transaction) =>
                transaction.type === "Expense" &&
                transaction.status === "Completed",
        )
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount),
            0,
        );

    const netProfit = totalRevenue - totalExpenses;

    const profitMargin =
        totalRevenue > 0
            ? (netProfit / totalRevenue) * 100
            : 0;

    const pendingInvoices = JSON.parse(
        localStorage.getItem("balancely-invoices") || "[]",
    ).filter((invoice) => invoice.status === "Pending");

    const outstandingAmount = pendingInvoices.reduce(
        (sum, invoice) =>
            sum + Number(invoice.total || 0),
        0,
    );

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const summaryCards = [
        {
            title: "Total Revenue",
            value: formatCurrency(totalRevenue),
            change: `${
                transactions.filter(
                    (item) => item.type === "Income",
                ).length
            } income`,
            description: "Completed income transactions",
            trend: "up",
            icon: CircleDollarSign,
        },
        {
            title: "Total Expenses",
            value: formatCurrency(totalExpenses),
            change: `${
                transactions.filter(
                    (item) => item.type === "Expense",
                ).length
            } expenses`,
            description: "Completed expense transactions",
            trend: "down",
            icon: ReceiptText,
        },
        {
            title: "Outstanding",
            value: formatCurrency(outstandingAmount),
            change: `${pendingInvoices.length} invoices`,
            description: "Awaiting payment",
            trend: "neutral",
            icon: FileText,
        },
    ];

    const getStatusClasses = (status) => {
        const classes = {
            Completed:
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            Pending:
                "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            Failed:
                "bg-red-500/10 text-red-600 dark:text-red-400",
            Processing:
                "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        };

        return classes[status] || classes.Pending;
    };

    const getTransactionIcon = (type) => {
        if (type === "Income") {
            return (
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <ArrowDownRight size={18} />
                </div>
            );
        }

        return (
            <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                <ArrowUpRight size={18} />
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-6">
            {/* PAGE TOP */}
            <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        <Building2 size={15} />
                        Financial workspace
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Good morning, {userName}
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Here&apos;s what&apos;s happening with your company
                        finances today.
                    </p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() =>
                            navigate("/financial-reports")
                        }
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <FileText size={17} />
                        Reports
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/invoices/new")
                        }
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        <Plus size={17} />
                        New Invoice
                    </button>
                </div>
            </section>

            {/* FINANCIAL OVERVIEW */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                {/* FEATURED PROFIT */}
                <article className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950 p-6 text-white dark:border dark:border-slate-800 xl:col-span-5">
                    <div className="absolute -right-16 -top-16 size-48 rounded-full bg-emerald-500/20 blur-3xl" />

                    <div className="relative flex h-full flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                                    <TrendingUp size={22} />
                                </div>

                                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                                    <ArrowUpRight size={14} />
                                    {profitMargin.toFixed(1)}%
                                </span>
                            </div>

                            <div className="mt-8">
                                <p className="text-sm font-medium text-slate-400">
                                    Net Profit
                                </p>

                                <p className="mt-2 text-4xl font-bold tracking-tight">
                                    {formatCurrency(netProfit)}
                                </p>

                                <p className="mt-2 text-sm text-slate-400">
                                    Current financial period
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                            <div>
                                <p className="text-xs text-slate-500">
                                    Profit margin
                                </p>

                                <p className="mt-1 font-semibold">
                                    {profitMargin.toFixed(1)}%
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/transactions")
                                }
                                className="flex items-center gap-2 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
                            >
                                Details
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </article>

                {/* OTHER KPI CARDS */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 xl:col-span-7">
                    {summaryCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <article
                                key={card.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        <Icon size={20} />
                                    </div>

                                    <span
                                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                                            card.trend === "up"
                                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                : card.trend === "down"
                                                  ? "bg-red-500/10 text-red-600 dark:text-red-400"
                                                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                        }`}
                                    >
                                        {card.trend === "up" && (
                                            <TrendingUp size={12} />
                                        )}

                                        {card.trend === "down" && (
                                            <TrendingDown size={12} />
                                        )}

                                        {card.trend === "neutral" && (
                                            <Clock3 size={12} />
                                        )}

                                        {card.change}
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        {card.title}
                                    </p>

                                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {card.value}
                                    </p>

                                    <p className="mt-2 text-xs text-slate-400">
                                        {card.description}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* CHART + CASH FLOW */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
                {/* CHART */}
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 xl:col-span-8">
                    <div className="flex flex-col justify-between gap-4 border-b border-slate-200 px-6 py-5 dark:border-slate-800 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-white">
                                Financial Performance
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Revenue compared with operating expenses
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden items-center gap-4 text-xs sm:flex">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <span className="size-2 rounded-full bg-emerald-500" />
                                    Revenue
                                </div>

                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                    <span className="size-2 rounded-full bg-amber-500" />
                                    Expenses
                                </div>
                            </div>

                            <select
                                defaultValue="2026"
                                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                            >
                                <option value="2026">
                                    2026
                                </option>

                                <option value="2025">
                                    2025
                                </option>

                                <option value="2024">
                                    2024
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="px-3 pb-3 pt-5 sm:px-5">
                        <ResponsiveContainer
                            width="100%"
                            height={330}
                        >
                            <AreaChart
                                data={financialOverviewData}
                                margin={{
                                    top: 10,
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
                                            stopColor="#10b981"
                                            stopOpacity={0.22}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#10b981"
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
                                            stopOpacity={0.16}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#f59e0b"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
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
                                        boxShadow:
                                            "0 12px 30px rgba(0,0,0,0.12)",
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
                                    stroke="#10b981"
                                    strokeWidth={2.5}
                                    fill="url(#revenueColor)"
                                />

                                <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    name="Expenses"
                                    stroke="#f59e0b"
                                    strokeWidth={2.5}
                                    fill="url(#expensesColor)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </article>

                {/* CASH FLOW */}
                <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 xl:col-span-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-900 dark:text-white">
                                Cash Flow
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                Current period
                            </p>
                        </div>

                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <WalletCards size={20} />
                        </div>
                    </div>

                    <div className="mt-7">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                            Available balance
                        </p>

                        <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {formatCurrency(netProfit)}
                        </p>
                    </div>

                    <div className="mt-7 space-y-3">
                        <div className="flex items-center justify-between rounded-xl bg-emerald-500/5 p-4 dark:bg-emerald-500/10">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <ArrowDownRight size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Cash In
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                        {formatCurrency(
                                            totalRevenue,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl bg-red-500/5 p-4 dark:bg-red-500/10">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 text-red-600 dark:text-red-400">
                                    <ArrowUpRight size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Cash Out
                                    </p>

                                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                        {formatCurrency(
                                            totalExpenses,
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/transactions")
                        }
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        View cash flow
                        <ArrowRight size={16} />
                    </button>
                </article>
            </section>

            {/* ACCOUNTS */}
            <section>
                <div className="mb-4 flex items-end justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Accounts
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Your connected financial accounts
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/accounts")
                        }
                        className="text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                        Manage accounts
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {companyAccounts.map((account) => (
                        <article
                            key={account.id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    {account.type === "Bank" ? (
                                        <Landmark size={19} />
                                    ) : account.type ===
                                      "Card" ? (
                                        <CreditCard size={19} />
                                    ) : (
                                        <Banknote size={19} />
                                    )}
                                </div>

                                <span
                                    className={`size-2.5 rounded-full ${
                                        account.status ===
                                        "Active"
                                            ? "bg-emerald-500"
                                            : "bg-amber-500"
                                    }`}
                                />
                            </div>

                            <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                                {account.name}
                            </p>

                            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {formatCurrency(
                                    account.balance,
                                )}
                            </p>

                            <p className="mt-3 text-xs text-slate-400">
                                {account.accountNumber}
                            </p>
                        </article>
                    ))}
                </div>
            </section>

            {/* RECENT TRANSACTIONS */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Recent Transactions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Latest activity across your accounts
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/transactions")
                        }
                        className="flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                        View all
                        <ArrowRight size={15} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-slate-100 text-left dark:border-slate-800">
                                <th className="px-6 py-3 text-xs font-medium text-slate-400">
                                    Transaction
                                </th>

                                <th className="px-5 py-3 text-xs font-medium text-slate-400">
                                    Account
                                </th>

                                <th className="px-5 py-3 text-xs font-medium text-slate-400">
                                    Date
                                </th>

                                <th className="px-5 py-3 text-xs font-medium text-slate-400">
                                    Amount
                                </th>

                                <th className="px-5 py-3 text-xs font-medium text-slate-400">
                                    Status
                                </th>

                                <th className="px-5 py-3" />
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-sm text-slate-500"
                                    >
                                        No transactions yet.
                                    </td>
                                </tr>
                            ) : (
                                transactions
                                    .slice(0, 5)
                                    .map((transaction) => (
                                        <tr
                                            key={transaction.id}
                                            className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/50"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {getTransactionIcon(
                                                        transaction.type,
                                                    )}

                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                                            {
                                                                transaction.description
                                                            }
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {
                                                                transaction.category
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">
                                                {
                                                    transaction.account
                                                }
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-500 dark:text-slate-400">
                                                {
                                                    transaction.date
                                                }
                                            </td>

                                            <td
                                                className={`px-5 py-4 text-sm font-semibold ${
                                                    transaction.type ===
                                                    "Income"
                                                        ? "text-emerald-600 dark:text-emerald-400"
                                                        : "text-red-600 dark:text-red-400"
                                                }`}
                                            >
                                                {transaction.type ===
                                                "Income"
                                                    ? "+"
                                                    : "-"}
                                                {formatCurrency(
                                                    transaction.amount,
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                                                        transaction.status,
                                                    )}`}
                                                >
                                                    {
                                                        transaction.status
                                                    }
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <button
                                                    type="button"
                                                    aria-label={`View ${transaction.description}`}
                                                    className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                                >
                                                    <Eye
                                                        size={17}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DashboardPage;
