import React, { useState } from 'react';
import { OrganId, SystemId } from './types';
import { ORGANS, BODY_SYSTEMS } from './data/bodyData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BodyIllustration } from './components/BodyIllustration';
import { OrganDetailPanel } from './components/OrganDetailPanel';
import { BodySystemsSection } from './components/BodySystemsSection';
import { AboutSection } from './components/AboutSection';
import {
  Compass,
  Layers,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  MousePointerClick
} from 'lucide-react';
import { playSoftClick, playHeartbeatSound } from './utils/audio';

const ORGAN_LIST: OrganId[] = ['brain', 'heart', 'lungs', 'liver', 'stomach', 'intestine', 'kidneys', 'blood', 'skeleton'];

export default function App() {
  const [selectedOrganId, setSelectedOrganId] = useState<OrganId | null>('heart');
  const [hoveredOrganId, setHoveredOrganId] = useState<OrganId | null>(null);
  const [activeSystemId, setActiveSystemId] = useState<SystemId | null>(null);
  const [activeNavSection, setActiveNavSection] = useState<string>('explorer');

  const handleStartExploring = () => {
    setSelectedOrganId('heart');
    playHeartbeatSound();
    const el = document.getElementById('explorer-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (sectionId: string) => {
    setActiveNavSection(sectionId);
    const targetId =
      sectionId === 'hero'
        ? 'hero-section'
        : sectionId === 'explorer'
        ? 'explorer-section'
        : sectionId === 'systems'
        ? 'systems-section'
        : 'about-section';

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSystemFilter = (sysId: SystemId | null) => {
    playSoftClick();
    setActiveSystemId(sysId);
  };

  const handleSelectOrgan = (organId: OrganId) => {
    setSelectedOrganId(organId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeNavSection} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onStartExploring={handleStartExploring} />

        {/* ========================================================= */}
        {/* INTERACTIVE HUMAN BODY EXPLORER WORKSPACE                 */}
        {/* ========================================================= */}
        <section
          id="explorer-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-6"
        >
          {/* Explorer Filter & Controls Header */}
          <div className="rounded-3xl bg-slate-900/60 backdrop-blur border border-slate-800 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* System Filter Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Filter by System:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  id="system-filter-all-btn"
                  type="button"
                  onClick={() => handleSelectSystemFilter(null)}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-all ${
                    activeSystemId === null
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  All Organs
                </button>
                {(['nervous', 'respiratory', 'circulatory', 'digestive', 'skeletal'] as SystemId[]).map(sys => {
                  const isSelected = activeSystemId === sys;
                  return (
                    <button
                      key={sys}
                      id={`system-filter-${sys}-btn`}
                      type="button"
                      onClick={() => handleSelectSystemFilter(isSelected ? null : sys)}
                      className={`text-xs px-3 py-1.5 rounded-xl capitalize font-medium transition-all ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-500/20 font-bold'
                          : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                      }`}
                    >
                      {sys}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hint Notice */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <MousePointerClick className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hover or click organs on the body model</span>
            </div>
          </div>

          {/* Quick Organ Selector Strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-mono uppercase text-slate-500 shrink-0 hidden sm:inline">
              Quick Jump:
            </span>
            {ORGAN_LIST.map(id => {
              const organ = ORGANS[id];
              const isSelected = selectedOrganId === id;
              return (
                <button
                  key={id}
                  id={`quick-select-organ-${id}`}
                  type="button"
                  onClick={() => handleSelectOrgan(id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-600 to-sky-600 text-white shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                      : 'bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800'
                  }`}
                >
                  <span className="text-sm">{organ.emoji}</span>
                  <span>{organ.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main 2-Column Explorer Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Interactive Front-View Body SVG Illustration */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <BodyIllustration
                selectedOrganId={selectedOrganId}
                onSelectOrgan={handleSelectOrgan}
                hoveredOrganId={hoveredOrganId}
                onHoverOrgan={setHoveredOrganId}
                activeSystemId={activeSystemId}
              />
            </div>

            {/* Right Column: Dynamic Organ Information Panel */}
            <div className="lg:col-span-6 w-full">
              {selectedOrganId ? (
                <OrganDetailPanel
                  organId={selectedOrganId}
                  onClose={() => setSelectedOrganId(null)}
                  onSelectOrgan={handleSelectOrgan}
                  onSelectSystem={sysId => {
                    setActiveSystemId(sysId);
                    const el = document.getElementById('systems-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              ) : (
                /* Empty Prompt State when user closes panel */
                <div
                  id="organ-empty-state-panel"
                  className="w-full rounded-3xl bg-slate-900/60 border border-slate-800 p-8 text-center space-y-5"
                >
                  <div className="w-16 h-16 mx-auto rounded-3xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '12s' }} />
                  </div>
                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="text-xl font-bold font-display text-white">
                      Select an Organ to Inspect
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Click directly on any organ hotspot on the human body illustration, or choose from the quick selector buttons below to examine its cellular mechanics and facts.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {ORGAN_LIST.map(id => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleSelectOrgan(id)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/40 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                      >
                        <span>{ORGANS[id].emoji}</span>
                        <span>{ORGANS[id].name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* BODY SYSTEMS SECTION                                      */}
        {/* ========================================================= */}
        <BodySystemsSection
          activeSystemId={activeSystemId}
          onSelectSystem={setActiveSystemId}
          onSelectOrgan={handleSelectOrgan}
          onScrollToExplorer={() => {
            const el = document.getElementById('explorer-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* ========================================================= */}
        {/* ABOUT & EDUCATIONAL OVERVIEW SECTION                      */}
        {/* ========================================================= */}
        <AboutSection />
      </main>
    </div>
  );
}
