import React from 'react';
import { FinancialSummary } from '../../types/superadmin';
import { PoundSterling, ArrowUpRight, Receipt, ShieldCheck, CreditCard, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FinanceOverviewProps {
  finance: FinancialSummary;
}

export default function FinanceOverview({ finance }: FinanceOverviewProps) {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-5 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Financial Visibility & Ledger</h2>
          <p className="text-xs text-slate-500">Multi-currency candidate fee collections, processor distribution, and pending refund queues.</p>
        </div>
        <Link 
          to="/superadmin/finance"
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Full Financial Audit</span>
        </Link>
      </div>

      {/* Currency Totals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>GBP Collected (UK)</span>
            <PoundSterling className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black">{finance.formattedGbpCollected}</p>
          <p className="text-[11px] text-emerald-400 font-bold">+16.7% vs last 30 days</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-950 text-white space-y-2 border border-emerald-800/40">
          <div className="flex items-center justify-between text-xs text-emerald-300">
            <span>AED Collected (UAE)</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black">{finance.formattedAedCollected}</p>
          <p className="text-[11px] text-emerald-400 font-bold">+14.2% vs last 30 days</p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50 text-rose-900 border border-rose-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-rose-700 font-bold">
            <span>Pending Refund Requests</span>
            <RotateCcw className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black">{finance.totalRefundsPendingCount} Pending</p>
          <p className="text-[11px] text-rose-700 font-bold">£{finance.totalRefundsPendingAmountGbp}.00 Total Value</p>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Recent Platform Transactions</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Provider</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {finance.recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{tx.reference}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">{tx.candidateName}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">{tx.formattedAmount}</td>
                  <td className="py-2.5 px-3 text-slate-600">{tx.paymentProvider}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      tx.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : tx.status === 'refunded'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right text-slate-400">{tx.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
