import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

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

// Lazy Load helper
const Lazy = ({ component: Component }: { component: React.ComponentType }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-300">Loading module...</p>
      </div>
    </div>
  }>
    <Component />
  </Suspense>
);

// Public Pages
const HomePage = lazy(() => import('../pages/public/HomePage'));
const EligibilityPage = lazy(() => import('../pages/public/EligibilityPage'));
const JobsPage = lazy(() => import('../pages/public/JobsPage'));
const JobDetailPage = lazy(() => import('../pages/public/JobDetailPage'));

// Auth Pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const VerifyEmailPage = lazy(() => import('../pages/auth/VerifyEmailPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));
const PartnerLoginPage = lazy(() => import('../pages/auth/PartnerLoginPage'));
const EmployerLoginPage = lazy(() => import('../pages/auth/EmployerLoginPage'));
const OperationsLoginPage = lazy(() => import('../pages/auth/OperationsLoginPage'));
const InviteAcceptancePage = lazy(() => import('../pages/auth/InviteAcceptancePage'));
const AccessDeniedPage = lazy(() => import('../pages/auth/AccessDeniedPage'));

// Candidate Pages
const CandidateDashboardPage = lazy(() => import('../pages/candidate/CandidateDashboardPage'));
const CandidateOnboardingPage = lazy(() => import('../pages/candidate/CandidateOnboardingPage'));
const CandidateProfilePage = lazy(() => import('../pages/candidate/CandidateProfilePage'));
const CandidateDocumentsPage = lazy(() => import('../pages/candidate/CandidateDocumentsPage'));
const CandidateApplicationsPage = lazy(() => import('../pages/candidate/CandidateApplicationsPage'));
const CandidateInterviewsPage = lazy(() => import('../pages/candidate/CandidateInterviewsPage'));
const CandidateOffersPage = lazy(() => import('../pages/candidate/CandidateOffersPage'));
const CandidatePlacementPage = lazy(() => import('../pages/candidate/CandidatePlacementPage'));
const CandidateSupportPage = lazy(() => import('../pages/candidate/CandidateSupportPage'));
const CandidateSettingsPage = lazy(() => import('../pages/candidate/CandidateSettingsPage'));

// Operations Pages
const OperationsDashboardPage = lazy(() => import('../pages/operations/OperationsDashboardPage'));
const OperationsCandidatesPage = lazy(() => import('../pages/operations/OperationsCandidatesPage'));
const OperationsCandidateDetailPage = lazy(() => import('../pages/operations/OperationsCandidateDetailPage'));
const OperationsApplicationsPage = lazy(() => import('../pages/operations/OperationsApplicationsPage'));

// Recruiter Pages
const RecruiterDashboardPage = lazy(() => import('../pages/recruiter/RecruiterDashboardPage'));
const RecruiterLeadsPage = lazy(() => import('../pages/recruiter/RecruiterLeadsPage'));
const RecruiterPipelinePage = lazy(() => import('../pages/recruiter/RecruiterPipelinePage'));
const RecruiterTeamPage = lazy(() => import('../pages/recruiter/RecruiterTeamPage'));

// Employer Pages
const EmployerDashboardPage = lazy(() => import('../pages/employer/EmployerDashboardPage'));

// Super Admin Pages
const SuperAdminDashboardPage = lazy(() => import('../pages/superadmin/SuperAdminDashboardPage'));

