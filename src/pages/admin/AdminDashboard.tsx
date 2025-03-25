
import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Folder, User, Mail, Award } from 'lucide-react';

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-6">{t('adminDashboard')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Projects Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-4 w-4" />
                {t('manageProjects')}
              </CardTitle>
              <CardDescription>{t('projectsManageDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('manageProjects')} {t('projects')}
            </CardContent>
            <CardFooter>
              <Link to="/admin/project/new">
                <Button>{t('addProject')}</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Manage Certificates Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                {t('manageCertificates')}
              </CardTitle>
              <CardDescription>{t('certificatesManageDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('addCertificate')}, {t('editCertificate')}, {t('delete')}
            </CardContent>
            <CardFooter>
              <Link to="/admin/certificates">
                <Button>{t('manageCertificates')}</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Manage Author Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {t('manageAuthorInfo')}
              </CardTitle>
              <CardDescription>{t('aboutManageDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('authorInformation')}
            </CardContent>
            <CardFooter>
              <Link to="/admin/author-info">
                <Button>{t('manageAuthorInfo')}</Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Manage Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {t('manageContactInfo')}
              </CardTitle>
              <CardDescription>{t('contactManageDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {t('contactInfoDescription')}
            </CardContent>
            <CardFooter>
              <Link to="/admin/contact-info">
                <Button>{t('manageContactInfo')}</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
