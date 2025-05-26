
import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { equipmentTypes, equipmentClasses } from '@/data/equipmentData';
import { useToast } from '@/components/ui/use-toast';
import { System, Component, Subcomponent } from '@/types/equipment-types';

const formSchema = z.object({
  name: z.string().min(1, 'Equipment boundary name is required'),
  description: z.string().optional(),
  equipmentClassId: z.string().min(1, 'Equipment class is required'),
});

const EquipmentTypeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEdit = !!id;
  
  const [systems, setSystems] = useState<System[]>([
    {
      id: '1',
      name: '',
      components: []
    }
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      equipmentClassId: '',
    },
  });

  useEffect(() => {
    if (isEdit) {
      const equipmentType = equipmentTypes.find(e => e.id === id);
      if (equipmentType) {
        form.reset({
          name: equipmentType.name,
          description: equipmentType.description || '',
          equipmentClassId: equipmentType.equipmentClassId || '',
        });
        if (equipmentType.systems) {
          setSystems(equipmentType.systems);
        }
      }
    }
  }, [isEdit, id, form]);

  const addSystem = () => {
    setSystems([...systems, {
      id: Date.now().toString(),
      name: '',
      components: []
    }]);
  };

  const removeSystem = (systemId: string) => {
    setSystems(systems.filter(s => s.id !== systemId));
  };

  const updateSystem = (systemId: string, name: string) => {
    setSystems(systems.map(s => 
      s.id === systemId ? { ...s, name } : s
    ));
  };

  const addComponent = (systemId: string) => {
    setSystems(systems.map(s => 
      s.id === systemId 
        ? { 
            ...s, 
            components: [...s.components, {
              id: Date.now().toString(),
              name: '',
              subcomponents: [],
              remarks: ''
            }]
          }
        : s
    ));
  };

  const removeComponent = (systemId: string, componentId: string) => {
    setSystems(systems.map(s => 
      s.id === systemId 
        ? { ...s, components: s.components.filter(c => c.id !== componentId) }
        : s
    ));
  };

  const updateComponent = (systemId: string, componentId: string, field: keyof Component, value: string) => {
    setSystems(systems.map(s => 
      s.id === systemId 
        ? { 
            ...s, 
            components: s.components.map(c => 
              c.id === componentId ? { ...c, [field]: value } : c
            )
          }
        : s
    ));
  };

  const addSubcomponent = (systemId: string, componentId: string) => {
    setSystems(systems.map(s => 
      s.id === systemId 
        ? { 
            ...s, 
            components: s.components.map(c => 
              c.id === componentId 
                ? { 
                    ...c, 
                    subcomponents: [...c.subcomponents, {
                      id: Date.now().toString(),
                      name: '',
                      remarks: ''
                    }]
                  }
                : c
            )
          }
        : s
    ));
  };

  const removeSubcomponent = (systemId: string, componentId: string, subcomponentId: string) => {
    setSystems(systems.map(s => 
      s.id === systemId 
        ? { 
            ...s, 
            components: s.components.map(c => 
              c.id === componentId 
                ? { ...c, subcomponents: c.subcomponents.filter(sc => sc.id !== subcomponentId) }
                : c
            )
          }
        : s
    ));
  };

  const updateSubcomponent = (systemId: string, componentId: string, subcomponentId: string, field: keyof Subcomponent, value: string) => {
    setSystems(systems.map(s => 
      s.id === systemId 
        ? { 
            ...s, 
            components: s.components.map(c => 
              c.id === componentId 
                ? { 
                    ...c, 
                    subcomponents: c.subcomponents.map(sc => 
                      sc.id === subcomponentId ? { ...sc, [field]: value } : sc
                    )
                  }
                : c
            )
          }
        : s
    ));
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('Form values:', values);
    console.log('Systems:', systems);
    
    toast({
      title: isEdit ? "Equipment Boundary Updated" : "Equipment Boundary Created",
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
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Equipment Boundary</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="equipmentClassId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Class</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Equipment Class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {equipmentClasses.map((equipClass) => (
                          <SelectItem key={equipClass.id} value={equipClass.id}>
                            {equipClass.name}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Boundary Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter equipment boundary name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Systems, Components, and Subcomponents */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Systems & Components</h2>
              <Button type="button" onClick={addSystem} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add System
              </Button>
            </div>
            
            <div className="space-y-6">
              {systems.map((system, systemIndex) => (
                <div key={system.id} className="border p-4 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">System Name</label>
                      <Input
                        placeholder="Enter system name"
                        value={system.name}
                        onChange={(e) => updateSystem(system.id, e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSystem(system.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground mt-6"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="ml-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Components</h4>
                      <Button
                        type="button"
                        onClick={() => addComponent(system.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="mr-1 h-3 w-3" />
                        Add Component
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {system.components.map((component) => (
                        <div key={component.id} className="border-l-2 border-gray-200 pl-4">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-1">Component Name</label>
                              <Input
                                placeholder="Enter component name"
                                value={component.name}
                                onChange={(e) => updateComponent(system.id, component.id, 'name', e.target.value)}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-sm font-medium mb-1">Component Remarks</label>
                              <Input
                                placeholder="Enter remarks"
                                value={component.remarks || ''}
                                onChange={(e) => updateComponent(system.id, component.id, 'remarks', e.target.value)}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeComponent(system.id, component.id)}
                              className="text-destructive hover:bg-destructive hover:text-destructive-foreground mt-6"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <div className="ml-4">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="text-sm font-medium">Subcomponents</h5>
                              <Button
                                type="button"
                                onClick={() => addSubcomponent(system.id, component.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Plus className="mr-1 h-3 w-3" />
                                Add Subcomponent
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              {component.subcomponents.map((subcomponent) => (
                                <div key={subcomponent.id} className="flex items-center gap-2">
                                  <div className="flex-1">
                                    <Input
                                      placeholder="Subcomponent name"
                                      value={subcomponent.name}
                                      onChange={(e) => updateSubcomponent(system.id, component.id, subcomponent.id, 'name', e.target.value)}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <Input
                                      placeholder="Subcomponent remarks"
                                      value={subcomponent.remarks || ''}
                                      onChange={(e) => updateSubcomponent(system.id, component.id, subcomponent.id, 'remarks', e.target.value)}
                                    />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeSubcomponent(system.id, component.id, subcomponent.id)}
                                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/equipment-types')}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? 'Update' : 'Create'} Equipment Boundary
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentTypeForm;
