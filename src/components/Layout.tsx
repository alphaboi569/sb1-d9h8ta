import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from './Navbar';
import { Dashboard } from './Dashboard';
import { Login } from './Login';
import { CreateRequest } from './CreateRequest';
import { RequestList } from './RequestList';
import { UserManagement } from './UserManagement';
import { DocumentTemplates } from './DocumentTemplates';
import { GraduationCap, FileText, Users, Settings } from 'lucide-react';

export const Layout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/requests/create" element={<CreateRequest />} />
          <Route path="/requests" element={<RequestList />} />
          {user?.role === 'admin' && (
            <>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/templates" element={<DocumentTemplates />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};