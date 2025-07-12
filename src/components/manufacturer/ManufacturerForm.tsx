
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { manufacturerService } from '@/services/manufacturerService';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactInfo: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
});

const ManufacturerForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEdit = !!id;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      contactInfo: '',
      website: '',
    },
  });

  // Load data if in edit mode
  useEffect(() => {
    if (isEdit && id) {
      loadManufacturer();
    }
  }, [isEdit, id]);

  const loadManufacturer = async () => {
    try {
      setInitialLoading(true);
      const manufacturer = await manufacturerService.getManufacturerById(id!);
      form.reset({
        name: manufacturer.name,
        contactInfo: manufacturer.contactInfo || '',
        website: manufacturer.website || '',
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load manufacturer",
        variant: "destructive",
      });
      navigate('/manufacturers');
    } finally {
      setInitialLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      
      if (isEdit && id) {
        await manufacturerService.updateManufacturer(id, values);
        toast({
          title: "Manufacturer Updated",
          description: `${values.name} has been updated successfully`,
        });
      } else {
        await manufacturerService.createManufacturer(values);
        toast({
          title: "Manufacturer Created",
          description: `${values.name} has been created successfully`,
        });
      }
      
      navigate('/manufacturers');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEdit ? 'update' : 'create'} manufacturer`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          Loading manufacturer...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate('/manufacturers')} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Manufacturer</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter manufacturer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactInfo"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Contact Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter contact information" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/manufacturers')} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {isEdit ? 'Update' : 'Create'} Manufacturer
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ManufacturerForm;
