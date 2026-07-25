import React from 'react';
import { AlertCircle, RefreshCw, LifeBuoy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  message: string;
  onRetry: () => void;
}

export const CandidateOffersErrorState: React.FC<Props> = ({ message, onRetry }) => {
  return (
    <div className="max-w-md mx-auto my-12 p-8 bg-white border border-red-200 rounded-2xl shadow-xs text-center space-y-4 text-left">
      <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-red-600">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-base font-extrabold text-[#00122B]">We Could Not Load Your Offers</h3>
        <p className="text-xs text-slate-500">{message}</p>
      </div>

      <div className="pt-2 flex justify-center gap-2">
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
        <Link
          to="/candidate/support"
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>Contact Support</span>
        </Link>
      </div>
    </div>
  );
};
