import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CandidatePlacementSupportCard: React.FC = () => {
  return (
    <div className="bg-[#00122b] text-white p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left shadow-lg border border-slate-800">
      <div>
        <h4 className="text-lg font-bold text-white">Need Relocation Help?</h4>
        <p className="text-xs text-slate-300 mt-0.5">Chat with your assigned placement officer for assistance.</p>
      </div>
      <Link
        to="/candidate/support"
        className="inline-flex items-center justify-center space-x-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-full transition-transform active:scale-95 shadow-md w-fit shrink-0"
      >
        <MessageSquare className="w-4 h-4" />
        <span>Message Support</span>
      </Link>
    </div>
  );
};
