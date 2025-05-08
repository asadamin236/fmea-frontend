
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
import { equipmentTypes } from '@/data/equipmentData';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
});

const EquipmentTypeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEdit = !!id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  // Load data if in edit mode
  useEffect(() => {
    if (isEdit) {
      const equipmentType = equipmentTypes.find(e => e.id === id);
      if (equipmentType) {
        form.reset({
          name: equipmentType.name,
          description: equipmentType.description || '',
        });
      }
    }
  }, [isEdit, id, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form values:', values);
    
    toast({
      title: isEdit ? "Equipment Type Updated" : "Equipment Type Created",
      description: `${values.name} has been ${isEdit ? 'updated' : 'created'} successfully`,
    });
    
    navigate('/equipment-types');
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate('/equipment-types')} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Equipment Type</h1>
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
                    <Input placeholder="Enter equipment type name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter description" 
                      className="resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/equipment-types')}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? 'Update' : 'Create'} Equipment Type
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentTypeForm;
