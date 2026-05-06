import { Smile } from 'lucide-react';
import { dashboardStats } from '../../data/mock';

export default function SatisfactionCard() {
  const percentage = dashboardStats.satisfactionRate;
  // Semi-circle calculations
  // circumference for semi-circle is Pi * radius
  // But we want to simulate the arc length. Arc length of semi-circle is Pi * r.
  // 3.14159 * 100 = ~314 for a radius of 100 in the path.
  // My path has r=100 (A 100 100).
  const arcLength = Math.PI * 100; 
  const strokeDashoffset = arcLength * (1 - percentage / 100);

  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 h-full flex flex-col items-center justify-between min-h-[344px] relative">
      <div className="w-full text-center mt-2">
        <h3 className="text-xl font-bold text-black">Satisfaction</h3>
        <p className="text-gray-500 text-sm">De tous les projets</p>
      </div>

      <div className="relative flex flex-col items-center justify-end h-[160px] w-full mb-8">
        {/* Gauge SVG */}
        <svg className="w-[220px] h-[130px] overflow-visible">
          {/* Defs for gradient */}
          <defs>
             <linearGradient id="gradientSatisfy" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#313860" />
                <stop offset="100%" stopColor="#01b574" />
             </linearGradient>
          </defs>
          
          {/* Background Track (Gray) */}
          <path
            d="M 10 110 A 100 100 0 0 1 210 110"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="15"
            strokeLinecap="round"
          />
          
          {/* Progress Arc */}
          <path
            d="M 10 110 A 100 100 0 0 1 210 110"
            fill="none"
            stroke="url(#gradientSatisfy)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray={arcLength} 
            strokeDashoffset={strokeDashoffset}
          />
        </svg>

        {/* Floating Labels */}
        <div className="absolute top-[110px] left-0 text-xs font-bold text-gray-400 pl-4">0%</div>
        <div className="absolute top-[110px] right-0 text-xs font-bold text-gray-400 pr-4">100%</div>

        {/* Center Content */}
        <div className="absolute bottom-[20px] flex flex-col items-center">
          <div className="bg-[#01b574] p-4 rounded-full mb-2 shadow-lg hover:scale-110 transition-transform cursor-pointer">
            <Smile className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
      
              <div className="text-4xl font-bold text-black mb-4">{percentage}%</div>
      
       
      
           </div>
      
         );
      
       }
      
       