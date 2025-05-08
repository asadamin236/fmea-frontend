
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus, X, Save } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Mock data for component modules
const initialModules = [
  { id: '1', name: 'Motor' },
  { id: '2', name: 'Valve' },
  { id: '3', name: 'Pump' },
  { id: '4', name: 'Control System' },
  { id: '5', name: 'Sensor' },
];

const ComponentForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock component data
  const initialComponent = isEditing ? {
    id: id,
    name: 'Motor Assembly M-452',
    description: 'High-efficiency electric motor assembly for XL pumps',
    modules: ['1', '3'] // Pre-selected module IDs
  } : {
    name: '',
    description: '',
    modules: []
  };

  const [formData, setFormData] = useState(initialComponent);
  const [modules, setModules] = useState(initialModules);
  const [newModule, setNewModule] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting component:', formData);
    
    toast({
      title: isEditing ? "Component Updated" : "Component Created",
      description: isEditing 
        ? `Component ${formData.name} has been updated successfully` 
        : `Component ${formData.name} has been created successfully`,
    });
    
    navigate('/components');
  };

  const toggleModule = (moduleId: string) => {
    setFormData(prev => {
      const currentModules = prev.modules || [];
      if (currentModules.includes(moduleId)) {
        return { ...prev, modules: currentModules.filter(id => id !== moduleId) };
      } else {
        return { ...prev, modules: [...currentModules, moduleId] };
      }
    });
  };

  const isModuleSelected = (moduleId: string) => {
    return formData.modules?.includes(moduleId) || false;
  };

  const addNewModule = () => {
    if (newModule.trim()) {
      const newId = (modules.length + 1).toString();
      const newModuleObj = { id: newId, name: newModule.trim() };
      setModules(prev => [...prev, newModuleObj]);
      setNewModule('');
      
      // Auto-select the newly added module
      setFormData(prev => ({
        ...prev,
        modules: [...(prev.modules || []), newId]
      }));
      
      toast({
        title: "Module Added",
        description: `Module "${newModule}" has been added successfully`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link to="/components">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Components
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{isEditing ? 'Edit Component' : 'Create New Component'}</h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Component Details' : 'Enter Component Details'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">System Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </div>

            {/* Module Selection */}
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 space-y-4">
              <div>
                <Label htmlFor="moduleSelection">Component Modules</Label>
                <div className="flex gap-2 mt-2">
                  <Input 
                    id="newModule"
                    placeholder="Add new module" 
                    value={newModule}
                    onChange={(e) => setNewModule(e.target.value)}
                    className="flex-grow"
                  />
                  <Button 
                    type="button" 
                    onClick={addNewModule}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>

              <div>
                <Label>Available Modules</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {modules.map((module) => (
                    <div key={module.id} className="flex items-center">
                      <Checkbox 
                        id={`module-${module.id}`}
                        checked={isModuleSelected(module.id)}
                        onCheckedChange={() => toggleModule(module.id)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`module-${module.id}`} 
                        className="text-sm cursor-pointer"
                      >
                        {module.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Selected Modules</Label>
                <div className="mt-2">
                  {formData.modules && formData.modules.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.modules.map((moduleId) => {
                        const module = modules.find(m => m.id === moduleId);
                        return module ? (
                          <Badge key={moduleId} className="flex items-center gap-1">
                            {module.name}
                            <button 
                              type="button" 
                              onClick={() => toggleModule(moduleId)}
                              className="text-xs hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No modules selected</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate('/components')}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update Component' : 'Create Component'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ComponentForm;
