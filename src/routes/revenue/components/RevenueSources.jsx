import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const revenueSourcesData = [
    { name: "Online Payments", value: 48 },
    { name: "Bank Transfer", value: 27 },
    { name: "Cash Payments", value: 15 },
    { name: "Subscriptions", value: 10 },
];

const chartColors = [
    "#10b981",
    "#0f766e",
    "#64748b",
    "#cbd5e1",
];

const RevenueSources = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Revenue Sources
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Distribution of revenue by payment source.
                </p>
            </div>

            <div className="mt-6 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={revenueSourcesData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={95}
                                paddingAngle={4}
                            >
                                {revenueSourcesData.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={chartColors[index]}
                                        stroke="transparent"
                                    />
                                ))}
                            </Pie>

                            <Tooltip
                                formatter={(value) => [`${value}%`, "Share"]}
                                contentStyle={{
                                    borderRadius: "12px",
                                    border: "1px solid #e2e8f0",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                    {revenueSourcesData.map((source, index) => (
                        <div
                            key={source.name}
                            className="flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className="h-3 w-3 rounded-full"
                                    style={{
                                        backgroundColor: chartColors[index],
                                    }}
                                />

                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                    {source.name}
                                </span>
                            </div>

                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {source.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RevenueSources;