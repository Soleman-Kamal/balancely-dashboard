import {
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const expenseData = [
    {
        name: "Operations",
        value: 82,
        amount: "$92,400",
        fill: "#ef4444",
    },
    {
        name: "Payroll",
        value: 68,
        amount: "$76,800",
        fill: "#f97316",
    },
    {
        name: "Marketing",
        value: 46,
        amount: "$51,900",
        fill: "#eab308",
    },
    {
        name: "Technology",
        value: 34,
        amount: "$38,300",
        fill: "#64748b",
    },
];

const ExpenseBreakdown = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Expense Breakdown
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Distribution of expenses across company departments.
                </p>
            </div>

            <div className="mt-6 grid items-center gap-8 lg:grid-cols-2">
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="20%"
                            outerRadius="95%"
                            barSize={18}
                            data={expenseData}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <RadialBar
                                dataKey="value"
                                background={{
                                    fill: "#e2e8f0",
                                }}
                                cornerRadius={10}
                            />

                            <Tooltip
                                formatter={(value, name, item) => [
                                    item.payload.amount,
                                    item.payload.name,
                                ]}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                }}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-5">
                    {expenseData.map((item) => (
                        <div key={item.name}>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span
                                        className="h-3 w-3 rounded-full"
                                        style={{
                                            backgroundColor: item.fill,
                                        }}
                                    />

                                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                        {item.name}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                                        {item.amount}
                                    </p>

                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {item.value}%
                                    </span>
                                </div>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                <div
                                    className="h-full rounded-full"
                                    style={{
                                        width: `${item.value}%`,
                                        backgroundColor: item.fill,
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpenseBreakdown;