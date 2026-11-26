import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const TrainingExperience = () => {
  const categories = [
    {
      title: "Strength & Progressive Overload",
      tag: "CORE DISCIPLINE",
      desc: "Barbell platforms, squat cages, heavy dumbbell racks up to competitive weights, and plate-loaded leverage machines.",
      img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1740&auto=format&fit=crop",
      colSpan: "md:col-span-8"
    },
    {
      title: "Hypertrophy & Isolation",
      tag: "AESTHETIC PROGRESSION",
      desc: "Cables, pin-selected selectorized machines, preach benches, and precision angles.",
      img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-4"
    },
    {
      title: "Cardio & Conditioning",
      tag: "METABOLIC ENGINE",
      desc: "Commercial treadmills, curved runners, stair climbers, and assault bikes with real-time biometric tracking.",
      img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1740&auto=format&fit=crop",
      colSpan: "md:col-span-4"
    },
    {
      title: "Functional & Athletic Motion",
      tag: "PERFORMANCE READINESS",
      desc: "Turf tracks, kettlebell arrays, plyo boxes, resistance bands, and battle ropes for explosive movement.",
      img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1740&auto=format&fit=crop",
      colSpan: "md:col-span-8"
    }
  ];

  return (
    <section id="training" className="relative py-20 sm:py-24 md:py-32 bg-[#061426]/45 border-t border-[#1D63D8]/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[2px] bg-[#F2C14E]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#F2C14E]">
                DISCIPLINES & PROTOCOLS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] sm:leading-[0.9] text-white">
              THE TRAINING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D7E1F0] to-[#8EA4C4]">
                EXPERIENCE.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm md:text-base text-[#B3C5DE] font-light leading-relaxed">
            Whether your mission is raw strength, sculpted definition, enhanced stamina, or daily vitality — our training architecture is engineered to deliver measurable progress.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`${cat.colSpan} relative rounded-2xl overflow-hidden group min-h-[300px] sm:min-h-[360px] md:min-h-[420px] border border-[#1D63D8]/20 transition-all duration-500 hover:border-[#F2C14E]/50`}
            >
              {/* Background Photography */}
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#040d1a]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-[#F2C14E] px-3 py-1 rounded-full bg-[#07162c]/80 border border-[#1D63D8]/40 backdrop-blur-md inline-block">
                    {cat.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-white tracking-wide uppercase leading-tight mb-2 sm:mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B3C5DE] font-light leading-relaxed max-w-lg mb-4">
                    {cat.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#F2C14E] uppercase group-hover:underline">
                    <span>Explore Protocol</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingExperience;
