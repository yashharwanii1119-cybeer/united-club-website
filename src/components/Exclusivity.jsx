import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Flame, Compass } from 'lucide-react';

const Exclusivity = () => {
  const [activeTab, setActiveTab] = useState(0);

  const exclusiveShowcases = [
    {
      title: "Iso-Lateral Chest Press",
      category: "Pure Biomechanics",
      description: "Custom converging axis engineering that mirrors the body's natural muscular arc. Ensures independent arm movement, eliminating dominant-side compensation for balanced development.",
      stats: { isolation: "99.4%", jointStress: "Near Zero", exclusivity: "Only at United Club" },
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1740&auto=format&fit=crop",
      badge: "Flagship Machine"
    },
    {
      title: "Linear Bearing Hack Squat",
      category: "Lower Body Dominance",
      description: "A 45-degree ultra-smooth linear platform with oversized footplate. Targets vastus medialis and glute recruitment with maximum spinal support and zero lower-back shear.",
      stats: { isolation: "Quad Focus", jointStress: "Ergonomic Pad", exclusivity: "Exclusive In City" },
      image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1738&auto=format&fit=crop",
      badge: "Quad Sculptor"
    },
    {
      title: "Multi-Angle Cable Crossover",
      category: "Functional Hypertrophy",
      description: "Laser-cut pulley columns with 36 micro-adjustment pin settings. Delivers continuous, uninterrupted tension from peak stretch to full muscular contraction.",
      stats: { isolation: "Infinite Vectors", jointStress: "Silky Fluid", exclusivity: "Commercial Grade" },
      image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1740&auto=format&fit=crop",
      badge: "Constant Tension"
    },
    {
      title: "Olympic Calibrated Steel",
      category: "Precision Free Weights",
      description: "Competition-grade barbells with dual knurl marks, zinc-coated spin collars, and razor-tolerance cast iron plates engineered for serious progressive overload.",
      stats: { isolation: "Precision ±10g", jointStress: "Barbell Knurl", exclusivity: "Heavy Duty" },
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1740&auto=format&fit=crop",
      badge: "Power Rig"
    }
  ];

  return (
    <section id="equipment" className="relative py-20 sm:py-24 md:py-32 bg-[#061224]/80 border-t border-[#1D63D8]/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-[#1D63D8]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-56 sm:w-64 h-56 sm:h-64 bg-[#F2C14E]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D63D8]/15 border border-[#1D63D8]/40 mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#F2C14E] shrink-0" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#F2C14E]">
              DHOLPUR EXCLUSIVE
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] sm:leading-[0.9] text-white">
            EQUIPMENT YOU WON'T FIND <br />
            <span className="text-[#F2C14E]">ANYWHERE ELSE.</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-[#B3C5DE] font-light leading-relaxed">
            Train with equipment meticulously chosen to push human performance past previous plateaus. Experience machines and mechanical precision exclusive to United Club across the entire city of Dholpur.
          </p>
        </div>

        {/* Tab Selector Buttons with Mobile Horizontal Scroll or Wrap */}
        <div className="flex flex-wrap sm:flex-nowrap sm:overflow-x-auto justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 pb-2 sm:pb-0 scrollbar-none">
          {exclusiveShowcases.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider sm:tracking-widest uppercase transition-all duration-300 shrink-0 ${
                activeTab === idx
                  ? 'bg-[#F2C14E] text-[#07162c] shadow-[0_0_20px_rgba(242,193,78,0.35)]'
                  : 'bg-[#0c1f3d] text-[#D7E1F0] hover:text-white border border-[#1D63D8]/30 hover:border-[#1D63D8]'
              }`}
            >
              {item.title.split(' ')[0]} {item.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Equipment Showcase Card */}
        <div className="rounded-2xl overflow-hidden border border-[#1D63D8]/30 bg-[#07162c] shadow-2xl transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[500px]">
            {/* Visual Media */}
            <div className="lg:col-span-7 relative overflow-hidden min-h-[260px] sm:min-h-[350px] group">
              <img
                src={exclusiveShowcases[activeTab].image}
                alt={exclusiveShowcases[activeTab].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07162c] via-[#07162c]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#07162c]" />

              {/* Float Badge */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0a1f44]/80 backdrop-blur-md border border-[#1D63D8]/40 text-[10px] sm:text-xs font-semibold tracking-widest text-[#F2C14E] uppercase">
                {exclusiveShowcases[activeTab].badge}
              </div>
            </div>

            {/* Spec Details Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-12 flex flex-col justify-between bg-[#07162c]">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#1D63D8] font-bold block mb-2">
                  {exclusiveShowcases[activeTab].category}
                </span>

                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase leading-tight mb-3 sm:mb-4">
                  {exclusiveShowcases[activeTab].title}
                </h3>

                <p className="text-xs sm:text-sm text-[#B3C5DE] font-light leading-relaxed mb-6 sm:mb-8">
                  {exclusiveShowcases[activeTab].description}
                </p>

                {/* Machine Specs Grid */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-white/10">
                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-[#7E96B8] mb-1">
                      Recruitment
                    </span>
                    <span className="font-display text-base sm:text-lg md:text-xl text-white">
                      {exclusiveShowcases[activeTab].stats.isolation}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-[#7E96B8] mb-1">
                      Joint Stress
                    </span>
                    <span className="font-display text-base sm:text-lg md:text-xl text-[#F2C14E]">
                      {exclusiveShowcases[activeTab].stats.jointStress}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[9px] sm:text-[10px] uppercase tracking-wider text-[#7E96B8] mb-1">
                      Availability
                    </span>
                    <span className="font-display text-base sm:text-lg md:text-xl text-white">
                      {exclusiveShowcases[activeTab].stats.exclusivity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Guarantee Tag */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#F2C14E]" />
                  <span className="text-[11px] sm:text-xs font-medium text-[#D7E1F0]">
                    Only Facility with this Gear in Dholpur
                  </span>
                </div>
                <a
                  href="#contact"
                  className="text-xs font-semibold text-[#F2C14E] hover:underline uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <span>TRY IT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Exclusivity;
