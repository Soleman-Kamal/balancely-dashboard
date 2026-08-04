import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/ThemeContext";
import AnalyticsPage from "@/routes/analytics/page";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import RevenuePage from "@/routes/revenue/page";
import ExpensesPage from "@/routes/expenses/page";
function App() {
    const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <Layout />,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    },
                    {
                        path: "analytics",
                        element: <AnalyticsPage />,
                    },
                    {
                        path: "revenue",
                        element: <RevenuePage />,
                    },
                    {
                        path: "expenses",
                        element: <ExpensesPage/>,
                    },
                    {
                        path: "transactions",
                        element: <h1 className="title">Transactions</h1>,
                    },
                    {
                        path: "invoices",
                        element: <h1 className="title">Invoices</h1>,
                    },
                    {
                        path: "accounts",
                        element: <h1 className="title">Accounts</h1>,
                    },
                    {
                        path: "customers",
                        element: <h1 className="title">Customers</h1>,
                    },
                    {
                        path: "vendors",
                        element: <h1 className="title">Vendors</h1>,
                    },
                    {
                        path: "payroll",
                        element: <h1 className="title">Payroll</h1>,
                    },
                    {
                        path: "financial-reports",
                        element: <h1 className="title">Financial Reports</h1>,
                    },
                    {
                        path: "tax-reports",
                        element: <h1 className="title">Tax Reports</h1>,
                    },
                    {
                        path: "users",
                        element: <h1 className="title">Users & Roles</h1>,
                    },
                    {
                        path: "settings",
                        element: <h1 className="title">Settings</h1>,
                    },
                ],
            },
        ],
        {
            basename: "/Balancely-ERP",
        },
    );

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
