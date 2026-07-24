import React from 'react';
import { 
  UserRoundCheck, 
  UserPlus, 
  FileUp, 
  Video, 
  LineChart, 
  ArrowRight 
} from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Check Your Eligibility",
      description: "Complete a preliminary assessment based on your experience, qualifications and relocation readiness.",
      icon: UserRoundCheck,
      badge: "Preliminary Step"
    },
    {
      number: "02",
      title: "Create Your Profile",
      description: "Build a professional candidate profile and add your work experience, education, skills and languages.",
      icon: UserPlus,
      badge: "Profile Setup"
    },
    {
      number: "03",
      title: "Upload & Verify Documents",
      description: "Securely upload your CV, passport and relevant certificates for verification review.",
      icon: FileUp,
      badge: "Verification"
    },
    {
      number: "04",
      title: "Apply & Interview",
      description: "Apply for suitable vacancies, complete screening questions and attend employer interviews.",
      icon: Video,
      badge: "Selection"
    },
    {
      number: "05",
      title: "Track Your Progress",
      description: "Follow every stage—from application review and conditional offer to work-permit and visa processing.",
      icon: LineChart,
      badge: "Final Processing"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold tracking-wider uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
            Structured Recruitment Process
          </span>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Your journey to a UAE opportunity
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            A clear, guided process designed to help qualified candidates prepare, apply and progress with confidence.
          </p>
        </div>

        {/* 5 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
              >
                {/* Connecting Line on Large Screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 w-6 h-[2px] bg-slate-200 z-10"></div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {step.badge}
                    </span>
                    <span className="text-2xl font-black text-slate-300 group-hover:text-emerald-600 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Step {index + 1} of 5</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Qualification Disclaimer Notice */}
        <div className="mt-12 max-w-2xl mx-auto text-center p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">Important Note:</span> Progress through each stage depends on candidate qualifications, document verification, and official employer selection. No placement or visa outcome is automatically guaranteed.
        </div>

      </div>
    </section>
  );
}
