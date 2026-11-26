import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutClub from './components/AboutClub';
import Exclusivity from './components/Exclusivity';
import TrainingExperience from './components/TrainingExperience';
import Facilities from './components/Facilities';
import Community from './components/Community';
import MembershipCTA from './components/MembershipCTA';
import Contact from './components/Contact';
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  return (
    <div className="relative min-h-screen bg-[#061426] text-[#F4F7FC] selection:bg-[#F2C14E] selection:text-[#07162c] overflow-x-hidden">
      {/* Active Theory-inspired global interactive animated background environment */}
      <InteractiveBackground />

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none z-30 grain-overlay opacity-12" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections with elevated z-index */}
      <main className="relative z-10">
        <Hero />
        <AboutClub />
        <Exclusivity />
        <TrainingExperience />
        <Facilities />
        <Community />
        <MembershipCTA />
      </main>

      {/* Footer & Contact */}
      <div className="relative z-10">
        <Contact />
      </div>
    </div>
  );
}

export default App;
