import {
    ArrowDownRight,
    CreditCard,
    Landmark,
    Wallet,
} from "lucide-react";

const expenseCards = [
    {
        title: "Total Expenses",
        amount: "$248,900",
        change: "+8.2%",
        icon: Wallet,
    },
    {
        title: "Operational Costs",
        amount: "$112,450",
        change: "+5.1%",
        icon: Landmark,
    },
    {
        title: "Payroll",
        amount: "$86,700",
        change: "+2.4%",
        icon: CreditCard,
    },
];

const ExpenseOverview = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Expense Overview
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Monitor the major categories of company expenses.
                </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
                {expenseCards.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="rounded-xl border border-slate-200 p-5 dark:border-slate-700"
                        >
                            <div className="flex items-center justify-between">
                                <div className="rounded-xl bg-red-100 p-3 dark:bg-red-900/20">
                                    <Icon
                                        size={22}
                                        className="text-red-600"
                                    />
                                </div>

                                <span className="flex items-center gap-1 text-sm font-semibold text-red-600">
                                    <ArrowDownRight size={15} />
                                    {item.change}
                                </span>
                            </div>

                            <h3 className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                                {item.amount}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ExpenseOverview;