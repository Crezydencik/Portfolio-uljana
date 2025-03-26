import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import { useProjectStore } from '@/hooks/useProjectStore';
import {
  Edit,
  Trash2,
  PlusCircle,
  LogOut,
  Film,
  Image,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const AdminProjectinfo = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getAllProjects, deleteProject } = useProjectStore();

  const projects = getAllProjects();

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleDelete = (projectId: string) => {
    deleteProject(projectId);
    toast({
      title: 'Success',
      description: 'Project has been deleted',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-purple-600 flex items-center">
            <Home size={20} className="mr-2" /> {t('home')}
          </Link>
          <h1 className="text-xl font-semibold">{t('adminDashboard')}</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> {t('signOut')}
        </Button>
      </header>

      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{t('manageProjects')}</h2>
            <Link to="/admin/project/new">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <PlusCircle size={18} className="mr-2" /> {t('addProject')}
              </Button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('projectId')}</TableHead>
                  <TableHead>{t('title')}</TableHead>
                  <TableHead>{t('category')}</TableHead>
                  <TableHead>{t('date')}</TableHead>
                  <TableHead>{t('content')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No projects found. Create a new project to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-mono text-sm">{project.id}</TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>{project.category}</TableCell>
                      <TableCell>{project.date}</TableCell>
                      <TableCell className="flex space-x-1">
                        {project.mediaType?.includes('photo') && (
                          <span className="inline-flex items-center text-purple-600">
                            <Image size={16} />
                          </span>
                        )}
                        {project.mediaType?.includes('video') && (
                          <span className="inline-flex items-center text-red-600">
                            <Film size={16} />
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Link to={`/admin/project/${project.id}`}>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit size={16} />
                            </Button>
                          </Link>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the project.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(project.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {t('deleteProject')}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProjectinfo;
