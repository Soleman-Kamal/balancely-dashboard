import { useMemo, useState } from "react";

import { Banknote, CalendarDays, CheckCircle2, DollarSign, Plus, Search, Users, WalletCards, X } from "lucide-react";

const defaultPayroll = [
    {
        id: 1,
        employee: "Ahmed Salem",
        role: "Frontend Developer",
        department: "Engineering",
        salary: 1800,
        bonus: 150,
        deductions: 50,
        status: "Paid",
        payDate: "2026-08-01",
    },
    {
        id: 2,
        employee: "Lina Omar",
        role: "UI/UX Designer",
        department: "Design",
        salary: 1600,
        bonus: 100,
        deductions: 0,
        status: "Paid",
        payDate: "2026-08-01",
    },
    {
        id: 3,
        employee: "Khaled Nasser",
        role: "Backend Developer",
        department: "Engineering",
        salary: 2100,
        bonus: 0,
        deductions: 75,
        status: "Pending",
        payDate: "2026-08-31",
    },
];

const PayrollPage = () => {
    const [payroll, setPayroll] = useState(() => {
        const stored = localStorage.getItem("balancely-payroll");

        if (stored) {
            return JSON.parse(stored);
        }

        return defaultPayroll;
    });

    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const [form, setForm] = useState({
        employee: "",
        role: "",
        department: "",
        salary: "",
        bonus: "",
        deductions: "",
        status: "Pending",
        payDate: "",
    });

    const savePayroll = (updated) => {
        setPayroll(updated);

        localStorage.setItem("balancely-payroll", JSON.stringify(updated));

        window.dispatchEvent(
            new CustomEvent("payroll-updated", {
                detail: updated,
            }),
        );
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddPayroll = () => {
        if (!form.employee.trim()) {
            alert("Please enter an employee name.");
            return;
        }

        if (!form.salary || Number(form.salary) <= 0) {
            alert("Please enter a valid salary.");
            return;
        }

        if (!form.payDate) {
            alert("Please select a pay date.");
            return;
        }

        const newEntry = {
            id: Date.now(),
            employee: form.employee.trim(),
            role: form.role.trim(),
            department: form.department.trim(),
            salary: Number(form.salary),
            bonus: Number(form.bonus || 0),
            deductions: Number(form.deductions || 0),
            status: form.status,
            payDate: form.payDate,
        };
        const netPay = newEntry.salary + newEntry.bonus - newEntry.deductions;

        const updated = [newEntry, ...payroll];

        savePayroll(updated);
        if (newEntry.status === "Paid") {
            const storedTransactions = JSON.parse(localStorage.getItem("balancely-transactions") || "[]");

            const payrollTransaction = {
                id: Date.now() + 1,
                description: `Payroll - ${newEntry.employee}`,
                category: "Payroll",
                account: "Business Account",
                date: newEntry.payDate,
                amount: netPay,
                type: "Expense",
                status: "Completed",
                payrollId: newEntry.id,
                employee: newEntry.employee,
            };

            const updatedTransactions = [payrollTransaction, ...storedTransactions];

            localStorage.setItem("balancely-transactions", JSON.stringify(updatedTransactions));

            window.dispatchEvent(
                new CustomEvent("transactions-updated", {
                    detail: updatedTransactions,
                }),
            );
        }

        setForm({
            employee: "",
            role: "",
            department: "",
            salary: "",
            bonus: "",
            deductions: "",
            status: "Pending",
            payDate: "",
        });

        setModalOpen(false);
    };

    const filteredPayroll = useMemo(() => {
        const query = search.toLowerCase();

        return payroll.filter((item) => {
            return (
                item.employee.toLowerCase().includes(query) ||
                item.role.toLowerCase().includes(query) ||
                item.department.toLowerCase().includes(query)
            );
        });
    }, [payroll, search]);

    const totalPayroll = payroll.reduce((sum, item) => sum + Number(item.salary || 0) + Number(item.bonus || 0) - Number(item.deductions || 0), 0);

    const paidPayroll = payroll
        .filter((item) => item.status === "Paid")
        .reduce((sum, item) => sum + Number(item.salary || 0) + Number(item.bonus || 0) - Number(item.deductions || 0), 0);

    const pendingPayroll = payroll
        .filter((item) => item.status === "Pending")
        .reduce((sum, item) => sum + Number(item.salary || 0) + Number(item.bonus || 0) - Number(item.deductions || 0), 0);

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

    return (
        <div className="flex flex-col gap-6">
            {/* HEADER */}
            <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Management</p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Payroll</h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage employee salaries, bonuses, deductions and payroll status.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    Add Payroll
                </button>
            </section>

            {/* KPI CARDS */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <WalletCards size={20} />
                        </div>

                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Total</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Total Payroll</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalPayroll)}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                            <Users size={20} />
                        </div>

                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Employees</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Payroll Records</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{payroll.length}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <CheckCircle2 size={20} />
                        </div>

                        <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Paid</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Paid Payroll</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(paidPayroll)}</p>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <Banknote size={20} />
                        </div>

                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">Pending</span>
                    </div>

                    <p className="mt-6 text-sm text-slate-500">Pending Payroll</p>

                    <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(pendingPayroll)}</p>
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
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search payroll..."
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </section>

            {/* TABLE */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">
                        <thead className="bg-slate-50 dark:bg-slate-950/50">
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Employee</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Department</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Salary</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Bonus</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Deductions</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Net Pay</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Pay Date</th>

                                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPayroll.map((item) => {
                                const netPay = Number(item.salary || 0) + Number(item.bonus || 0) - Number(item.deductions || 0);

                                return (
                                    <tr
                                        key={item.id}
                                        className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{item.employee}</p>

                                                <p className="mt-1 text-xs text-slate-400">{item.role || "Employee"}</p>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-400">{item.department || "-"}</td>

                                        <td className="px-5 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                            {formatCurrency(item.salary)}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-emerald-600 dark:text-emerald-400">+{formatCurrency(item.bonus)}</td>

                                        <td className="px-5 py-4 text-sm text-red-600 dark:text-red-400">-{formatCurrency(item.deductions)}</td>

                                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">{formatCurrency(netPay)}</td>

                                        <td className="px-5 py-4 text-sm text-slate-500">{formatDate(item.payDate)}</td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                                    item.status === "Paid"
                                                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                        : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* ADD PAYROLL MODAL */}
            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Payroll</h2>

                                <p className="mt-1 text-sm text-slate-500">Add a new payroll record.</p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid gap-4 p-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Employee</label>

                                <input
                                    name="employee"
                                    value={form.employee}
                                    onChange={handleChange}
                                    placeholder="Employee name"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>

                                <input
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    placeholder="Frontend Developer"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>

                                <input
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    placeholder="Engineering"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Salary</label>

                                <input
                                    name="salary"
                                    type="number"
                                    min="0"
                                    value={form.salary}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Bonus</label>

                                <input
                                    name="bonus"
                                    type="number"
                                    min="0"
                                    value={form.bonus}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Deductions</label>

                                <input
                                    name="deductions"
                                    type="number"
                                    min="0"
                                    value={form.deductions}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pay Date</label>

                                <div className="relative">
                                    <CalendarDays
                                        size={17}
                                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />

                                    <input
                                        name="payDate"
                                        type="date"
                                        value={form.payDate}
                                        onChange={handleChange}
                                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    <option value="Pending">Pending</option>

                                    <option value="Paid">Paid</option>
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
                                onClick={handleAddPayroll}
                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Add Payroll
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayrollPage;
