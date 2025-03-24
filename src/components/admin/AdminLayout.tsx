
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-purple-600 flex items-center">
            <Home size={20} className="mr-2" /> {t('home')}
          </Link>
          <Link to="/admin/dashboard" className="text-gray-600 hover:text-purple-600 flex items-center ml-4">
            {t('adminDashboard')}
          </Link>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> {t('signOut')}
        </Button>
      </header>
      
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
