import React, { useState, useEffect } from 'react';
import SuperAdminLayout from '../../layouts/SuperAdminLayout';
import ExecutiveKpiGrid from '../../components/superadmin/ExecutiveKpiGrid';
import ActionCentre from '../../components/superadmin/ActionCentre';
import ConversionFunnel from '../../components/superadmin/ConversionFunnel';
import RecruitmentPipelineOverview from '../../components/superadmin/RecruitmentPipelineOverview';
import PartnerPerformanceTable from '../../components/superadmin/PartnerPerformanceTable';
import EmployerActivityTable from '../../components/superadmin/EmployerActivityTable';
import FinanceOverview from '../../components/superadmin/FinanceOverview';
import PlatformHealthPanel from '../../components/superadmin/PlatformHealthPanel';
import AuditTrailPanel from '../../components/superadmin/AuditTrailPanel';

import { SuperAdminService } from '../../services/superadmin.service';
import { 
  ShieldCheck, 
  Download, 
  RefreshCw, 
  Layers, 
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export default function SuperAdminDashboardPage() {
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState('Just now');

  const metrics = SuperAdminService.getKpiMetrics();
  const actionItems = SuperAdminService.getActionCentreItems();
  const funnelStages = SuperAdminService.getConversionFunnel();
  const pipelineStages = SuperAdminService.getRecruitmentPipeline();
  const partners = SuperAdminService.getPartnerPerformance();
  const employers = SuperAdminService.getEmployerActivity();
  const finance = SuperAdminService.getFinancialSummary();
  const healthServices = SuperAdminService.getPlatformHealth();
  const auditLogs = SuperAdminService.getAuditLogs();

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastRefreshedAt(new Date().toLocaleTimeString());
    }, 600);
  };

  return (
    <SuperAdminLayout>
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-[#102A4C] via-[#0B2342] to-[#078A5B] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden text-left">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin Control Centre</span>
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
                onClick={() => alert("Exporting Super Admin Platform Executive Summary (PDF)...")}
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Platform Executive Overview
            </h1>
            <p className="text-sm text-slate-200 mt-1 max-w-3xl">
              Unified cross-border recruitment control dashboard monitoring candidate acquisition, agency partner SLA performance, UAE employer demand, multi-currency financial ledgers, and system health.
            </p>
          </div>
        </div>
      </div>

      {/* 1. Action Centre (High Priority Action Queues) */}
      <ActionCentre items={actionItems} />

      {/* 2. Executive KPI Grid */}
      <ExecutiveKpiGrid metrics={metrics} />

      {/* 3. Candidate Acquisition Funnel & Recruitment Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversionFunnel stages={funnelStages} />
        <RecruitmentPipelineOverview stages={pipelineStages} />
      </div>

      {/* 4. Partner Performance & Employer Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PartnerPerformanceTable partners={partners} />
        <EmployerActivityTable employers={employers} />
      </div>

      {/* 5. Financial Visibility Ledger */}
      <FinanceOverview finance={finance} />

      {/* 6. Platform Health & Security Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PlatformHealthPanel services={healthServices} />
        <AuditTrailPanel logs={auditLogs} />
      </div>
    </SuperAdminLayout>
  );
}
