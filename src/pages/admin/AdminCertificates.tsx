
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import { useCertificatesStore, Certificate } from '@/hooks/useCertificatesStore';
import { Edit, Trash2, PlusCircle, LogOut, Home, Certificate as CertificateIcon } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";

const AdminCertificates = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getAllCertificates, addCertificate, updateCertificate, deleteCertificate } = useCertificatesStore();
  
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const certificates = getAllCertificates();
  
  const form = useForm<Certificate>({
    defaultValues: {
      id: '',
      title: '',
      institution: '',
      year: '',
      description: '',
    },
  });
  
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };
  
  const handleDelete = (certificateId: string) => {
    deleteCertificate(certificateId);
    toast({
      title: 'Success',
      description: 'Certificate has been deleted',
    });
  };

  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    form.reset(certificate);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingCertificate(null);
    form.reset({
      id: Date.now().toString(),
      title: '',
      institution: '',
      year: '',
      description: '',
    });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: Certificate) => {
    if (editingCertificate) {
      updateCertificate(data);
      toast({
        title: 'Success',
        description: 'Certificate has been updated',
      });
    } else {
      addCertificate(data);
      toast({
        title: 'Success',
        description: 'Certificate has been added',
      });
    }
    setIsDialogOpen(false);
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
          <h1 className="text-xl font-semibold ml-4">{t('manageCertificates')}</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> {t('signOut')}
        </Button>
      </header>
      
      <main className="container max-w-6xl mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">{t('manageCertificates')}</h2>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAdd}>
              <PlusCircle size={18} className="mr-2" /> {t('addCertificate')}
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('certificateTitle')}</TableHead>
                  <TableHead>{t('institution')}</TableHead>
                  <TableHead>{t('year')}</TableHead>
                  <TableHead>{t('description')}</TableHead>
                  <TableHead className="text-right">{t('actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {t('noCertificatesFound')}
                    </TableCell>
                  </TableRow>
                ) : (
                  certificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell className="font-medium">{certificate.title}</TableCell>
                      <TableCell>{certificate.institution}</TableCell>
                      <TableCell>{certificate.year}</TableCell>
                      <TableCell className="max-w-xs truncate">{certificate.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(certificate)}>
                            <Edit size={16} />
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50">
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t('areYouSure')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t('deleteConfirmation')}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(certificate.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  {t('delete')}
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>
              {editingCertificate ? t('editCertificate') : t('addCertificate')}
            </DialogTitle>
            <DialogDescription>
              {t('certificateFormDescription')}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...form.register('id')} />
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('certificateTitle')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('institution')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('year')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('description')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="submit">
                  {editingCertificate ? t('save') : t('add')}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertificates;
