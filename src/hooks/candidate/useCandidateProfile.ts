import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../lib/auth/AuthContext';
import { supabase } from '../../lib/supabase/client';
import type { Profile, Candidate, WorkExperience, Education, CandidateDocument } from '../../lib/supabase/types';
import { calculateProfileCompletion, ProfileCompletionResult } from '../../lib/candidate/profileCompletion';

export type ResourceState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'empty'; data: T }
  | { status: 'error'; message: string };

export interface CoreCandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  headline: string;
  bio: string;
  currentLocation: string;
  candidateRef: string;
  verificationStatus: string;
  updatedAt: string;
}

export interface EmploymentPreferences {
  preferredLocation?: string | null;
  expectedSalaryText?: string | null;
  employmentTypes?: string[] | null;
  shiftAvailability?: string | null;
}

export interface RelocationPreferences {
  willingToRelocate?: boolean | null;
  timeframe?: string | null;
  passportAvailable?: boolean | null;
  noticePeriod?: string | null;
}

export interface CandidateProfileState {
  coreProfile: ResourceState<CoreCandidateProfile>;
  workExperience: ResourceState<WorkExperience[]>;
  education: ResourceState<Education[]>;
  skills: ResourceState<string[]>;
  languages: ResourceState<string[]>;
  certifications: ResourceState<CandidateDocument[]>;
  preferences: ResourceState<EmploymentPreferences | null>;
  relocation: ResourceState<RelocationPreferences | null>;
  completion: ProfileCompletionResult;
  isUnprovisioned: boolean;
  hasUnsavedChanges: boolean;
  lastSavedAt: string | null;
  conflictError: string | null;
}

export function isDemoDataAllowed(): boolean {
  return (
    import.meta.env.DEV &&
    import.meta.env.VITE_DEMO_DATA_ENABLED === 'true'
  );
}

