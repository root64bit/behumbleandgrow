import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import type { Candidate } from '../../lib/supabase/types';
import { Users, Eye, ShieldCheck, MapPin } from 'lucide-react';

export default function OperationsCandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('candidates')
      .select('*, profiles(full_name, email, country_code)')
      .then(({ data }) => {
        setCandidates(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Global Candidate Pool</h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect registered candidate profiles, verification statuses, and uploaded document packages.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : candidates.length === 0 ? (
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 text-center space-y-2">
          <Users className="w-8 h-8 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Registered Candidates Found</h3>
          <p className="text-xs text-slate-400">Newly registered candidates will be displayed here for ops review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((cand) => (
            <div key={cand.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] font-bold uppercase">
                    Stage: {cand.stage}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {cand.profiles?.full_name || 'Candidate Account'}
                  </h3>
                  <div className="text-xs text-slate-400">{cand.profiles?.email}</div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Verification:</span>
                  <span className="text-xs font-bold text-emerald-400 uppercase">{cand.verification_status}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="text-slate-400 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Country: {cand.profiles?.country_code || 'MOZ'}</span>
                </div>
                <Link
                  to={`/operations/candidates/${cand.id}`}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Profile</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
