import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2, Calendar, School } from 'lucide-react';
import type { Education } from '../../../lib/supabase/types';

interface Props {
  educations: Education[];
  onAdd: (edu: Omit<Education, 'id' | 'candidate_id' | 'created_at'>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const CandidateEducationList: React.FC<Props> = ({ educations, onAdd, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [institution, setInstitution] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onAdd({
        institution,
        degree,
        field_of_study: fieldOfStudy,
        start_date: startDate,
        end_date: endDate || null,
      });

      setInstitution('');
      setDegree('');
      setFieldOfStudy('');
      setStartDate('');
      setEndDate('');
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm text-left">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0F2747]/5 flex items-center justify-center text-[#00122B]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Education & Qualifications</h2>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{showAddForm ? 'Cancel' : 'Add Degree'}</span>
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
          <p className="text-xs text-slate-500">No education entries added yet. Click Add Degree to document your qualifications.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-4">
          {educations.map((edu, idx) => (
            <div key={edu.id || idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#00122B]">
                  {edu.degree} — {edu.field_of_study}
                </h3>
                <p className="text-[11px] font-semibold text-[#006D44] flex items-center gap-1 mt-0.5">
                  <School className="w-3 h-3" />
                  <span>{edu.institution}</span>
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>
                    {edu.start_date} — {edu.end_date || 'Present'}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => onDelete(edu.id)}
                className="text-slate-400 hover:text-red-600 p-1"
                aria-label={`Delete ${edu.degree}`}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddForm && (
        <form onSubmit={handleSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 mt-4">
          <h4 className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">Add Education Qualification</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Institution Name</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                required
                placeholder="e.g. Eduardo Mondlane University"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Degree / Qualification</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                required
                placeholder="e.g. Diploma / Bachelor of Science"
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={fieldOfStudy}
                onChange={(e) => setFieldOfStudy(e.target.value)}
                required
                placeholder="e.g. Hospitality Management"
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

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">Graduation Date (Optional)</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

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
              {saving ? 'Saving...' : 'Save Degree'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
