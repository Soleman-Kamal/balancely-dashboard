import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const departmentData = [
    {
        department: "Operations",
        amount: 92400,
    },
    {
        department: "Payroll",
        amount: 76800,
    },
    {
        department: "Marketing",
        amount: 51900,
    },
    {
        department: "Technology",
        amount: 38300,
    },
    {
        department: "Logistics",
        amount: 27400,
    },
];

const formatCurrency = (value) => {
    return `$${value / 1000}k`;
};

const DepartmentSpending = () => {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                        Department Spending
                    </h2>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Compare total expenses across company departments.
                    </p>
                </div>

                <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>This Year</option>
                </select>
            </div>

            <div className="mt-6 h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={departmentData}
                        layout="vertical"
                        margin={{
                            top: 0,
                            right: 20,
                            left: 20,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            horizontal={false}
                            stroke="#cbd5e1"
                            opacity={0.35}
                        />

                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={formatCurrency}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <YAxis
                            type="category"
                            dataKey="department"
                            axisLine={false}
                            tickLine={false}
                            width={90}
                            tick={{
                                fill: "#64748b",
                                fontSize: 12,
                            }}
                        />

                        <Tooltip
                            cursor={{
                                fill: "#f1f5f9",
                                opacity: 0.5,
                            }}
                            formatter={(value) => [
                                `$${value.toLocaleString()}`,
                                "Expenses",
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e2e8f0",
                            }}
                        />

                        <Bar
                            dataKey="amount"
                            fill="#ef4444"
                            radius={[0, 8, 8, 0]}
                            barSize={24}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default DepartmentSpending;