import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function EligibilityPage() {
  const [citizenship, setCitizenship] = useState('MOZ');
  const [passportValid, setPassportValid] = useState('yes');
  const [experienceYears, setExperienceYears] = useState('3');
  const [englishLevel, setEnglishLevel] = useState('intermediate');
  const [checked, setChecked] = useState(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (passportValid === 'yes' && parseInt(experienceYears) >= 1) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
    setChecked(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider">
          Pre-Screening Tool
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Check Your Overseas Eligibility</h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Evaluate whether you meet basic requirements for employer placements in the United Arab Emirates and broader GCC region.
        </p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <form onSubmit={handleCheck} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Country of Origin</label>
              <select
                value={citizenship}
                onChange={(e) => setCitizenship(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="MOZ">Mozambique</option>
                <option value="ZAF">South Africa</option>
                <option value="KEN">Kenya</option>
                <option value="UGA">Uganda</option>
                <option value="ZWE">Zimbabwe</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Valid International Passport?</label>
              <select
                value={passportValid}
                onChange={(e) => setPassportValid(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="yes">Yes — Valid for at least 6 months</option>
                <option value="no">No — Needs renewal or first issuance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Years of Professional Experience</label>
              <select
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="0">Less than 1 year</option>
                <option value="1">1 to 2 years</option>
                <option value="3">3 to 5 years</option>
                <option value="5">5+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">English Language Proficiency</label>
              <select
                value={englishLevel}
                onChange={(e) => setEnglishLevel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="basic">Basic / Beginner</option>
                <option value="intermediate">Intermediate / Working Knowledge</option>
                <option value="fluent">Fluent / Native</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
          >
            <span>Run Eligibility Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {checked && isEligible !== null && (
          <div className={`p-6 rounded-2xl border ${isEligible ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} space-y-4`}>
            <div className="flex items-center space-x-3">
              {isEligible ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
              )}
              <div>
                <h3 className={`text-base font-bold ${isEligible ? 'text-emerald-900' : 'text-amber-900'}`}>
                  {isEligible ? 'Eligible for Overseas Placement' : 'Action Required for Eligibility'}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  {isEligible
                    ? 'Your profile matches standard UAE immigration and employer submission criteria.'
                    : 'A valid passport and at least 1 year of experience are required prior to employer submission.'}
                </p>
              </div>
            </div>

            {isEligible && (
              <div className="pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm space-x-2"
                >
                  <span>Proceed to Candidate Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
