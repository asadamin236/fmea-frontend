
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { equipmentClasses, tasks } from '@/data/equipmentData';

const taskSchema = z.object({
  taskList: z.string().min(1, 'Task list is required'),
  sapGTL: z.string().min(1, 'SAP GTL is required'),
  mainWorkCenter: z.string().min(1, 'Main work center is required'),
  interval: z.string().min(1, 'Interval is required'),
  taskType: z.enum(['PM', 'PPM', 'CM', 'Other']),
  taskDescription: z.string().min(1, 'Task description is required'),
  numberOfPerson: z.number().min(1, 'Number of persons must be at least 1'),
  manHour: z.number().min(0.1, 'Man hours must be greater than 0'),
  equipmentClassId: z.string().min(1, 'Equipment class is required'),
});

type TaskFormData = z.infer<typeof taskSchema>;

const TaskForm: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const existingTask = isEdit ? tasks.find(t => t.id === id) : null;

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      taskList: existingTask?.taskList || '',
      sapGTL: existingTask?.sapGTL || '',
      mainWorkCenter: existingTask?.mainWorkCenter || '',
      interval: existingTask?.interval || '',
      taskType: existingTask?.taskType || 'PM',
      taskDescription: existingTask?.taskDescription || '',
      numberOfPerson: existingTask?.numberOfPerson || 1,
      manHour: existingTask?.manHour || 1,
      equipmentClassId: existingTask?.equipmentClassId || '',
    },
  });

  const onSubmit = (data: TaskFormData) => {
    console.log('Task form submitted:', data);
    
    toast({
      title: isEdit ? "Task Updated" : "Task Created",
      description: `Task "${data.taskDescription}" has been ${isEdit ? 'updated' : 'created'} successfully`,
    });
    
    navigate('/tasks');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit Task' : 'Add New Task'}</h1>
      </div>

      <div className="bg-white p-6 rounded-md shadow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="taskList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task List</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task list" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sapGTL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SAP GTL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SAP GTL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mainWorkCenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Work Center</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter work center" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interval</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Monthly, Quarterly" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taskType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select task type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PM">PM</SelectItem>
                        <SelectItem value="PPM">PPM</SelectItem>
                        <SelectItem value="CM">CM</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="equipmentClassId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Class</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select equipment class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {equipmentClasses.map((equipmentClass) => (
                          <SelectItem key={equipmentClass.id} value={equipmentClass.id}>
                            {equipmentClass.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Persons</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Man Hours</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        min="0.1" 
                        {...field} 
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="taskDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter detailed task description" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button type="submit">
                {isEdit ? 'Update Task' : 'Create Task'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate('/tasks')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default TaskForm;
