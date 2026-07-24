import React, { useState } from 'react';
import CandidateSidebar from '../components/candidate/CandidateSidebar';
import CandidateTopbar from '../components/candidate/CandidateTopbar';
import CandidateBottomNavigation from '../components/candidate/CandidateBottomNavigation';
import NotificationDrawer from '../components/superadmin/NotificationDrawer';

interface CandidateLayoutProps {
  children: React.ReactNode;
}

export default function CandidateLayout({ children }: CandidateLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex text-left pb-16 lg:pb-0">
      {/* Sidebar Navigation */}
      <CandidateSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Sticky Topbar */}
        <CandidateTopbar
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenNotificationDrawer={() => setNotificationDrawerOpen(true)}
        />

        {/* Page Body Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <CandidateBottomNavigation />

      {/* Slide-over Notification Panel */}
      <NotificationDrawer
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
    </div>
  );
}
