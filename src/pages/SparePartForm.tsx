
import React, { useState, useEffect } from 'react';
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
import { equipmentData } from '@/data/equipmentData';

const SparePartForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock spare part data
  const initialSparePart = isEditing ? {
    id: id,
    equipmentId: '1',
    materialNumber: 'MAT-45-789',
    materialDescription: 'High-temperature bearings for M-452 motor',
    proposeStock: '10',
    minimum: '3',
    maximum: '15',
    price: '245.00',
    currency: 'RM',
    stockStatus: 'In Stock',
    remarks: 'Order in packs of 2 for better pricing'
  } : {
    equipmentId: '',
    materialNumber: '',
    materialDescription: '',
    proposeStock: '',
    minimum: '',
    maximum: '',
    price: '',
    currency: 'RM',
    stockStatus: '',
    remarks: ''
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
        ? `Spare part ${formData.materialDescription} has been updated successfully` 
        : `Spare part ${formData.materialDescription} has been created successfully`,
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
                  <Label htmlFor="equipmentId">Equipment Name</Label>
                  <Select 
                    value={formData.equipmentId}
                    onValueChange={(value) => handleSelectChange('equipmentId', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Equipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipmentData.map((equipment) => (
                        <SelectItem key={equipment.id} value={equipment.id}>
                          {equipment.equipmentDescription}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="materialNumber">Material Number</Label>
                  <Input 
                    id="materialNumber" 
                    name="materialNumber"
                    value={formData.materialNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="materialDescription">Material Description</Label>
                  <Input 
                    id="materialDescription" 
                    name="materialDescription"
                    value={formData.materialDescription}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposeStock">Propose Stock</Label>
                  <Input 
                    id="proposeStock" 
                    name="proposeStock"
                    type="number"
                    value={formData.proposeStock}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimum">Minimum</Label>
                  <Input 
                    id="minimum" 
                    name="minimum"
                    type="number"
                    value={formData.minimum}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maximum">Maximum</Label>
                  <Input 
                    id="maximum" 
                    name="maximum"
                    type="number"
                    value={formData.maximum}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (RM)/Unit</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                      RM
                    </span>
                    <Input 
                      id="price" 
                      name="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockStatus">Stock Status</Label>
                  <Select 
                    value={formData.stockStatus}
                    onValueChange={(value) => handleSelectChange('stockStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea 
                  id="remarks" 
                  name="remarks"
                  value={formData.remarks}
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
