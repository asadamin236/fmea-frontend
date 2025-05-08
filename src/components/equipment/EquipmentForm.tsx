
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
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { equipmentData, equipmentTypes, manufacturers, equipmentFunctions, equipmentClasses } from '@/data/equipmentData';
import { EquipmentCriticality, EquipmentSCE, EquipmentFunction } from '@/types/equipment-types';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  equipmentClass: z.string(),
  equipmentType: z.string(),
  criticality: z.string(),
  area: z.string().min(1, 'Area is required'),
  unit: z.string().min(1, 'Unit is required'),
  numberOfUnits: z.coerce.number().min(1, 'Number of units must be at least 1'),
  functionalLocation: z.string().min(1, 'Functional Location is required'),
  functionalLocationFromSAP: z.string(),
  functionalLocationDescriptionFromSAP: z.string(),
  techIdentNoFromSAP: z.string(),
  equipmentNoFromSAP: z.string(),
  equipmentDescriptionFromSAP: z.string(),
  sce: z.string(),
  equipmentDescription: z.string().min(1, 'Equipment Description is required'),
  manufacturer: z.string(),
  model: z.string(),
});

const EquipmentForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const isEdit = !!id;

  const [selectedFunctions, setSelectedFunctions] = useState<EquipmentFunction[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipmentClass: '',
      equipmentType: '',
      criticality: 'medium',
      area: '',
      unit: '',
      numberOfUnits: 1,
      functionalLocation: '',
      functionalLocationFromSAP: '',
      functionalLocationDescriptionFromSAP: '',
      techIdentNoFromSAP: '',
      equipmentNoFromSAP: '',
      equipmentDescriptionFromSAP: '',
      sce: 'No',
      equipmentDescription: '',
      manufacturer: '',
      model: '',
    },
  });

  // Load equipment data if in edit mode
  useEffect(() => {
    if (isEdit) {
      const equipment = equipmentData.find(e => e.id === id);
      if (equipment) {
        form.reset({
          equipmentClass: equipment.equipmentClass,
          equipmentType: equipment.equipmentType,
          criticality: equipment.criticality,
          area: equipment.area,
          unit: equipment.unit,
          numberOfUnits: equipment.numberOfUnits,
          functionalLocation: equipment.functionalLocation,
          functionalLocationFromSAP: equipment.functionalLocationFromSAP,
          functionalLocationDescriptionFromSAP: equipment.functionalLocationDescriptionFromSAP,
          techIdentNoFromSAP: equipment.techIdentNoFromSAP,
          equipmentNoFromSAP: equipment.equipmentNoFromSAP,
          equipmentDescriptionFromSAP: equipment.equipmentDescriptionFromSAP,
          sce: equipment.sce,
          equipmentDescription: equipment.equipmentDescription,
          manufacturer: equipment.manufacturer,
          model: equipment.model,
        });
        setSelectedFunctions(equipment.equipmentFunctions);
      }
    }
  }, [isEdit, id, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, you would save the data to the backend here
    console.log('Form values:', values);
    console.log('Selected functions:', selectedFunctions);
    
    toast({
      title: isEdit ? "Equipment Updated" : "Equipment Created",
      description: `${values.equipmentDescription} has been ${isEdit ? 'updated' : 'created'} successfully`,
    });
    
    navigate('/equipment');
  };

  const toggleFunction = (func: EquipmentFunction) => {
    setSelectedFunctions(currentFunctions => {
      // Check if the function is already selected
      const isSelected = currentFunctions.some(f => f.id === func.id);
      
      // If selected, remove it; otherwise add it
      if (isSelected) {
        return currentFunctions.filter(f => f.id !== func.id);
      } else {
        return [...currentFunctions, func];
      }
    });
  };

  const isFunctionSelected = (funcId: string) => {
    return selectedFunctions.some(f => f.id === funcId);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="outline" onClick={() => navigate('/equipment')} className="mr-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Add'} Equipment</h1>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Equipment Basic Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Equipment Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="equipmentClass"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment Class</FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="flex-grow">
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
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => window.open('/equipment-classes', '_blank')}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment Type</FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="flex-grow">
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Equipment Type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {equipmentTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  {type.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => window.open('/equipment-types', '_blank')}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="criticality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Criticality</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Criticality" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="manufacturer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Manufacturer</FormLabel>
                      <div className="flex items-center space-x-2">
                        <div className="flex-grow">
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Manufacturer" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {manufacturers.map((manufacturer) => (
                                <SelectItem key={manufacturer.id} value={manufacturer.id}>
                                  {manufacturer.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => window.open('/manufacturers', '_blank')}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter model" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="sce"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SCE (Safety Critical Equipment)</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Yes/No" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Yes">Yes</SelectItem>
                          <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipmentDescription"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Equipment Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter equipment description" className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Location Information */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4">Location Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter unit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="numberOfUnits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Units</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter number of units" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="functionalLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter functional location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="functionalLocationFromSAP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Functional Location from SAP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter functional location from SAP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="techIdentNoFromSAP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TechIdent No. from SAP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter TechIdent No. from SAP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="equipmentNoFromSAP"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equipment No. from SAP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter equipment no. from SAP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="functionalLocationDescriptionFromSAP"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Functional Location Description from SAP</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter functional location description from SAP" 
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
                  name="equipmentDescriptionFromSAP"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Equipment Description from SAP</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter equipment description from SAP" 
                          className="resize-none" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          
          {/* Equipment Functions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Equipment Functions</h2>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Select the functions this equipment performs:</p>
              <div className="flex flex-wrap gap-2">
                {equipmentFunctions.map((func) => (
                  <div key={func.id} className="flex items-center">
                    <Checkbox 
                      id={`function-${func.id}`}
                      checked={isFunctionSelected(func.id)}
                      onCheckedChange={() => toggleFunction(func)}
                      className="mr-2"
                    />
                    <label 
                      htmlFor={`function-${func.id}`} 
                      className="text-sm cursor-pointer"
                    >
                      {func.description}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Selected Functions:</p>
              {selectedFunctions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedFunctions.map((func) => (
                    <Badge key={func.id} className="flex items-center gap-1">
                      {func.description}
                      <button 
                        type="button" 
                        onClick={() => toggleFunction(func)}
                        className="text-xs hover:text-red-500"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No functions selected</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" type="button" onClick={() => navigate('/equipment')}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEdit ? 'Update' : 'Create'} Equipment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EquipmentForm;
