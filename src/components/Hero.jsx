import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, Dumbbell, Shield, Sparkles, ChevronRight } from 'lucide-react';

const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video autoplays on load even across strict browser policies
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay was prevented, muted playback will proceed:", error);
      });
    }
  }, []);

  // High-res visual poster for smooth initial paint
  const fallbackPoster = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop";

  return (
    <section id="hero" className="relative min-h-[100svh] w-full flex items-center overflow-hidden bg-[#07162c]">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Background Video with responsive object positioning */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          poster={fallbackPoster}
          className={`w-full h-full object-cover object-[68%_center] sm:object-[72%_center] md:object-[78%_center] transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-100' : 'opacity-85'
          }`}
          style={{ filter: 'contrast(1.08) brightness(1.04) saturate(1.06)' }}
        >
          <source src={`${import.meta.env.BASE_URL}videos/gym-hero.mp4`} type="video/mp4" />
          <source src={`${import.meta.env.BASE_URL}videos/standing-barbell-curl.mp4`} type="video/mp4" />
          <source src={`${import.meta.env.BASE_URL}videos/gym-preacher-curl.mp4`} type="video/mp4" />
          {/* Fallback image */}
          <img
            src={fallbackPoster}
            alt="Muscular male athlete training with dumbbell at United Club"
            className="w-full h-full object-cover object-right"
          />
        </video>

        {/* Cinematic Lighting Overlays matching navy/royal identity */}
        {/* Responsive Gradient Scrim: Softened opacity so the hero workout video is clearly visible while text retains crisp contrast */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-[#07162c]/88 via-[#07162c]/70 md:via-[#07162c]/65 to-[#07162c]/25 md:to-transparent w-full md:w-[58%] z-10" />

        {/* Gentle radial vignette letting the workout footage shine brightly */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(4,13,26,0.30)_80%,#07162c_100%)] z-10" />

        {/* Bottom Fade to blend seamlessly with Section 2 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#07162c] via-[#07162c]/60 to-transparent z-10" />

        {/* Top Fade for Navbar */}
        <div className="absolute top-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-b from-[#040d1a]/70 to-transparent z-10" />

        {/* Premium Atmospheric Royal Blue & Gold Glow Elements */}
        {/* Luminous royal blue ambient glow behind hero workout video */}
        <div className="absolute top-1/4 right-[8%] w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] bg-[radial-gradient(circle,rgba(29,99,216,0.22)_0%,rgba(37,99,235,0.06)_55%,transparent_75%)] rounded-full blur-[100px] pointer-events-none z-10 mix-blend-screen" />

        {/* Subtle royal blue soft illumination behind headline */}
        <div className="absolute top-1/3 left-[4%] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-[radial-gradient(circle,rgba(29,99,216,0.16)_0%,transparent_70%)] rounded-full blur-[110px] pointer-events-none z-10" />

        {/* Subtle gold accent warmth */}
        <div className="absolute bottom-1/4 left-1/4 w-52 sm:w-68 h-52 sm:h-68 bg-[radial-gradient(circle,rgba(242,193,78,0.08)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none z-10" />
      </div>

      {/* Atmospheric Floating Dust Particles Effect */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px] animate-float-slow" />
        <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-[#F2C14E]/60 rounded-full blur-[0.5px] animate-pulse-subtle" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-[#3B82F6]/40 rounded-full blur-[1px] animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 w-full pt-28 sm:pt-32 pb-16 sm:pb-24 min-h-[100svh] flex flex-col justify-between">
        <div className="my-auto max-w-3xl pt-4 sm:pt-0">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-3.5 rounded-full bg-[#0a1f44]/80 border border-[#1D63D8]/30 backdrop-blur-md mb-4 sm:mb-6 max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#F2C14E] animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.25em] text-[#D7E1F0] uppercase truncate">
              DHOLPUR'S PREMIER FITNESS DESTINATION
            </span>
          </div>

          {/* Massive Editorial Headline with Fluid Typography */}
          <h1 className="font-display text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.90] sm:leading-[0.88] uppercase text-[#F4F7FC] drop-shadow-2xl">
            BUILT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4F7FC] via-[#D7E1F0] to-[#8EA4C4]">
              BEYOND
            </span> <br />
            <span className="text-[#F2C14E] inline-block hover:scale-[1.01] transition-transform origin-left drop-shadow-[0_0_35px_rgba(242,193,78,0.25)]">
              LIMITS.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 sm:mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-[#B3C5DE] font-sans font-light max-w-xl leading-relaxed tracking-wide">
            <strong className="text-white font-medium">2,500 SQ. FT. OF PERFORMANCE.</strong> A different standard of training engineered for those who demand more from their mind and body.
          </p>

          {/* Key Quick Badges */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-4 text-xs font-medium text-[#8EA4C4]">
            <div className="flex items-center gap-2">
              <span className="text-[#F2C14E] font-bold">✓</span> Exclusive Machines in Dholpur
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#F2C14E] font-bold">✓</span> Same-Time Training for Men & Women
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#F2C14E] font-bold">✓</span> Private Dedicated Lockers
            </div>
          </div>

          {/* CTAs with Mobile Stack & Touch Area */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-sm tracking-[0.2em] uppercase bg-[#F2C14E] text-[#07162c] hover:bg-[#F8D67D] transition-all duration-300 shadow-[0_0_30px_rgba(242,193,78,0.35)] hover:shadow-[0_0_45px_rgba(242,193,78,0.6)] hover:-translate-y-0.5 active:translate-y-0 text-center"
            >
              <span>EXPLORE THE CLUB</span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </a>

            <a
              href="#membership"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase text-[#F4F7FC] bg-[#0c1f3d]/80 border border-[#1D63D8]/40 hover:border-[#F2C14E]/60 hover:bg-[#112f5a] backdrop-blur-md transition-all duration-300 text-center"
            >
              <span>BECOME A MEMBER</span>
            </a>
          </div>
        </div>

        {/* Bottom Hero Bar with Scroll Indicator & Stats Sneak Peek */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="grid grid-cols-3 sm:flex items-center gap-4 sm:gap-8 w-full md:w-auto">
            <div>
              <span className="block font-display text-xl sm:text-2xl md:text-3xl text-white">2,500 <span className="text-xs sm:text-sm font-sans text-[#F2C14E]">SQ.FT</span></span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#7E96B8]">Facility Scale</span>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block font-display text-xl sm:text-2xl md:text-3xl text-white">#1</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#7E96B8]">In Dholpur</span>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-white/10" />
            <div>
              <span className="block font-display text-xl sm:text-2xl md:text-3xl text-white">100%</span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#7E96B8]">Exclusive Gear</span>
            </div>
          </div>

          {/* Animated Scroll Indicator */}
          <a
            href="#about"
            className="hidden sm:inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[#8EA4C4] hover:text-[#F2C14E] transition-colors"
          >
            <span>SCROLL TO DISCOVER</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#F2C14E] transition-colors">
              <ArrowDown className="w-3.5 h-3.5 text-white group-hover:text-[#F2C14E] animate-bounce" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
