import React from 'react';
import { History } from 'lucide-react';
import { CandidateOfferDecisionEvent } from '../../../services/candidate-offer-details.service';

interface Props {
  events: CandidateOfferDecisionEvent[];
}

export const CandidateOfferDecisionHistory: React.FC<Props> = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
          <History className="w-4 h-4" />
        </div>
        <h3 className="text-base font-extrabold text-[#00122B]">Offer Activity History</h3>
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start gap-3 text-xs">
            <div className="w-2 h-2 rounded-full bg-[#006D44] mt-1.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="font-bold text-slate-900">{ev.action}</p>
              {ev.notes && <p className="text-[11px] text-slate-600">{ev.notes}</p>}
              <p className="text-[10px] text-slate-400">
                {new Date(ev.created_at).toLocaleString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
