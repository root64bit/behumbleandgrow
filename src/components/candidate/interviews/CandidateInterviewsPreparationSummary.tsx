import React, { useState } from 'react';
import { Lightbulb, CheckSquare } from 'lucide-react';

export const CandidateInterviewsPreparationSummary: React.FC = () => {
  const [checklist, setChecklist] = useState([
    { id: 'prep-1', label: 'Review Job Description & Core Skills', done: true },
    { id: 'prep-2', label: 'Research Disclosed UAE Employer Information', done: true },
    { id: 'prep-3', label: 'Test Video Camera, Microphone & Internet Connection', done: false },
    { id: 'prep-4', label: 'Have Passport Identification Ready for Verification', done: false },
  ]);

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        <h3 className="text-xs font-extrabold text-[#00122B] uppercase tracking-wider">
          Candidate Interview Preparation Summary
        </h3>
      </div>

      <div className="space-y-2">
        {checklist.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer border border-slate-200/80 transition-colors text-xs"
          >
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => toggleCheck(item.id)}
              className="w-4 h-4 text-[#006D44] rounded border-slate-300 focus:ring-[#006D44] cursor-pointer"
            />
            <span className={`font-medium ${item.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
              {item.label}
            </span>
          </label>
        ))}
      </div>

      <p className="text-[11px] text-slate-400">
        Review preparation recommendations before your scheduled start time.
      </p>
    </div>
  );
};
