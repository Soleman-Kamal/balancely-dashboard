import { useEffect, useMemo, useState } from "react";

import {
    Calculator,
    Download,
    FileCheck2,
    ReceiptText,
    ShieldCheck,
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

const TaxReportsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedYear, setSelectedYear] = useState("2026");
    const [taxRate, setTaxRate] = useState(15);

    useEffect(() => {
        const loadTransactions = () => {
            const storedTransactions = JSON.parse(
                localStorage.getItem("balancely-transactions") || "[]",
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

        window.addEventListener("storage", loadTransactions);

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

    const yearTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            if (
                transaction.status !== "Completed" ||
                !transaction.date
            ) {
                return false;
            }

            const date = new Date(
                `${transaction.date}T00:00:00`,
            );

            return String(date.getFullYear()) === selectedYear;
        });
    }, [transactions, selectedYear]);

    const taxableRevenue = yearTransactions
        .filter((transaction) => transaction.type === "Income")
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount || 0),
            0,
        );

    const deductibleExpenses = yearTransactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce(
            (sum, transaction) =>
                sum + Number(transaction.amount || 0),
            0,
        );

    const taxableIncome = Math.max(
        taxableRevenue - deductibleExpenses,
        0,
    );

    const estimatedTax =
        taxableIncome * (Number(taxRate) / 100);

    const taxPaid = 0;

    const taxDue = Math.max(
        estimatedTax - taxPaid,
        0,
    );

    const monthlyTaxData = useMemo(() => {
        return monthNames.map((month, monthIndex) => {
            const monthlyTransactions = yearTransactions.filter(
                (transaction) => {
                    const date = new Date(
                        `${transaction.date}T00:00:00`,
                    );

                    return date.getMonth() === monthIndex;
                },
            );

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

            const income = Math.max(
                revenue - expenses,
                0,
            );

            const tax =
                income * (Number(taxRate) / 100);

            return {
                month,
                revenue,
                expenses,
                taxableIncome: income,
                estimatedTax: tax,
            };
        });
    }, [yearTransactions, taxRate]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const exportTaxReport = () => {
        const rows = [
            ["Tax Report", selectedYear],
            [],
            ["Tax Rate", `${taxRate}%`],
            ["Taxable Revenue", taxableRevenue],
            ["Deductible Expenses", deductibleExpenses],
            ["Taxable Income", taxableIncome],
            ["Estimated Tax", estimatedTax],
            ["Tax Paid", taxPaid],
            ["Tax Due", taxDue],
            [],
            [
                "Month",
                "Revenue",
                "Expenses",
                "Taxable Income",
                "Estimated Tax",
            ],
            ...monthlyTaxData.map((item) => [
                item.month,
                item.revenue,
                item.expenses,
                item.taxableIncome,
                item.estimatedTax,
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
        link.download = `balancely-tax-report-${selectedYear}.csv`;

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
                        Tax Reports
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Estimate tax obligations based on completed financial activity.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
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
                        onClick={exportTaxReport}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <Download size={17} />
                        Export
                    </button>
                </div>
            </section>

            {/* TAX RATE */}
            <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        Estimated Tax Rate
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                        Used only for this dashboard estimate.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={taxRate}
                        onChange={(event) =>
                            setTaxRate(event.target.value)
                        }
                        className="h-10 w-24 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />

                    <span className="font-semibold text-slate-500">
                        %
                    </span>
                </div>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <ReceiptText size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Revenue
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Taxable Revenue
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(taxableRevenue)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <FileCheck2 size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            Deductible
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Deductible Expenses
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(deductibleExpenses)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <Calculator size={20} />
                        </div>

                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                            Estimated
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Estimated Tax
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(estimatedTax)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <ShieldCheck size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            Due
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Tax Due
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(taxDue)}
                    </p>
                </article>
            </section>

            {/* TAX SUMMARY */}
            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 xl:col-span-1">
                    <h2 className="font-semibold text-slate-900 dark:text-white">
                        Tax Calculation
                    </h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Revenue
                            </span>

                            <span className="font-semibold text-slate-900 dark:text-white">
                                {formatCurrency(taxableRevenue)}
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Expenses
                            </span>

                            <span className="font-semibold text-red-600 dark:text-red-400">
                                -{formatCurrency(deductibleExpenses)}
                            </span>
                        </div>

                        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                            <div className="flex justify-between">
                                <span className="font-semibold text-slate-900 dark:text-white">
                                    Taxable Income
                                </span>

                                <span className="font-bold text-slate-900 dark:text-white">
                                    {formatCurrency(taxableIncome)}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">
                                Tax Rate
                            </span>

                            <span className="font-semibold text-slate-900 dark:text-white">
                                {taxRate}%
                            </span>
                        </div>

                        <div className="rounded-xl bg-amber-500/10 p-4">
                            <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                Estimated Tax Due
                            </p>

                            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                                {formatCurrency(taxDue)}
                            </p>
                        </div>
                    </div>
                </article>

                {/* MONTHLY TABLE */}
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
                    <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                        <h2 className="font-semibold text-slate-900 dark:text-white">
                            Monthly Tax Summary
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Estimated tax by month for {selectedYear}.
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[700px]">
                            <thead className="bg-slate-50 dark:bg-slate-950/50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Month
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Revenue
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Expenses
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Taxable
                                    </th>

                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Tax
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {monthlyTaxData.map((item) => (
                                    <tr
                                        key={item.month}
                                        className="border-t border-slate-100 dark:border-slate-800"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {item.month}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                            {formatCurrency(item.revenue)}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-red-600 dark:text-red-400">
                                            {formatCurrency(item.expenses)}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">
                                            {formatCurrency(item.taxableIncome)}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                            {formatCurrency(item.estimatedTax)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </article>
            </section>

            <p className="text-xs leading-5 text-slate-400">
                Tax values shown here are dashboard estimates based on the selected rate and recorded transactions, not an official tax filing calculation.
            </p>
        </div>
    );
};

export default TaxReportsPage;