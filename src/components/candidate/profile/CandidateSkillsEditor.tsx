import React, { useState } from 'react';
import { Award, Plus, X } from 'lucide-react';

interface Props {
  skills: string[];
  onSave: (newSkills: string[]) => Promise<void>;
}

const SUGGESTED_SKILLS = [
  'Hospitality Management',
  'Customer Service',
  'F&B Operations',
  'Team Leadership',
  'POS Systems',
  'Guest Relations',
  'Event Management',
  'Front Office',
  'Inventory Control',
  'Crisis Resolution',
];

export const CandidateSkillsEditor: React.FC<Props> = ({ skills, onSave }) => {
  const [skillList, setSkillList] = useState<string[]>(skills);
  const [inputVal, setInputVal] = useState('');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skillList.includes(trimmed)) return;
    setSkillList([...skillList, trimmed]);
    setInputVal('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillList(skillList.filter((s) => s !== skillToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedMsg('');
    try {
      await onSave(skillList);
      setSavedMsg('Skills updated atomically.');
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
            <Award className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Skills & Competencies</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Required</span>
      </div>

      <div className="space-y-4">
        {/* Selected Skills Badges */}
        <div className="flex flex-wrap gap-2 min-h-[44px] p-2 bg-slate-50 border border-slate-200 rounded-xl">
          {skillList.length === 0 ? (
            <p className="text-xs text-slate-400 p-1">No skills added yet. Select suggestions or add custom skills below.</p>
          ) : (
            skillList.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#00122B] text-white text-xs font-medium rounded-lg"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-300"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Input for custom skill */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill(inputVal);
              }
            }}
            placeholder="Add custom skill (e.g. Micros POS)..."
            className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#006D44]"
          />
          <button
            type="button"
            onClick={() => handleAddSkill(inputVal)}
            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Suggested Skills */}
        <div>
          <p className="text-[11px] font-semibold text-slate-500 mb-2">Recommended Hospitality Skills:</p>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_SKILLS.filter((s) => !skillList.includes(s)).map((suggested) => (
              <button
                key={suggested}
                type="button"
                onClick={() => handleAddSkill(suggested)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-[#006D44] text-slate-700 text-[11px] font-medium rounded-md transition-colors"
              >
                + {suggested}
              </button>
            ))}
          </div>
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Skills Section'}
          </button>
        </div>
      </div>
    </div>
  );
};
