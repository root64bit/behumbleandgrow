import React from 'react';
import { Building, Plane, Heart, CheckCircle2 } from 'lucide-react';

interface Props {
  benefits: string[];
}

export const CandidateOfferBenefitsSummary: React.FC<Props> = ({ benefits }) => {
  if (!benefits || benefits.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5 text-left">
      {benefits.map((b, idx) => {
        let Icon = CheckCircle2;
        let colorClass = 'bg-slate-50 border-slate-200 text-slate-700';

        if (b.toLowerCase().includes('accommodat') || b.toLowerCase().includes('hous')) {
          Icon = Building;
          colorClass = 'bg-blue-50 border-blue-200 text-blue-800';
        } else if (b.toLowerCase().includes('flight') || b.toLowerCase().includes('transport')) {
          Icon = Plane;
          colorClass = 'bg-purple-50 border-purple-200 text-purple-800';
        } else if (b.toLowerCase().includes('health') || b.toLowerCase().includes('medic')) {
          Icon = Heart;
          colorClass = 'bg-rose-50 border-rose-200 text-rose-800';
        }

        return (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-bold ${colorClass}`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span>{b}</span>
          </span>
        );
      })}
    </div>
  );
};
