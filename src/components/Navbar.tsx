import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Activity, Compass, Layers, Info } from 'lucide-react';
import { getAudioMuted, setAudioMuted, playSoftClick } from '../utils/audio';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeSection }) => {
  const [isMuted, setIsMutedState] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMutedState(getAudioMuted());
  }, []);

  const toggleSound = () => {
    const nextMuted = !isMuted;
    setAudioMuted(nextMuted);
    setIsMutedState(nextMuted);
    if (!nextMuted) playSoftClick();
  };

  const handleNavClick = (id: string) => {
    playSoftClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="navbar-brand-btn"
          type="button"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 to-sky-400 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold font-display text-white tracking-tight flex items-center gap-1.5">
              Bio-Scopy
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase block -mt-1">
              Interactive Anatomy
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          <button
            id="nav-link-explore"
            type="button"
            onClick={() => handleNavClick('explorer')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeSection === 'explorer'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            Explore
          </button>
          <button
            id="nav-link-systems"
            type="button"
            onClick={() => handleNavClick('systems')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeSection === 'systems'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            Systems
          </button>
          <button
            id="nav-link-about"
            type="button"
            onClick={() => handleNavClick('about')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeSection === 'about'
                ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-850'
            }`}
          >
            About
          </button>
        </nav>

        {/* Audio Toggle & Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            id="navbar-audio-toggle"
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors ${
              !isMuted
                ? 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title={isMuted ? 'Enable physiological audio tones' : 'Mute audio'}
          >
            {!isMuted ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline text-[11px] font-mono">
              {!isMuted ? 'Audio On' : 'Audio Muted'}
            </span>
          </button>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 py-3 space-y-2">
          <button
            id="mobile-nav-explore"
            type="button"
            onClick={() => handleNavClick('explorer')}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-850"
          >
            Explore Organism
          </button>
          <button
            id="mobile-nav-systems"
            type="button"
            onClick={() => handleNavClick('systems')}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-850"
          >
            Body Systems
          </button>
          <button
            id="mobile-nav-about"
            type="button"
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-850"
          >
            About & Science
          </button>
        </div>
      )}
    </header>
  );
};
