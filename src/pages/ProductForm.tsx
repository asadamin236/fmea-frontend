
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock product data
  const initialProduct = isEditing ? {
    id: id,
    name: 'Industrial Pump XL450',
    description: 'High-capacity industrial pump for heavy-duty applications',
    manufacturer: 'FlowTech Industries',
    model: 'XL450',
    serialNumber: 'FT-450-78921',
    installationDate: '2024-02-15',
    notes: 'Regular maintenance required every 3 months.'
  } : {
    name: '',
    description: '',
    manufacturer: '',
    model: '',
    serialNumber: '',
    installationDate: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialProduct);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('Submitting product:', formData);
    
    toast({
      title: isEditing ? "Product Updated" : "Product Created",
      description: isEditing 
        ? `Product ${formData.name} has been updated successfully` 
        : `Product ${formData.name} has been created successfully`,
    });
    
    navigate('/products');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'Create New Product'}</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Product Details' : 'Enter Product Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
              <Button type="button" variant="outline" onClick={() => navigate('/products')}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Product' : 'Create Product'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductForm;
