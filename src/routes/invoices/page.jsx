import { Eye, FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoicesPage = () => {
    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const storedInvoices = JSON.parse(
            localStorage.getItem("balancely-invoices") || "[]",
        );

        setInvoices(storedInvoices);
    }, []);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* HEADER */}
            <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                        Finance
                    </p>

                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Invoices
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Manage and track all customer invoices.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => navigate("/invoices/new")}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    New Invoice
                </button>
            </section>

            {/* CONTENT */}
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                {invoices.length === 0 ? (
                    <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
                        <div className="flex size-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <FileText size={25} />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                            No invoices yet
                        </h2>

                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Create your first invoice and it will appear here.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/invoices/new")}
                            className="mt-5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white"
                        >
                            Create Invoice
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px]">
                            <thead className="bg-slate-50 dark:bg-slate-950/50">
                                <tr className="border-b border-slate-200 dark:border-slate-800">
                                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Invoice
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Customer
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Issue Date
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Due Date
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Total
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-4" />
                                </tr>
                            </thead>

                            <tbody>
                                {invoices.map((invoice) => (
                                    <tr
                                        key={invoice.id}
                                        className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950/40"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                                    <FileText
                                                        size={18}
                                                    />
                                                </div>

                                                <span className="font-semibold text-slate-900 dark:text-white">
                                                    {
                                                        invoice.invoiceNumber
                                                    }
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-700 dark:text-slate-300">
                                            {invoice.customer}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500">
                                            {invoice.issueDate}
                                        </td>

                                        <td className="px-5 py-4 text-sm text-slate-500">
                                            {invoice.dueDate}
                                        </td>

                                        <td className="px-5 py-4 font-semibold text-slate-900 dark:text-white">
                                            {formatCurrency(
                                                invoice.total,
                                            )}
                                        </td>

                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                                                {invoice.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4">
                                            <button
                                                type="button"
                                                className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
                                            >
                                                <Eye size={17} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
};

export default InvoicesPage;