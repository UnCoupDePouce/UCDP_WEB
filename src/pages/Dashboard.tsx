import {Package, Users} from 'lucide-react';

import StatCard from "./../components/chart/StatCard";
import MonthlyAccepted from "./../components/chart/MonthlyAccepted.tsx";

import {salesData} from "./../data/mock.ts";

export default function Dashboard() {

    return (
        <div className="px-8">
            <div className="grid grid-cols-2 gap-6 mb-8">
                <StatCard
                    title="Customers"
                    value="3,782"
                    trend="up"
                    trendValue="↑ 11.01%"
                    icon={Users}
                />
                <StatCard
                    title="Orders"
                    value="5,359"
                    trend="down"
                    trendValue="↓ 9.05%"
                    icon={Package}
                />
            </div>

            <div>
                <div>
                    <MonthlyAccepted data={salesData}/>
                </div>
            </div>
        </div>
    );
}
