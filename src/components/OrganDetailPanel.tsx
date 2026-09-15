import React, { useState } from 'react';
import { OrganId, SystemId } from '../types';
import { ORGANS, BODY_SYSTEMS } from '../data/bodyData';
import { OrganMiniVisual } from './OrganMiniVisual';
import {
  MapPin,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Layers,
  Activity,
  Maximize2
} from 'lucide-react';
import { playSoftClick } from '../utils/audio';

interface OrganDetailPanelProps {
  organId: OrganId;
  onClose: () => void;
  onSelectOrgan: (id: OrganId) => void;
  onSelectSystem: (id: SystemId) => void;
}

const ALL_ORGAN_IDS: OrganId[] = ['brain', 'heart', 'lungs', 'liver', 'stomach', 'intestine', 'kidneys', 'blood', 'skeleton'];

export const OrganDetailPanel: React.FC<OrganDetailPanelProps> = ({
  organId,
  onClose,
  onSelectOrgan,
  onSelectSystem,
}) => {
  const organ = ORGANS[organId];
  const system = BODY_SYSTEMS[organ.systemId];
  const [visualMode, setVisualMode] = useState<'specimen' | 'simulation'>('specimen');

  const currentIndex = ALL_ORGAN_IDS.indexOf(organId);
  const prevOrganId = ALL_ORGAN_IDS[(currentIndex - 1 + ALL_ORGAN_IDS.length) % ALL_ORGAN_IDS.length];
  const nextOrganId = ALL_ORGAN_IDS[(currentIndex + 1) % ALL_ORGAN_IDS.length];

  const handleNext = () => {
    playSoftClick();
    onSelectOrgan(nextOrganId);
  };

  const handlePrev = () => {
    playSoftClick();
    onSelectOrgan(prevOrganId);
  };

  return (
    <div
      id="organ-detail-panel"
      className="w-full rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 shadow-2xl shadow-cyan-950/20 p-5 md:p-6 flex flex-col gap-5 transition-all duration-300"
    >
      {/* Header with Navigation & Quick Actions */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-lg shadow-cyan-950/30">
            <span>{organ.emoji}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
                {organ.name}
              </h2>
              <button
                id={`badge-system-${organ.systemId}`}
                type="button"
                onClick={() => onSelectSystem(organ.systemId)}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-900/60 transition-colors"
                title={`Explore ${organ.systemName}`}
              >
                {organ.systemName}
              </button>
            </div>
            <p className="text-xs text-cyan-300/90 font-medium italic mt-0.5">
              "{organ.tagline}"
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1">
          <button
            id="organ-prev-btn"
            type="button"
            onClick={handlePrev}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Previous Organ"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="organ-next-btn"
            type="button"
            onClick={handleNext}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Next Organ"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            id="organ-close-btn"
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/50 hover:text-rose-300 text-slate-400 transition-colors ml-1"
            title="Close Panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Labeled Anatomical Parts Strip (matching the poster callout labels) */}
      {organ.anatomicalParts && organ.anatomicalParts.length > 0 && (
        <div className="bg-slate-950/50 rounded-2xl p-3 border border-slate-800/60 space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
            Key Anatomical Structures & Lobes:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {organ.anatomicalParts.map((part, i) => (
              <span
                key={i}
                className="text-xs px-2.5 py-1 rounded-xl bg-slate-800/90 border border-slate-700/80 text-slate-200 font-medium"
              >
                {part}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Key Physiological Stats Strip */}
      <div className="grid grid-cols-3 gap-2">
        {organ.stats.map((stat, i) => (
          <div
            key={i}
            className="rounded-2xl bg-slate-950/60 border border-slate-800/60 p-2.5 text-center"
          >
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
              {stat.label}
            </span>
            <span className="text-sm md:text-base font-bold text-cyan-200">
              {stat.value}
            </span>
            {stat.unit && (
              <span className="text-[10px] text-slate-400 ml-1 font-mono">{stat.unit}</span>
            )}
          </div>
        ))}
      </div>

      {/* Visual Presentation: 3D Medical Specimen vs Live Physiology Simulation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-semibold font-mono tracking-wider text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Anatomical Visualization
          </span>
          {organ.imageUrl && (
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setVisualMode('specimen')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  visualMode === 'specimen'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>3D Specimen</span>
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('simulation')}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
                  visualMode === 'simulation'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Activity className="w-3 h-3" />
                <span>Simulation</span>
              </button>
            </div>
          )}
        </div>

        {visualMode === 'specimen' && organ.imageUrl ? (
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-950/90 aspect-[4/3] flex items-center justify-center group shadow-xl">
            <img
              src={organ.imageUrl}
              alt={`${organ.name} 3D Anatomical Render`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
            {/* Scientific reticle watermark */}
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur border border-slate-700/60 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>3D MEDICAL ATLAS SPECIMEN</span>
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur border border-slate-700/60 text-[10px] font-mono text-slate-300">
              Coronal View • True Anatomy
            </div>
          </div>
        ) : (
          <OrganMiniVisual organId={organ.id} systemColor={system.color} />
        )}
      </div>

      {/* Main Function Section */}
      <div className="space-y-1.5">
        <h3 className="text-xs uppercase font-semibold font-mono tracking-wider text-cyan-400 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          Main Biological Function
        </h3>
        <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/60">
          {organ.mainFunction}
        </p>
      </div>

      {/* Anatomical Location Section */}
      <div className="space-y-1.5">
        <h3 className="text-xs uppercase font-semibold font-mono tracking-wider text-sky-400 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5" />
          Anatomical Location
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-2xl border border-slate-800/60">
          {organ.location}
        </p>
      </div>

      {/* 2-3 Simple Interesting Educational Facts */}
      <div className="space-y-2.5">
        <h3 className="text-xs uppercase font-semibold font-mono tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Fascinating Scientific Facts
        </h3>
        <div className="space-y-2">
          {organ.facts.map((fact, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950/80 to-slate-900/80 border border-slate-800/70 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 text-[11px] font-mono font-bold flex items-center justify-center border border-cyan-500/30">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-semibold text-slate-100">{fact.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-7">
                {fact.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation Strip */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
        <button
          id="cycle-prev-organ-link"
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Previous: {ORGANS[prevOrganId].name}</span>
        </button>
        <span className="text-[11px] font-mono text-slate-500">
          {currentIndex + 1} of {ALL_ORGAN_IDS.length} Organs
        </span>
        <button
          id="cycle-next-organ-link"
          type="button"
          onClick={handleNext}
          className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
        >
          <span>Next: {ORGANS[nextOrganId].name}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
