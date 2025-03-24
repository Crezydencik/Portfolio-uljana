
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthorInfoStore, AuthorInfo } from '@/hooks/useAuthorInfoStore';
import { LogOut, Home, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminAuthorInfo = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getAuthorInfo, updateAuthorInfo } = useAuthorInfoStore();
  
  const currentInfo = getAuthorInfo();
  
  const form = useForm<AuthorInfo>({
    defaultValues: currentInfo,
  });
  
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const onSubmit = (data: AuthorInfo) => {
    updateAuthorInfo(data);
    toast({
      title: 'Success',
      description: 'Author information has been updated',
    });
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
          <h1 className="text-xl font-semibold ml-4">{t('manageAuthorInfo')}</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> {t('signOut')}
        </Button>
      </header>
      
      <main className="container max-w-3xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              {t('authorInformation')}
            </CardTitle>
            <CardDescription>
              {t('authorInfoDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('authorTitle')}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        {t('authorTitleDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('firstParagraph')}</FormLabel>
                      <FormControl>
                        <textarea 
                          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('secondParagraph')}</FormLabel>
                      <FormControl>
                        <textarea 
                          className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                    {t('save')}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminAuthorInfo;
