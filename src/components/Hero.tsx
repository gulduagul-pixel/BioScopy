import React from 'react';
import { ArrowDown, Sparkles, Activity, Shield, Heart } from 'lucide-react';
import { playSoftClick } from '../utils/audio';

interface HeroProps {
  onStartExploring: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartExploring }) => {
  const handleClick = () => {
    playSoftClick();
    onStartExploring();
  };

  return (
    <section id="hero-section" className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Medical Science Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Interactive Coronal Anatomy Explorer</span>
        </div>

        {/* Main Title & Subtitle matching prompt explicitly */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.1]">
            Explore the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400">Human Body</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-cyan-100/90 font-medium">
            Discover how the amazing systems inside us work.
          </p>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed pt-1">
            An interactive educational visualizer crafted for students, educators, and curious minds. Examine major vital organs, understand cardiovascular and nervous circuitry, and inspect real-time biological simulations.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            id="start-exploring-hero-btn"
            type="button"
            onClick={handleClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Start Exploring</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Key Anatomical Metrics Bar */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur">
            <span className="text-xl sm:text-2xl font-bold font-display text-white block">78</span>
            <span className="text-[11px] font-mono uppercase text-slate-400">Vital Organs</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur">
            <span className="text-xl sm:text-2xl font-bold font-display text-cyan-300 block">37.2T</span>
            <span className="text-[11px] font-mono uppercase text-slate-400">Living Cells</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur">
            <span className="text-xl sm:text-2xl font-bold font-display text-rose-300 block">100,000 km</span>
            <span className="text-[11px] font-mono uppercase text-slate-400">Vascular Network</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur">
            <span className="text-xl sm:text-2xl font-bold font-display text-amber-300 block">206</span>
            <span className="text-[11px] font-mono uppercase text-slate-400">Articulated Bones</span>
          </div>
        </div>
      </div>
    </section>
  );
};
