import {
    CircleDollarSign,
    Percent,
    ReceiptText,
    Users,
} from "lucide-react";

const analyticsCards = [
    {
        title: "Revenue Growth",
        value: "18.4%",
        description: "Compared to the previous quarter",
        change: "+3.2%",
        icon: CircleDollarSign,
    },
    {
        title: "Net Profit Margin",
        value: "32.7%",
        description: "Current financial period",
        change: "+5.1%",
        icon: Percent,
    },
    {
        title: "Expense Ratio",
        value: "44.1%",
        description: "Percentage of total revenue",
        change: "-2.4%",
        icon: ReceiptText,
    },
    {
        title: "Customer Lifetime Value",
        value: "$18,640",
        description: "Average value per customer",
        change: "+8.6%",
        icon: Users,
    },
];

const AnalyticsCards = () => {
    return (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {analyticsCards.map((card) => {
                const Icon = card.icon;

                return (
                    <article
                        key={card.title}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <Icon size={22} />
                            </div>

                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                {card.change}
                            </span>
                        </div>

                        <div className="mt-5">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                {card.title}
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">
                                {card.value}
                            </p>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {card.description}
                            </p>
                        </div>
                    </article>
                );
            })}
        </section>
    );
};

export default AnalyticsCards;