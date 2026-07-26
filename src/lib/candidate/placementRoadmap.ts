export interface PlacementRoadmapStage {
  stepNumber: number;
  name: string;
  status: 'completed' | 'current' | 'pending' | 'not_applicable';
  isOptional: boolean;
  dateDisplay?: string;
  description?: string;
}

export const CANONICAL_ROADMAP_STAGES = [
  { stepNumber: 1, name: 'Offer Accepted', isOptional: false },
  { stepNumber: 2, name: 'Document Preparation', isOptional: false },
  { stepNumber: 3, name: 'Employer Processing', isOptional: false },
  { stepNumber: 4, name: 'Work-Permit Processing', isOptional: false },
  { stepNumber: 5, name: 'Visa or Entry-Permit Processing', isOptional: false },
  { stepNumber: 6, name: 'Medical and Biometric Requirements', isOptional: false },
  { stepNumber: 7, name: 'Travel Preparation', isOptional: false },
  { stepNumber: 8, name: 'Accommodation Preparation', isOptional: true },
  { stepNumber: 9, name: 'Employer Onboarding', isOptional: false },
  { stepNumber: 10, name: 'Placement Completed', isOptional: false },
];

export function calculateRoadmapProgress(stages: PlacementRoadmapStage[]): {
  percentage: number;
  completedCount: number;
  totalRequiredCount: number;
} {
  const applicableRequired = stages.filter((s) => !s.isOptional && s.status !== 'not_applicable');
  const completedRequired = applicableRequired.filter((s) => s.status === 'completed');

  const totalRequiredCount = applicableRequired.length;
  const completedCount = completedRequired.length;

  if (totalRequiredCount === 0) {
    return { percentage: 0, completedCount: 0, totalRequiredCount: 0 };
  }

  const percentage = Math.min(100, Math.round((completedCount / totalRequiredCount) * 100));
  return { percentage, completedCount, totalRequiredCount };
}
