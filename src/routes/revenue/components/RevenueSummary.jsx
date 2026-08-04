import { ArrowDownRight, ArrowUpRight, Banknote, CreditCard, ReceiptText } from "lucide-react";

const summaryItems = [
    {
        title: "Collected Revenue",
        value: "$768,200",
        change: "+9.6%",
        icon: CreditCard,
        positive: true,
    },
    {
        title: "Pending Revenue",
        value: "$74,300",
        change: "-2.1%",
        icon: ReceiptText,
        positive: false,
    },
    {
        title: "Average Daily Revenue",
        value: "$3,280",
        change: "+6.4%",
        icon: Banknote,
        positive: true,
    },
];

const RevenueSummary = () => {
    return (
        <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <article className="relative overflow-hidden rounded-2xl bg-slate-900 p-6 text-white shadow-lg lg:col-span-2">
                <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="relative">
                    <p className="text-sm font-medium text-slate-300">Total Revenue</p>

                    <h2 className="mt-4 text-4xl font-bold md:text-5xl">$842,500</h2>

                    <div className="mt-5 flex items-center gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-emerald-400/15 px-3 py-1 text-sm font-semibold text-emerald-300">
                            <ArrowUpRight size={16} />
                            12.8%
                        </span>

                        <span className="text-sm text-slate-400">compared to last year</span>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-5">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-400">Annual target</span>
                            <span className="font-semibold">$1,000,000</span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full w-[84%] rounded-full bg-emerald-400" />
                        </div>

                        <p className="mt-3 text-sm text-slate-400">84% of the annual target achieved</p>
                    </div>
                </div>
            </article>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
                {summaryItems.map((item) => {
                    const Icon = item.icon;
                    const ChangeIcon = item.positive ? ArrowUpRight : ArrowDownRight;

                    return (
                        <article
                            key={item.title}
                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <Icon size={21} />
                                </div>

                                <div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.title}</p>

                                    <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
                                </div>
                            </div>

                            <span
                                className={`flex items-center gap-1 text-sm font-semibold ${
                                    item.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"
                                }`}
                            >
                                <ChangeIcon size={16} />
                                {item.change}
                            </span>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};

export default RevenueSummary;