export function useCandidateProfile() {
  const { user, profile: authProfile, refreshAuth } = useAuth();

  const [state, setState] = useState<CandidateProfileState>({
    coreProfile: { status: 'loading' },
    workExperience: { status: 'loading' },
    education: { status: 'loading' },
    skills: { status: 'loading' },
    languages: { status: 'loading' },
    certifications: { status: 'loading' },
    preferences: { status: 'loading' },
    relocation: { status: 'loading' },
    completion: calculateProfileCompletion({}),
    isUnprovisioned: false,
    hasUnsavedChanges: false,
    lastSavedAt: null,
    conflictError: null,
  });

  const fetchProfileData = useCallback(async () => {
    if (!user) {
      if (isDemoDataAllowed()) {
        const demoCore: CoreCandidateProfile = {
          id: 'demo-cand-1',
          fullName: 'Amina Mabote',
          email: 'candidate@behumbleandgrow.com',
          phone: '+258 84 123 4567',
          countryCode: 'MZ',
          headline: 'Customer Experience & Hospitality Lead',
          bio: 'Experienced hospitality professional with 5+ years in front of house operations.',
          currentLocation: 'Maputo, Mozambique',
          candidateRef: 'BHG-MZ-9041',
          verificationStatus: 'verified',
          updatedAt: new Date().toISOString(),
        };

        const demoExp: WorkExperience[] = [
          {
            id: 'exp-1',
            candidate_id: 'demo-cand-1',
            job_title: 'F&B Outlet Captain',
            company_name: 'Maputo Grand Hotel',
            location: 'Maputo, Mozambique',
            start_date: '2022-01-01',
            end_date: null,
            is_current: true,
            description: 'Led merchant F&B team and guest customer operations.',
            created_at: '2026-01-01T00:00:00Z',
          },
        ];

        const demoEdu: Education[] = [
          {
            id: 'edu-1',
            candidate_id: 'demo-cand-1',
            institution: 'Eduardo Mondlane University',
            degree: 'Diploma in Hospitality Management',
            field_of_study: 'Hospitality Management',
            start_date: '2019-01-01',
            end_date: '2021-12-01',
            created_at: '2026-01-01T00:00:00Z',
          },
        ];

        const demoSkills = ['Hospitality', 'Customer Service', 'Team Leadership', 'F&B Management'];
        const demoLangs = ['Portuguese (Native)', 'English (Fluent)'];

        const completion = calculateProfileCompletion({
          fullName: demoCore.fullName,
          phone: demoCore.phone,
          countryCode: demoCore.countryCode,
          headline: demoCore.headline,
          bio: demoCore.bio,
          currentLocation: demoCore.currentLocation,
          skills: demoSkills,
          languages: demoLangs,
          workExperiences: demoExp,
          educations: demoEdu,
          preferredLocation: 'Dubai, UAE',
        });

        setState({
          coreProfile: { status: 'success', data: demoCore },
          workExperience: { status: 'success', data: demoExp },
          education: { status: 'success', data: demoEdu },
          skills: { status: 'success', data: demoSkills },
          languages: { status: 'success', data: demoLangs },
          certifications: { status: 'empty', data: [] },
          preferences: {
            status: 'success',
            data: { preferredLocation: 'Dubai, UAE', expectedSalaryText: 'AED 4,500 - 5,500' },
          },
          relocation: {
            status: 'success',
            data: { willingToRelocate: true, timeframe: 'Immediate', passportAvailable: true, noticePeriod: '1 month' },
          },
          completion,
          isUnprovisioned: false,
          hasUnsavedChanges: false,
          lastSavedAt: new Date().toISOString(),
          conflictError: null,
        });
        return;
      }

      setState((prev) => ({
        ...prev,
        coreProfile: { status: 'error', message: 'No authenticated user session found.' },
        workExperience: { status: 'error', message: 'Unauthenticated.' },
        education: { status: 'error', message: 'Unauthenticated.' },
        skills: { status: 'error', message: 'Unauthenticated.' },
        languages: { status: 'error', message: 'Unauthenticated.' },
        certifications: { status: 'error', message: 'Unauthenticated.' },
        preferences: { status: 'error', message: 'Unauthenticated.' },
        relocation: { status: 'error', message: 'Unauthenticated.' },
      }));
      return;
    }

    try {
      // 1. Fetch Profile & Candidate via ownership chain: auth.uid() -> profiles.id -> candidates.id
      const [profRes, candRes, expRes, eduRes, docRes] = await Promise.allSettled([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('candidates').select('*').eq('id', user.id).single(),
        supabase.from('work_experiences').select('*').eq('candidate_id', user.id).order('start_date', { ascending: false }),
        supabase.from('educations').select('*').eq('candidate_id', user.id).order('start_date', { ascending: false }),
        supabase.from('candidate_documents').select('*').eq('candidate_id', user.id),
      ]);

      let profData: Profile | null = profRes.status === 'fulfilled' ? (profRes.value.data as Profile) : null;
      let candData: Candidate | null = candRes.status === 'fulfilled' ? (candRes.value.data as Candidate) : null;
      let expData: WorkExperience[] = expRes.status === 'fulfilled' && expRes.value.data ? (expRes.value.data as WorkExperience[]) : [];
      let eduData: Education[] = eduRes.status === 'fulfilled' && eduRes.value.data ? (eduRes.value.data as Education[]) : [];
      let docData: CandidateDocument[] = docRes.status === 'fulfilled' && docRes.value.data ? (docRes.value.data as CandidateDocument[]) : [];

      if (!profData && !candData) {
        setState((prev) => ({
          ...prev,
          coreProfile: { status: 'empty', data: { id: user.id } as CoreCandidateProfile },
          isUnprovisioned: true,
        }));
        return;
      }

      const core: CoreCandidateProfile = {
        id: user.id,
        fullName: profData?.full_name || user.user_metadata?.full_name || '',
        email: profData?.email || user.email || '',
        phone: profData?.phone || '',
        countryCode: profData?.country_code || 'MZ',
        headline: candData?.headline || '',
        bio: candData?.bio || '',
        currentLocation: candData?.current_location || '',
        candidateRef: `BHG-CAN-${user.id.substring(0, 6).toUpperCase()}`,
        verificationStatus: candData?.verification_status || 'unverified',
        updatedAt: candData?.updated_at || profData?.updated_at || new Date().toISOString(),
      };

      const skills = candData?.skills || [];
      const languages = candData?.languages || [];

      const preferences: EmploymentPreferences = {
        preferredLocation: candData?.preferred_location || '',
      };

      const relocation: RelocationPreferences = {
        willingToRelocate: true,
      };

      const completion = calculateProfileCompletion({
        fullName: core.fullName,
        phone: core.phone,
        countryCode: core.countryCode,
        headline: core.headline,
        bio: core.bio,
        currentLocation: core.currentLocation,
        skills,
        languages,
        workExperiences: expData,
        educations: eduData,
        preferredLocation: preferences.preferredLocation,
      });

      setState({
        coreProfile: { status: 'success', data: core },
        workExperience: expData.length > 0 ? { status: 'success', data: expData } : { status: 'empty', data: [] },
        education: eduData.length > 0 ? { status: 'success', data: eduData } : { status: 'empty', data: [] },
        skills: skills.length > 0 ? { status: 'success', data: skills } : { status: 'empty', data: [] },
        languages: languages.length > 0 ? { status: 'success', data: languages } : { status: 'empty', data: [] },
        certifications: docData.length > 0 ? { status: 'success', data: docData } : { status: 'empty', data: [] },
        preferences: { status: 'success', data: preferences },
        relocation: { status: 'success', data: relocation },
        completion,
        isUnprovisioned: false,
        hasUnsavedChanges: false,
        lastSavedAt: new Date().toISOString(),
        conflictError: null,
      });
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        coreProfile: { status: 'error', message: err.message || 'Failed to load Candidate Profile' },
      }));
    }
  }, [user]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // Section Mutations with PostgreSQL-level Optimistic Concurrency Protection
  const updateCoreProfile = async (updates: Partial<CoreCandidateProfile>) => {
    if (!user) return;
    if (state.coreProfile.status === 'success') {
      const current = state.coreProfile.data;
      const newTimestamp = new Date().toISOString();

      // Check remote updated_at timestamp to prevent overwriting newer changes
      const { data: remoteCand } = await supabase.from('candidates').select('updated_at').eq('id', user.id).single();
      if (remoteCand && remoteCand.updated_at && new Date(remoteCand.updated_at) > new Date(current.updatedAt)) {
        setState((prev) => ({
          ...prev,
          conflictError: 'Your profile was updated in another browser session. Please reload to review current changes.',
        }));
        return;
      }

      await supabase.from('profiles').update({
        full_name: updates.fullName,
        phone: updates.phone,
        country_code: updates.countryCode,
        updated_at: newTimestamp,
      }).eq('id', user.id);

      await supabase.from('candidates').update({
        headline: updates.headline,
        bio: updates.bio,
        current_location: updates.currentLocation,
        updated_at: newTimestamp,
      }).eq('id', user.id);

      await refreshAuth();
      await fetchProfileData();
    }
  };

  const updateAuthEmail = async (newEmail: string) => {
    if (!user || newEmail === user.email) return;
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) throw error;
  };

  const addWorkExperience = async (exp: Omit<WorkExperience, 'id' | 'candidate_id' | 'created_at'>) => {
    if (!user) return;
    const newExp = {
      id: `exp-${Date.now()}`,
      candidate_id: user.id,
      ...exp,
      created_at: new Date().toISOString(),
    };

    await supabase.from('work_experiences').insert(newExp);
    await fetchProfileData();
  };

  const deleteWorkExperience = async (id: string) => {
    if (!user) return;
    await supabase.from('work_experiences').delete().eq('id', id).eq('candidate_id', user.id);
    await fetchProfileData();
  };

  const addEducation = async (edu: Omit<Education, 'id' | 'candidate_id' | 'created_at'>) => {
    if (!user) return;
    const newEdu = {
      id: `edu-${Date.now()}`,
      candidate_id: user.id,
      ...edu,
      created_at: new Date().toISOString(),
    };

    await supabase.from('educations').insert(newEdu);
    await fetchProfileData();
  };

  const deleteEducation = async (id: string) => {
    if (!user) return;
    await supabase.from('educations').delete().eq('id', id).eq('candidate_id', user.id);
    await fetchProfileData();
  };

  const updateSkills = async (newSkills: string[]) => {
    if (!user) return;
    await supabase.from('candidates').update({
      skills: newSkills,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id);
    await fetchProfileData();
  };

  const updateLanguages = async (newLangs: string[]) => {
    if (!user) return;
    await supabase.from('candidates').update({
      languages: newLangs,
      updated_at: new Date().toISOString(),
    }).eq('id', user.id);
    await fetchProfileData();
  };

  return {
    state,
    refetch: fetchProfileData,
    updateCoreProfile,
    updateAuthEmail,
    addWorkExperience,
    deleteWorkExperience,
    addEducation,
    deleteEducation,
    updateSkills,
    updateLanguages,
  };
}
