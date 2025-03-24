
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import { useContactStore, ContactInfo } from '@/hooks/useContactStore';
import { LogOut, Home, Mail, Phone, MapPin, LinkedinIcon, InstagramIcon, FacebookIcon, TwitterIcon } from 'lucide-react';
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

const AdminContact = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { getContactInfo, updateContactInfo } = useContactStore();
  
  const currentInfo = getContactInfo();
  
  // Преобразуем структуру для работы с формой
  const formDefaultValues = {
    email: currentInfo.email,
    phone: currentInfo.phone || '',
    location: currentInfo.location || '',
    facebook: currentInfo.socials.facebook || '',
    instagram: currentInfo.socials.instagram || '',
    linkedin: currentInfo.socials.linkedin || '',
    twitter: currentInfo.socials.twitter || '',
  };
  
  type FormValues = typeof formDefaultValues;
  
  const form = useForm<FormValues>({
    defaultValues: formDefaultValues,
  });
  
  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const onSubmit = (data: FormValues) => {
    // Преобразуем обратно в структуру ContactInfo
    const updatedInfo: ContactInfo = {
      email: data.email,
      phone: data.phone ? data.phone : undefined,
      location: data.location ? data.location : undefined,
      socials: {
        facebook: data.facebook ? data.facebook : undefined,
        instagram: data.instagram ? data.instagram : undefined,
        linkedin: data.linkedin ? data.linkedin : undefined,
        twitter: data.twitter ? data.twitter : undefined
      }
    };
    
    updateContactInfo(updatedInfo);
    toast({
      title: 'Success',
      description: 'Contact information has been updated',
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
          <h1 className="text-xl font-semibold ml-4">{t('manageContactInfo')}</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} className="flex items-center">
          <LogOut size={16} className="mr-2" /> {t('signOut')}
        </Button>
      </header>
      
      <main className="container max-w-3xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-6 w-6" />
              {t('contactInformation')}
            </CardTitle>
            <CardDescription>
              {t('contactInfoDescription')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t('basicContactInfo')}</h3>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" /> {t('email')}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" /> {t('phone')}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          {t('phoneOptional')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> {t('location')}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          {t('locationOptional')}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">{t('socialMedia')}</h3>
                  
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <FacebookIcon className="h-4 w-4" /> Facebook
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://facebook.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <InstagramIcon className="h-4 w-4" /> Instagram
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://instagram.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <LinkedinIcon className="h-4 w-4" /> LinkedIn
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://linkedin.com/in/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <TwitterIcon className="h-4 w-4" /> Twitter
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="https://twitter.com/..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
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

export default AdminContact;
