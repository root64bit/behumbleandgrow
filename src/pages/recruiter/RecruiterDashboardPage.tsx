import React, { useState } from 'react';
import RecruitmentPartnerLayout from '../../layouts/RecruitmentPartnerLayout';
import PartnerStatusCard from '../../components/recruiter/PartnerStatusCard';
import PartnerKpiGrid from '../../components/recruiter/PartnerKpiGrid';
import PartnerActionCentre from '../../components/recruiter/PartnerActionCentre';
import NewLeadsList from '../../components/recruiter/NewLeadsList';
import RecruiterWorkloadOverview from '../../components/recruiter/RecruiterWorkloadOverview';
import EmployerSubmissionsWidget from '../../components/recruiter/EmployerSubmissionsWidget';
import UpcomingInterviewsWidget from '../../components/recruiter/UpcomingInterviewsWidget';
import PlacementTrackerWidget from '../../components/recruiter/PlacementTrackerWidget';
import PartnerPerformanceSla from '../../components/recruiter/PartnerPerformanceSla';

import { RecruiterService } from '../../services/recruiter.service';
import { ShieldCheck, Download, RefreshCw } from 'lucide-react';

export default function RecruiterDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState('Just now');

  const agency = RecruiterService.getOrganisationCard();
  const metrics = RecruiterService.getKpiMetrics();
  const actionItems = RecruiterService.getActionCentreItems();
  const leads = RecruiterService.getAssignedLeads();
  const recruiters = RecruiterService.getRecruiterWorkload();
  const submissions = RecruiterService.getEmployerSubmissions();
  const interviews = RecruiterService.getUpcomingInterviews();
  const placements = RecruiterService.getPlacementProgress();
  const performance = RecruiterService.getPerformanceSla();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshedAt(new Date().toLocaleTimeString());
    }, 600);
  };

  return (
    <RecruitmentPartnerLayout>
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-[#102A4C] via-[#0B2342] to-[#078A5B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authorized Recruitment Partner Portal</span>
              </span>
              <span className="text-xs text-slate-300">Last Refreshed: {lastRefreshedAt}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={handleRefresh}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all backdrop-blur-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button 
                onClick={() => alert("Exporting Agency Performance & Placements Summary Report (PDF)...")}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Agency Report</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Recruitment Partner Dashboard
            </h1>
            <p className="text-sm text-slate-200 mt-1 max-w-3xl">
              Welcome back to <strong className="text-white">{agency.agencyName}</strong>. Manage assigned candidate leads, internal recruiter workloads, employer submissions, video interviews, and mobility placement progress.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Agency Status Card */}
      <PartnerStatusCard agency={agency} />

      {/* 2. Priority Action Centre */}
      <PartnerActionCentre items={actionItems} />

      {/* 3. Agency KPI Grid */}
      <PartnerKpiGrid metrics={metrics} />

      {/* 4. New Assigned Candidate Leads (Accept/Decline Workflows) */}
      <NewLeadsList leads={leads} />

      {/* 5. Team Workload Overview */}
      <RecruiterWorkloadOverview recruiters={recruiters} />

      {/* 6. Submissions & Video Interviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EmployerSubmissionsWidget submissions={submissions} />
        <UpcomingInterviewsWidget interviews={interviews} />
      </div>

      {/* 7. Mobility Placement Tracker & SLA Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlacementTrackerWidget placements={placements} />
        <PartnerPerformanceSla performance={performance} />
      </div>
    </RecruitmentPartnerLayout>
  );
}
