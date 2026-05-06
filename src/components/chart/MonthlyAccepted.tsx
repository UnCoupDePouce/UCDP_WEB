import { Wrench, ShoppingCart, Rocket, Wallet } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import StatCard from './StatCard';
import { dashboardStats } from '../../data/mock';

type SalesData = {
  month: string;
  missions: number;
};

type MonthtlyChartProps = {
  data: SalesData[];
};

export default function MonthlyAccepted({ data }: MonthtlyChartProps) {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col gap-6 h-full justify-between">
      {/* Chart Section */}
      <div
        className="rounded-[20px] p-4 h-[250px]"
        style={{
          background:
            'linear-gradient(154.56deg, rgba(6, 12, 41, 1) 28.26%, rgba(4, 12, 48, 0.5) 91.2%)',
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis
              dataKey="month"
              tick={{ fill: 'white', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'white', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
              }}
              itemStyle={{ color: 'white' }}
            />
            <Bar
              dataKey="missions"
              fill="white"
              radius={[4, 4, 4, 4]}
              barSize={8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Title Section */}
      <div className="flex flex-col gap-1">
        <p className="text-gray-500 text-sm">
          <span className="text-[#01b574] font-bold">(+23)</span>{' '}
          <span className="font-medium">par rapport à la semaine dernière</span>
        </p>
        <h3 className="text-lg font-bold text-black">Utilisateurs actifs</h3>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="Missions"
          value={dashboardStats.totalMissions.toString()}
          icon={Wrench}
          percentage={75}
        />
        <StatCard
          title="Offres"
          value={dashboardStats.totalMissions.toString()}
          icon={ShoppingCart}
          percentage={55}
        />
        <StatCard
          title="Pubs"
          value={dashboardStats.totalAds.toString()}
          icon={Rocket}
          percentage={90}
        />
        <StatCard
          title="Utilisateurs"
          value={dashboardStats.totalUsers.toString()}
          icon={Wallet}
          percentage={60}
        />
      </div>
    </div>
  );
}
