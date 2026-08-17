import { Download, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const ExpensesHeader = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [vendors, setVendors] = useState([]);

    const [form, setForm] = useState({
        description: "",
        amount: "",
        category: "",
        vendorId: "",
        account: "Business Account",
        date: "",
        status: "Completed",
    });

    useEffect(() => {
        const loadVendors = () => {
            const storedVendors = JSON.parse(
                localStorage.getItem("balancely-vendors") || "[]",
            );

            setVendors(storedVendors);
        };

        loadVendors();

        const handleVendorsUpdated = (event) => {
            setVendors(event.detail);
        };

        window.addEventListener(
            "vendors-updated",
            handleVendorsUpdated,
        );

        return () => {
            window.removeEventListener(
                "vendors-updated",
                handleVendorsUpdated,
            );
        };
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddExpense = () => {
        if (!form.description.trim()) {
            alert("Please enter an expense description.");
            return;
        }

        if (!form.amount || Number(form.amount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        if (!form.category.trim()) {
            alert("Please enter a category.");
            return;
        }

        if (!form.vendorId) {
            alert("Please select a vendor.");
            return;
        }

        if (!form.date) {
            alert("Please select a date.");
            return;
        }

        const selectedVendor = vendors.find(
            (vendor) =>
                String(vendor.id) === String(form.vendorId),
        );

        if (!selectedVendor) {
            alert("Selected vendor was not found.");
            return;
        }

        const newExpense = {
            id: Date.now(),
            description: form.description.trim(),
            amount: Number(form.amount),
            category: form.category.trim(),
            vendorId: selectedVendor.id,
            vendor: selectedVendor.name,
            account: form.account,
            date: form.date,
            status: form.status,
            createdAt: new Date().toISOString(),
        };

        const storedExpenses = JSON.parse(
            localStorage.getItem("balancely-expenses") || "[]",
        );

        const updatedExpenses = [
            newExpense,
            ...storedExpenses,
        ];

        localStorage.setItem(
            "balancely-expenses",
            JSON.stringify(updatedExpenses),
        );

        const storedTransactions = JSON.parse(
            localStorage.getItem("balancely-transactions") || "[]",
        );

        const newTransaction = {
            id: Date.now() + 1,
            description: newExpense.description,
            category: newExpense.category,
            account: newExpense.account,
            date: newExpense.date,
            amount: newExpense.amount,
            type: "Expense",
            status: newExpense.status,
            vendorId: newExpense.vendorId,
            vendor: newExpense.vendor,
        };

        const updatedTransactions = [
            newTransaction,
            ...storedTransactions,
        ];

        localStorage.setItem(
            "balancely-transactions",
            JSON.stringify(updatedTransactions),
        );

        window.dispatchEvent(
            new CustomEvent("transactions-updated", {
                detail: updatedTransactions,
            }),
        );

        window.dispatchEvent(
            new CustomEvent("expenses-updated", {
                detail: updatedExpenses,
            }),
        );

        setForm({
            description: "",
            amount: "",
            category: "",
            vendorId: "",
            account: "Business Account",
            date: "",
            status: "Completed",
        });

        setModalOpen(false);
    };

    const exportExpenses = () => {
        const expenses = JSON.parse(
            localStorage.getItem("balancely-expenses") || "[]",
        );

        if (expenses.length === 0) {
            alert("No expenses to export.");
            return;
        }

        const headers = [
            "Description",
            "Vendor",
            "Category",
            "Account",
            "Date",
            "Amount",
            "Status",
        ];

        const rows = expenses.map((expense) => [
            expense.description,
            expense.vendor,
            expense.category,
            expense.account,
            expense.date,
            expense.amount,
            expense.status,
        ]);

        const csv = [
            headers,
            ...rows,
        ]
            .map((row) =>
                row
                    .map((value) =>
                        `"${String(value).replace(/"/g, '""')}"`,
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
        link.download = "balancely-expenses.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    return (
        <>
            <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        Finance
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Expenses
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Track company spending and manage operational costs.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={exportExpenses}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <Download size={17} />
                        Export
                    </button>

                    <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        <Plus size={17} />
                        Add Expense
                    </button>
                </div>
            </header>

            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Add Expense
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Record a new company expense.
                                </p>
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
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Description
                                </label>

                                <input
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Example: AWS Hosting"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Vendor
                                </label>

                                <select
                                    name="vendorId"
                                    value={form.vendorId}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="">
                                        Select vendor
                                    </option>

                                    {vendors
                                        .filter(
                                            (vendor) =>
                                                vendor.status === "Active",
                                        )
                                        .map((vendor) => (
                                            <option
                                                key={vendor.id}
                                                value={vendor.id}
                                            >
                                                {vendor.name}
                                                {vendor.category
                                                    ? ` — ${vendor.category}`
                                                    : ""}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Amount
                                </label>

                                <input
                                    name="amount"
                                    type="number"
                                    min="0"
                                    value={form.amount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Category
                                </label>

                                <input
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    placeholder="Software, Utilities..."
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Account
                                </label>

                                <select
                                    name="account"
                                    value={form.account}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Business Account">
                                        Business Account
                                    </option>

                                    <option value="Business Card">
                                        Business Card
                                    </option>

                                    <option value="Cash">
                                        Cash
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Date
                                </label>

                                <input
                                    name="date"
                                    type="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>
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
                                onClick={handleAddExpense}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add Expense
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ExpensesHeader;