import React from 'react';
import { ArrowUpRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

const MembershipCTA = () => {
  return (
    <section id="membership" className="relative py-20 sm:py-24 md:py-32 bg-[#07172b]/45 border-t border-[#1D63D8]/20 overflow-hidden">
      {/* Background Graphic Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1549060279-7e168fcee0c2?q=80&w=2000&auto=format&fit=crop"
          alt="Athlete training at United Club"
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051122] via-[#051122]/90 to-[#051122]" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#040d1a]/60 to-[#051122]" />
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-6 md:px-12 relative z-10 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1D63D8]/20 border border-[#1D63D8]/40 mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#F2C14E] shrink-0" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold text-[#F2C14E]">
            COMMENCE YOUR TRANSFORMATION
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.90] sm:leading-[0.88] text-white">
          YOUR NEXT LEVEL <br />
          <span className="text-[#F2C14E]">STARTS HERE.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="mt-5 sm:mt-8 text-sm sm:text-base md:text-xl text-[#B3C5DE] font-light max-w-2xl mx-auto leading-relaxed">
          The first step toward an unapologetically stronger, leaner, and more resilient version of yourself begins at United Club. Tour the 2,500 sq. ft. facility and feel the standard firsthand.
        </p>

        {/* Benefits bullets */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-[#8EA4C4] text-left sm:text-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F2C14E] shrink-0" />
            <span>Full 2,500 Sq. Ft. Access</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F2C14E] shrink-0" />
            <span>Exclusive Dholpur Equipment</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F2C14E] shrink-0" />
            <span>Private Locker Facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#F2C14E] shrink-0" />
            <span>Co-Ed Shared Training Hours</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 max-w-md sm:max-w-none mx-auto">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-xs sm:text-sm tracking-[0.2em] uppercase bg-[#F2C14E] text-[#07162c] hover:bg-[#F8D67D] transition-all duration-300 shadow-[0_0_35px_rgba(242,193,78,0.35)] hover:shadow-[0_0_50px_rgba(242,193,78,0.55)] hover:-translate-y-0.5 text-center"
          >
            <span>JOIN UNITED CLUB</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase text-white bg-[#0c1f3d]/80 border border-[#1D63D8]/30 hover:border-[#F2C14E]/50 hover:bg-[#112f5a] backdrop-blur-md transition-all duration-300 text-center"
          >
            <span>VISIT THE CLUB</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default MembershipCTA;
