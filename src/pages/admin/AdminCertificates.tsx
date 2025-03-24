import React, { useState } from 'react';
import { useCertificatesStore } from '@/hooks/useCertificatesStore';
import AdminLayout from '@/components/admin/AdminLayout';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Award, Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const AdminCertificates = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useCertificatesStore();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editCertificateId, setEditCertificateId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddEditCertificate = () => {
    if (editCertificateId) {
      // Edit existing certificate
      updateCertificate(editCertificateId, { title, institution, year, description });
      toast({
        title: 'Success',
        description: 'Certificate updated successfully',
      });
    } else {
      // Add new certificate
      addCertificate({ title, institution, year, description });
      toast({
        title: 'Success',
        description: 'Certificate added successfully',
      });
    }
    setOpen(false);
    clearForm();
  };

  const handleDeleteCertificate = () => {
    if (certificateToDelete) {
      deleteCertificate(certificateToDelete);
      toast({
        title: 'Success',
        description: 'Certificate deleted successfully',
      });
      setIsDeleteDialogOpen(false);
      setCertificateToDelete(null);
    }
  };

  const handleEdit = (id: string) => {
    const certificateToEdit = certificates.find(c => c.id === id);
    if (certificateToEdit) {
      setEditCertificateId(id);
      setTitle(certificateToEdit.title);
      setInstitution(certificateToEdit.institution);
      setYear(certificateToEdit.year);
      setDescription(certificateToEdit.description);
      setOpen(true);
    }
  };

  const clearForm = () => {
    setEditCertificateId(null);
    setTitle('');
    setInstitution('');
    setYear('');
    setDescription('');
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{t('manageCertificates')}</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="primary">
                <Plus className="mr-2 h-4 w-4" />
                {t('addCertificate')}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editCertificateId ? t('editCertificate') : t('addCertificate')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    {t('certificateTitle')}
                  </Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="institution" className="text-right">
                    {t('institution')}
                  </Label>
                  <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="year" className="text-right">
                    {t('year')}
                  </Label>
                  <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="description" className="text-right mt-2">
                    {t('description')}
                  </Label>
                  <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
                </div>
              </div>
              <Button onClick={handleAddEditCertificate}>{editCertificateId ? t('save') : t('add')}</Button>
            </DialogContent>
          </Dialog>
        </div>
        {certificates.length === 0 ? (
          <div className="text-center">
            <AlertCircle className="mx-auto h-6 w-6 text-gray-500 mb-2" />
            <p className="text-gray-500">{t('noCertificatesFound')}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{certificate.title}</h2>
                    <p className="text-sm text-gray-500">{certificate.institution} - {certificate.year}</p>
                    <p className="text-gray-700">{certificate.description}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(certificate.id)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog open={isDeleteDialogOpen === certificate.id} onOpenChange={() => setIsDeleteDialogOpen(isDeleteDialogOpen === certificate.id ? false : certificate.id)}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="icon" onClick={() => setCertificateToDelete(certificate.id)}>
                          <Trash2 className="h-4 w-4" />
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
                          <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>{t('cancel')}</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteCertificate}>{t('delete')}</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCertificates;
