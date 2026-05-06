import { type LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  percentage?: number;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  percentage = 50,
}: StatCardProps) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-start justify-between mb-2">
        <div className="flex flex-col">
           <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
           <p className="text-lg font-bold text-black">{value}</p>
        </div>
        <div className="bg-[#f7b70c] rounded-[6px] p-1.5 shadow-sm">
          <Icon className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 mt-auto">
        <div
          className="bg-teal-500 h-1 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
