
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

const SparePartForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock spare part data
  const initialSparePart = isEditing ? {
    id: id,
    name: 'Bearing Kit BK-45',
    partNumber: 'BK-45-789',
    description: 'High-temperature bearings for M-452 motor',
    manufacturer: 'BearingTech',
    supplier: 'IndustrialSupplies Inc.',
    cost: '245.00',
    currency: 'USD',
    leadTime: '14',
    stockLevel: '5',
    minStockLevel: '3',
    location: 'Warehouse B - Shelf 12',
    relatedComponents: 'Motor Assembly M-452',
    notes: 'Order in packs of 2 for better pricing'
  } : {
    name: '',
    partNumber: '',
    description: '',
    manufacturer: '',
    supplier: '',
    cost: '',
    currency: 'USD',
    leadTime: '',
    stockLevel: '',
    minStockLevel: '',
    location: '',
    relatedComponents: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialSparePart);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting spare part:', formData);
    
    toast({
      title: isEditing ? "Spare Part Updated" : "Spare Part Created",
      description: isEditing 
        ? `Spare part ${formData.name} has been updated successfully` 
        : `Spare part ${formData.name} has been created successfully`,
    });
    
    navigate('/spare-parts');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/spare-parts">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Spare Parts
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Spare Part' : 'Create New Spare Part'}</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Spare Part Details' : 'Enter Spare Part Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Part Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="partNumber">Part Number</Label>
                  <Input 
                    id="partNumber" 
                    name="partNumber"
                    value={formData.partNumber}
                    onChange={handleChange}
                  />
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
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input 
                    id="supplier" 
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cost">Cost</Label>
                  <div className="flex">
                    <Input 
                      id="cost" 
                      name="cost"
                      type="number"
                      step="0.01"
                      value={formData.cost}
                      onChange={handleChange}
                    />
                    <Select 
                      value={formData.currency}
                      onValueChange={(value) => handleSelectChange('currency', value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                        <SelectItem value="CAD">CAD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leadTime">Lead Time (days)</Label>
                  <Input 
                    id="leadTime" 
                    name="leadTime"
                    type="number"
                    value={formData.leadTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockLevel">Current Stock Level</Label>
                  <Input 
                    id="stockLevel" 
                    name="stockLevel"
                    type="number"
                    value={formData.stockLevel}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                  <Input 
                    id="minStockLevel" 
                    name="minStockLevel"
                    type="number"
                    value={formData.minStockLevel}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Storage Location</Label>
                  <Input 
                    id="location" 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="relatedComponents">Related Components</Label>
                  <Input 
                    id="relatedComponents" 
                    name="relatedComponents"
                    value={formData.relatedComponents}
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
              <Button type="button" variant="outline" onClick={() => navigate('/spare-parts')}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Spare Part' : 'Create Spare Part'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default SparePartForm;
