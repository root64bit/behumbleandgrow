export interface ProfileSectionInput {
  fullName?: string | null;
  phone?: string | null;
  countryCode?: string | null;
  headline?: string | null;
  bio?: string | null;
  currentLocation?: string | null;
  skills?: string[] | null;
  languages?: string[] | null;
  workExperiences?: any[] | null;
  educations?: any[] | null;
  preferredLocation?: string | null;
}

export interface SectionStatus {
  id: string;
  name: string;
  isCompleted: boolean;
  isRequired: boolean;
  weight: number;
}

export interface ProfileCompletionResult {
  percentage: number;
  completedSectionsCount: number;
  totalSectionsCount: number;
  sections: SectionStatus[];
}

/**
 * Deterministic profile completion calculation utility.
 * Strictly measures information completeness (0-100%), distinct from
 * document readiness or operations verification status.
 */
export function calculateProfileCompletion(data: ProfileSectionInput): ProfileCompletionResult {
  const hasPersonal = Boolean(data.fullName && data.fullName.trim().length > 0 && data.countryCode);
  const hasContact = Boolean(data.phone && data.phone.trim().length > 0);
  const hasSummary = Boolean((data.headline && data.headline.trim().length > 0) || (data.bio && data.bio.trim().length > 0));
  const hasExperience = Boolean(data.workExperiences && data.workExperiences.length > 0);
  const hasEducation = Boolean(data.educations && data.educations.length > 0);
  const hasSkills = Boolean(data.skills && data.skills.length > 0);
  const hasLanguages = Boolean(data.languages && data.languages.length > 0);
  const hasPreferences = Boolean(data.preferredLocation || data.currentLocation);

  const sections: SectionStatus[] = [
    { id: 'personal', name: 'Personal Information', isCompleted: hasPersonal, isRequired: true, weight: 15 },
    { id: 'contact', name: 'Contact Information', isCompleted: hasContact, isRequired: true, weight: 15 },
    { id: 'summary', name: 'Professional Summary', isCompleted: hasSummary, isRequired: true, weight: 15 },
    { id: 'experience', name: 'Work Experience', isCompleted: hasExperience, isRequired: true, weight: 15 },
    { id: 'education', name: 'Education History', isCompleted: hasEducation, isRequired: true, weight: 15 },
    { id: 'skills', name: 'Skills & Competencies', isCompleted: hasSkills, isRequired: true, weight: 10 },
    { id: 'languages', name: 'Languages', isCompleted: hasLanguages, isRequired: true, weight: 10 },
    { id: 'preferences', name: 'Employment Preferences', isCompleted: hasPreferences, isRequired: false, weight: 5 },
  ];

  const earnedWeight = sections.reduce((acc, sec) => acc + (sec.isCompleted ? sec.weight : 0), 0);
  const totalWeight = sections.reduce((acc, sec) => acc + sec.weight, 0);

  const percentage = Math.min(100, Math.max(0, Math.round((earnedWeight / totalWeight) * 100)));
  const completedSectionsCount = sections.filter((s) => s.isCompleted).length;

  return {
    percentage,
    completedSectionsCount,
    totalSectionsCount: sections.length,
    sections,
  };
}
