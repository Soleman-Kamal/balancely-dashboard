import AnalyticsHeader from "./components/AnalyticsHeader";
import AnalyticsCards from "./components/AnalyticsCards";
import RevenueExpenseChart from "../revenue/components/RevenueExpenseChart";

const AnalyticsPage = () => {
    return (
        <div className="space-y-6">
            <AnalyticsHeader />
            <AnalyticsCards />
            <RevenueExpenseChart />
        </div>
    );
};

export default AnalyticsPage;