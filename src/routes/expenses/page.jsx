import ExpensesHeader from "./components/ExpensesHeader";
import ExpenseOverview from "./components/ExpenseOverview";
import ExpenseBreakdown from "./components/ExpenseBreakdown";
import DepartmentSpending from "./components/DepartmentSpending";
import RecentExpenses from "./components/RecentExpenses";

const ExpensesPage = () => {
    return (
        <div className="space-y-6">
            <ExpensesHeader />
            <ExpenseOverview />
            <ExpenseBreakdown />
            <DepartmentSpending />
            <RecentExpenses />
        </div>
    );
};

export default ExpensesPage;