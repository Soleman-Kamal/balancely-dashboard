import { useMemo, useState } from "react";

import {
    Building2,
    Mail,
    MapPin,
    Phone,
    Plus,
    Search,
    UserRound,
    Users,
    X,
} from "lucide-react";

const defaultCustomers = [
    {
        id: 1,
        name: "Nexa Digital",
        email: "finance@nexa.com",
        phone: "+970 599 123 456",
        company: "Nexa Digital",
        location: "Gaza, Palestine",
        status: "Active",
    },
    {
        id: 2,
        name: "Omar Khaled",
        email: "omar@example.com",
        phone: "+970 598 555 010",
        company: "Independent",
        location: "Ramallah, Palestine",
        status: "Active",
    },
    {
        id: 3,
        name: "Vision Labs",
        email: "accounts@visionlabs.com",
        phone: "+970 597 444 220",
        company: "Vision Labs",
        location: "Amman, Jordan",
        status: "Inactive",
    },
];

const CustomersPage = () => {
    const [customers, setCustomers] = useState(() => {
        const stored = localStorage.getItem("balancely-customers");

        if (stored) {
            return JSON.parse(stored);
        }

        return defaultCustomers;
    });

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        location: "",
        status: "Active",
    });

    const saveCustomers = (updated) => {
        setCustomers(updated);

        localStorage.setItem(
            "balancely-customers",
            JSON.stringify(updated),
        );

        window.dispatchEvent(
            new CustomEvent("customers-updated", {
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

    const handleAddCustomer = () => {
        if (!form.name.trim()) {
            alert("Please enter a customer name.");
            return;
        }

        if (!form.email.trim()) {
            alert("Please enter a customer email.");
            return;
        }

        const newCustomer = {
            id: Date.now(),
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            company: form.company.trim(),
            location: form.location.trim(),
            status: form.status,
        };

        const updated = [
            newCustomer,
            ...customers,
        ];

        saveCustomers(updated);

        setForm({
            name: "",
            email: "",
            phone: "",
            company: "",
            location: "",
            status: "Active",
        });

        setModalOpen(false);
    };

    const filteredCustomers = useMemo(() => {
        const query = search.toLowerCase();

        return customers.filter((customer) => {
            return (
                customer.name.toLowerCase().includes(query) ||
                customer.email.toLowerCase().includes(query) ||
                customer.company.toLowerCase().includes(query) ||
                customer.location.toLowerCase().includes(query)
            );
        });
    }, [customers, search]);

    const activeCustomers = customers.filter(
        (customer) => customer.status === "Active",
    ).length;

    const inactiveCustomers = customers.filter(
        (customer) => customer.status === "Inactive",
    ).length;

    const companyCustomers = customers.filter(
        (customer) =>
            customer.company &&
            customer.company !== "Independent",
    ).length;

    return (
        <div className="flex flex-col gap-6">
            {/* PAGE HEADER */}
            <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        Management
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Customers
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage customer information and business relationships.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    Add Customer
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
                        Total Customers
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {customers.length}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <UserRound size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                            Active
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Active Customers
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {activeCustomers}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <Building2 size={20} />
                        </div>

                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
                            Companies
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Business Customers
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {companyCustomers}
                    </p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <Users size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                            Inactive
                        </span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">
                        Inactive Customers
                    </p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                        {inactiveCustomers}
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
                        placeholder="Search customers..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </section>

            {/* CUSTOMER GRID */}
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredCustomers.map((customer) => (
                    <article
                        key={customer.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 font-bold text-emerald-600 dark:text-emerald-400">
                                {customer.name
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                    customer.status === "Active"
                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                }`}
                            >
                                {customer.status}
                            </span>
                        </div>

                        <div className="mt-5">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                                {customer.name}
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                {customer.company || "Independent"}
                            </p>
                        </div>

                        <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 dark:border-slate-800">
                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Mail size={16} />
                                <span>{customer.email}</span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <Phone size={16} />
                                <span>
                                    {customer.phone || "No phone"}
                                </span>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-slate-500">
                                <MapPin size={16} />
                                <span>
                                    {customer.location || "No location"}
                                </span>
                            </div>
                        </div>
                    </article>
                ))}

                {filteredCustomers.length === 0 && (
                    <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-700 dark:bg-slate-900">
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            No customers found.
                        </p>
                    </div>
                )}
            </section>

            {/* ADD CUSTOMER MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Add Customer
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Create a new customer profile.
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
                                    Customer Name
                                </label>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleFormChange}
                                    placeholder="Customer name"
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
                                    placeholder="name@example.com"
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
                                    Company
                                </label>

                                <input
                                    name="company"
                                    value={form.company}
                                    onChange={handleFormChange}
                                    placeholder="Company name"
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
                                onClick={handleAddCustomer}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add Customer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersPage;