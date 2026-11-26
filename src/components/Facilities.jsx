import React from 'react';
import { Dumbbell, Shield, Compass, Sparkles, Wind, Lock } from 'lucide-react';

const Facilities = () => {
  const highlights = [
    {
      icon: <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-[#F2C14E]" />,
      title: "2,500 Sq. Ft. Facility",
      stat: "SPATIAL EXCELLENCE",
      description: "Dholpur’s largest gym floor, arranged with dedicated functional zones to prevent crowding and allow focused training."
    },
    {
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D63D8]" />,
      title: "Exclusive Machinery",
      stat: "CITY FIRST",
      description: "Engineered isolation pieces, heavy-duty cable columns, and custom leverage platforms unavailable elsewhere in the region."
    },
    {
      icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-[#F2C14E]" />,
      title: "Same Timing for All",
      stat: "INCLUSIVE ETHOS",
      description: "Male and female members train simultaneously in an elevated, disciplined, and supportive communal atmosphere."
    },
    {
      icon: <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D63D8]" />,
      title: "Separate Locker Rooms",
      stat: "ABSOLUTE PRIVACY",
      description: "Individual private changing quarters, secure lockers, and pristine hygiene protocols curated for peace of mind."
    },
    {
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#F2C14E]" />,
      title: "Prime Saipau Road Access",
      stat: "EASY TRANSIT",
      description: "Located prominently between Hena Resort and Sandhu Palace on Saipau Road with ample convenient parking."
    },
    {
      icon: <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D63D8]" />,
      title: "Green & Welcoming Ambience",
      stat: "NATURAL AIRFLOW",
      description: "Surrounded by a clean, open, and green environment on Saipau Road, offering a fresh breath of air away from congested city zones."
    }
  ];

  return (
    <section id="facilities" className="relative py-20 sm:py-24 md:py-32 bg-[#061224]/80 border-t border-[#1D63D8]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[2px] bg-[#F2C14E]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#F2C14E]">
              WORLD-CLASS AMENITIES
            </span>
            <span className="w-6 sm:w-8 h-[2px] bg-[#F2C14E]" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] sm:leading-[0.9] text-white">
            DESIGNED FOR <br />
            <span className="text-[#F2C14E]">PERFECTION.</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-[#B3C5DE] font-light leading-relaxed">
            Every element of United Club is intentionally planned — from spatial freedom and equipment selection to locker security and air circulation.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 md:p-10 rounded-2xl bg-[#0c1f3d]/70 border border-[#1D63D8]/20 hover:border-[#F2C14E]/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#07162c] border border-[#1D63D8]/30 flex items-center justify-center group-hover:border-[#F2C14E]/50 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 sm:px-3 py-1 rounded-full bg-[#1D63D8]/15 text-[#F2C14E] border border-[#1D63D8]/30">
                    {item.stat}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl tracking-wide text-white uppercase mb-2 sm:mb-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8EA4C4] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-[#7E96B8]">Facility Standard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2C14E]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Facilities;
