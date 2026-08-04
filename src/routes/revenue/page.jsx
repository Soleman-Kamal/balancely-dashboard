import RevenueHeader from "./components/RevenueHeader";
import RevenueSummary from "./components/RevenueSummary";
import RevenueTrendChart from "./components/RevenueTrendChart";
import RevenueSources from "./components/RevenueSources";
import TopCustomers from "./components/TopCustomers";

const RevenuePage = () => {
    return (
        <div className="space-y-6">
            <RevenueHeader />
            <RevenueSummary />
            <RevenueTrendChart />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <RevenueSources />
                <TopCustomers />
            </div>
        </div>
    );
};

export default RevenuePage;
