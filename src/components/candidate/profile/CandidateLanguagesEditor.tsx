import React, { useState } from 'react';
import { Globe, Plus, Trash2 } from 'lucide-react';

interface Props {
  languages: string[];
  onSave: (newLangs: string[]) => Promise<void>;
}

const PROFICIENCY_LEVELS = ['Basic', 'Conversational', 'Professional', 'Fluent', 'Native'];

export const CandidateLanguagesEditor: React.FC<Props> = ({ languages, onSave }) => {
  const [langList, setLangList] = useState<string[]>(languages);
  const [selectedLang, setSelectedLang] = useState('English');
  const [selectedProf, setSelectedProf] = useState('Fluent');
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const handleAddLanguage = () => {
    const formatted = `${selectedLang} (${selectedProf})`;
    // Check duplicate language
    if (langList.some((l) => l.toLowerCase().startsWith(selectedLang.toLowerCase()))) {
      return;
    }
    setLangList([...langList, formatted]);
  };

  const handleRemoveLanguage = (langToRemove: string) => {
    setLangList(langList.filter((l) => l !== langToRemove));
  };

  const handleSave = async () => {
    setSaving(true);
    setSavedMsg('');
    try {
      await onSave(langList);
      setSavedMsg('Languages saved atomically.');
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
            <Globe className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-[#00122B]">Languages & Proficiency</h2>
        </div>
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Required</span>
      </div>

      <div className="space-y-4">
        {/* Existing Languages List */}
        <div className="space-y-2">
          {langList.map((lang) => (
            <div key={lang} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">{lang}</span>
              <button
                type="button"
                onClick={() => handleRemoveLanguage(lang)}
                className="text-slate-400 hover:text-red-600"
                aria-label={`Remove ${lang}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add Language Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          >
            <option value="English">English</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="Hindi">Hindi</option>
            <option value="Swahili">Swahili</option>
          </select>

          <select
            value={selectedProf}
            onChange={(e) => setSelectedProf(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
          >
            {PROFICIENCY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddLanguage}
            className="py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Language</span>
          </button>
        </div>

        {savedMsg && <p className="text-xs font-semibold text-[#006D44]">{savedMsg}</p>}

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-[#006D44] hover:bg-[#005232] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            {saving ? 'Saving...' : 'Save Languages Section'}
          </button>
        </div>
      </div>
    </div>
  );
};
