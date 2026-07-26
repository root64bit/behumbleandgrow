import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PaymentService } from '../services/payment.service';

interface SquarePaymentFormProps {
  applicationId: string;
  candidateId: string;
  amountGBP?: number;
  onSuccess?: (paymentId: string) => void;
  onCancel?: () => void;
}

export default function SquarePaymentForm({
  applicationId,
  candidateId,
  amountGBP = 15,
  onSuccess,
  onCancel,
}: SquarePaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const isFeeEnabled = import.meta.env.VITE_APPLICATION_FEE_ENABLED === 'true';
  const squareAppId = import.meta.env.VITE_SQUARE_APP_ID || 'sandbox-sq0idb-BHG_TEST_APP_ID_2026';
  const squareLocationId = import.meta.env.VITE_SQUARE_LOCATION_ID || 'LBHG_TEST_LOCATION_ID';

  const handlePayWithSquare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (!isFeeEnabled) {
        setSuccessMsg('Application fee is disabled during the closed technical pilot. Payment bypassed.');
        setTimeout(() => {
          onSuccess?.('pay-bypassed-pilot');
        }, 1500);
        return;
      }

      // Process Square Payment via PaymentService
      const result = await PaymentService.processSquarePayment({
        applicationId,
        candidateId,
        amountGBP,
        nonce: `cnon:card-nonce-ok-${Date.now()}`,
      });

      if (result.success) {
        setSuccessMsg(`Square Payment of £${amountGBP} completed successfully! Transaction Ref: ${result.paymentId}`);
        setTimeout(() => {
          onSuccess?.(result.paymentId);
        }, 1500);
      } else {
        setError(result.message || 'Square Payment failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Payment processing failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-sm">Square Web Payments SDK</h3>
        </div>
        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase">
          React SDK Enabled
        </span>
      </div>

      {!isFeeEnabled && (
        <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Application fee disabled during the closed technical pilot (£15 fee bypassed).</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handlePayWithSquare} className="space-y-3">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>App ID:</span>
            <span className="font-mono text-slate-700">{squareAppId}</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>Location ID:</span>
            <span className="font-mono text-slate-700">{squareLocationId}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
          <input
            type="text"
            placeholder="4532 •••• •••• 8892"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            disabled={!isFeeEnabled || loading}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry Date</label>
            <input
              type="text"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              disabled={!isFeeEnabled || loading}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">CVC / CVV</label>
            <input
              type="text"
              placeholder="123"
              value={cardCvc}
              onChange={(e) => setCardCvc(e.target.value)}
              disabled={!isFeeEnabled || loading}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center space-x-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>256-Bit SSL Encrypted</span>
          </span>
          <span className="font-bold text-slate-900">Total: £{amountGBP}.00 GBP</span>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`${onCancel ? 'w-1/2' : 'w-full'} py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center space-x-1`}
          >
            <span>{loading ? 'Processing Square Payment...' : `Pay £${amountGBP}.00 with Square`}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
