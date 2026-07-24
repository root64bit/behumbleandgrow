import React from 'react';
import { Player } from '@remotion/player';
import { JourneyComposition } from './RemotionJourneyVideo';
import { Play, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

export default function PlatformJourneyPreview() {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider uppercase text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-full border border-emerald-800/50">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Interactive Journey Visualisation
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See your entire recruitment journey in one place
          </h2>

          <p className="text-base text-slate-300 font-normal leading-relaxed">
            Experience real-time transparency at every stage of your candidate pipeline—from initial eligibility check to final offer.
          </p>
        </div>

        {/* Remotion Player Interactive Frame */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950 p-2 sm:p-4">
          
          <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full border border-slate-800/80 relative">
            <Player
              component={JourneyComposition}
              durationInFrames={300}
              compositionWidth={1280}
              compositionHeight={720}
              fps={30}
              controls
              autoPlay
              loop
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>

          <div className="mt-4 px-4 py-3 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Interactive Remotion Pipeline Simulation</span>
            </div>
            <div className="flex items-center gap-3 font-medium">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Live Status Updates
              </span>
              <span className="text-slate-600">•</span>
              <span>Employer Decision Points Highlighted</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
