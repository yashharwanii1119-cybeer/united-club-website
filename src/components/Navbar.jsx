import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'THE CLUB', href: '#about' },
    { name: 'TRAINING', href: '#training' },
    { name: 'EQUIPMENT', href: '#equipment' },
    { name: 'FACILITIES', href: '#facilities' },
    { name: 'MEMBERSHIP', href: '#membership' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileMenuOpen
            ? 'bg-[#061426]/95 backdrop-blur-md py-3 md:py-4 border-b border-[#1D63D8]/30 shadow-[0_10px_30px_rgba(4,13,26,0.9)]' 
            : 'bg-[#061426]/75 md:bg-gradient-to-b md:from-[#040d1a]/90 md:via-[#07162c]/50 md:to-transparent backdrop-blur-sm md:backdrop-blur-none py-3.5 md:py-8 border-b border-[#1D63D8]/20 md:border-b-0 shadow-[0_4px_20px_rgba(2,6,14,0.4)] md:shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Brand Logo matching official stylized UC monogram emblem */}
          <a href="#hero" className="group flex items-center gap-2.5 sm:gap-3" onClick={() => setMobileMenuOpen(false)}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0a1f44] border border-[#1D63D8]/60 p-1 flex items-center justify-center transition-all duration-300 group-hover:border-[#F2C14E] group-hover:shadow-[0_0_18px_rgba(242,193,78,0.4)] shrink-0 overflow-hidden shadow-sm">
              <img
                src={`${import.meta.env.BASE_URL}images/uc-logo.png`}
                alt="United Club Official UC Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl md:text-3xl tracking-widest text-[#F4F7FC] group-hover:text-white transition-colors leading-none">
                UNITED<span className="text-[#F2C14E]">.</span>CLUB
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] sm:tracking-[0.25em] text-[#8EA4C4] uppercase font-sans font-medium truncate max-w-[170px] sm:max-w-none">
                Dholpur • Premier Fitness
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.2em] font-medium text-[#D7E1F0] hover:text-[#F2C14E] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1D63D8] transition-all duration-300 group-hover:w-full group-hover:bg-[#F2C14E]" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden px-5 py-2.5 sm:px-6 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border border-[#F2C14E] bg-[#F2C14E] text-[#07162c] hover:bg-[#F8D67D] hover:shadow-[0_0_25px_rgba(242,193,78,0.4)]"
            >
              <span>JOIN THE CLUB</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-lg transition-all duration-300 shrink-0 ${
              mobileMenuOpen
                ? 'bg-[#F2C14E] text-[#07162c] border border-[#F2C14E] shadow-[0_0_15px_rgba(242,193,78,0.4)]'
                : 'bg-[#0a1f44] text-[#F4F7FC] border border-[#1D63D8]/60 hover:border-[#F2C14E] hover:text-[#F2C14E] shadow-[0_4px_12px_rgba(2,6,14,0.6)]'
            } focus:outline-none`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[2.2]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation: Robust portal-like placement with explicit style-driven visibility and z-index */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-[#061426]/98 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto animate-fadeInDrawer"
          style={{ paddingTop: '74px', paddingBottom: '32px' }}
        >
          {/* Backdrop top subtle border beneath the fixed header */}
          <div className="absolute top-[68px] inset-x-0 h-[1px] bg-[#1D63D8]/30 pointer-events-none" />

          {/* Navigation Links list */}
          <div className="px-6 py-6 flex flex-col space-y-2 max-w-md mx-auto w-full">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold tracking-[0.2em] text-[#D7E1F0] hover:text-[#F2C14E] py-3.5 border-b border-white/[0.08] transition-colors flex items-center justify-between group active:text-[#F2C14E]"
              >
                <span>{link.name}</span>
                <span className="text-[#F2C14E]/60 text-sm group-hover:translate-x-1 transition-transform">→</span>
              </a>
            ))}

            {/* Mobile CTA Button */}
            <div className="pt-6">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-bold tracking-widest uppercase bg-[#F2C14E] text-[#07162c] hover:bg-[#F8D67D] active:scale-[0.98] transition-all shadow-[0_0_25px_rgba(242,193,78,0.4)]"
              >
                <span>JOIN THE CLUB</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Club Location Subtitle */}
            <div className="pt-4 text-center">
              <span className="text-[10px] tracking-widest uppercase text-[#7E96B8]">
                Saipau Road, Dholpur, Rajasthan
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
