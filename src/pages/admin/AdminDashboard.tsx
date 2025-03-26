
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Link } from 'react-router-dom';
import { BookOpen, Award, User, Phone, Brush, Database } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MongoDBConfig from '@/components/admin/MongoDBConfig';

const AdminDashboard = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">{t('adminDashboard')}</h1>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          
          {/* Projects */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                {t('manageProjects')}
              </CardTitle>
              <CardDescription>
                {t('projectsManageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t('projects')}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
              <Link to="/admin/projectinfo">
                  Manage project
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                {t('manageCertificates')}
              </CardTitle>
              <CardDescription>
                {t('certificatesManageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t('certificatesTitle')}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/certificates">
                  {t('manageCertificates')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Author Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {t('manageAuthorInfo')}
              </CardTitle>
              <CardDescription>
                {t('aboutManageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t('authorInformation')}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/author-info">
                  {t('manageAuthorInfo')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {t('manageContactInfo')}
              </CardTitle>
              <CardDescription>
                {t('contactManageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t('contactInformation')}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/contact-info">
                  {t('manageContactInfo')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brush className="h-5 w-5 mr-2" />
                {t('manageSkills')}
              </CardTitle>
              <CardDescription>
                {t('skillsManageDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">
                {t('mySkills')}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/admin/skills">
                  {t('manageSkills')}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
