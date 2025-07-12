
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import { ContributorDashboard } from '@/components/dashboard/ContributorDashboard';
import { TemplateEditorDashboard } from '@/components/dashboard/TemplateEditorDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

export const Dashboard = () => {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case 'contributor':
    case 'guest':
      return <ContributorDashboard />;
    case 'template-editor':
      return <TemplateEditorDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <ContributorDashboard />;
  }
};
