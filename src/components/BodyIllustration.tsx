import React, { useState } from 'react';
import { OrganId, SystemId } from '../types';
import { ORGANS } from '../data/bodyData';
import {
  RotateCcw,
  Eye,
  Layers,
  Sparkles,
  Info,
  Activity,
  CheckCircle2,
  Volume2,
  VolumeX,
  Compass,
  Maximize2
} from 'lucide-react';
import { playSoftClick, playHeartbeatSound, playSynapseSound } from '../utils/audio';

interface BodyIllustrationProps {
  selectedOrganId: OrganId | null;
  onSelectOrgan: (id: OrganId) => void;
  hoveredOrganId: OrganId | null;
  onHoverOrgan: (id: OrganId | null) => void;
  activeSystemId: SystemId | null;
}

type CameraView = 'full' | 'head' | 'thorax' | 'abdomen';
type RenderMode = 'realistic3d' | 'holographic';
type ModelView = 'thorax' | 'fullbody';

interface BeaconDef {
  id: OrganId;
  name: string;
  tagline: string;
  targetX: number; // percentage on image
  targetY: number; // percentage on image
  buttonY: number; // vertical position for side button
  side: 'left' | 'right';
  bilateralTargetX?: number; // for organs with two symmetric parts (e.g. right lung)
}

// Calibrated coordinates for Thorax 3D Model (Image from user screenshot)
const THORAX_BEACONS: BeaconDef[] = [
  { id: 'brain', name: 'Brain', tagline: 'Control centre of the body', targetX: 50, targetY: 10, buttonY: 10, side: 'left' },
  { id: 'lungs', name: 'Lungs', tagline: 'Helps to breathe', targetX: 62, targetY: 46, buttonY: 24, side: 'right', bilateralTargetX: 38 },
  { id: 'heart', name: 'Heart', tagline: 'Pumps blood around the body', targetX: 50, targetY: 47, buttonY: 34, side: 'left' },
  { id: 'liver', name: 'Liver', tagline: 'Cleans the blood', targetX: 38, targetY: 61, buttonY: 52, side: 'left' },
  { id: 'stomach', name: 'Stomach', tagline: 'Helps in breakage of food', targetX: 56, targetY: 64, buttonY: 52, side: 'right' },
  { id: 'kidneys', name: 'Kidneys', tagline: 'Filters waste out of body', targetX: 68, targetY: 62, buttonY: 67, side: 'right', bilateralTargetX: 32 },
  { id: 'intestine', name: 'Intestines', tagline: 'Helps in digestion of food', targetX: 50, targetY: 80, buttonY: 80, side: 'left' },
];

// Calibrated coordinates for Full Body 3D Model
const FULLBODY_BEACONS: BeaconDef[] = [
  { id: 'brain', name: 'Brain', tagline: 'Control centre of the body', targetX: 44, targetY: 9, buttonY: 8, side: 'left' },
  { id: 'lungs', name: 'Lungs', tagline: 'Helps to breathe', targetX: 60, targetY: 39, buttonY: 24, side: 'right', bilateralTargetX: 40 },
  { id: 'heart', name: 'Heart', tagline: 'Pumps blood around the body', targetX: 52, targetY: 46, buttonY: 32, side: 'left' },
  { id: 'liver', name: 'Liver', tagline: 'Cleans the blood', targetX: 39, targetY: 57, buttonY: 42, side: 'left' },
  { id: 'stomach', name: 'Stomach', tagline: 'Helps in breakage of food', targetX: 52, targetY: 58, buttonY: 42, side: 'right' },
  { id: 'kidneys', name: 'Kidneys', tagline: 'Filters waste out of body', targetX: 54, targetY: 63, buttonY: 53, side: 'right', bilateralTargetX: 46 },
  { id: 'intestine', name: 'Intestines', tagline: 'Helps in digestion of food', targetX: 48, targetY: 69, buttonY: 62, side: 'left' },
];

// Vector SVG viewboxes for camera angles
const VECTOR_VIEW_BOXES: Record<CameraView, string> = {
  full: '120 20 320 620',
  head: '210 30 140 140',
  thorax: '180 150 200 180',
  abdomen: '180 260 200 240',
};

