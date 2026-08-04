import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const financialData = [
    { month: "Jan", revenue: 42000, expenses: 28000 },
    { month: "Feb", revenue: 48000, expenses: 31000 },
    { month: "Mar", revenue: 46000, expenses: 29500 },
    { month: "Apr", revenue: 58000, expenses: 34000 },
    { month: "May", revenue: 64000, expenses: 37000 },
    { month: "Jun", revenue: 72000, expenses: 41000 },
    { month: "Jul", revenue: 68000, expenses: 39500 },
    { month: "Aug", revenue: 79000, expenses: 43000 },
    { month: "Sep", revenue: 85000, expenses: 47000 },
    { month: "Oct", revenue: 91000, expenses: 51000 },
    { month: "Nov", revenue: 88000, expenses: 49500 },
    { month: "Dec", revenue: 98000, expenses: 54000 },
];

const formatCurrency = (value) => {
    return `$${value / 1000}k`;
};

const RevenueExpenseChart = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                        Revenue vs Expenses
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Monthly financial performance throughout the year.
                    </p>
                </div>

                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                </select>
            </div>

            <div className="mb-5 flex items-center gap-5 text-sm">
                <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-emerald-500"></span>
                    <span className="text-slate-600 dark:text-slate-300">
                        Revenue
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-slate-400"></span>
                    <span className="text-slate-600 dark:text-slate-300">
                        Expenses
                    </span>
                </div>
            </div>

            <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
    <BarChart
        data={financialData}
        margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 0,
        }}
        barGap={8}
    >
        <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#cbd5e1"
            opacity={0.35}
        />

        <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{
                fill: "#64748b",
                fontSize: 12,
            }}
        />

        <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
            tick={{
                fill: "#64748b",
                fontSize: 12,
            }}
        />

        <Tooltip
            cursor={{
                fill: "#94a3b8",
                opacity: 0.08,
            }}
            formatter={(value) => [
                `$${value.toLocaleString()}`,
            ]}
            contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
            }}
        />

        <Bar
            dataKey="revenue"
            name="Revenue"
            fill="#10b981"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
        />

        <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#94a3b8"
            radius={[6, 6, 0, 0]}
            maxBarSize={28}
        />
    </BarChart>
</ResponsiveContainer>
            </div>
        </section>
    );
};

export default RevenueExpenseChart;