export const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Lazy component={HomePage} /> },
      { path: 'eligibility', element: <Lazy component={EligibilityPage} /> },
      { path: 'jobs', element: <Lazy component={JobsPage} /> },
      { path: 'jobs/:slug', element: <Lazy component={JobDetailPage} /> },
    ],
  },

  // Auth Routes
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Lazy component={LoginPage} /> },
      { path: 'register', element: <Lazy component={RegisterPage} /> },
      { path: 'verify-email', element: <Lazy component={VerifyEmailPage} /> },
      { path: 'forgot-password', element: <Lazy component={ForgotPasswordPage} /> },
      { path: 'reset-password', element: <Lazy component={ResetPasswordPage} /> },
      { path: 'partner/login', element: <Lazy component={PartnerLoginPage} /> },
      { path: 'employer/login', element: <Lazy component={EmployerLoginPage} /> },
      { path: 'operations/login', element: <Lazy component={OperationsLoginPage} /> },
      { path: 'invite/:token', element: <Lazy component={InviteAcceptancePage} /> },
      { path: 'access-denied', element: <Lazy component={AccessDeniedPage} /> },
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
      { index: true, element: <Lazy component={SuperAdminDashboardPage} /> },
      { path: 'dashboard', element: <Lazy component={SuperAdminDashboardPage} /> },
      { path: 'users', element: <Lazy component={SuperAdminDashboardPage} /> },
      { path: 'organisations', element: <Lazy component={SuperAdminDashboardPage} /> },
      { path: 'finance', element: <Lazy component={SuperAdminDashboardPage} /> },
      { path: 'security', element: <Lazy component={SuperAdminDashboardPage} /> },
      { path: 'settings', element: <Lazy component={SuperAdminDashboardPage} /> },
    ],
  },

  // Protected Recruiter / Partner Routes
  {
    path: '/recruiter',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={RECRUITER_ROLES}>
          <RecruitmentPartnerLayout>
            <Outlet />
          </RecruitmentPartnerLayout>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'dashboard', element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'leads', element: <Lazy component={RecruiterLeadsPage} /> },
      { path: 'pipeline', element: <Lazy component={RecruiterPipelinePage} /> },
      { path: 'submissions', element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'interviews', element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'offers', element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'placements', element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'team', element: <Lazy component={RecruiterTeamPage} /> },
      { path: 'tasks', element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'compliance', element: <Lazy component={RecruiterDashboardPage} /> },
    ],
  },

  {
    path: '/partner',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={RECRUITER_ROLES}>
          <RecruitmentPartnerLayout>
            <Outlet />
          </RecruitmentPartnerLayout>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy component={RecruiterDashboardPage} /> },
      { path: 'dashboard', element: <Lazy component={RecruiterDashboardPage} /> },
    ],
  },

  // Protected Candidate Routes
  {
    path: '/candidate',
    element: (
      <ProtectedRoute requireEmailVerified={false}>
        <RoleGuard allowedRoles={['candidate']}>
          <CandidateLayout>
            <Outlet />
          </CandidateLayout>
        </RoleGuard>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Lazy component={CandidateDashboardPage} /> },
      { path: 'dashboard', element: <Lazy component={CandidateDashboardPage} /> },
      { path: 'onboarding', element: <Lazy component={CandidateOnboardingPage} /> },
      { path: 'profile', element: <Lazy component={CandidateProfilePage} /> },
      { path: 'documents', element: <Lazy component={CandidateDocumentsPage} /> },
      { path: 'applications', element: <Lazy component={CandidateApplicationsPage} /> },
      { path: 'jobs', element: <Lazy component={JobsPage} /> },
      { path: 'jobs/:slug', element: <Lazy component={JobDetailPage} /> },
      { path: 'saved-jobs', element: <Lazy component={JobsPage} /> },
      { path: 'interviews', element: <Lazy component={CandidateInterviewsPage} /> },
      { path: 'offers', element: <Lazy component={CandidateOffersPage} /> },
      { path: 'placement', element: <Lazy component={CandidatePlacementPage} /> },
      { path: 'support', element: <Lazy component={CandidateSupportPage} /> },
      { path: 'settings', element: <Lazy component={CandidateSettingsPage} /> },
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
      { index: true, element: <Lazy component={OperationsDashboardPage} /> },
      { path: 'candidates', element: <Lazy component={OperationsCandidatesPage} /> },
      { path: 'candidates/:id', element: <Lazy component={OperationsCandidateDetailPage} /> },
      { path: 'applications', element: <Lazy component={OperationsApplicationsPage} /> },
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
    children: [{ index: true, element: <Lazy component={EmployerDashboardPage} /> }],
  },

  // Fallback Catch-all Redirect
  {
    path: '*',
    element: <PublicLayout />,
    children: [{ path: '*', element: <Lazy component={HomePage} /> }],
  },
]);
