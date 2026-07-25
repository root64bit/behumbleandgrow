import React, { useState } from 'react';
import { Settings, Lock, Bell, Shield, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth/AuthContext';
import { supabase } from '../../lib/supabase/client';

export default function CandidateSettingsPage() {
  const { user } = useAuth();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const { error: updateErr } = await supabase.auth.updateUser({ password });
      if (updateErr) throw updateErr;
      setMessage('Password updated successfully!');
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Password update failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-800 rounded-full text-xs font-bold mb-2">
          <Settings className="w-3.5 h-3.5 text-slate-600" />
          <span>Account & Security Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Candidate Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage your account credentials, notifications, and privacy options.
        </p>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-xl text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Password Change Form */}
      <form onSubmit={handleUpdatePassword} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Lock className="w-4 h-4 text-emerald-600" />
          <span>Update Account Password</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Updating...' : 'Update Password'}</span>
        </button>
      </form>

      {/* Notification Preferences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Bell className="w-4 h-4 text-emerald-600" />
          <span>Notification Preferences</span>
        </h3>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900">WhatsApp Application Updates</div>
              <div className="text-[11px] text-slate-500">Receive interview invites and MOHRE visa updates directly via WhatsApp</div>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <div>
              <div className="text-xs font-bold text-slate-900">Email Alerts & Opportunity Matches</div>
              <div className="text-[11px] text-slate-500">Receive weekly recommended vacancy matches and application digests</div>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
