import React, { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar, Building } from 'lucide-react';
import type { WorkExperience } from '../../../lib/supabase/types';

interface Props {
  experiences: WorkExperience[];
  onAdd: (exp: Omit<WorkExperience, 'id' | 'candidate_id' | 'created_at'>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const CandidateWorkExperienceList: React.FC<Props> = ({ experiences, onAdd, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isCurrent, setIsCurrent] = useState(true);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isCurrent && endDate && startDate && new Date(endDate) < new Date(startDate)) {
      setErrorMsg('End date cannot precede start date.');
      return;
    }

    setSaving(true);
    try {
      await onAdd({
        company_name: companyName,
        job_title: jobTitle,
        location,
        start_date: startDate,
        end_date: isCurrent ? null : endDate,
        is_current: isCurrent,
        description,
      });

      setCompanyName('');
      setJobTitle('');
      setLocation('');
      setStartDate('');
      setEndDate('');
      setIsCurrent(true);
      setDescription('');
      setShowAddForm(false);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to add work experience.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <Briefcase className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Work Experience History</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Cancel' : 'Add Position'}</span>
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <p className="text-xs text-slate-500">No work experience entries added yet. Click Add Position to add your background.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-4">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="relative pl-6 border-l-2 border-[#006D44]/30 pb-4 last:pb-0 text-left"
            >
              <div
                className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full ${
                  exp.is_current ? 'bg-[#006D44]' : 'bg-slate-300'
                }`}
              />
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#00122B]">{exp.job_title}</h3>
                  <p className="text-[11px] font-semibold text-[#006D44] flex items-center gap-1 mt-0.5">
                    <Building className="w-3 h-3" />
                    <span>{exp.company_name}</span>
                    {exp.location && <span>• {exp.location}</span>}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>
                      {exp.start_date} — {exp.is_current ? 'Present' : exp.end_date || 'N/A'}
                    </span>
                  </p>
                  {exp.description && <p className="text-xs text-slate-600 mt-2 leading-relaxed">{exp.description}</p>}
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(exp.id)}
                  className="text-slate-400 hover:text-red-600 p-1"
                  aria-label={`Delete ${exp.job_title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 mt-4">
          <h4 className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">Add New Work Experience</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Company / Employer Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="e.g. Maputo Grand Hotel"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Job Title / Role</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                placeholder="e.g. F&B Outlet Captain"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Location (City, Country)</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Maputo, Mozambique"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="isCurrentExp"
                checked={isCurrent}
                onChange={(e) => setIsCurrent(e.target.checked)}
                className="w-4 h-4 text-[#006D44] border-slate-300 rounded"
              />
              <label htmlFor="isCurrentExp" className="text-xs font-medium text-slate-700">
                I currently work in this position
              </label>
            </div>

            {!isCurrent && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required={!isCurrent}
                  className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                />
              </div>
            )}

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Responsibilities & Key Achievements</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Describe your day-to-day duties, team management, and key accomplishments..."
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          {errorMsg && <p className="text-xs font-semibold text-red-600">{errorMsg}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 bg-slate-200 text-slate-800 text-xs font-medium rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-1.5 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
            >
              {saving ? 'Saving...' : 'Save Record'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
