import React from 'react';
import { ActionCentreItem } from '../../types/superadmin';
import { AlertCircle, Clock, ArrowRight, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionCentreProps {
  items: ActionCentreItem[];
}

export default function ActionCentre({ items }: ActionCentreProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Action Centre</h2>
            <p className="text-xs text-slate-500">Items requiring senior administrative review, verification, or authorization.</p>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
          {items.length} Action Items Pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => (
          <div 
            key={item.id}
            className="p-4 rounded-2xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-sm transition-all space-y-3 bg-slate-50/40 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  {item.category}
                </span>
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getSeverityBadge(item.severity)}`}>
                  {item.severity}
                </span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                {item.title}
              </h3>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-slate-900">{item.count} items</span>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{item.oldestPendingAt}</span>
                </div>
              </div>

              <Link
                to={item.queueRoute}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-xl transition-colors"
              >
                <span>View Queue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
