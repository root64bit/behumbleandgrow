import React, { useEffect, useState } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { getCandidateProfile, updateCandidateProfile, addWorkExperience, addEducation } from '../../services/candidate.service';
import type { WorkExperience, Education } from '../../lib/supabase/types';
import { User, Briefcase, GraduationCap, Plus, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CandidateProfilePage() {
  const { user, profile, refreshAuth } = useAuth();

  const [fullName, setFullName] = useState('');
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [languages, setLanguages] = useState('');
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Form inputs for new work exp & edu
  const [newComp, setNewComp] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newStartDate, setNewStartDate] = useState('');

  const [newInst, setNewInst] = useState('');
  const [newDegree, setNewDegree] = useState('');
  const [newField, setNewField] = useState('');

  useEffect(() => {
    if (user) {
      getCandidateProfile(user.id).then((res: any) => {
        setFullName(res.profile?.full_name || 'Amina Mabote');
        setHeadline(res.candidate?.headline || 'Customer Experience & Hospitality Specialist');
        setBio(res.candidate?.bio || 'Experienced hospitality professional with 5+ years in front of house and customer operations.');
        setCurrentLocation(res.candidate?.current_location || 'Maputo, Mozambique');
        setSkills(res.candidate?.skills?.join(', ') || 'Hospitality, Customer Service, Team Leadership');
        setLanguages(res.candidate?.languages?.join(', ') || 'Portuguese, English');
        setExperiences(res.work_experiences || []);
        setEducations(res.education_records || []);
        setLoading(false);
      });
    } else {
      setFullName('Amina Mabote');
      setHeadline('Customer Experience & Hospitality Specialist');
      setBio('Experienced hospitality professional with 5+ years in front of house and customer operations.');
      setCurrentLocation('Maputo, Mozambique');
      setSkills('Hospitality, Customer Service, Team Leadership');
      setLanguages('Portuguese, English');
      setExperiences([
        { id: 'exp-1', job_title: 'F&B Captain', company_name: 'Maputo Grand Hotel', start_date: '2022-01-01', end_date: null, is_current: true, candidate_id: 'cand-1', created_at: '', description: '' }
      ]);
      setEducations([
        { id: 'edu-1', degree: 'Diploma in Hospitality', institution: 'Eduardo Mondlane University', field_of_study: 'Hospitality Management', start_date: '2019-01-01', end_date: '2021-12-01', candidate_id: 'cand-1', created_at: '' }
      ]);
      setLoading(false);
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const parsedSkills = skills.split(',').map((s) => s.trim()).filter(Boolean);
      const parsedLanguages = languages.split(',').map((l) => l.trim()).filter(Boolean);

      if (user) {
        await updateCandidateProfile(user.id, {
          fullName,
          headline,
          bio,
          currentLocation,
          skills: parsedSkills,
          languages: parsedLanguages,
        });
        await refreshAuth();
      }

      setMessage('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Profile update failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComp || !newTitle || !newStartDate) return;

    try {
      const exp = {
        id: `exp-${Date.now()}`,
        company_name: newComp,
        job_title: newTitle,
        start_date: newStartDate,
        is_current: true,
        candidate_id: 'cand-1',
        created_at: '',
        description: ''
      };
      setExperiences([exp, ...experiences]);
      setNewComp('');
      setNewTitle('');
      setNewStartDate('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInst || !newDegree || !newField) return;

    try {
      const edu = {
        id: `edu-${Date.now()}`,
        institution: newInst,
        degree: newDegree,
        field_of_study: newField,
        start_date: '2020-01-01',
        end_date: null,
        candidate_id: 'cand-1',
        created_at: ''
      };
      setEducations([edu, ...educations]);
      setNewInst('');
      setNewDegree('');
      setNewField('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto text-left">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Candidate Professional Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Maintain your personal details, employment history, and key competencies.
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

      <form onSubmit={handleSaveProfile} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <User className="w-4 h-4 text-emerald-600" />
          <span>Personal & Contact Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Senior Hospitality Manager"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Current Location</label>
            <input
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              required
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Skills (comma-separated)</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Hospitality, Management, English"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Spoken Languages (comma-separated)</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Portuguese, English"
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Summary / Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Summarize your professional experience..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center space-x-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
        </button>
      </form>

      {/* Work Experiences */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-emerald-600" />
          <span>Work Experience History</span>
        </h3>

        {experiences.length > 0 && (
          <div className="space-y-3">
            {experiences.map((exp) => (
              <div key={exp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="font-bold text-slate-900">{exp.job_title}</div>
                <div className="text-slate-600">{exp.company_name} | {exp.start_date}</div>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAddExp} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <input
            type="text"
            placeholder="Company Name"
            value={newComp}
            onChange={(e) => setNewComp(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
          <input
            type="date"
            value={newStartDate}
            onChange={(e) => setNewStartDate(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          />
          <button
            type="submit"
            className="sm:col-span-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Work Experience</span>
          </button>
        </form>
      </div>
    </div>
  );
}
