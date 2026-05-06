
import { dashboardStats } from "../../data/mock";

export default function ReferralCard() {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 h-full flex items-center justify-between min-h-[344px]">
      {/* Left Side: Stats */}
      <div className="flex flex-col justify-between h-full w-[45%] pr-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-black">Monétisation</h3>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
              Nombre de pubs
            </p>
            <p className="text-2xl font-bold text-black">{dashboardStats.totalAds}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
              Nombre de fournisseurs
            </p>
            <p className="text-2xl font-bold text-black">{dashboardStats.totalProviders.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Right Side: Circular Score */}
      <div className="w-[55%] flex items-center justify-center relative">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#e2e8f0"
              strokeWidth="10"
              fill="transparent"
            />
            {/* Progress Circle (Green/Teal) */}
            <circle
              cx="96"
              cy="96"
              r="88"
              stroke="#01b574"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={552}
              strokeDashoffset={552 * (1 - dashboardStats.accessibilityScore / 10)}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Center Text */}
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-base text-gray-400 font-medium">Accessibilité</span>
            <span className="text-4xl font-bold text-black my-1">{dashboardStats.accessibilityScore}</span>
            <span className="text-sm text-gray-400">Score total</span>
          </div>
        </div>
        
         {/* More button moved to absolute top right of the container if needed, or kept with title */}
         {/* In design, More button is usually top right of the whole card. */}
      </div>

    </div>
  );
}
