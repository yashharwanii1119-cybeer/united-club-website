import React from 'react';
import { Heart, Users, Sparkles, Smile, Shield } from 'lucide-react';

const Community = () => {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-[#081a30]/45 border-t border-[#1D63D8]/20 overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-[#1D63D8]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* Left Column: Visual Atmosphere */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#1D63D8]/25 group">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1740&auto=format&fit=crop"
                alt="Welcoming community and supportive fitness environment at United Club"
                className="w-full h-[320px] sm:h-[400px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040d1a] via-[#040d1a]/30 to-transparent" />

              {/* Floating Testimonial Card */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-4 sm:p-6 rounded-xl glass-panel border-[#1D63D8]/30">
                <p className="text-[11px] sm:text-xs md:text-sm text-white/90 italic font-light leading-relaxed">
                  "At United Club, ego is left at the door. You’re welcomed by high-caliber trainers and members who genuinely push each other to become better every day."
                </p>
                <div className="mt-3 sm:mt-4 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#F2C14E] uppercase">
                    UNITED COMMUNITY ETHOS
                  </span>
                  <div className="flex gap-1 text-[#F2C14E] text-xs sm:text-sm">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Message */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-6 sm:w-8 h-[2px] bg-[#F2C14E]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] font-semibold text-[#F2C14E]">
                CULTURE & ENVIRONMENT
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.92] sm:leading-[0.9] text-white">
              STRONGER <br />
              <span className="text-[#F2C14E]">TOGETHER.</span>
            </h2>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-[#D7E1F0] font-light leading-relaxed">
              United Club was built on a simple conviction: high-end fitness shouldn’t feel intimidating, hostile, or chaotic.
            </p>

            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#B3C5DE] font-light leading-relaxed">
              We provide a disciplined, energetic, yet deeply welcoming atmosphere where beginners and advanced lifters alike feel confident, supported, and motivated. With shared male and female training hours and a refreshing green ambiance, training becomes the best part of your daily routine.
            </p>

            <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-5 rounded-xl bg-[#0c1f3d]/70 border border-[#1D63D8]/20">
                <div className="font-display text-2xl sm:text-3xl text-white mb-1">ZERO EGO</div>
                <div className="text-xs text-[#8EA4C4]">Supportive, focused, and respectful training floor.</div>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-[#0c1f3d]/70 border border-[#1D63D8]/20">
                <div className="font-display text-2xl sm:text-3xl text-[#F2C14E] mb-1">ALL LEVELS</div>
                <div className="text-xs text-[#8EA4C4]">From first-time lifters to seasoned athletes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
