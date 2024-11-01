import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { GraduationCap, FileText, Users, Settings, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CHESU Doc</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Dashboard
            </Link>

            {user?.role === 'student' && (
              <Link
                to="/requests/create"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/requests/create')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Create Request
              </Link>
            )}

            <Link
              to="/requests"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/requests')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {user?.role === 'student' ? 'My Requests' : 'Manage Requests'}
            </Link>

            {user?.role === 'admin' && (
              <>
                <Link
                  to="/users"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/users')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Users
                </Link>
                <Link
                  to="/templates"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/templates')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Templates
                </Link>
              </>
            )}

            <button
              onClick={logout}
              className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 flex items-center space-x-1"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};