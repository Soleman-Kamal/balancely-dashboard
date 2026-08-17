import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const NewInvoicePage = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [customer, setCustomer] = useState("");
    const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
    const [issueDate, setIssueDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [items, setItems] = useState([
        {
            description: "",
            quantity: 1,
            price: 0,
        },
    ]);

    const addItem = () => {
        setItems((prev) => [
            ...prev,
            {
                description: "",
                quantity: 1,
                price: 0,
            },
        ]);
    };

    const removeItem = (index) => {
        if (items.length === 1) return;

        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index
                    ? {
                          ...item,
                          [field]: value,
                      }
                    : item,
            ),
        );
    };

    const subtotal = items.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);

    const tax = 0;
    const total = subtotal + tax;

    const handleCreateInvoice = () => {
        if (!customerId) {
            alert("Please select a customer.");
            return;
        }

        if (!issueDate || !dueDate) {
            alert("Please select the issue date and due date.");
            return;
        }

        const validItems = items.filter((item) => item.description.trim() && Number(item.quantity) > 0 && Number(item.price) >= 0);

        if (validItems.length === 0) {
            alert("Please add at least one invoice item.");
            return;
        }

        const selectedCustomer = customers.find((customer) => String(customer.id) === String(customerId));

        if (!selectedCustomer) {
            alert("Selected customer was not found.");
            return;
        }

        const newInvoice = {
            id: Date.now(),
            invoiceNumber,
            customerId: selectedCustomer.id,
            customer: selectedCustomer.name,
            customerEmail: selectedCustomer.email,
            customerCompany: selectedCustomer.company,
            issueDate,
            dueDate,
            items: validItems,
            subtotal,
            tax,
            total,
            status: "Pending",
            createdAt: new Date().toISOString(),
        };

        const currentInvoices = JSON.parse(localStorage.getItem("balancely-invoices") || "[]");

        const updatedInvoices = [newInvoice, ...currentInvoices];

        localStorage.setItem("balancely-invoices", JSON.stringify(updatedInvoices));

        navigate("/invoices");
    };

    useEffect(() => {
        const storedCustomers = JSON.parse(localStorage.getItem("balancely-customers") || "[]");

        setCustomers(storedCustomers);

        if (storedCustomers.length > 0) {
            setCustomerId(String(storedCustomers[0].id));
        }
    }, []);

    return (
        <div className="flex flex-col gap-6">
            {/* HEADER */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/invoices")}
                        className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Invoice</h1>

                        <p className="mt-1 text-sm text-slate-500">Create a new invoice for your customer.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
                {/* LEFT */}
                <div className="space-y-6">
                    {/* DETAILS */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="font-semibold text-slate-900 dark:text-white">Invoice Details</h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Customer</label>

                                <select
                                    value={customerId}
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    {customers.length === 0 ? (
                                        <option value="">No customers available</option>
                                    ) : (
                                        customers.map((customer) => (
                                            <option
                                                key={customer.id}
                                                value={customer.id}
                                            >
                                                {customer.name}
                                                {customer.company ? ` — ${customer.company}` : ""}
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Invoice Number</label>

                                <input
                                    type="text"
                                    value={invoiceNumber}
                                    onChange={(e) => setInvoiceNumber(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Issue Date</label>

                                <input
                                    type="date"
                                    value={issueDate}
                                    onChange={(e) => setIssueDate(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Due Date</label>

                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>
                        </div>
                    </section>

                    {/* ITEMS */}
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold text-slate-900 dark:text-white">Invoice Items</h2>

                                <p className="mt-1 text-sm text-slate-500">Add products or services to this invoice.</p>
                            </div>

                            <button
                                type="button"
                                onClick={addItem}
                                className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-500/20 dark:text-emerald-400"
                            >
                                <Plus size={16} />
                                Add Item
                            </button>
                        </div>

                        <div className="mt-6 space-y-3">
                            {items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700 md:grid-cols-[1fr_100px_140px_50px]"
                                >
                                    <input
                                        type="text"
                                        placeholder="Item description"
                                        value={item.description}
                                        onChange={(e) => updateItem(index, "description", e.target.value)}
                                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />

                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(index, "quantity", e.target.value)}
                                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />

                                    <input
                                        type="number"
                                        min="0"
                                        value={item.price}
                                        onChange={(e) => updateItem(index, "price", e.target.value)}
                                        className="h-11 rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="flex h-11 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-500/10"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* SUMMARY */}
                <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="font-semibold text-slate-900 dark:text-white">Invoice Summary</h2>

                    <div className="mt-6 space-y-4">
                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between text-sm text-slate-500">
                            <span>Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>

                        <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-slate-900 dark:text-white">Total</span>

                                <span className="text-xl font-bold text-slate-900 dark:text-white">${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleCreateInvoice}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        <Save size={17} />
                        Create Invoice
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/invoices")}
                        className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        Cancel
                    </button>
                </aside>
            </div>
        </div>
    );
};

export default NewInvoicePage;
