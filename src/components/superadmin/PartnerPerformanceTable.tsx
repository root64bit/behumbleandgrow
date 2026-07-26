import React from 'react';
import { PartnerPerformanceRecord } from '../../types/superadmin';
import { Building2, ShieldCheck, AlertTriangle, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PartnerPerformanceTableProps {
  partners: PartnerPerformanceRecord[];
}

export default function PartnerPerformanceTable({ partners }: PartnerPerformanceTableProps) {
  const getSlaBadge = (status: string) => {
    switch (status) {
      case 'performing':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'monitor':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'action_required':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Recruitment Partner Performance</h2>
          <p className="text-xs text-slate-500">Monitoring authorized regional agency response times, SLA adherence, and placement conversions.</p>
        </div>
        <Link 
          to="/superadmin/organisations"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View All Partners</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Desktop Data Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Partner Agency</th>
              <th className="py-3 px-3">Country</th>
              <th className="py-3 px-3">Active Leads</th>
              <th className="py-3 px-3">Accepted</th>
              <th className="py-3 px-3">Interviews</th>
              <th className="py-3 px-3">Placements</th>
              <th className="py-3 px-3">Avg SLA Response</th>
              <th className="py-3 px-3">SLA Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{partner.agencyName}</span>
                </td>
                <td className="py-3 px-3 text-slate-600 font-medium">{partner.country}</td>
                <td className="py-3 px-3 font-bold text-slate-800">{partner.activeLeads}</td>
                <td className="py-3 px-3 text-slate-600">{partner.acceptedLeads}</td>
                <td className="py-3 px-3 text-slate-600">{partner.interviewsCount}</td>
                <td className="py-3 px-3 font-extrabold text-emerald-700">{partner.placementsCount}</td>
                <td className="py-3 px-3 text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{partner.averageResponseTimeHours} hrs</span>
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${getSlaBadge(partner.slaStatus)}`}>
                    {partner.slaStatus.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <Link 
                    to={`/superadmin/organisations#${partner.id}`} 
                    className="text-xs font-bold text-slate-600 hover:text-emerald-700 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Record Cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {partners.map((partner) => (
          <div key={partner.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">{partner.agencyName}</h3>
                <p className="text-[11px] text-slate-500">{partner.country}</p>
              </div>
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getSlaBadge(partner.slaStatus)}`}>
                {partner.slaStatus.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block">Leads</span>
                <span className="font-bold text-slate-900">{partner.activeLeads}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Interviews</span>
                <span className="font-bold text-slate-900">{partner.interviewsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Placements</span>
                <span className="font-bold text-emerald-700">{partner.placementsCount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
