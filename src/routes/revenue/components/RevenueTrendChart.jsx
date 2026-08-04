import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const revenueTrendData = [
    { month: "Jan", revenue: 52000 },
    { month: "Feb", revenue: 61000 },
    { month: "Mar", revenue: 58000 },
    { month: "Apr", revenue: 69000 },
    { month: "May", revenue: 74000 },
    { month: "Jun", revenue: 82000 },
    { month: "Jul", revenue: 79000 },
    { month: "Aug", revenue: 88000 },
    { month: "Sep", revenue: 93000 },
    { month: "Oct", revenue: 91000 },
    { month: "Nov", revenue: 97000 },
    { month: "Dec", revenue: 108000 },
];

const formatCurrency = (value) => {
    return `$${value / 1000}k`;
};

const RevenueTrendChart = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Revenue Trend
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Monthly revenue performance throughout the year.
                    </p>
                </div>

                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <option>2026</option>
                    <option>2025</option>
                    <option>2024</option>
                </select>
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={revenueTrendData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0,
                        }}
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
                                stroke: "#10b981",
                                strokeDasharray: "4 4",
                            }}
                            formatter={(value) => [
                                `$${value.toLocaleString()}`,
                                "Revenue",
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#10b981"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#10b981",
                                strokeWidth: 2,
                                stroke: "#ffffff",
                            }}
                            activeDot={{
                                r: 7,
                                fill: "#10b981",
                                strokeWidth: 3,
                                stroke: "#ffffff",
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default RevenueTrendChart;