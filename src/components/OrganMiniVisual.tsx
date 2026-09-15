import React, { useState, useEffect } from 'react';
import { OrganId } from '../types';
import { Play, Pause, Activity, Wind, Zap, Droplets, Flame, RefreshCw } from 'lucide-react';
import { playHeartbeatSound } from '../utils/audio';

interface OrganMiniVisualProps {
  organId: OrganId;
  systemColor: string;
}

export const OrganMiniVisual: React.FC<OrganMiniVisualProps> = ({ organId, systemColor }) => {
  // Heart specific states
  const [bpm, setBpm] = useState<number>(75);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);

  // Lungs specific states
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');

  // Brain specific states
  const [brainWaveFreq, setBrainWaveFreq] = useState<'alpha' | 'beta' | 'theta'>('alpha');

  // Stomach specific states
  const [stomachPH, setStomachPH] = useState<number>(1.8);

  // Periodic effects for Heart
  useEffect(() => {
    if (organId !== 'heart') return;
    const intervalTime = (60 / bpm) * 1000;
    const interval = setInterval(() => {
      if (isPlayingSound) {
        playHeartbeatSound();
      }
    }, intervalTime);
    return () => clearInterval(interval);
  }, [organId, bpm, isPlayingSound]);

  // Periodic breathing cycle
  useEffect(() => {
    if (organId !== 'lungs') return;
    const interval = setInterval(() => {
      setBreathPhase(prev => (prev === 'inhale' ? 'exhale' : 'inhale'));
    }, 3200);
    return () => clearInterval(interval);
  }, [organId]);

  // Render visual depending on organId
  switch (organId) {
    case 'heart':
      return (
        <div id="heart-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-rose-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              Live Cardiac Cycle & ECG
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                {bpm} BPM
              </span>
              <button
                id="toggle-heart-audio-btn"
                type="button"
                onClick={() => setIsPlayingSound(!isPlayingSound)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                  isPlayingSound
                    ? 'bg-rose-500/20 text-rose-300 border-rose-400/40'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
                title="Toggle audio pulse sound"
              >
                {isPlayingSound ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                {isPlayingSound ? 'Sound On' : 'Play Beat'}
              </button>
            </div>
          </div>

          {/* Heart Graphic with Animated Pulse & Valve chambers */}
          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 to-rose-950/30 border border-rose-500/20 flex items-center justify-center overflow-hidden">
            {/* Background ECG Waveform */}
            <svg className="absolute inset-0 w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 300 80">
              <path
                d="M0,40 L60,40 L70,35 L80,45 L90,40 L100,40 L105,10 L115,70 L125,30 L135,40 L150,40 L160,40 L170,35 L180,45 L190,40 L200,40 L205,10 L215,70 L225,30 L235,40 L300,40"
                fill="none"
                stroke="#F43F5E"
                strokeWidth="2"
                strokeDasharray="400"
                strokeDashoffset="0"
                className="animate-[dash_2.4s_linear_infinite]"
              />
            </svg>

            {/* Pulsing Anatomical Heart SVG */}
            <div
              className="relative z-10 transition-transform"
              style={{
                animation: `heartbeat ${60 / bpm}s ease-in-out infinite`,
                transformOrigin: 'center center'
              }}
            >
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                <defs>
                  <radialGradient id="heartGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FB7185" />
                    <stop offset="60%" stopColor="#E11D48" />
                    <stop offset="100%" stopColor="#881337" />
                  </radialGradient>
                  <filter id="heartGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#F43F5E" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Aorta Arch */}
                <path d="M42 36 C42 16, 64 16, 64 36" stroke="#93C5FD" strokeWidth="6" strokeLinecap="round" />
                <path d="M48 20 L48 10" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
                <path d="M55 20 L55 12" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
                <path d="M60 22 L62 14" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />

                {/* Vena Cava */}
                <path d="M32 24 L32 44" stroke="#60A5FA" strokeWidth="5" strokeLinecap="round" />

                {/* Ventricles Muscle Base */}
                <path
                  d="M50 88 C32 76, 22 60, 22 44 C22 32, 34 26, 44 34 L50 40 L56 34 C66 26, 78 32, 78 44 C78 60, 68 76, 50 88 Z"
                  fill="url(#heartGrad)"
                  filter="url(#heartGlow)"
                />

                {/* Left and right ventricle separation line */}
                <path d="M50 42 Q49 62 46 80" stroke="#4C0519" strokeWidth="2" strokeDasharray="3 2" />

                {/* Coronary arteries */}
                <path d="M44 48 Q42 58 35 66" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M52 50 Q56 62 62 70" stroke="#FDA4AF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Systole / Diastole indicator */}
            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-rose-400/80 bg-slate-950/70 px-2 py-0.5 rounded border border-rose-500/20">
              Systole / Diastole Loop
            </div>
          </div>

          {/* BPM Slider control */}
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Resting (60)</span>
              <span>Rate: {bpm} BPM</span>
              <span>Exercise (120)</span>
            </div>
            <input
              id="bpm-slider"
              type="range"
              min="55"
              max="130"
              value={bpm}
              onChange={e => setBpm(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>
        </div>
      );

    case 'lungs':
      return (
        <div id="lungs-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-cyan-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              Respiratory Ventilation Cycle
            </span>
            <span className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded uppercase transition-all ${
              breathPhase === 'inhale'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {breathPhase === 'inhale' ? 'Inhalation (O₂ In)' : 'Exhalation (CO₂ Out)'}
            </span>
          </div>

          {/* Animated Lungs SVG with breathing bellows */}
          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 to-cyan-950/30 border border-cyan-500/20 flex items-center justify-center overflow-hidden">
            {/* Air flow particle ripples */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${breathPhase === 'inhale' ? 'opacity-40' : 'opacity-10'}`}>
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent" />
            </div>

            <div
              className="relative z-10 transition-transform duration-1000 ease-in-out"
              style={{
                transform: breathPhase === 'inhale' ? 'scale(1.14)' : 'scale(0.92)',
                transformOrigin: 'center center'
              }}
            >
              <svg width="120" height="90" viewBox="0 0 140 100" fill="none">
                <defs>
                  <linearGradient id="lungGradL" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#0891B2" />
                  </linearGradient>
                  <linearGradient id="lungGradR" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#0284C7" />
                  </linearGradient>
                </defs>

                {/* Trachea with cartilaginous rings */}
                <rect x="66" y="8" width="8" height="24" rx="3" fill="#64748B" />
                <line x1="66" y1="14" x2="74" y2="14" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="66" y1="20" x2="74" y2="20" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="66" y1="26" x2="74" y2="26" stroke="#94A3B8" strokeWidth="1.5" />

                {/* Bronchi bifurcation */}
                <path d="M68 32 Q56 42 46 48" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M72 32 Q84 42 94 48" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />

                {/* Right Lung (3 lobes, on left side of diagram) */}
                <path
                  d="M48 38 C32 40, 18 52, 18 72 C18 88, 30 94, 52 92 C58 91, 62 82, 60 68 C58 54, 56 42, 48 38 Z"
                  fill="url(#lungGradR)"
                  opacity="0.9"
                />
                {/* Right lung fissures */}
                <path d="M22 66 Q38 64 58 70" stroke="#0F172A" strokeWidth="1.5" opacity="0.4" />
                <path d="M34 54 Q48 58 58 52" stroke="#0F172A" strokeWidth="1.5" opacity="0.4" />

                {/* Left Lung (2 lobes with cardiac notch, on right side of diagram) */}
                <path
                  d="M92 38 C108 40, 122 52, 122 72 C122 88, 110 94, 88 92 C82 91, 80 78, 80 66 C80 58, 84 46, 92 38 Z"
                  fill="url(#lungGradL)"
                  opacity="0.9"
                />
                {/* Left lung oblique fissure */}
                <path d="M118 64 Q100 68 82 76" stroke="#0F172A" strokeWidth="1.5" opacity="0.4" />
              </svg>
            </div>

            {/* Inhale/Exhale status pill */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-cyan-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-cyan-500/20">
              SpO₂: 99% | Tidal Vol: 500 mL
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Alveolar Surface</span>
              <span className="text-cyan-300 font-bold">~70 m² total</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Diffusion Speed</span>
              <span className="text-cyan-300 font-bold">&lt;0.25 seconds</span>
            </div>
          </div>
        </div>
      );

    case 'brain':
      return (
        <div id="brain-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-sky-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-sky-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              Neural Synaptic Impulses
            </span>
            <div className="flex gap-1">
              {(['alpha', 'beta', 'theta'] as const).map(w => (
                <button
                  key={w}
                  onClick={() => setBrainWaveFreq(w)}
                  className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase transition-colors ${
                    brainWaveFreq === w
                      ? 'bg-sky-500/30 text-sky-200 border border-sky-400/50'
                      : 'bg-slate-800 text-slate-400 border border-transparent hover:text-slate-200'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Synaptic nodes & neural transmission canvas */}
          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 to-sky-950/30 border border-sky-500/20 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 260 100">
              {/* Neural dendrites network */}
              <g stroke="#0369A1" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                <line x1="30" y1="50" x2="70" y2="35" />
                <line x1="70" y1="35" x2="130" y2="50" />
                <line x1="130" y1="50" x2="180" y2="30" />
                <line x1="180" y1="30" x2="230" y2="55" />
                <line x1="70" y1="35" x2="85" y2="80" />
                <line x1="85" y1="80" x2="140" y2="75" />
                <line x1="140" y1="75" x2="180" y2="30" />
                <line x1="140" y1="75" x2="210" y2="85" />
              </g>

              {/* Firing action potentials (pulsing sparks) */}
              <circle cx="70" cy="35" r="4" fill="#38BDF8" className="animate-ping" />
              <circle cx="130" cy="50" r="5" fill="#38BDF8">
                <animate attributeName="r" values="3;6;3" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="180" cy="30" r="4.5" fill="#7DD3FC" className="animate-pulse" />
              <circle cx="85" cy="80" r="3.5" fill="#38BDF8" />
              <circle cx="140" cy="75" r="5" fill="#0284C7" />
              <circle cx="210" cy="85" r="4" fill="#38BDF8" />
              <circle cx="30" cy="50" r="4" fill="#0EA5E9" />
              <circle cx="230" cy="55" r="4.5" fill="#38BDF8" />

              {/* Synaptic gap impulse spark */}
              <path
                d="M130 50 L145 42 L165 48 L180 30"
                stroke="#E0F2FE"
                strokeWidth="2"
                strokeDasharray="4 3"
                className="animate-[pulse_0.8s_ease-in-out_infinite]"
              />
            </svg>

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-sky-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-sky-500/20">
              Conduction: ~120 m/s (268 mph)
            </div>
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono">
            <span>Primary Regions:</span>
            <span className="text-sky-300 font-sans">Cerebrum • Cerebellum • Brainstem</span>
          </div>
        </div>
      );

    case 'kidneys':
      return (
        <div id="kidneys-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-emerald-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              Nephron Micro-Filtration
            </span>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
              180 L / 24h
            </span>
          </div>

          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 to-emerald-950/30 border border-emerald-500/20 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 240 100">
              {/* Renal Artery entering (red) */}
              <path d="M20 30 Q70 30 100 45" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" fill="none" />
              {/* Renal Vein exiting (blue) */}
              <path d="M20 70 Q70 70 100 55" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />

              {/* Glomerulus filter chamber */}
              <circle cx="120" cy="50" r="28" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
              <circle cx="120" cy="50" r="20" fill="#047857" opacity="0.6" />

              {/* Capillary tuft coil inside */}
              <path
                d="M108 45 Q114 36 122 45 Q130 54 132 45 Q126 62 116 56"
                stroke="#FDA4AF"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Filtered urine collection tube down */}
              <path d="M120 78 L120 95" stroke="#FCD34D" strokeWidth="3" strokeDasharray="4 2" strokeLinecap="round" />

              {/* Droplet animation */}
              <circle cx="120" cy="90" r="3" fill="#FBBF24" className="animate-bounce" />

              {/* Labels */}
              <text x="25" y="24" fill="#FDA4AF" fontSize="9" fontFamily="monospace">Renal Artery (In)</text>
              <text x="25" y="86" fill="#7DD3FC" fontSize="9" fontFamily="monospace">Renal Vein (Out)</text>
              <text x="140" y="93" fill="#FDE68A" fontSize="9" fontFamily="monospace">Ureter (Waste)</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Reabsorption</span>
              <span className="text-emerald-300 font-bold">99.0% reclaimed</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Urine Output</span>
              <span className="text-amber-300 font-bold">~1.5 L daily</span>
            </div>
          </div>
        </div>
      );

    case 'stomach':
      return (
        <div id="stomach-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-amber-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Gastric Peristalsis & Acid Motility
            </span>
            <span className="text-[11px] font-mono text-amber-300 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-500/30">
              pH: {stomachPH.toFixed(1)}
            </span>
          </div>

          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 to-amber-950/30 border border-amber-500/20 flex items-center justify-center overflow-hidden">
            {/* Animated stomach silhouette with acid pool */}
            <svg width="140" height="90" viewBox="0 0 140 90">
              <defs>
                <linearGradient id="acidGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Stomach outline J-shape */}
              <path
                d="M45 10 C45 25, 40 35, 30 50 C20 65, 35 85, 65 85 C95 85, 115 75, 115 50 C115 35, 105 25, 90 25 C75 25, 65 35, 55 35"
                fill="#78350F"
                stroke="#F59E0B"
                strokeWidth="2.5"
                opacity="0.85"
              />

              {/* Acid Level with wave animation */}
              <path
                d="M30 55 Q50 50 75 56 Q100 52 112 50 C115 65, 100 80, 65 82 C38 82, 26 70, 30 55 Z"
                fill="url(#acidGrad)"
              >
                <animate
                  attributeName="d"
                  dur="3s"
                  repeatCount="indefinite"
                  values="
                    M30 55 Q50 50 75 56 Q100 52 112 50 C115 65, 100 80, 65 82 C38 82, 26 70, 30 55 Z;
                    M30 53 Q50 58 75 52 Q100 56 112 52 C115 65, 100 80, 65 82 C38 82, 26 70, 30 53 Z;
                    M30 55 Q50 50 75 56 Q100 52 112 50 C115 65, 100 80, 65 82 C38 82, 26 70, 30 55 Z
                  "
                />
              </path>

              {/* Floating enzymes / food chyme breakdown bubbles */}
              <circle cx="55" cy="65" r="3" fill="#FDE68A" opacity="0.8">
                <animate attributeName="cy" values="70;60;70" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="75" cy="68" r="2.5" fill="#FDE68A" opacity="0.8">
                <animate attributeName="cy" values="72;62;72" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="90" cy="62" r="3.5" fill="#FDE68A" opacity="0.8">
                <animate attributeName="cy" values="66;58;66" dur="1.8s" repeatCount="indefinite" />
              </circle>
            </svg>

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-amber-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-amber-500/20">
              Pepsin + HCl Churning
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>Acidic (1.5 pH)</span>
              <span>Digestion Acidity</span>
              <span>Neutral (3.5 pH)</span>
            </div>
            <input
              id="stomach-ph-slider"
              type="range"
              min="1.5"
              max="3.5"
              step="0.1"
              value={stomachPH}
              onChange={e => setStomachPH(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>
      );

    case 'liver':
      return (
        <div id="liver-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-amber-600/30 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-amber-400 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              Hepatic Sinusoids & Detoxification
            </span>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/30">
              1.4 L/min Cleared
            </span>
          </div>

          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 via-amber-950/20 to-slate-950 border border-amber-600/20 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 260 90">
              {/* Hepatic lobule architecture */}
              <defs>
                <linearGradient id="liverTissueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#78350F" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>
              </defs>

              {/* Portal Triad Vessels */}
              <line x1="20" y1="25" x2="130" y2="45" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
              <line x1="20" y1="65" x2="130" y2="45" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
              <line x1="130" y1="45" x2="240" y2="45" stroke="#10B981" strokeWidth="3.5" strokeDasharray="5 3" strokeLinecap="round" />

              {/* Central Vein Core */}
              <circle cx="130" cy="45" r="16" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
              <circle cx="130" cy="45" r="8" fill="#3B82F6" opacity="0.6" className="animate-ping" style={{ animationDuration: '3s' }} />

              {/* Hepatocyte plates */}
              {[
                { cx: 70, cy: 22, r: 6 },
                { cx: 90, cy: 20, r: 6 },
                { cx: 170, cy: 22, r: 6 },
                { cx: 190, cy: 25, r: 6 },
                { cx: 70, cy: 68, r: 6 },
                { cx: 90, cy: 70, r: 6 },
                { cx: 170, cy: 68, r: 6 },
                { cx: 190, cy: 65, r: 6 },
              ].map((cell, idx) => (
                <circle key={idx} cx={cell.cx} cy={cell.cy} r={cell.r} fill="#92400E" stroke="#B45309" strokeWidth="1" />
              ))}

              {/* Gallbladder storage preview */}
              <ellipse cx="230" cy="24" rx="14" ry="9" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
              <text x="230" y="27" fill="#A7F3D0" fontSize="7" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">Bile</text>

              {/* Fluid labels */}
              <text x="24" y="20" fill="#93C5FD" fontSize="8" fontFamily="monospace">Portal Vein (In)</text>
              <text x="24" y="80" fill="#FCA5A5" fontSize="8" fontFamily="monospace">Hepatic Artery (In)</text>
              <text x="130" y="75" fill="#6EE7B7" fontSize="8" fontFamily="monospace" textAnchor="middle">Detoxified Flow ➔</text>
            </svg>

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-amber-300/90 bg-slate-950/80 px-2 py-0.5 rounded border border-amber-500/20">
              500+ Biochemical Pathways
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Detoxification</span>
              <span className="text-emerald-300 font-bold">100% continuous</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Bile Synthesis</span>
              <span className="text-amber-300 font-bold">~1,000 mL daily</span>
            </div>
          </div>
        </div>
      );

    case 'intestine':
      return (
        <div id="intestine-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-rose-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-400 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-400" />
              Intestinal Villi & Peristalsis Wave
            </span>
            <span className="text-[11px] font-mono text-rose-300 bg-rose-950/70 px-2 py-0.5 rounded border border-rose-500/30">
              32 m² Absorption Area
            </span>
          </div>

          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 via-rose-950/20 to-slate-950 border border-rose-500/20 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 260 90">
              {/* Intestinal lumen wave */}
              <defs>
                <linearGradient id="villiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="100%" stopColor="#9F1239" />
                </linearGradient>
              </defs>

              {/* Upper villi wall */}
              <path
                d="M10 25 Q20 5 30 25 Q40 5 50 25 Q60 5 70 25 Q80 5 90 25 Q100 5 110 25 Q120 5 130 25 Q140 5 150 25 Q160 5 170 25 Q180 5 190 25 Q200 5 210 25 Q220 5 230 25 Q240 5 250 25"
                stroke="#FB7185"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Lower villi wall */}
              <path
                d="M10 65 Q20 85 30 65 Q40 85 50 65 Q60 85 70 65 Q80 85 90 65 Q100 85 110 65 Q120 85 130 65 Q140 85 150 65 Q160 85 170 65 Q180 85 190 65 Q200 85 210 65 Q220 85 230 65 Q240 85 250 65"
                stroke="#FB7185"
                strokeWidth="2.5"
                fill="none"
              />

              {/* Chyme bolus advancing through lumen */}
              <ellipse cx="70" cy="45" rx="18" ry="10" fill="#F59E0B" opacity="0.8">
                <animate attributeName="cx" values="30;230" dur="4s" repeatCount="indefinite" />
              </ellipse>

              {/* Micro-nutrient absorption particles entering villi */}
              <circle cx="100" cy="36" r="2.5" fill="#38BDF8">
                <animate attributeName="cy" values="45;20" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="140" cy="54" r="2.5" fill="#34D399">
                <animate attributeName="cy" values="45;70" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="180" cy="36" r="2.5" fill="#FDE047">
                <animate attributeName="cy" values="45;20" dur="1.8s" repeatCount="indefinite" />
              </circle>

              <text x="20" y="48" fill="#FCD34D" fontSize="8" fontFamily="monospace">Peristaltic Lumen Wave ➔</text>
            </svg>

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-rose-300/90 bg-slate-950/80 px-2 py-0.5 rounded border border-rose-500/20">
              Villi Nutrient Uptake
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Small Intestine</span>
              <span className="text-rose-300 font-bold">~6 meters long</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Large Colon</span>
              <span className="text-amber-300 font-bold">~1.5 meters long</span>
            </div>
          </div>
        </div>
      );

    case 'blood':
      return (
        <div id="blood-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-red-500/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-red-400 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-red-400 animate-spin" />
              Microscopic Hemodynamics
            </span>
            <span className="text-[11px] font-mono text-red-300 bg-red-950/70 px-2 py-0.5 rounded border border-red-500/30">
              5.0 Liters Total
            </span>
          </div>

          {/* Blood capillary with flowing biconcave red blood cells */}
          <div className="relative h-32 w-full rounded-xl bg-gradient-to-r from-red-950/40 via-slate-950 to-blue-950/40 border border-red-500/20 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 260 90">
              {/* Vessel walls */}
              <line x1="0" y1="18" x2="260" y2="18" stroke="#991B1B" strokeWidth="4" strokeDasharray="10 4" />
              <line x1="0" y1="72" x2="260" y2="72" stroke="#991B1B" strokeWidth="4" strokeDasharray="10 4" />

              {/* Endothelial layer glow */}
              <rect x="0" y="20" width="260" height="50" fill="#450A0A" opacity="0.3" />

              {/* Flowing Erythrocytes (RBCs) */}
              {[
                { x: 30, y: 35, r: 10, fill: '#EF4444' },
                { x: 80, y: 55, r: 11, fill: '#DC2626' },
                { x: 130, y: 38, r: 10, fill: '#EF4444' },
                { x: 180, y: 52, r: 11, fill: '#DC2626' },
                { x: 230, y: 40, r: 9, fill: '#EF4444' },
              ].map((cell, idx) => (
                <g key={idx} className="animate-pulse">
                  <ellipse cx={cell.x} cy={cell.y} rx={cell.r} ry={cell.r * 0.75} fill={cell.fill} />
                  <ellipse cx={cell.x} cy={cell.y} rx={cell.r * 0.4} ry={cell.r * 0.3} fill="#7F1D1D" />
                </g>
              ))}

              {/* White blood cell (Leukocyte) */}
              <circle cx="110" cy="46" r="13" fill="#F8FAFC" opacity="0.9" stroke="#94A3B8" strokeWidth="1.5" />
              <circle cx="107" cy="44" r="3" fill="#94A3B8" />
              <circle cx="114" cy="48" r="4" fill="#94A3B8" />

              {/* Platelets */}
              <polygon points="155,30 160,33 158,38 153,35" fill="#FDE68A" />
              <polygon points="205,62 210,65 208,70 203,67" fill="#FDE68A" />
            </svg>

            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-red-300/80 bg-slate-950/70 px-2 py-0.5 rounded border border-red-500/20">
              Arterial (O₂) ➔ Capillary ➔ Venous (CO₂)
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-center">
            <div className="p-1.5 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block">Erythrocytes</span>
              <span className="text-red-400 font-bold">~5M / µL</span>
            </div>
            <div className="p-1.5 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block">Leukocytes</span>
              <span className="text-slate-200 font-bold">~8K / µL</span>
            </div>
            <div className="p-1.5 rounded bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block">Platelets</span>
              <span className="text-amber-300 font-bold">~250K / µL</span>
            </div>
          </div>
        </div>
      );

    case 'skeleton':
      return (
        <div id="skeleton-interactive-visual" className="rounded-2xl bg-slate-900/90 border border-slate-400/20 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wider uppercase text-slate-200 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-300" />
              Trabecular Architecture & Bone Matrix
            </span>
            <span className="text-[11px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-600">
              206 Articulations
            </span>
          </div>

          {/* Bone cross-section & X-ray scan line */}
          <div className="relative h-32 w-full rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden">
            {/* Bone silhouette */}
            <svg width="200" height="70" viewBox="0 0 200 70">
              <defs>
                <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="50%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#E2E8F0" />
                </linearGradient>
              </defs>

              {/* Femur bone shape */}
              <path
                d="M20 22 C10 18, 10 32, 20 35 C10 38, 10 52, 20 48 L80 44 L140 44 L180 48 C190 52, 190 38, 180 35 C190 32, 190 18, 180 22 L140 26 L80 26 Z"
                fill="url(#boneGrad)"
                stroke="#94A3B8"
                strokeWidth="2"
              />

              {/* Haversian canals / porous trabecular matrix */}
              <circle cx="45" cy="35" r="3" fill="#64748B" opacity="0.6" />
              <circle cx="55" cy="32" r="2" fill="#64748B" opacity="0.6" />
              <circle cx="68" cy="37" r="2.5" fill="#64748B" opacity="0.6" />
              <circle cx="132" cy="34" r="2.5" fill="#64748B" opacity="0.6" />
              <circle cx="145" cy="36" r="3" fill="#64748B" opacity="0.6" />
              <circle cx="158" cy="33" r="2" fill="#64748B" opacity="0.6" />

              {/* Central medullary marrow cavity */}
              <line x1="75" y1="35" x2="125" y2="35" stroke="#F43F5E" strokeWidth="4" strokeLinecap="round" />
            </svg>

            {/* Scanning light ray */}
            <div className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[scan_2.8s_ease-in-out_infinite]" />

            <div className="absolute bottom-2 right-3 text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700">
              Cortical Bone + Medullary Marrow
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Axial Skeleton</span>
              <span className="text-slate-200 font-bold">80 central bones</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50">
              <span className="text-slate-400 block text-[10px]">Appendicular</span>
              <span className="text-slate-200 font-bold">126 limb bones</span>
            </div>
          </div>
        </div>
      );
  }
};
