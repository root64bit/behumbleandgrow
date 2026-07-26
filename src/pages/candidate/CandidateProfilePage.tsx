import React, { useState } from 'react';
import { useCandidateProfile } from '../../hooks/candidate/useCandidateProfile';
import { CandidateProfileHeader } from '../../components/candidate/profile/CandidateProfileHeader';
import { CandidateProfileSectionNav } from '../../components/candidate/profile/CandidateProfileSectionNav';
import { CandidatePersonalInformationForm } from '../../components/candidate/profile/CandidatePersonalInformationForm';
import { CandidateContactInformationForm } from '../../components/candidate/profile/CandidateContactInformationForm';
import { CandidateProfessionalSummaryForm } from '../../components/candidate/profile/CandidateProfessionalSummaryForm';
import { CandidateWorkExperienceList } from '../../components/candidate/profile/CandidateWorkExperienceList';
import { CandidateEducationList } from '../../components/candidate/profile/CandidateEducationList';
import { CandidateSkillsEditor } from '../../components/candidate/profile/CandidateSkillsEditor';
import { CandidateLanguagesEditor } from '../../components/candidate/profile/CandidateLanguagesEditor';
import { CandidateCertificationsList } from '../../components/candidate/profile/CandidateCertificationsList';
import { CandidateEmploymentPreferencesForm } from '../../components/candidate/profile/CandidateEmploymentPreferencesForm';
import { CandidateRelocationForm } from '../../components/candidate/profile/CandidateRelocationForm';
import { CandidateProfilePhotoEditor } from '../../components/candidate/profile/CandidateProfilePhotoEditor';
import { CandidateProfileSaveBar } from '../../components/candidate/profile/CandidateProfileSaveBar';
import { CandidateProfileSetupState } from '../../components/candidate/profile/CandidateProfileSetupState';
import { CandidateProfileConflictState } from '../../components/candidate/profile/CandidateProfileConflictState';
import { CandidateProfileSectionError } from '../../components/candidate/profile/CandidateProfileSectionError';
import { CandidateProfileSkeleton } from '../../components/candidate/profile/CandidateProfileSkeleton';
import { CandidateProfileErrorState } from '../../components/candidate/profile/CandidateProfileErrorState';

export default function CandidateProfilePage() {
  const {
    state,
    refetch,
    updateCoreProfile,
    updateAuthEmail,
    addWorkExperience,
    deleteWorkExperience,
    addEducation,
    deleteEducation,
    updateSkills,
    updateLanguages,
  } = useCandidateProfile();

  const [activeSection, setActiveSection] = useState('personal');

  if (state.coreProfile.status === 'loading') {
    return <CandidateProfileSkeleton />;
  }

  if (state.coreProfile.status === 'error') {
    return <CandidateProfileErrorState message={state.coreProfile.message} onRetry={refetch} />;
  }

  if (state.isUnprovisioned) {
    return <CandidateProfileSetupState reason="unprovisioned" onRetry={refetch} onInitializeProfile={refetch} />;
  }

  const core = state.coreProfile.data;
  const workExp = state.workExperience.status === 'success' ? state.workExperience.data : [];
  const educations = state.education.status === 'success' ? state.education.data : [];
  const skills = state.skills.status === 'success' ? state.skills.data : [];
  const languages = state.languages.status === 'success' ? state.languages.data : [];
  const certs = state.certifications.status === 'success' ? state.certifications.data : [];
  const preferences = state.preferences.status === 'success' ? state.preferences.data : null;
  const relocation = state.relocation.status === 'success' ? state.relocation.data : null;

  const completedSections = {
    personal: Boolean(core.fullName && core.countryCode),
    contact: Boolean(core.phone),
    summary: Boolean(core.headline || core.bio),
    experience: workExp.length > 0,
    education: educations.length > 0,
    skills: skills.length > 0,
    languages: languages.length > 0,
    preferences: Boolean(preferences?.preferredLocation),
    relocation: Boolean(relocation?.willingToRelocate),
    photo: true,
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 text-left">
      {/* Optimistic Concurrency Conflict Dialog */}
      {state.conflictError && (
        <CandidateProfileConflictState message={state.conflictError} onReload={refetch} />
      )}

      {/* Hero Header & Completion Gauge */}
      <CandidateProfileHeader
        coreProfile={core}
        completionPercent={state.completion.percentage}
        onEditClick={() => setActiveSection('personal')}
        onSubmitVerification={() => {
          window.location.href = '/candidate/documents';
        }}
      />

      {/* Profile Section Navigator */}
      <CandidateProfileSectionNav
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        completedSections={completedSections}
      />

      {/* Active Section Form */}
      <div className="space-y-6">
        {activeSection === 'personal' && (
          <CandidatePersonalInformationForm coreProfile={core} onSave={updateCoreProfile} />
        )}

        {activeSection === 'contact' && (
          <CandidateContactInformationForm
            coreProfile={core}
            onSave={updateCoreProfile}
            onUpdateEmail={updateAuthEmail}
          />
        )}

        {activeSection === 'summary' && (
          <CandidateProfessionalSummaryForm coreProfile={core} onSave={updateCoreProfile} />
        )}

        {activeSection === 'experience' && (
          state.workExperience.status === 'error' ? (
            <CandidateProfileSectionError
              sectionName="Work Experience"
              errorMessage={state.workExperience.message}
              onRetry={refetch}
            />
          ) : (
            <CandidateWorkExperienceList
              experiences={workExp}
              onAdd={addWorkExperience}
              onDelete={deleteWorkExperience}
            />
          )
        )}

        {activeSection === 'education' && (
          state.education.status === 'error' ? (
            <CandidateProfileSectionError
              sectionName="Education"
              errorMessage={state.education.message}
              onRetry={refetch}
            />
          ) : (
            <CandidateEducationList
              educations={educations}
              onAdd={addEducation}
              onDelete={deleteEducation}
            />
          )
        )}

        {activeSection === 'skills' && (
          <CandidateSkillsEditor skills={skills} onSave={updateSkills} />
        )}

        {activeSection === 'languages' && (
          <CandidateLanguagesEditor languages={languages} onSave={updateLanguages} />
        )}

        {activeSection === 'certifications' && (
          <CandidateCertificationsList certifications={certs} />
        )}

        {activeSection === 'preferences' && (
          <CandidateEmploymentPreferencesForm
            preferences={preferences}
            onSave={async (data) => console.log('Saved preferences', data)}
          />
        )}

        {activeSection === 'relocation' && (
          <CandidateRelocationForm
            relocation={relocation}
            onSave={async (data) => console.log('Saved relocation', data)}
          />
        )}

        {activeSection === 'photo' && (
          <CandidateProfilePhotoEditor candidateName={core.fullName} />
        )}
      </div>

      {/* Global Sticky Save Bar for Core Profile Fields */}
      <CandidateProfileSaveBar
        hasUnsavedChanges={state.hasUnsavedChanges}
        lastSavedAt={state.lastSavedAt}
        saving={false}
      />
    </div>
  );
}
