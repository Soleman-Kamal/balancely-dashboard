import { useMemo, useState } from "react";

import {
    Banknote,
    Building2,
    CreditCard,
    Landmark,
    Plus,
    Search,
    WalletCards,
    X,
} from "lucide-react";

const defaultAccounts = [
    {
        id: 1,
        name: "Business Account",
        type: "Bank",
        balance: 12500,
        accountNumber: "**** 4821",
        status: "Active",
    },
    {
        id: 2,
        name: "Business Card",
        type: "Card",
        balance: 3200,
        accountNumber: "**** 9014",
        status: "Active",
    },
    {
        id: 3,
        name: "Cash Reserve",
        type: "Cash",
        balance: 4800,
        accountNumber: "Cash",
        status: "Active",
    },
];

const AccountsPage = () => {
    const [accounts, setAccounts] = useState(() => {
        const stored = localStorage.getItem("balancely-accounts");

        if (stored) {
            return JSON.parse(stored);
        }

        return defaultAccounts;
    });

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        type: "Bank",
        balance: "",
        accountNumber: "",
        status: "Active",
    });

    const saveAccounts = (updatedAccounts) => {
        setAccounts(updatedAccounts);

        localStorage.setItem(
            "balancely-accounts",
            JSON.stringify(updatedAccounts),
        );

        window.dispatchEvent(
            new CustomEvent("accounts-updated", {
                detail: updatedAccounts,
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

    const handleAddAccount = () => {
        if (!form.name.trim()) {
            alert("Please enter an account name.");
            return;
        }

        if (form.balance === "") {
            alert("Please enter an opening balance.");
            return;
        }

        const newAccount = {
            id: Date.now(),
            name: form.name.trim(),
            type: form.type,
            balance: Number(form.balance),
            accountNumber:
                form.accountNumber.trim() || "Not specified",
            status: form.status,
        };

        const updatedAccounts = [
            newAccount,
            ...accounts,
        ];

        saveAccounts(updatedAccounts);

        setForm({
            name: "",
            type: "Bank",
            balance: "",
            accountNumber: "",
            status: "Active",
        });

        setModalOpen(false);
    };

    const filteredAccounts = useMemo(() => {
        return accounts.filter((account) => {
            const query = search.toLowerCase();

            return (
                account.name.toLowerCase().includes(query) ||
                account.type.toLowerCase().includes(query) ||
                account.accountNumber
                    .toLowerCase()
                    .includes(query)
            );
        });
    }, [accounts, search]);

    const totalBalance = accounts.reduce(
        (sum, account) =>
            sum + Number(account.balance),
        0,
    );

    const activeAccounts = accounts.filter(
        (account) => account.status === "Active",
    ).length;

    const bankAccounts = accounts.filter(
        (account) => account.type === "Bank",
    ).length;

    const cardAccounts = accounts.filter(
        (account) => account.type === "Card",
    ).length;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
    };

    const getAccountIcon = (type) => {
        if (type === "Bank") {
            return <Landmark size={21} />;
        }

        if (type === "Card") {
            return <CreditCard size={21} />;
        }

        return <Banknote size={21} />;
    };

    return (
        <div className="flex flex-col gap-6">
            {/* PAGE HEADER */}
            <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Accounts
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage company bank accounts, cards and cash balances.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    Add Account
                </button>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <WalletCards size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Balance
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Total Balance
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(totalBalance)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Building2 size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            Active
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Active Accounts
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {activeAccounts}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <Landmark size={20} />
                        </div>

                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                            Bank
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Bank Accounts
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {bankAccounts}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <CreditCard size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            Cards
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Card Accounts
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {cardAccounts}
                    </p>
                </article>
            </section>

            {/* SEARCH */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <div className="relative max-w-md">
                    <Search
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search accounts..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </section>

            {/* ACCOUNTS GRID */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredAccounts.map((account) => (
                    <article
                        key={account.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {getAccountIcon(account.type)}
                            </div>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    account.status === "Active"
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                }`}
                            >
                                {account.status}
                            </span>
                        </div>

                        <div className="mt-6">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {account.type}
                            </p>

                            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                                {account.name}
                            </h2>

                            <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {formatCurrency(account.balance)}
                            </p>

                            <p className="mt-3 text-sm text-slate-400">
                                {account.accountNumber}
                            </p>
                        </div>
                    </article>
                ))}

                {filteredAccounts.length === 0 && (
                    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            No accounts found.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            Try another search or add a new account.
                        </p>
                    </div>
                )}
            </section>

            {/* ADD ACCOUNT MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Add Account
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Add a bank account, card or cash account.
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
                                    Account Name
                                </label>

                                <input
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleFormChange}
                                    placeholder="Business Account"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Account Type
                                </label>

                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={handleFormChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Bank">
                                        Bank
                                    </option>

                                    <option value="Card">
                                        Card
                                    </option>

                                    <option value="Cash">
                                        Cash
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Opening Balance
                                </label>

                                <input
                                    name="balance"
                                    type="number"
                                    value={form.balance}
                                    onChange={handleFormChange}
                                    placeholder="0"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Account Number
                                </label>

                                <input
                                    name="accountNumber"
                                    type="text"
                                    value={form.accountNumber}
                                    onChange={handleFormChange}
                                    placeholder="**** 4821"
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
                                    onChange={handleFormChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
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
                                onClick={handleAddAccount}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountsPage;
