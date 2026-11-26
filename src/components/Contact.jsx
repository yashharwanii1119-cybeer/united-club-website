import React from 'react';
import { MapPin, User, Navigation, ArrowUpRight, Clock, ShieldCheck, PhoneCall } from 'lucide-react';

const Contact = () => {
  return (
    <footer id="contact" className="relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 bg-[#040d1a]/60 border-t border-[#1D63D8]/20 text-[#F4F7FC] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#1D63D8]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 mb-14 sm:mb-20">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-[#07162c] border border-[#1D63D8]/50 flex items-center justify-center font-display text-xl sm:text-2xl text-[#F4F7FC] tracking-wider shrink-0">
                UC
              </div>
              <span className="font-display text-2xl sm:text-3xl md:text-4xl tracking-widest text-[#F4F7FC]">
                UNITED<span className="text-[#F2C14E]">.</span>CLUB
              </span>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-[#8EA4C4] font-light leading-relaxed max-w-md mb-6 sm:mb-8">
              Dholpur's premier 2,500 sq. ft. fitness facility. Defined by exclusive equipment, uncompromising standards, and a welcoming community dedicated to authentic athletic performance.
            </p>

            {/* Quick Badge */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#0c1f3d]/70 border border-[#1D63D8]/20 inline-flex items-center gap-3 max-w-full">
              <ShieldCheck className="w-5 h-5 text-[#F2C14E] shrink-0" />
              <div>
                <span className="block text-[11px] sm:text-xs font-semibold text-white tracking-wider uppercase">
                  PREMIUM TRAINING ENVIRONMENT
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#7E96B8] block">
                  Saipau Road, Dholpur, Rajasthan
                </span>
              </div>
            </div>
          </div>

          {/* Location & Directions */}
          <div className="md:col-span-1 lg:col-span-4">
            <h3 className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#F2C14E] mb-4 sm:mb-6">
              LOCATION & DIRECTIONS
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D63D8] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block text-xs sm:text-sm">
                    Between Hena Resort and Sandhu Palace
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#8EA4C4] block mt-1 leading-relaxed">
                    Saipau Road, Dholpur, Rajasthan, India
                  </span>
                </div>
              </div>

              <div className="pt-2 sm:pt-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Saipau+Road+Dholpur+Rajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase bg-[#0c1f3d] text-[#F2C14E] hover:bg-[#F2C14E] hover:text-[#07162c] border border-[#1D63D8]/30 transition-all duration-300"
                >
                  <Navigation className="w-3.5 h-3.5 shrink-0" />
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Leadership */}
          <div className="md:col-span-1 lg:col-span-3">
            <h3 className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-bold text-[#F2C14E] mb-4 sm:mb-6">
              CLUB CONTACT PERSONS
            </h3>

            <div className="space-y-3 sm:space-y-4">
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0c1f3d]/70 border border-[#1D63D8]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1D63D8]/20 flex items-center justify-center text-[#F2C14E] shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Jagtar Singh Sandhu
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#7E96B8] uppercase tracking-wider block">
                      United Club
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0c1f3d]/70 border border-[#1D63D8]/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1D63D8]/20 flex items-center justify-center text-[#F2C14E] shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Jitender Singh Sandhu
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#7E96B8] uppercase tracking-wider block">
                      United Club
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Hours Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#7E96B8]">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#F2C14E] shrink-0" />
            <span>Shared Timings for Men & Women • Morning & Evening Sessions</span>
          </div>

          <div>
            © {new Date().getFullYear()} UNITED CLUB. The Biggest Gym in Dholpur.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
