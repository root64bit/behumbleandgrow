import React from 'react';
import { Sparkles, Quote, BadgeCheck } from 'lucide-react';

export default function CandidateStories() {
  const stories = [
    {
      name: "Amina M.",
      country: "Kenya",
      role: "Senior Hospitality Manager",
      statement: "The step-by-step document check and interview preparation gave me clarity throughout the entire process.",
      stage: "Stage 5: Conditional Offer Accepted",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "David K.",
      country: "Ghana",
      role: "Electrical Technician",
      statement: "Being able to track my application status in real-time removed the stress of waiting without updates.",
      stage: "Stage 4: Interview Completed",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Fatima B.",
      country: "Nigeria",
      role: "Customer Care Specialist",
      statement: "Transparent expectations from day one. I knew exactly which documents were needed at each phase.",
      stage: "Stage 5: Offer Received",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section className="py-20 bg-[#0B2342] text-white relative overflow-hidden">
      
      {/* Background Accent Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider uppercase text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-800/50">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Candidate Journey Experiences
          </span>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real stories from international candidates
          </h2>

          <p className="text-base text-slate-300 font-normal">
            Illustrating how candidate profiles progress through structured assessment and verification.
          </p>
        </div>

        {/* Stories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, idx) => (
            <div key={idx} className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/50 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <img src={story.image} alt={story.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/60" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{story.name}</h3>
                    <p className="text-xs text-slate-400">{story.role} · {story.country}</p>
                  </div>
                </div>

                <Quote className="w-6 h-6 text-emerald-500/40 mb-2" />
                <p className="text-xs text-slate-300 italic leading-relaxed mb-4">
                  "{story.statement}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {story.stage}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
