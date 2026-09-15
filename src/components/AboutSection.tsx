import React from 'react';
import { ShieldAlert, BookOpen, HeartHandshake, Lightbulb, Compass, Heart } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="w-full py-12 md:py-16 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Educational Mission & Science</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            About Human Body Explorer
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Human Body Explorer is designed as a clean, accessible digital gateway to understanding human anatomy and physiological systems through interactive spatial exploration.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Visual Spatial Learning</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore organs in their true coronal context. Interactive highlighting and targeted zoom views bridge the gap between static textbook diagrams and dynamic anatomy.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-rose-950 border border-rose-500/40 text-rose-400 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Physiological Simulations</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Observe living biological rhythms: adjustable cardiac bpm pacing, respiratory lung tidal volume, glomerular kidney micro-filtration, and synaptic transmissions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-500/40 text-amber-400 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-display text-white">Systemic Connectivity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Learn how no organ operates in isolation. Understand how the nervous, circulatory, respiratory, digestive, and skeletal systems collaborate to sustain life.
            </p>
          </div>
        </div>

        {/* Mandatory Educational Disclaimer Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
              Educational Purpose Notice
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Human Body Explorer is an interactive educational resource intended solely for academic study, classroom illustration, and general biological curiosity. It does not provide medical advice, diagnosis, or clinical treatment recommendations. Always consult qualified healthcare professionals for medical inquiries.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>Human Body Explorer</span>
            <span>•</span>
            <span>Medical-Science Interactive Anatomy</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#hero-section" className="hover:text-cyan-400 transition-colors">Back to Top</a>
            <span>•</span>
            <span>Accurate Anatomical References</span>
          </div>
        </div>
      </div>
    </section>
  );
};
