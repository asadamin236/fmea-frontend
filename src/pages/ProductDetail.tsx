
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock product data - in a real app, you would fetch this based on the ID
  const product = {
    id: id || '1',
    name: 'Industrial Pump XL450',
    description: 'High-capacity industrial pump for heavy-duty applications. Features robust construction for extended service life in demanding industrial environments.',
    manufacturer: 'FlowTech Industries',
    model: 'XL450',
    serialNumber: 'FT-450-78921',
    installationDate: '2024-02-15',
    warranty: 'Extended warranty until 2027',
    location: 'Building C - Processing Unit',
    relatedComponents: ['Pressure Valve PV-342', 'Control System CS-890', 'Motor Assembly M-452'],
    notes: 'Regular maintenance required every 3 months. Last serviced on April 15, 2025.'
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Product Details</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/products/${id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Product
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Manufacturer</h3>
                  <p className="mt-1">{product.manufacturer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Model</h3>
                  <p className="mt-1">{product.model}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Serial Number</h3>
                  <p className="mt-1">{product.serialNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Installation Date</h3>
                  <p className="mt-1">{product.installationDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{product.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Warranty</h3>
                  <p className="mt-1">{product.warranty}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Related Components</h3>
                <ul className="mt-1 list-disc pl-5">
                  {product.relatedComponents.map((component, index) => (
                    <li key={index}>{component}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1">{product.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
