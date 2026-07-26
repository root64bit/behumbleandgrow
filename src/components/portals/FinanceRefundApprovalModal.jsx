import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle, Lock, AlertTriangle } from 'lucide-react';
import { evaluateRefundApproval } from '../../lib/paymentSecurity';

export default function FinanceRefundApprovalModal({ isOpen, onClose, refundRequest }) {
  const [secondaryApproverId, setSecondaryApproverId] = useState('usr_compliance_officer_09');
  const [approvalResult, setApprovalResult] = useState(null);

  if (!isOpen || !refundRequest) return null;

  const handleApprove = () => {
    const evaluation = evaluateRefundApproval(
      refundRequest.amount,
      refundRequest.requestedBy,
      secondaryApproverId
    );
    setApprovalResult(evaluation);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Finance Refund Dual-Approval</h2>
            <p className="text-xs text-slate-500">Four-Eyes Security Control for High-Value Transactions</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-200 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Transaction ID:</span>
            <span className="font-mono font-bold text-slate-800">{refundRequest.paymentId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Candidate / Payer:</span>
            <span className="font-semibold text-slate-800">{refundRequest.candidateName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Refund Amount:</span>
            <span className="font-bold text-amber-600">${refundRequest.amount.toFixed(2)} AED</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Requested By (Primary):</span>
            <span className="font-mono text-slate-700">{refundRequest.requestedBy}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Refund Reason:</span>
            <span className="text-slate-700 italic">"{refundRequest.reason}"</span>
          </div>
        </div>

        {refundRequest.amount > 500 && (
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start space-x-2 text-xs text-amber-800 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">MFA & Dual Approval Mandated:</span> High-value refunds exceeding $500 require distinct primary requester & secondary compliance approver IDs.
            </div>
          </div>
        )}

        {approvalResult ? (
          <div className={`p-4 rounded-xl text-center space-y-2 border ${
            approvalResult.approved ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            {approvalResult.approved ? (
              <>
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-bold">Refund Executed Successfully!</h4>
                <p className="text-xs text-slate-600">{approvalResult.reason}</p>
              </>
            ) : (
              <>
                <ShieldAlert className="w-8 h-8 text-rose-600 mx-auto" />
                <h4 className="font-bold">Approval Rejected by Policy Engine</h4>
                <p className="text-xs text-slate-600">{approvalResult.reason}</p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Secondary Compliance Officer Approver ID *
              </label>
              <input
                type="text"
                value={secondaryApproverId}
                onChange={(e) => setSecondaryApproverId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm flex items-center space-x-1"
              >
                <Lock className="w-4 h-4 mr-1" />
                Sign & Authorize Refund
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
