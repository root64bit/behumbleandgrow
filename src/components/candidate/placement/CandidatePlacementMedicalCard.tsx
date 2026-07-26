import React from 'react';
import { Stethoscope, CheckCircle2 } from 'lucide-react';
import { CandidatePlacement } from '../../../services/candidate-placement.service';

interface Props {
  placement: CandidatePlacement;
}

export const CandidatePlacementMedicalCard: React.FC<Props> = ({ placement }) => {
  const isCleared = placement.medicalStatus === 'completed' || placement.medicalStatus === 'completed_cleared';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-left">
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center space-x-2">
          <Stethoscope className="w-4 h-4 text-emerald-600" />
          <span>Medical Fitness & Biometrics</span>
        </h3>
        <span
          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
            isCleared
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          {isCleared ? 'Cleared' : placement.medicalStatus}
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center min-w-[64px]">
          <span className="block text-emerald-800 font-black text-lg">
            {placement.medicalAppointmentDate
              ? new Date(placement.medicalAppointmentDate).getDate()
              : '18'}
          </span>
          <span className="block text-slate-500 text-[10px] uppercase font-bold">
            {placement.medicalAppointmentDate
              ? new Date(placement.medicalAppointmentDate).toLocaleString('en-US', { month: 'short' })
              : 'Oct'}
          </span>
        </div>
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-slate-900">
            {placement.medicalClinicName || 'Global Health Clinic (Authorised Centre)'}
          </p>
          <p className="text-xs text-slate-600">
            {isCleared ? 'Medical Examination Completed & Verified' : 'Appointment Scheduled'}
          </p>
        </div>
      </div>

      <div className="p-3 bg-emerald-50/60 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 flex items-center space-x-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>Medical check process completed with required health authority clearance.</span>
      </div>
    </div>
  );
};
