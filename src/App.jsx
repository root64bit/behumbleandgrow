import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './lib/auth/AuthContext';
import { router } from './routes';
import StagingBanner from './components/StagingBanner';

export default function App() {
  return (
    <AuthProvider>
      <StagingBanner />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
