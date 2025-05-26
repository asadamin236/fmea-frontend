
import React, { useEffect } from 'react';
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
import { ArrowLeft, Save } from 'lucide-react';
import { equipmentClasses } from '@/data/equipmentData';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  className: z.string().min(1, 'Class name is required'),
  lastReviewed: z.string().optional(),
  reviewerList: z.string().optional(),
  classDescription: z.string().optional(),
  classEngineeringDiscipline: z.string().optional(),
});

const EquipmentClassForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEdit = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: '',
      lastReviewed: '',
      reviewerList: '',
      classDescription: '',
      classEngineeringDiscipline: '',
    },
  });

  // Load data if in edit mode
  useEffect(() => {
    if (isEdit) {
      const equipmentClass = equipmentClasses.find(e => e.id === id);
      if (equipmentClass) {
        form.reset({
          className: equipmentClass.name,
          lastReviewed: '',
          reviewerList: '',
          classDescription: equipmentClass.description || '',
          classEngineeringDiscipline: '',
        });
      }
    }
  }, [isEdit, id, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form values:', values);
    
    toast({
      title: isEdit ? "Equipment Class Updated" : "Equipment Class Created",
      description: `${values.className} has been ${isEdit ? 'updated' : 'created'} successfully`,
    });
    
    navigate('/equipment-classes');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate('/equipment-classes')} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Equipment Class</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <FormField
              control={form.control}
              name="className"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter equipment class name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastReviewed"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Last Reviewed</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      placeholder="Select last reviewed date" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reviewerList"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Reviewer List</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter reviewer names (comma separated)" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="classDescription"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Class Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter class description" 
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
              name="classEngineeringDiscipline"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Class Engineering Discipline</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter engineering discipline" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/equipment-classes')}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? 'Update' : 'Create'} Equipment Class
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentClassForm;
