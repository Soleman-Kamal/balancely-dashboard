import { useMemo, useState } from "react";

import { ArrowDownLeft, ArrowUpRight, CalendarDays, Download, Filter, Plus, Search, WalletCards, X } from "lucide-react";

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState(() => {
        const stored = localStorage.getItem("balancely-transactions");

        if (stored) {
            return JSON.parse(stored);
        }

        return [
            {
                id: 1,
                description: "Stripe Payment",
                category: "Sales",
                account: "Business Account",
                date: "2026-08-17",
                amount: 2450,
                type: "Income",
                status: "Completed",
            },
            {
                id: 2,
                description: "AWS Hosting",
                category: "Software",
                account: "Business Card",
                date: "2026-08-16",
                amount: 320,
                type: "Expense",
                status: "Completed",
            },
            {
                id: 3,
                description: "Client Payment",
                category: "Consulting",
                account: "Business Account",
                date: "2026-08-15",
                amount: 4800,
                type: "Income",
                status: "Completed",
            },
            {
                id: 4,
                description: "Adobe Creative Cloud",
                category: "Software",
                account: "Business Card",
                date: "2026-08-14",
                amount: 89,
                type: "Expense",
                status: "Pending",
            },
        ];
    });

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [modalOpen, setModalOpen] = useState(false);

    const [form, setForm] = useState({
        description: "",
        amount: "",
        type: "Income",
        category: "",
        account: "Business Account",
        date: "",
        status: "Completed",
    });

    const saveTransactions = (updated) => {
        setTransactions(updated);

        localStorage.setItem("balancely-transactions", JSON.stringify(updated));

        window.dispatchEvent(
            new CustomEvent("transactions-updated", {
                detail: updated,
            }),
        );
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddTransaction = () => {
        if (!form.description.trim() || !form.category.trim() || !form.amount || !form.date) {
            alert("Please complete all required fields.");
            return;
        }

        const newTransaction = {
            id: Date.now(),
            description: form.description.trim(),
            category: form.category.trim(),
            account: form.account,
            date: form.date,
            amount: Number(form.amount),
            type: form.type,
            status: form.status,
        };

        const updated = [newTransaction, ...transactions];

        saveTransactions(updated);

        setForm({
            description: "",
            amount: "",
            type: "Income",
            category: "",
            account: "Business Account",
            date: "",
            status: "Completed",
        });

        setModalOpen(false);
    };

    const filteredTransactions = useMemo(() => {
        return transactions.filter((transaction) => {
            const matchesSearch =
                transaction.description.toLowerCase().includes(search.toLowerCase()) ||
                transaction.category.toLowerCase().includes(search.toLowerCase()) ||
                transaction.account.toLowerCase().includes(search.toLowerCase());

            const matchesFilter = filter === "All" || transaction.type === filter;

            return matchesSearch && matchesFilter;
        });
    }, [transactions, search, filter]);

    const totalIncome = transactions
        .filter((transaction) => transaction.type === "Income")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const totalExpenses = transactions
        .filter((transaction) => transaction.type === "Expense")
        .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    const netFlow = totalIncome - totalExpenses;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (value) => {
        if (!value) return "-";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(new Date(`${value}T00:00:00`));
    };

    const exportCSV = () => {
        const headers = ["Description", "Category", "Account", "Date", "Type", "Amount", "Status"];

        const rows = transactions.map((transaction) => [
            transaction.description,
            transaction.category,
            transaction.account,
            transaction.date,
            transaction.type,
            transaction.amount,
            transaction.status,
        ]);

        const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "balancely-transactions.csv";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* PAGE HEADER */}
            <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Finance</p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Transactions</h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Track and manage all financial activity.</p>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={exportCSV}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <Download size={17} />
                        Export
                    </button>

                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        <Plus size={17} />
                        Add Transaction
                    </button>
                </div>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <ArrowDownLeft size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Income</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Total Income</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalIncome)}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                            <ArrowUpRight size={20} />
                        </div>

                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">Expenses</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Total Expenses</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalExpenses)}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <WalletCards size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Net</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Net Flow</p>

                    <p className={`mt-2 text-2xl font-bold ${netFlow >= 0 ? "text-slate-900 dark:text-white" : "text-red-600 dark:text-red-400"}`}>
                        {formatCurrency(netFlow)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <Filter size={20} />
                        </div>

                        <span className="text-xs font-semibold text-slate-500">Activity</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Transactions</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{transactions.length}</p>
                </article>
            </section>

            {/* TRANSACTIONS CARD */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                {/* FILTER BAR */}
                <div className="flex flex-col gap-4 border-b border-slate-200 p-5 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-md">
                        <Search
                            size={17}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search transactions..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {["All", "Income", "Expense"].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setFilter(item)}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                                    filter === item
                                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                }`}
                            >
                                {item === "All" ? "All Transactions" : item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">
                        <thead className="bg-slate-50 dark:bg-slate-950/50">
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Transaction</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Category</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Account</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Amount</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredTransactions.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-16 text-center text-sm text-slate-500"
                                    >
                                        No transactions found.
                                    </td>
                                </tr>
                            ) : (
                                filteredTransactions.map((transaction) => (
                                    <tr
                                        key={transaction.id}
                                        className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex size-10 items-center justify-center rounded-xl ${
                                                        transaction.type === "Income"
                                                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                                                    }`}
                                                >
                                                    {transaction.type === "Income" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-900 dark:text-white">{transaction.description}</p>

                                                    <p className="mt-1 text-xs text-slate-400">{transaction.type}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{transaction.category}</td>

                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{transaction.account}</td>

                                        <td className="px-5 py-4 text-sm text-slate-500">{formatDate(transaction.date)}</td>

                                        <td
                                            className={`px-5 py-4 text-sm font-semibold ${
                                                transaction.type === "Income"
                                                    ? "text-emerald-600 dark:text-emerald-400"
                                                    : "text-red-600 dark:text-red-400"
                                            }`}
                                        >
                                            {transaction.type === "Income" ? "+" : "-"}
                                            {formatCurrency(transaction.amount)}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    transaction.status === "Completed"
                                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                }`}
                                            >
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ADD TRANSACTION MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Transaction</h2>

                                <p className="mt-1 text-sm text-slate-500">Record new financial activity.</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid gap-4 p-6 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>

                                <input
                                    name="description"
                                    type="text"
                                    value={form.description}
                                    onChange={handleFormChange}
                                    placeholder="Example: Client payment"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>

                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={handleFormChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Income">Income</option>

                                    <option value="Expense">Expense</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Amount</label>

                                <input
                                    name="amount"
                                    type="number"
                                    min="0"
                                    value={form.amount}
                                    onChange={handleFormChange}
                                    placeholder="0.00"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>

                                <input
                                    name="category"
                                    type="text"
                                    value={form.category}
                                    onChange={handleFormChange}
                                    placeholder="Sales, Software..."
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Account</label>

                                <select
                                    name="account"
                                    value={form.account}
                                    onChange={handleFormChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Business Account">Business Account</option>

                                    <option value="Business Card">Business Card</option>

                                    <option value="Cash">Cash</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>

                                <div className="relative">
                                    <CalendarDays
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        name="date"
                                        type="date"
                                        value={form.date}
                                        onChange={handleFormChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleFormChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Completed">Completed</option>

                                    <option value="Pending">Pending</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-5 dark:border-slate-800">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleAddTransaction}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add Transaction
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
