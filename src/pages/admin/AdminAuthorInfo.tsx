
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthorInfoStore, AuthorInfo } from '@/hooks/useAuthorInfoStore';
import { User } from 'lucide-react';
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
import AdminLayout from '@/components/admin/AdminLayout';
import RichTextEditor from '@/components/RichTextEditor';

const AdminAuthorInfo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { getAuthorInfo, updateAuthorInfo } = useAuthorInfoStore();
  
  const currentInfo = getAuthorInfo();
  
  const form = useForm<AuthorInfo>({
    defaultValues: currentInfo,
  });
  
  const onSubmit = (data: AuthorInfo) => {
    updateAuthorInfo(data);
    toast({
      title: t('success') || 'Success',
      description: t('authorInfoUpdated') || 'Author information has been updated',
    });
  };
  
  return (
    <AdminLayout>
      <div className="container max-w-3xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-6 w-6" />
              {t('authorInformation')}
            </CardTitle>
            <CardDescription>
              {t('aboutManageDescription')}
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
                        <RichTextEditor 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={t('firstParagraph')}
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
                        <RichTextEditor 
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={t('secondParagraph')}
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
      </div>
    </AdminLayout>
  );
};

export default AdminAuthorInfo;
