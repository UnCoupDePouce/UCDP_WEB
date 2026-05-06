import WelcomeCard from "../components/chart/WelcomeCard";
import SatisfactionCard from "../components/chart/SatisfactionCard";
import ReferralCard from "../components/chart/ReferralCard";
import Transactions from "../components/chart/Transactions";
import MonthlyAccepted from "./../components/chart/MonthlyAccepted.tsx";

import {salesData} from "./../data/mock.ts";

export default function Dashboard() {

    return (
        <div className="px-8 py-8 flex flex-col gap-6">
            {/* Top Row - Big Cards */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-4">
                    <WelcomeCard />
                </div>
                <div className="xl:col-span-3">
                    <SatisfactionCard />
                </div>
                <div className="xl:col-span-5">
                    <ReferralCard />
                </div>
            </div>

            {/* Bottom Row - Analytics */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-7 h-[500px]">
                    <Transactions data={salesData} />
                </div>
                <div className="xl:col-span-5 h-[500px]">
                    <MonthlyAccepted data={salesData}/>
                </div>
            </div>
        </div>
    );
}
