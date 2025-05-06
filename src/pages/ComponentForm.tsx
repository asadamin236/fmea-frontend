
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

const ComponentForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock component data
  const initialComponent = isEditing ? {
    id: id,
    name: 'Motor Assembly M-452',
    description: 'High-efficiency electric motor assembly for XL pumps',
    type: 'Motor',
    manufacturer: 'ElectroPower Inc.',
    model: 'M-452',
    serialNumber: 'EP-M452-98765',
    criticality: 'High',
    parentProduct: 'Industrial Pump XL450',
    installationDate: '2024-02-15',
    notes: 'Requires specialized lubricant MX-500'
  } : {
    name: '',
    description: '',
    type: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    criticality: '',
    parentProduct: '',
    installationDate: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialComponent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
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

  return (
    <Layout>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Component Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Component Type</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select component type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Motor">Motor</SelectItem>
                      <SelectItem value="Valve">Valve</SelectItem>
                      <SelectItem value="Pump">Pump</SelectItem>
                      <SelectItem value="Control System">Control System</SelectItem>
                      <SelectItem value="Sensor">Sensor</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Manufacturer</Label>
                  <Input 
                    id="manufacturer" 
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input 
                    id="model" 
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input 
                    id="serialNumber" 
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="criticality">Criticality</Label>
                  <Select 
                    value={formData.criticality}
                    onValueChange={(value) => handleSelectChange('criticality', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select criticality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentProduct">Parent Product</Label>
                  <Input 
                    id="parentProduct" 
                    name="parentProduct"
                    value={formData.parentProduct}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installationDate">Installation Date</Label>
                  <Input 
                    id="installationDate" 
                    name="installationDate"
                    type="date"
                    value={formData.installationDate}
                    onChange={handleChange}
                  />
                </div>
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

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/components')}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Component' : 'Create Component'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ComponentForm;
