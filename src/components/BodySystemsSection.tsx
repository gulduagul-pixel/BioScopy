import React from 'react';
import { SystemId, OrganId } from '../types';
import { BODY_SYSTEMS, ORGANS } from '../data/bodyData';
import {
  Zap,
  Wind,
  HeartPulse,
  Sparkles,
  Shield,
  ArrowRight,
  CheckCircle,
  Activity,
  Layers
} from 'lucide-react';
import { playSoftClick } from '../utils/audio';

interface BodySystemsSectionProps {
  activeSystemId: SystemId | null;
  onSelectSystem: (id: SystemId | null) => void;
  onSelectOrgan: (id: OrganId) => void;
  onScrollToExplorer: () => void;
}

const SYSTEM_ICONS: Record<SystemId, React.ElementType> = {
  nervous: Zap,
  respiratory: Wind,
  circulatory: HeartPulse,
  digestive: Sparkles,
  skeletal: Shield,
};

export const BodySystemsSection: React.FC<BodySystemsSectionProps> = ({
  activeSystemId,
  onSelectSystem,
  onSelectOrgan,
  onScrollToExplorer,
}) => {
  const systems = Object.values(BODY_SYSTEMS);

  const handleSystemClick = (id: SystemId) => {
    playSoftClick();
    if (activeSystemId === id) {
      onSelectSystem(null); // Toggle off
    } else {
      onSelectSystem(id);
    }
  };

  const handleOrganJump = (organId: OrganId) => {
    playSoftClick();
    onSelectOrgan(organId);
    onScrollToExplorer();
  };

  return (
    <section id="systems-section" className="w-full py-12 md:py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Integrated Biological Networks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Major Human Body Systems
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            The human body is an orchestra of interdependent systems working in synchronized harmony. Click any system to reveal its operating mechanics and involved organs.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {systems.map(sys => {
            const Icon = SYSTEM_ICONS[sys.id];
            const isActive = activeSystemId === sys.id;

            return (
              <div
                key={sys.id}
                id={`system-card-${sys.id}`}
                onClick={() => handleSystemClick(sys.id)}
                className={`group cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/50 -translate-y-1'
                    : 'bg-slate-900/60 hover:bg-slate-850 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-300 group-hover:text-cyan-300 group-hover:bg-slate-750'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-cyan-200 transition-colors">
                    {sys.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {sys.shortExplanation}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">
                    {sys.organsInvolved.length} Key Organ{sys.organsInvolved.length > 1 ? 's' : ''}
                  </span>
                  <span className={`flex items-center gap-1 font-semibold ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                  }`}>
                    {isActive ? 'Active Filter' : 'Inspect'}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected System In-Depth Educational Card */}
        {activeSystemId && (
          <div
            id="active-system-expanded-view"
            className="w-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950 border border-cyan-500/30 shadow-2xl p-6 md:p-8 transition-all duration-300"
          >
            {(() => {
              const currentSys = BODY_SYSTEMS[activeSystemId];
              const SysIcon = SYSTEM_ICONS[currentSys.id];

              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Left Column: System Overview & Explanation */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-950/40">
                        <SysIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                          Selected Biological Network
                        </span>
                        <h3 className="text-2xl font-bold font-display text-white">
                          {currentSys.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-slate-200 leading-relaxed bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
                      {currentSys.shortExplanation}
                    </p>

                    {/* Key System Functions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Core Systemic Responsibilities:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentSys.keyFunctions.map((func, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs text-slate-300"
                          >
                            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{func}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Organs Involved & Explorer Link */}
                  <div className="lg:col-span-5 space-y-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 p-5">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                        Involved Anatomical Organs
                      </span>
                      <p className="text-xs text-slate-300">
                        Click any organ below to inspect its cellular mechanics and location on the front-view model:
                      </p>
                    </div>

                    {/* Interactive Organ Pills */}
                    <div className="flex flex-wrap gap-2">
                      {currentSys.organsInvolved.map(organId => {
                        const organ = ORGANS[organId];
                        return (
                          <button
                            key={organId}
                            id={`system-organ-pill-${organId}`}
                            type="button"
                            onClick={() => handleOrganJump(organId)}
                            className="group/pill px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-500/50 text-left transition-all flex items-center gap-2.5"
                          >
                            <span className="text-lg">{organ.emoji}</span>
                            <div>
                              <div className="text-xs font-bold text-white group-hover/pill:text-cyan-300 flex items-center gap-1">
                                {organ.name}
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover/pill:opacity-100 transition-opacity text-cyan-400" />
                              </div>
                              <span className="text-[10px] text-slate-400 block font-mono">
                                {organ.location.split(',')[0]}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Additional Components in this System */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-mono text-slate-400 block mb-1.5">
                        Related Tissues & Structures:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentSys.organNames.map((name, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/50"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metric Highlight Box */}
                    <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                      <div className="text-xs text-cyan-300 font-mono">
                        {currentSys.systemMetric}
                      </div>
                      <button
                        id="jump-to-explorer-btn"
                        type="button"
                        onClick={onScrollToExplorer}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <span>View on Body</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};
