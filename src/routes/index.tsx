import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Layouts
import PublicLayout from '../layouts/PublicLayout';
import AuthLayout from '../layouts/AuthLayout';
import CandidateLayout from '../layouts/CandidateLayout';
import OperationsLayout from '../layouts/OperationsLayout';
import RecruiterLayout from '../layouts/RecruiterLayout';
import EmployerLayout from '../layouts/EmployerLayout';
import RecruitmentPartnerLayout from '../layouts/RecruitmentPartnerLayout';

// Route Guards
import { ProtectedRoute, RoleGuard } from '../lib/auth/RouteGuards';
import { SUPER_ADMIN_ROLES, OPERATIONS_ROLES, RECRUITER_ROLES, EMPLOYER_ROLES } from '../lib/permissions/rbac';

// Public Pages
import HomePage from '../pages/public/HomePage';
import EligibilityPage from '../pages/public/EligibilityPage';
import JobsPage from '../pages/public/JobsPage';
import JobDetailPage from '../pages/public/JobDetailPage';

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import VerifyEmailPage from '../pages/auth/VerifyEmailPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';
import PartnerLoginPage from '../pages/auth/PartnerLoginPage';
import EmployerLoginPage from '../pages/auth/EmployerLoginPage';
import OperationsLoginPage from '../pages/auth/OperationsLoginPage';
import InviteAcceptancePage from '../pages/auth/InviteAcceptancePage';
import AccessDeniedPage from '../pages/auth/AccessDeniedPage';

// Candidate Pages
import CandidateDashboardPage from '../pages/candidate/CandidateDashboardPage';
import CandidateOnboardingPage from '../pages/candidate/CandidateOnboardingPage';
import CandidateProfilePage from '../pages/candidate/CandidateProfilePage';
import CandidateDocumentsPage from '../pages/candidate/CandidateDocumentsPage';
import CandidateApplicationsPage from '../pages/candidate/CandidateApplicationsPage';

// Operations Pages
import OperationsDashboardPage from '../pages/operations/OperationsDashboardPage';
import OperationsCandidatesPage from '../pages/operations/OperationsCandidatesPage';
import OperationsCandidateDetailPage from '../pages/operations/OperationsCandidateDetailPage';
import OperationsApplicationsPage from '../pages/operations/OperationsApplicationsPage';

// Recruiter Pages
import RecruiterDashboardPage from '../pages/recruiter/RecruiterDashboardPage';
import RecruiterLeadsPage from '../pages/recruiter/RecruiterLeadsPage';
import RecruiterPipelinePage from '../pages/recruiter/RecruiterPipelinePage';
import RecruiterTeamPage from '../pages/recruiter/RecruiterTeamPage';

// Employer Pages
import EmployerDashboardPage from '../pages/employer/EmployerDashboardPage';

// Super Admin Pages
import SuperAdminDashboardPage from '../pages/superadmin/SuperAdminDashboardPage';

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'eligibility', element: <EligibilityPage /> },
      { path: 'jobs', element: <JobsPage /> },
      { path: 'jobs/:slug', element: <JobDetailPage /> },
    ],
  },

  // Auth Routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'verify-email', element: <VerifyEmailPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'partner/login', element: <PartnerLoginPage /> },
      { path: 'employer/login', element: <EmployerLoginPage /> },
      { path: 'operations/login', element: <OperationsLoginPage /> },
      { path: 'invite/:token', element: <InviteAcceptancePage /> },
      { path: 'access-denied', element: <AccessDeniedPage /> },
    ],
  },

  // Protected Super Admin Routes
  {
    path: '/superadmin',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={SUPER_ADMIN_ROLES}>
          <SuperAdminDashboardPage />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <SuperAdminDashboardPage /> },
      { path: 'dashboard', element: <SuperAdminDashboardPage /> },
      { path: 'users', element: <SuperAdminDashboardPage /> },
      { path: 'organisations', element: <SuperAdminDashboardPage /> },
      { path: 'finance', element: <SuperAdminDashboardPage /> },
      { path: 'security', element: <SuperAdminDashboardPage /> },
      { path: 'settings', element: <SuperAdminDashboardPage /> },
    ],
  },

  // Protected Recruiter / Partner Routes
  {
    path: '/recruiter',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={RECRUITER_ROLES}>
          <RecruitmentPartnerLayout>
            <RecruiterDashboardPage />
          </RecruitmentPartnerLayout>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <RecruiterDashboardPage /> },
      { path: 'dashboard', element: <RecruiterDashboardPage /> },
      { path: 'leads', element: <RecruiterLeadsPage /> },
      { path: 'pipeline', element: <RecruiterPipelinePage /> },
      { path: 'submissions', element: <RecruiterDashboardPage /> },
      { path: 'interviews', element: <RecruiterDashboardPage /> },
      { path: 'offers', element: <RecruiterDashboardPage /> },
      { path: 'placements', element: <RecruiterDashboardPage /> },
      { path: 'team', element: <RecruiterTeamPage /> },
      { path: 'tasks', element: <RecruiterDashboardPage /> },
      { path: 'compliance', element: <RecruiterDashboardPage /> },
    ],
  },

  {
    path: '/partner',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={RECRUITER_ROLES}>
          <RecruitmentPartnerLayout>
            <RecruiterDashboardPage />
          </RecruitmentPartnerLayout>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <RecruiterDashboardPage /> },
      { path: 'dashboard', element: <RecruiterDashboardPage /> },
    ],
  },

  // Protected Candidate Routes
  {
    path: '/candidate',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={['candidate']}>
          <CandidateLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <CandidateDashboardPage /> },
      { path: 'onboarding', element: <CandidateOnboardingPage /> },
      { path: 'profile', element: <CandidateProfilePage /> },
      { path: 'documents', element: <CandidateDocumentsPage /> },
      { path: 'applications', element: <CandidateApplicationsPage /> },
    ],
  },

  // Protected Operations Routes
  {
    path: '/operations',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={OPERATIONS_ROLES}>
          <OperationsLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <OperationsDashboardPage /> },
      { path: 'candidates', element: <OperationsCandidatesPage /> },
      { path: 'candidates/:id', element: <OperationsCandidateDetailPage /> },
      { path: 'applications', element: <OperationsApplicationsPage /> },
    ],
  },

  // Protected Employer Routes
  {
    path: '/employer',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={EMPLOYER_ROLES}>
          <EmployerLayout />
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <EmployerDashboardPage /> }],
  },

  // Fallback Catch-all Redirect
  {
    path: '*',
    element: <PublicLayout />,
    children: [{ path: '*', element: <HomePage /> }],
  },
]);
