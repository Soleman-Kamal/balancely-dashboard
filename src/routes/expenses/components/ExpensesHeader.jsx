import { Download, Plus } from "lucide-react";

const ExpensesHeader = () => {
    return (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Expenses
                </h1>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Track company spending and manage operational costs.
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <Download size={17} />
                    Export
                </button>

                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <Plus size={17} />
                    Add Expense
                </button>
            </div>
        </header>
    );
};

export default ExpensesHeader;