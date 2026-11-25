import React from 'react';
import { ShieldCheck, Compass, Users2, Zap, ArrowUpRight } from 'lucide-react';

const AboutClub = () => {
  return (
    <section id="about" className="relative py-20 sm:py-24 md:py-32 bg-[#040d1a]/80 backdrop-blur-[2px] border-t border-[#1D63D8]/20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#1D63D8]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        {/* Editorial Subheading & Tag */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[2px] bg-[#F2C14E]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#F2C14E]">
                THE UNITED CLUB MANIFESTO
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] sm:leading-[0.9] text-[#F4F7FC]">
              MORE THAN A GYM.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F7FC] via-[#D7E1F0] to-[#8EA4C4]">
                A DIFFERENT STANDARD.
              </span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-xs sm:text-sm md:text-base text-[#B3C5DE] font-light leading-relaxed">
              Welcome to <strong className="text-white font-medium">United Club</strong> — Dholpur’s destination for serious training, world-class equipment, and an environment meticulously curated around discipline, aesthetic progress, and pure athletic performance.
            </p>
          </div>
        </div>

        {/* Hero Scale Showcase: 2,500 SQ. FT. */}
        <div className="relative rounded-2xl overflow-hidden border border-[#1D63D8]/25 bg-[#07162c] mb-12 sm:mb-16 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[460px]">
            {/* Massive Stat Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 md:p-14 flex flex-col justify-between relative z-10 bg-gradient-to-br from-[#0c1f3d] via-[#07162c] to-[#040d1a]">
              <div>
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#F2C14E] font-semibold">
                  SPATIAL CAPACITY
                </span>
                <div className="mt-2 sm:mt-4 font-display text-6xl sm:text-8xl md:text-9xl text-white tracking-tighter leading-none">
                  2,500
                </div>
                <div className="font-display text-2xl sm:text-3xl md:text-4xl text-[#F2C14E] tracking-wide">
                  SQ. FT. PERFORMANCE FACILITY
                </div>
                <p className="mt-4 sm:mt-6 text-xs sm:text-sm text-[#B3C5DE] leading-relaxed">
                  The largest and most thoughtfully planned fitness space in Dholpur. Built with open functional floorplans, high ceilings, seamless air circulation, and distinct zones for isolation, heavy lifting, and athletic conditioning.
                </p>
              </div>

              <div className="pt-6 sm:pt-8 mt-6 lg:mt-0 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs tracking-widest text-[#8EA4C4] uppercase">
                <span>Dholpur, Rajasthan</span>
                <span className="text-[#F2C14E] font-medium">Prime Location</span>
              </div>
            </div>

            {/* Visual Cinematic Image */}
            <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1740&auto=format&fit=crop"
                alt="Inside United Club 2500 sq ft facility"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#040d1a]/30 to-transparent lg:bg-gradient-to-r lg:from-[#07162c] lg:via-transparent lg:to-transparent" />
              
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-3.5 sm:p-4 rounded-xl glass-panel border-[#1D63D8]/30">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase block">
                      ARCHITECTURAL EXCELLENCE
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#D7E1F0] block">
                      Zero clutter, optimal airflow & natural lighting
                    </span>
                  </div>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F2C14E] flex items-center justify-center text-[#07162c] shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Distinction */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          <div className="p-6 sm:p-8 rounded-xl bg-[#0c1f3d]/60 border border-[#1D63D8]/20 hover:border-[#F2C14E]/50 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#07162c] border border-[#1D63D8]/30 flex items-center justify-center text-[#F2C14E] mb-4 sm:mb-6 group-hover:border-[#F2C14E]/60 transition-colors">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl tracking-wide text-white uppercase mb-2 sm:mb-3">
              Elite Biomechanics
            </h3>
            <p className="text-xs sm:text-sm text-[#8EA4C4] leading-relaxed">
              Every cable angle, pivot trajectory, and resistance profile has been chosen to deliver maximum muscle recruitment with minimum joint wear.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#0c1f3d]/60 border border-[#1D63D8]/20 hover:border-[#F2C14E]/50 transition-all duration-300 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#07162c] border border-[#1D63D8]/30 flex items-center justify-center text-[#F2C14E] mb-4 sm:mb-6 group-hover:border-[#F2C14E]/60 transition-colors">
              <Users2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl tracking-wide text-white uppercase mb-2 sm:mb-3">
              Synchronized Timings
            </h3>
            <p className="text-xs sm:text-sm text-[#8EA4C4] leading-relaxed">
              Male and female members train during the same hours under a respectful, disciplined, and world-class communal fitness ethos.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-xl bg-[#0c1f3d]/60 border border-[#1D63D8]/20 hover:border-[#F2C14E]/50 transition-all duration-300 group sm:col-span-2 md:col-span-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#07162c] border border-[#1D63D8]/30 flex items-center justify-center text-[#F2C14E] mb-4 sm:mb-6 group-hover:border-[#F2C14E]/60 transition-colors">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-display text-xl sm:text-2xl tracking-wide text-white uppercase mb-2 sm:mb-3">
              Unrivaled Privacy
            </h3>
            <p className="text-xs sm:text-sm text-[#8EA4C4] leading-relaxed">
              Separate locker rooms with state-of-the-art secure storage, hygiene standards, and private changing suites designed for peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutClub;
