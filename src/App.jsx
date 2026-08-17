import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SettingsPage from "@/routes/settings/page";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AnalyticsPage from "@/routes/analytics/page";
import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import RevenuePage from "@/routes/revenue/page";
import ExpensesPage from "@/routes/expenses/page";
import NewInvoicePage from "@/routes/invoices/new/page";
import InvoicesPage from "@/routes/invoices/page";
import TransactionsPage from "@/routes/transactions/page";
import AccountsPage from "@/routes/accounts/page";
import CustomersPage from "@/routes/customers/page";
import VendorsPage from "@/routes/vendors/page";
import PayrollPage from "@/routes/payroll/page";
import FinancialReportsPage from "@/routes/financial-reports/page";
import TaxReportsPage from "@/routes/tax-reports/page";
import UsersPage from "@/routes/users/page";
function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "invoices/new",
                    element: <NewInvoicePage />,
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
                    element: <ExpensesPage />,
                },
                {
                    path: "transactions",
                    element: <TransactionsPage />,
                },
                {
                    path: "invoices",
                    element: <InvoicesPage />,
                },
                {
                    path: "accounts",
                    element: <AccountsPage />,
                },
                {
                    path: "customers",
                    element: <CustomersPage />,
                },
                {
                    path: "vendors",
                    element: <VendorsPage />,
                },
                {
                    path: "payroll",
                    element: <PayrollPage />,
                },
                {
                    path: "financial-reports",
                    element: <FinancialReportsPage />,
                },
                {
                    path: "tax-reports",
                    element: <TaxReportsPage />,
                },
                {
                    path: "users",
                    element: <UsersPage />,
                },
                {
                    path: "settings",
                    element: <SettingsPage />,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
