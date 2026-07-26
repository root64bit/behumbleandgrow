import React from 'react';
import { PartnerOrganisationCard } from '../../types/recruiter';
import { Building2, ShieldCheck, Users, Mail, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PartnerStatusCardProps {
  agency: PartnerOrganisationCard;
}

export default function PartnerStatusCard({ agency }: PartnerStatusCardProps) {
  const capacityPercent = Math.round((agency.activeLeads / agency.leadCapacity) * 100);

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-slate-900 text-white shrink-0">
            <Building2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-black text-slate-900">{agency.agencyName}</h2>
              <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Verified Partner</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ref: <span className="font-mono font-bold text-slate-700">{agency.partnerReference}</span> • Agreement: <span className="text-emerald-700 font-bold">{agency.agreementStatus}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-left md:text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Main Operations Contact</span>
            <p className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{agency.operationsContactName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Capacity & SLA Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Lead Allocation Capacity</span>
            <span className="font-bold text-slate-900">{agency.activeLeads} / {agency.leadCapacity}</span>
          </div>
          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 rounded-full transition-all"
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">{capacityPercent}% Capacity Used</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="text-slate-500 font-semibold block">Active Agency Recruiters</span>
            <span className="text-xl font-black text-slate-900">{agency.activeRecruiters} Active Staff</span>
          </div>
          <Users className="w-6 h-6 text-slate-400" />
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between">
          <div>
            <span className="text-emerald-800 font-semibold block">Current SLA Status</span>
            <span className="text-xl font-black text-emerald-900 uppercase">Performing Well</span>
          </div>
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
      </div>
    </div>
  );
}
