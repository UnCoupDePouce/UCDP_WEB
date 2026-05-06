import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

type SalesData = {
  month: string;
  missions: number;
};

type TransactionsProps = {
  data: SalesData[];
};

export default function Transactions({ data }: TransactionsProps) {
  // Mocking a second data series for the chart to match the dual-line look
  const chartData = data.map((item) => ({
    ...item,
    revenue: item.missions * 1.5, // Mock secondary value
    profit: item.missions * 0.8, // Mock tertiary value
  }));

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex flex-col mb-6">
        <div className="flex items-center gap-1 mb-1">
          <p className="text-gray-500 text-sm font-medium">
            <span className="text-[#01b574] font-bold text-sm">(+5)</span> par rapport à 2021
          </p>
        </div>
        <h3 className="text-lg font-bold text-[#2b2b2b]">
          Transactions sur la plateforme
        </h3>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#01b574" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#01b574" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2b2b2b" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#2b2b2b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#718096', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                color: '#1a202c',
              }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#01b574"
              fillOpacity={1}
              fill="url(#colorRevenue)"
              strokeWidth={3}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="#2b2b2b"
              fillOpacity={1}
              fill="url(#colorProfit)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
