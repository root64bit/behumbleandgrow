import React, { useState } from 'react';
import SuperAdminSidebar from '../components/superadmin/SuperAdminSidebar';
import SuperAdminTopbar from '../components/superadmin/SuperAdminTopbar';
import NotificationDrawer from '../components/superadmin/NotificationDrawer';

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex text-left">
      {/* Sidebar Navigation */}
      <SuperAdminSidebar
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
        <SuperAdminTopbar
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onOpenNotificationDrawer={() => setNotificationDrawerOpen(true)}
          dateRange={dateRange}
          onDateRangeChange={(val) => setDateRange(val)}
        />

        {/* Page Body Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Slide-over Notification Panel */}
      <NotificationDrawer
        open={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
      />
    </div>
  );
}
