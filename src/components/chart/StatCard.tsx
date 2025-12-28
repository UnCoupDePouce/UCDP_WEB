import {TrendingUp, TrendingDown, type LucideIcon} from 'lucide-react';

type StatCardProps = {
    title: string;
    value: string;
    trend: 'up' | 'down';
    trendValue: string;
    icon: LucideIcon;
};

export default function StatCard({
                                     title,
                                     value,
                                     trend,
                                     trendValue,
                                     icon: Icon,
                                 }: StatCardProps) {
    const isUp = trend === 'up';

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
                    <p className="text-3xl font-bold text-white mb-2">{value}</p>

                    <div className="flex items-center gap-1">
                        {isUp ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span
                            className={`text-sm font-medium ${
                                isUp ? 'text-green-600' : 'text-red-600'
                            }`}
                        >
              {trendValue}
            </span>
                    </div>
                </div>

                <div className="p-3 bg-gray-100 rounded-lg">
                    <Icon className="w-6 h-6 text-gray-600" />
                </div>
            </div>
        </div>
    );
}
