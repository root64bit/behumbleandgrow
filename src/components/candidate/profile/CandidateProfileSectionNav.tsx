import React from 'react';
import { User, Phone, FileText, Briefcase, GraduationCap, Award, Globe, SlidersHorizontal, Plane, Camera, ChevronDown } from 'lucide-react';

export interface SectionItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isCompleted: boolean;
  isRequired: boolean;
}

interface Props {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  completedSections: Record<string, boolean>;
}

export const CandidateProfileSectionNav: React.FC<Props> = ({ activeSection, onSelectSection, completedSections }) => {
  const sections: SectionItem[] = [
    { id: 'personal', label: 'Personal Information', icon: User, isCompleted: !!completedSections.personal, isRequired: true },
    { id: 'contact', label: 'Contact Details', icon: Phone, isCompleted: !!completedSections.contact, isRequired: true },
    { id: 'summary', label: 'Professional Summary', icon: FileText, isCompleted: !!completedSections.summary, isRequired: true },
    { id: 'experience', label: 'Work Experience History', icon: Briefcase, isCompleted: !!completedSections.experience, isRequired: true },
    { id: 'education', label: 'Education & Qualifications', icon: GraduationCap, isCompleted: !!completedSections.education, isRequired: true },
    { id: 'skills', label: 'Skills & Competencies', icon: Award, isCompleted: !!completedSections.skills, isRequired: true },
    { id: 'languages', label: 'Languages & English Level', icon: Globe, isCompleted: !!completedSections.languages, isRequired: true },
    { id: 'preferences', label: 'Employment Preferences', icon: SlidersHorizontal, isCompleted: !!completedSections.preferences, isRequired: false },
    { id: 'relocation', label: 'Relocation Availability', icon: Plane, isCompleted: !!completedSections.relocation, isRequired: true },
    { id: 'photo', label: 'Profile Photograph', icon: Camera, isCompleted: !!completedSections.photo, isRequired: false },
  ];

  return (
    <nav aria-label="Profile Section Navigator" className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm text-left mb-6">
      <div className="flex overflow-x-auto no-scrollbar gap-1 p-1">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#00122B] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{sec.label}</span>
              {sec.isCompleted && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#006D44] flex-shrink-0" title="Completed" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
