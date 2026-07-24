import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UsersRound, 
  ListChecks, 
  Smartphone 
} from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "Verified UAE Vacancies",
      desc: "All positions pre-screened"
    },
    {
      icon: Lock,
      title: "Secure Candidate Profiles",
      desc: "Protected document handling"
    },
    {
      icon: UsersRound,
      title: "Approved Partners",
      desc: "Licensed recruitment network"
    },
    {
      icon: ListChecks,
      title: "Transparent Tracking",
      desc: "Clear status at every stage"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Application",
      desc: "Apply seamlessly from anywhere"
    }
  ];

  return (
    <section className="bg-slate-900 text-white py-6 border-y border-slate-800">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center md:text-left">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-100">{item.title}</h4>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
