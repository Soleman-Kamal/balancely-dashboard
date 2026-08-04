import {
    BarChart3,
    Building2,
    CircleDollarSign,
    FileChartColumn,
    FileText,
    HandCoins,
    Landmark,
    LayoutDashboard,
    ReceiptText,
    Settings,
    ShieldCheck,
    Users,
    UserRoundCheck,
    WalletCards,
} from "lucide-react";

export const navbarLinks = [
    {
        title: "Overview",
        links: [
            {
                label: "Dashboard",
                icon: LayoutDashboard,
                path: "/",
            },
            {
                label: "Analytics",
                icon: BarChart3,
                path: "/analytics",
            },
        ],
    },
    {
        title: "Finance",
        links: [
            {
                label: "Revenue",
                icon: CircleDollarSign,
                path: "/revenue",
            },
            {
                label: "Expenses",
                icon: ReceiptText,
                path: "/expenses",
            },
            {
                label: "Transactions",
                icon: WalletCards,
                path: "/transactions",
            },
            {
                label: "Invoices",
                icon: FileText,
                path: "/invoices",
            },
        ],
    },
    {
        title: "Management",
        links: [
            {
                label: "Accounts",
                icon: Landmark,
                path: "/accounts",
            },
            {
                label: "Customers",
                icon: Users,
                path: "/customers",
            },
            {
                label: "Vendors",
                icon: Building2,
                path: "/vendors",
            },
            {
                label: "Payroll",
                icon: HandCoins,
                path: "/payroll",
            },
        ],
    },
    {
        title: "Reports",
        links: [
            {
                label: "Financial Reports",
                icon: FileChartColumn,
                path: "/financial-reports",
            },
            {
                label: "Tax Reports",
                icon: ShieldCheck,
                path: "/tax-reports",
            },
        ],
    },
    {
        title: "System",
        links: [
            {
                label: "Users & Roles",
                icon: UserRoundCheck,
                path: "/users",
            },
            {
                label: "Settings",
                icon: Settings,
                path: "/settings",
            },
        ],
    },
];

export const financialOverviewData = [
    {
        name: "Jan",
        revenue: 320000,
        expenses: 180000,
    },
    {
        name: "Feb",
        revenue: 410000,
        expenses: 220000,
    },
    {
        name: "Mar",
        revenue: 380000,
        expenses: 210000,
    },
    {
        name: "Apr",
        revenue: 460000,
        expenses: 240000,
    },
    {
        name: "May",
        revenue: 520000,
        expenses: 275000,
    },
    {
        name: "Jun",
        revenue: 490000,
        expenses: 260000,
    },
    {
        name: "Jul",
        revenue: 560000,
        expenses: 290000,
    },
    {
        name: "Aug",
        revenue: 610000,
        expenses: 310000,
    },
    {
        name: "Sep",
        revenue: 585000,
        expenses: 300000,
    },
    {
        name: "Oct",
        revenue: 650000,
        expenses: 325000,
    },
    {
        name: "Nov",
        revenue: 690000,
        expenses: 340000,
    },
    {
        name: "Dec",
        revenue: 735000,
        expenses: 365000,
    },
];

export const companyAccounts = [
    {
        id: 1,
        name: "Main Operating Account",
        type: "Bank",
        balance: 1250000,
        accountNumber: "**** 4821",
        status: "Active",
    },
    {
        id: 2,
        name: "Payroll Account",
        type: "Bank",
        balance: 685000,
        accountNumber: "**** 1934",
        status: "Active",
    },
    {
        id: 3,
        name: "Corporate Credit Card",
        type: "Card",
        balance: 245000,
        accountNumber: "**** 7742",
        status: "Active",
    },
    {
        id: 4,
        name: "Petty Cash",
        type: "Cash",
        balance: 85000,
        accountNumber: "CASH-001",
        status: "Review",
    },
];

export const recentTransactions = [
    {
        id: 1,
        description: "Enterprise Client Payment",
        reference: "TRX-2026-001",
        account: "Main Operating Account",
        category: "Sales Revenue",
        date: "Jul 17, 2026",
        amount: 185000,
        type: "Income",
        status: "Completed",
    },
    {
        id: 2,
        description: "Office Rent Payment",
        reference: "TRX-2026-002",
        account: "Main Operating Account",
        category: "Operating Expense",
        date: "Jul 16, 2026",
        amount: 42000,
        type: "Expense",
        status: "Completed",
    },
    {
        id: 3,
        description: "Employee Payroll",
        reference: "TRX-2026-003",
        account: "Payroll Account",
        category: "Payroll",
        date: "Jul 15, 2026",
        amount: 125000,
        type: "Expense",
        status: "Processing",
    },
    {
        id: 4,
        description: "Consulting Service Revenue",
        reference: "TRX-2026-004",
        account: "Main Operating Account",
        category: "Service Revenue",
        date: "Jul 14, 2026",
        amount: 96000,
        type: "Income",
        status: "Completed",
    },
    {
        id: 5,
        description: "Software Subscription",
        reference: "TRX-2026-005",
        account: "Corporate Credit Card",
        category: "Technology",
        date: "Jul 13, 2026",
        amount: 8200,
        type: "Expense",
        status: "Pending",
    },
];