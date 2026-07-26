import React from 'react';
import { BookOpen, Wifi, MessageSquare } from 'lucide-react';

interface Props {
  items: Array<{ id: string; label: string; done: boolean }>;
  onToggleItem: (id: string) => void;
}

export const CandidateInterviewPreparationChecklist: React.FC<Props> = ({ items, onToggleItem }) => {
  return (
    <div className="space-y-3 text-left">
      <h3 className="text-base font-extrabold text-[#00122B]">Preparation Checklist</h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Main Bento Item */}
        <div className="col-span-2 bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#00122B]">Review Case Study & Role</p>
              <p className="text-[11px] text-slate-500">Focus on candidate experience & core skills</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={items.find((i) => i.id === 'prep-1')?.done ?? false}
            onChange={() => onToggleItem('prep-1')}
            className="w-5 h-5 text-[#006D44] rounded border-slate-300 focus:ring-[#006D44] cursor-pointer"
          />
        </div>

        {/* Bento Sub-Card 1 */}
        <div className="bg-white border border-slate-200 p-3.5 rounded-2xl space-y-1 shadow-xs">
          <Wifi className="w-4 h-4 text-[#006D44]" />
          <p className="text-xs font-bold text-[#00122B]">Tech Check</p>
          <p className="text-[10px] text-slate-500">Test camera and microphone 15 mins before.</p>
        </div>

        {/* Bento Sub-Card 2 */}
        <div className="bg-white border border-slate-200 p-3.5 rounded-2xl space-y-1 shadow-xs">
          <MessageSquare className="w-4 h-4 text-purple-600" />
          <p className="text-xs font-bold text-[#00122B]">Questions</p>
          <p className="text-[10px] text-slate-500">Prepare 3 questions for the employer team.</p>
        </div>
      </div>
    </div>
  );
};
