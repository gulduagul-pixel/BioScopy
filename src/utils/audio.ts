let audioCtx: AudioContext | null = null;
let isAudioMuted = true;

export function getAudioMuted(): boolean {
  return isAudioMuted;
}

export function setAudioMuted(muted: boolean): void {
  isAudioMuted = muted;
}

function initAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playHeartbeatSound(): void {
  if (isAudioMuted) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // First tone ("lub" - lower frequency, slightly longer)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(68, now);
    osc1.frequency.exponentialRampToValueAtTime(36, now + 0.14);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.14);

    // Second tone ("dub" - higher frequency, crisper)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const t2 = now + 0.16;
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(84, t2);
    osc2.frequency.exponentialRampToValueAtTime(42, t2 + 0.16);
    gain2.gain.setValueAtTime(0.24, t2);
    gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.16);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(t2);
    osc2.stop(t2 + 0.16);
  } catch (e) {
    // Ignore audio errors in restricted browser contexts
  }
}

export function playSynapseSound(): void {
  if (isAudioMuted) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  } catch (e) {
    // Ignore
  }
}

export function playSoftClick(): void {
  if (isAudioMuted) return;
  try {
    const ctx = initAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch (e) {
    // Ignore
  }
}