export const BodyIllustration: React.FC<BodyIllustrationProps> = ({
  selectedOrganId,
  onSelectOrgan,
  hoveredOrganId,
  onHoverOrgan,
  activeSystemId,
}) => {
  const [renderMode, setRenderMode] = useState<RenderMode>('realistic3d');
  const [modelView, setModelView] = useState<ModelView>('thorax');
  const [cameraView, setCameraView] = useState<CameraView>('full');
  const [showGuideLines, setShowGuideLines] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const activeBeacons = modelView === 'fullbody' ? FULLBODY_BEACONS : THORAX_BEACONS;
  const activeImagePath = modelView === 'fullbody'
    ? '/src/assets/images/full_body_organs_3d_1789316870489.jpg'
    : '/src/assets/images/human_organs_3d_1789316040433.jpg';

  const handleOrganClick = (organId: OrganId) => {
    if (soundEnabled) {
      if (organId === 'heart') playHeartbeatSound();
      else if (organId === 'brain') playSynapseSound();
      else playSoftClick();
    }
    onSelectOrgan(organId);
  };

  const handleCameraChange = (view: CameraView) => {
    if (soundEnabled) playSoftClick();
    setCameraView(view);
  };

  // Zoom transform parameters for 3D model viewport
  const getCameraTransform = () => {
    switch (cameraView) {
      case 'head':
        return 'scale(2.2) translateY(24%)';
      case 'thorax':
        return 'scale(1.9) translateY(8%)';
      case 'abdomen':
        return 'scale(1.8) translateY(-14%)';
      case 'full':
      default:
        return 'scale(1) translateY(0%)';
    }
  };

  return (
    <div id="body-explorer-canvas-container" className="relative w-full flex flex-col items-center select-none">
      {/* Top Viewport Controls Bar */}
      <div className="w-full max-w-lg mb-3 flex flex-wrap items-center justify-between gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-800 text-xs text-slate-300 shadow-xl shadow-black/40">
        {/* Render Mode Switcher & Model View */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80">
          <button
            id="mode-realistic3d-btn"
            type="button"
            onClick={() => {
              if (soundEnabled) playSoftClick();
              setRenderMode('realistic3d');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              renderMode === 'realistic3d'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Realistic 3D Atlas
          </button>
          <button
            id="mode-holographic-btn"
            type="button"
            onClick={() => {
              if (soundEnabled) playSoftClick();
              setRenderMode('holographic');
            }}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
              renderMode === 'holographic'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Holographic Viscera
          </button>
        </div>

        {/* 3D Model Specimen Selector when in realistic3d */}
        {renderMode === 'realistic3d' && (
          <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-xl border border-slate-800/80">
            <button
              id="model-thorax-btn"
              type="button"
              onClick={() => {
                if (soundEnabled) playSoftClick();
                setModelView('thorax');
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                modelView === 'thorax'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Thorax Specimen
            </button>
            <button
              id="model-fullbody-btn"
              type="button"
              onClick={() => {
                if (soundEnabled) playSoftClick();
                setModelView('fullbody');
              }}
              className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                modelView === 'fullbody'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Body Atlas
            </button>
          </div>
        )}

        {/* Camera Focus Views */}
        <div className="flex items-center gap-1">
          {(['full', 'head', 'thorax', 'abdomen'] as CameraView[]).map(v => (
            <button
              key={v}
              id={`camera-view-${v}-btn`}
              type="button"
              onClick={() => handleCameraChange(v)}
              className={`px-2 py-1 rounded-lg capitalize transition-all font-medium text-[11px] ${
                cameraView === v
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {v === 'full' ? 'Full Body' : v}
            </button>
          ))}
        </div>

        {/* Action Toggles */}
        <div className="flex items-center gap-1.5 border-l border-slate-800 pl-2">
          <button
            id="toggle-guide-lines-btn"
            type="button"
            onClick={() => setShowGuideLines(!showGuideLines)}
            className={`p-1.5 rounded-lg text-[11px] transition-colors ${
              showGuideLines ? 'text-amber-300 bg-amber-950/40 border border-amber-500/30' : 'text-slate-500 hover:text-slate-400'
            }`}
            title="Toggle anatomical guide lines"
          >
            <Compass className="w-3.5 h-3.5" />
          </button>
          <button
            id="toggle-sound-btn"
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg text-[11px] transition-colors ${
              soundEnabled ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/30' : 'text-slate-500 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Mute audio feedback' : 'Unmute audio feedback'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          {cameraView !== 'full' && (
            <button
              id="reset-camera-btn"
              type="button"
              onClick={() => handleCameraChange('full')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              title="Reset to Full View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Medical Stage Container */}
      <div className="relative w-full max-w-[540px] aspect-[9/15] rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl shadow-cyan-950/30 overflow-hidden flex items-center justify-center">
        {/* Subtle Precision Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Ambient Medical Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* ============================================================ */}
        {/* VIEW 1: PHOTOREALISTIC 3D MEDICAL ATLAS SPECIMEN             */}
        {/* High-definition 3D biological render of human organs only   */}
        {/* ============================================================ */}
        {renderMode === 'realistic3d' && (
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            {/* 3D Image Layer with Dynamic Zoom & Pan */}
            <div
              className="relative w-full h-full transition-transform duration-700 ease-out flex items-center justify-center"
              style={{ transform: getCameraTransform() }}
            >
              <img
                src={activeImagePath}
                alt="Human Internal Organs 3D Medical Model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* SVG Anatomical Pointer Guide Lines (Connecting side buttons directly to organ target pins) */}
              {showGuideLines && cameraView === 'full' && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <filter id="pointerGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="0.8" floodColor="#38BDF8" floodOpacity="0.9" />
                    </filter>
                  </defs>

                  {activeBeacons.map(b => {
                    const isSelected = selectedOrganId === b.id;
                    const isHovered = hoveredOrganId === b.id;
                    const active = isSelected || isHovered;

                    // Compute inner anchor for button edge
                    const anchorX = b.side === 'left' ? 27 : 73;
                    const anchorY = b.buttonY;
                    const midX = b.side === 'left' ? 36 : 64;

                    return (
                      <g key={`guideline-${b.id}`}>
                        {/* Smooth anatomical pointer line from button to target pin */}
                        <path
                          d={`M ${anchorX} ${anchorY} L ${midX} ${anchorY} L ${b.targetX} ${b.targetY}`}
                          fill="none"
                          stroke={active ? '#38BDF8' : '#475569'}
                          strokeWidth={active ? '0.8' : '0.4'}
                          strokeDasharray={active ? 'none' : '1.5 1.5'}
                          filter={active ? 'url(#pointerGlow)' : undefined}
                          className="transition-all duration-300"
                        />

                        {/* Optional bilateral second branch (e.g. for bilateral lungs) */}
                        {b.bilateralTargetX && (
                          <path
                            d={`M ${anchorX} ${anchorY} L ${midX} ${anchorY} L ${b.bilateralTargetX} ${b.targetY}`}
                            fill="none"
                            stroke={active ? '#38BDF8' : '#334155'}
                            strokeWidth={active ? '0.6' : '0.3'}
                            strokeDasharray="1 1"
                            className="transition-all duration-300"
                          />
                        )}

                        {/* Target terminal pin on organ */}
                        <circle
                          cx={b.targetX}
                          cy={b.targetY}
                          r={active ? '1.8' : '1.0'}
                          fill={active ? '#38BDF8' : '#1E293B'}
                          stroke={active ? '#E0F2FE' : '#64748B'}
                          strokeWidth={active ? '0.5' : '0.3'}
                          className="transition-all duration-300"
                        />

                        {b.bilateralTargetX && (
                          <circle
                            cx={b.bilateralTargetX}
                            cy={b.targetY}
                            r={active ? '1.5' : '0.8'}
                            fill={active ? '#38BDF8' : '#1E293B'}
                            stroke={active ? '#E0F2FE' : '#64748B'}
                            strokeWidth={active ? '0.5' : '0.3'}
                            className="transition-all duration-300"
                          />
                        )}

                        {/* Anchor dot on button edge */}
                        <circle
                          cx={anchorX}
                          cy={anchorY}
                          r="0.8"
                          fill={active ? '#38BDF8' : '#64748B'}
                          className="transition-all duration-300"
                        />
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Interactive Glowing Pinpoint Hotspots Over Each Organ */}
              {activeBeacons.map(b => {
                const isSelected = selectedOrganId === b.id;
                const isHovered = hoveredOrganId === b.id;
                const active = isSelected || isHovered;

                return (
                  <div
                    key={b.id}
                    id={`hotspot-${b.id}`}
                    style={{ top: `${b.targetY}%`, left: `${b.targetX}%` }}
                    onClick={() => handleOrganClick(b.id)}
                    onMouseEnter={() => onHoverOrgan(b.id)}
                    onMouseLeave={() => onHoverOrgan(null)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  >
                    {/* Outer animated radar pulse on active */}
                    {active && (
                      <span className="absolute -inset-3 rounded-full bg-cyan-400/30 animate-ping opacity-75 pointer-events-none" />
                    )}

                    {/* Outer Target Ring */}
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        active
                          ? 'bg-cyan-500/30 ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/50 scale-125'
                          : 'bg-slate-900/80 hover:bg-slate-800 ring-1 ring-slate-600 hover:ring-cyan-400'
                      }`}
                    >
                      {/* Center Core Dot */}
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          active ? 'bg-cyan-300 animate-pulse' : 'bg-slate-300 group-hover:bg-cyan-400'
                        }`}
                      />
                    </span>

                    {/* Floating HUD Tooltip Card on Hover */}
                    {isHovered && !isSelected && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 px-2.5 py-1 rounded-xl bg-slate-900/95 backdrop-blur border border-cyan-500/50 text-white shadow-xl pointer-events-none whitespace-nowrap z-30 flex flex-col items-center gap-0.5 animate-in fade-in zoom-in-95 duration-200">
                        <span className="text-xs font-bold text-cyan-300">{b.name}</span>
                        <span className="text-[10px] text-slate-300 font-medium">{b.tagline}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Poster Lateral Callout Button Cards (Full View) - Precisely Aligned With Organs */}
            {cameraView === 'full' && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {activeBeacons.map(b => {
                  const isSelected = selectedOrganId === b.id;
                  const isHovered = hoveredOrganId === b.id;
                  const active = isSelected || isHovered;

                  return (
                    <div
                      key={`label-${b.id}`}
                      style={{
                        top: `${b.buttonY}%`,
                        [b.side]: '8px',
                      }}
                      className={`absolute -translate-y-1/2 pointer-events-auto transition-all duration-300 ${
                        active ? 'scale-105 z-30' : 'opacity-85 hover:opacity-100'
                      }`}
                    >
                      <button
                        type="button"
                        id={`beacon-btn-${b.id}`}
                        onClick={() => handleOrganClick(b.id)}
                        onMouseEnter={() => onHoverOrgan(b.id)}
                        onMouseLeave={() => onHoverOrgan(null)}
                        className={`px-2.5 py-1.5 rounded-xl border text-left backdrop-blur-md transition-all flex flex-col ${
                          active
                            ? 'bg-cyan-950/95 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/60'
                            : 'bg-slate-900/85 hover:bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-cyan-300 animate-pulse' : 'bg-cyan-400'}`} />
                          <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-cyan-200">
                            {b.name}
                          </span>
                        </div>
                        <span className="text-[9.5px] text-slate-400 max-w-[110px] truncate leading-tight mt-0.5">
                          {b.tagline}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* VIEW 2: HOLOGRAPHIC VISCERAL ANATOMY (ZERO CARTOON SKIN)     */}
        {/* Translucent glass contour containing purely organs & vessels */}
        {/* ============================================================ */}
        {renderMode === 'holographic' && (
          <svg
            id="holographic-viscera-svg"
            viewBox={VECTOR_VIEW_BOXES[cameraView]}
            className="w-full h-full transition-all duration-700 ease-out overflow-visible"
          >
            <defs>
              {/* Subtle Medical Glass Glow Filter */}
              <filter id="visceralGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Organ Gradients */}
              <linearGradient id="holoBrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="60%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>

              <linearGradient id="holoLungGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="50%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#4C0519" />
              </linearGradient>

              <linearGradient id="holoHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F43F5E" />
                <stop offset="50%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#4C0519" />
              </linearGradient>

              <linearGradient id="holoLiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B45309" />
                <stop offset="50%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>

              <linearGradient id="holoStomachGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="50%" stopColor="#F43F5E" />
                <stop offset="100%" stopColor="#9F1239" />
              </linearGradient>

              <linearGradient id="holoKidneyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#BE123C" />
                <stop offset="60%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4C0519" />
              </linearGradient>

              <linearGradient id="holoIntestineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FECDD3" />
                <stop offset="50%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#BE123C" />
              </linearGradient>
            </defs>

            {/* TRANSLUCENT GLASS HUMAN CONTOUR (NON-CARTOON, PURE GLASS WIREFRAME) */}
            <g id="glass-human-contour" opacity="0.4" className="pointer-events-none">
              {/* Cranial outline */}
              <ellipse cx="280" cy="95" rx="42" ry="52" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 3" />
              {/* Thoracic ribcage cage guides */}
              {[200, 220, 240, 260].map((ry, i) => (
                <g key={i}>
                  <path d={`M 280,${ry} C 255,${ry - 5} 230,${ry + 12} 220,${ry + 20}`} stroke="#334155" strokeWidth="1" fill="none" />
                  <path d={`M 280,${ry} C 305,${ry - 5} 330,${ry + 12} 340,${ry + 20}`} stroke="#334155" strokeWidth="1" fill="none" />
                </g>
              ))}
              {/* Spine column */}
              <line x1="280" y1="140" x2="280" y2="480" stroke="#1E293B" strokeWidth="3" strokeDasharray="2 2" />
            </g>

            {/* MAJOR CARDIOVASCULAR TRUNK (Aorta in Red, Vena Cava in Blue) */}
            <g id="holo-major-vessels" opacity="0.85">
              <line x1="277" y1="200" x2="277" y2="440" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
              <line x1="283" y1="200" x2="283" y2="440" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" />
            </g>

            {/* TRACHEA (Windpipe leading into chest) */}
            <g id="holo-trachea">
              <line x1="280" y1="140" x2="280" y2="198" stroke="#FBCFE8" strokeWidth="6" strokeLinecap="round" />
              <path d="M 280,198 Q 268,208 260,220" stroke="#FBCFE8" strokeWidth="4" fill="none" />
              <path d="M 280,198 Q 292,208 300,220" stroke="#FBCFE8" strokeWidth="4" fill="none" />
              {[148, 156, 164, 172, 180, 188].map((ty, i) => (
                <line key={i} x1="276" y1={ty} x2="284" y2={ty} stroke="#9D174D" strokeWidth="1.2" />
              ))}
            </g>

            {/* BRAIN (Cranium) */}
            <g
              id="holo-brain"
              onClick={() => handleOrganClick('brain')}
              onMouseEnter={() => onHoverOrgan('brain')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'brain' || hoveredOrganId === 'brain' ? 'url(#visceralGlow)' : undefined}
            >
              <path
                d="
                  M 252,90
                  C 248,65 260,48 280,48
                  C 300,48 312,65 308,90
                  C 308,102 300,112 288,114
                  C 285,120 275,120 272,114
                  C 260,112 252,102 252,90
                  Z
                "
                fill="url(#holoBrainGrad)"
                stroke={selectedOrganId === 'brain' || hoveredOrganId === 'brain' ? '#38BDF8' : '#BE185D'}
                strokeWidth={selectedOrganId === 'brain' ? 3 : 1.5}
              />
              {/* Gyri & Sulci brain folds */}
              <path
                d="
                  M 262,68 Q 272,62 280,72 Q 288,60 298,68
                  M 256,82 Q 268,76 280,84 Q 292,76 304,82
                  M 260,96 Q 270,90 280,98 Q 290,90 300,96
                  M 280,52 L 280,112
                "
                stroke="#500724"
                strokeWidth="1.2"
                fill="none"
              />
              {/* Cerebellum */}
              <path d="M 268,108 C 265,116 295,116 292,108 Z" fill="#E11D48" stroke="#881337" strokeWidth="1" />
            </g>

            {/* LUNGS (Thorax bilateral) */}
            <g
              id="holo-lungs"
              onClick={() => handleOrganClick('lungs')}
              onMouseEnter={() => onHoverOrgan('lungs')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'lungs' || hoveredOrganId === 'lungs' ? 'url(#visceralGlow)' : undefined}
            >
              {/* Right Lung (3 lobes) */}
              <path
                d="
                  M 262,200
                  C 255,190 240,195 235,210
                  C 225,230 224,260 230,280
                  C 235,295 255,295 264,285
                  C 268,265 266,230 262,200
                  Z
                "
                fill="url(#holoLungGrad)"
                stroke={selectedOrganId === 'lungs' || hoveredOrganId === 'lungs' ? '#38BDF8' : '#7F1D1D'}
                strokeWidth={selectedOrganId === 'lungs' ? 3 : 1.5}
              />
              <path d="M 230,238 Q 248,245 264,240" stroke="#450A0A" strokeWidth="1.2" fill="none" />
              <path d="M 230,265 Q 248,268 264,262" stroke="#450A0A" strokeWidth="1.2" fill="none" />

              {/* Left Lung (2 lobes) */}
              <path
                d="
                  M 298,200
                  C 305,190 320,195 325,210
                  C 335,230 336,260 330,280
                  C 325,295 305,295 296,285
                  C 292,275 294,258 290,248
                  C 288,235 294,220 298,200
                  Z
                "
                fill="url(#holoLungGrad)"
                stroke={selectedOrganId === 'lungs' || hoveredOrganId === 'lungs' ? '#38BDF8' : '#7F1D1D'}
                strokeWidth={selectedOrganId === 'lungs' ? 3 : 1.5}
              />
              <path d="M 300,235 Q 315,250 332,258" stroke="#450A0A" strokeWidth="1.2" fill="none" />
            </g>

            {/* HEART (Mediastinum) */}
            <g
              id="holo-heart"
              onClick={() => handleOrganClick('heart')}
              onMouseEnter={() => onHoverOrgan('heart')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'heart' || hoveredOrganId === 'heart' ? 'url(#visceralGlow)' : undefined}
            >
              {/* Aorta Arch */}
              <path d="M 278,226 C 278,205 292,205 294,220" stroke="#EF4444" strokeWidth="5" fill="none" strokeLinecap="round" />
              {/* Muscle mass */}
              <path
                d="
                  M 272,225
                  C 264,222 262,235 266,248
                  C 270,262 284,275 288,276
                  C 294,272 304,255 302,240
                  C 300,225 288,222 280,226
                  C 276,224 274,224 272,225
                  Z
                "
                fill="url(#holoHeartGrad)"
                stroke={selectedOrganId === 'heart' || hoveredOrganId === 'heart' ? '#38BDF8' : '#881337'}
                strokeWidth={selectedOrganId === 'heart' ? 3 : 1.5}
              />
              {/* Coronary network */}
              <path d="M 278,230 Q 284,242 278,255 Q 282,265 286,274" stroke="#FCA5A5" strokeWidth="1" fill="none" />
            </g>

            {/* LIVER (Right Abdomen) */}
            <g
              id="holo-liver"
              onClick={() => handleOrganClick('liver')}
              onMouseEnter={() => onHoverOrgan('liver')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'liver' || hoveredOrganId === 'liver' ? 'url(#visceralGlow)' : undefined}
            >
              <path
                d="
                  M 235,285
                  C 230,295 232,325 240,332
                  C 255,340 275,325 295,315
                  C 310,305 315,295 305,285
                  C 290,280 250,278 235,285
                  Z
                "
                fill="url(#holoLiverGrad)"
                stroke={selectedOrganId === 'liver' || hoveredOrganId === 'liver' ? '#38BDF8' : '#78350F'}
                strokeWidth={selectedOrganId === 'liver' ? 3 : 1.5}
              />
              {/* Gallbladder */}
              <ellipse cx="258" cy="334" rx="5" ry="3.5" fill="#047857" stroke="#34D399" strokeWidth="1" />
            </g>

            {/* STOMACH (Left Abdomen) */}
            <g
              id="holo-stomach"
              onClick={() => handleOrganClick('stomach')}
              onMouseEnter={() => onHoverOrgan('stomach')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'stomach' || hoveredOrganId === 'stomach' ? 'url(#visceralGlow)' : undefined}
            >
              <path
                d="
                  M 288,288
                  C 305,285 325,295 324,315
                  C 322,335 305,348 290,344
                  C 278,340 274,330 278,322
                  C 282,315 292,316 295,310
                  C 298,300 290,292 288,288
                  Z
                "
                fill="url(#holoStomachGrad)"
                stroke={selectedOrganId === 'stomach' || hoveredOrganId === 'stomach' ? '#38BDF8' : '#9F1239'}
                strokeWidth={selectedOrganId === 'stomach' ? 3 : 1.5}
              />
            </g>

            {/* KIDNEYS (Posterior Abdomen) */}
            <g
              id="holo-kidneys"
              onClick={() => handleOrganClick('kidneys')}
              onMouseEnter={() => onHoverOrgan('kidneys')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'kidneys' || hoveredOrganId === 'kidneys' ? 'url(#visceralGlow)' : undefined}
            >
              {/* Right Kidney */}
              <path
                d="M 252,345 C 244,342 238,352 238,365 C 238,378 244,388 252,385 C 258,382 258,372 254,365 C 258,358 258,348 252,345 Z"
                fill="url(#holoKidneyGrad)"
                stroke={selectedOrganId === 'kidneys' || hoveredOrganId === 'kidneys' ? '#38BDF8' : '#4C0519'}
                strokeWidth={selectedOrganId === 'kidneys' ? 2.5 : 1.5}
              />
              {/* Left Kidney */}
              <path
                d="M 308,340 C 316,337 322,347 322,360 C 322,373 316,383 308,380 C 302,377 302,367 306,360 C 302,353 302,343 308,340 Z"
                fill="url(#holoKidneyGrad)"
                stroke={selectedOrganId === 'kidneys' || hoveredOrganId === 'kidneys' ? '#38BDF8' : '#4C0519'}
                strokeWidth={selectedOrganId === 'kidneys' ? 2.5 : 1.5}
              />
              {/* Ureters */}
              <path d="M 250,375 Q 260,430 274,470" stroke="#F59E0B" strokeWidth="1.8" fill="none" strokeDasharray="3 1" />
              <path d="M 310,370 Q 300,430 286,470" stroke="#F59E0B" strokeWidth="1.8" fill="none" strokeDasharray="3 1" />
              {/* Bladder */}
              <path d="M 272,468 C 264,472 266,488 280,490 C 294,488 296,472 288,468 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.2" />
            </g>

            {/* INTESTINES (Abdomen & Pelvis) */}
            <g
              id="holo-intestines"
              onClick={() => handleOrganClick('intestine')}
              onMouseEnter={() => onHoverOrgan('intestine')}
              onMouseLeave={() => onHoverOrgan(null)}
              className="cursor-pointer transition-all duration-300"
              filter={selectedOrganId === 'intestine' || hoveredOrganId === 'intestine' ? 'url(#visceralGlow)' : undefined}
            >
              {/* Colon Arch */}
              <path
                d="M 244,435 L 244,360 Q 280,366 316,360 L 316,450"
                stroke="url(#holoIntestineGrad)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Small Intestine Coils */}
              <path
                d="
                  M 260,380
                  C 255,395 275,395 280,388
                  C 290,382 300,395 295,410
                  C 288,425 268,418 262,428
                  C 255,438 275,448 285,442
                  C 295,436 302,445 295,455
                "
                stroke="#FDA4AF"
                strokeWidth="7"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </svg>
        )}

        {/* Quick Camera Reset floating pill when zoomed */}
        {cameraView !== 'full' && (
          <button
            type="button"
            onClick={() => handleCameraChange('full')}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-slate-900/95 hover:bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium shadow-xl flex items-center gap-1.5 transition-all z-30"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        )}
      </div>

      {/* Interactive Quick Organ Bar for One-Touch Exploration */}
      <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {(['brain', 'lungs', 'heart', 'liver', 'stomach', 'intestine', 'kidneys'] as OrganId[]).map(id => {
          const organ = ORGANS[id];
          const isSelected = selectedOrganId === id;
          const isHovered = hoveredOrganId === id;
          return (
            <button
              key={id}
              id={`poster-card-${id}`}
              type="button"
              onClick={() => handleOrganClick(id)}
              onMouseEnter={() => onHoverOrgan(id)}
              onMouseLeave={() => onHoverOrgan(null)}
              className={`p-2.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                  : isHovered
                  ? 'bg-slate-800 border-slate-600'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-base">{organ.emoji}</span>
                <span className="text-[10px] font-mono text-cyan-400/80 font-bold uppercase">{organ.name}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium mt-1 line-clamp-1">
                {organ.tagline}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};