import { useEffect, useMemo, useState } from "react";

import {
    Building2,
    Mail,
    MapPin,
    Phone,
    Plus,
    Search,
    Truck,
    Users,
    WalletCards,
    X,
} from "lucide-react";

const defaultVendors = [
    {
        id: 1,
        name: "CloudServe Inc.",
        email: "billing@cloudserve.com",
        phone: "+1 202 555 0182",
        category: "Cloud Services",
        location: "United States",
        status: "Active",
    },
    {
        id: 2,
        name: "Pixel Supplies",
        email: "accounts@pixelsupplies.com",
        phone: "+962 79 555 0123",
        category: "Office Supplies",
        location: "Amman, Jordan",
        status: "Active",
    },
    {
        id: 3,
        name: "Tech Hardware Co.",
        email: "finance@techhardware.com",
        phone: "+970 599 333 221",
        category: "Hardware",
        location: "Palestine",
        status: "Inactive",
    },
];

const VendorsPage = () => {
    const [vendors, setVendors] = useState(() => {
        const stored = localStorage.getItem("balancely-vendors");

        if (stored) {
            return JSON.parse(stored);
        }

        return defaultVendors;
    });

    const [expenses, setExpenses] = useState([]);

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        category: "",
        location: "",
        status: "Active",
    });

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

    const saveVendors = (updated) => {
        setVendors(updated);

        localStorage.setItem(
            "balancely-vendors",
            JSON.stringify(updated),
        );

        window.dispatchEvent(
            new CustomEvent("vendors-updated", {
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

    const handleAddVendor = () => {
        if (!form.name.trim()) {
            alert("Please enter a vendor name.");
            return;
        }

        if (!form.email.trim()) {
            alert("Please enter a vendor email.");
            return;
        }

        const newVendor = {
            id: Date.now(),
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            category: form.category.trim(),
            location: form.location.trim(),
            status: form.status,
        };

        const updated = [
            newVendor,
            ...vendors,
        ];

        saveVendors(updated);

        setForm({
            name: "",
            email: "",
            phone: "",
            category: "",
            location: "",
            status: "Active",
        });

        setModalOpen(false);
    };

    const filteredVendors = useMemo(() => {
        const query = search.toLowerCase();

        return vendors.filter((vendor) => {
            return (
                vendor.name.toLowerCase().includes(query) ||
                vendor.email.toLowerCase().includes(query) ||
                vendor.category.toLowerCase().includes(query) ||
                vendor.location.toLowerCase().includes(query)
            );
        });
    }, [vendors, search]);

    const activeVendors = vendors.filter(
        (vendor) => vendor.status === "Active",
    ).length;

    const getVendorExpenses = (vendorId) => {
        return expenses.filter(
            (expense) =>
                String(expense.vendorId) === String(vendorId),
        );
    };

    const getVendorBalanceDue = (vendorId) => {
        return getVendorExpenses(vendorId)
            .filter(
                (expense) =>
                    expense.status === "Pending",
            )
            .reduce(
                (sum, expense) =>
                    sum + Number(expense.amount || 0),
                0,
            );
    };

    const getVendorOpenBills = (vendorId) => {
        return getVendorExpenses(vendorId).filter(
            (expense) =>
                expense.status === "Pending",
        ).length;
    };

    const totalBalanceDue = vendors.reduce(
        (sum, vendor) =>
            sum + getVendorBalanceDue(vendor.id),
        0,
    );

    const totalOpenBills = vendors.reduce(
        (sum, vendor) =>
            sum + getVendorOpenBills(vendor.id),
        0,
    );

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
        }).format(value);
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
                        Vendors
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage suppliers, outstanding balances and vendor relationships.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    Add Vendor
                </button>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <Users size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                            Total
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Total Vendors
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {vendors.length}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Truck size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            Active
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Active Vendors
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {activeVendors}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <WalletCards size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            Due
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Balance Due
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {formatCurrency(totalBalanceDue)}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <Building2 size={20} />
                        </div>

                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                            Bills
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Open Bills
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {totalOpenBills}
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
                        placeholder="Search vendors..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </section>

            {/* VENDORS GRID */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredVendors.map((vendor) => (
                    <article
                        key={vendor.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-600 dark:text-emerald-400">
                                {vendor.name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    vendor.status === "Active"
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                }`}
                            >
                                {vendor.status}
                            </span>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {vendor.name}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {vendor.category || "Uncategorized"}
                            </p>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
                            <div>
                                <p className="text-xs text-slate-400">
                                    Balance Due
                                </p>

                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                    {formatCurrency(
                                        getVendorBalanceDue(vendor.id),
                                    )}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Open Bills
                                </p>

                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">
                                    {getVendorOpenBills(vendor.id)}
                                </p>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Mail size={16} />
                                <span>{vendor.email}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Phone size={16} />
                                <span>
                                    {vendor.phone || "No phone"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <MapPin size={16} />
                                <span>
                                    {vendor.location || "No location"}
                                </span>
                            </div>
                        </div>
                    </article>
                ))}

                {filteredVendors.length === 0 && (
                    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            No vendors found.
                        </p>
                    </div>
                )}
            </section>

            {/* ADD VENDOR MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Add Vendor
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Add a new supplier to your organization.
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
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Vendor Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleFormChange}
                                    placeholder="Vendor name"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Email
                                </label>

                                <input
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleFormChange}
                                    placeholder="vendor@example.com"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Phone
                                </label>

                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleFormChange}
                                    placeholder="+970..."
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
                                    onChange={handleFormChange}
                                    placeholder="Cloud, Hardware, Supplies..."
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Location
                                </label>

                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={handleFormChange}
                                    placeholder="City, Country"
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
                                onClick={handleAddVendor}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add Vendor
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorsPage;