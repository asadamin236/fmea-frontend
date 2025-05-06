
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from 'lucide-react';

const SparePartDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock spare part data - in a real app, you would fetch this based on the ID
  const sparePart = {
    id: id || '1',
    name: 'Bearing Kit BK-45',
    partNumber: 'BK-45-789',
    description: 'High-temperature bearings for M-452 motor with specialized ceramic balls for extended durability',
    manufacturer: 'BearingTech',
    supplier: 'IndustrialSupplies Inc.',
    cost: '245.00',
    currency: 'USD',
    leadTime: '14',
    stockLevel: '5',
    minStockLevel: '3',
    stockStatus: 'In Stock',
    location: 'Warehouse B - Shelf 12',
    relatedComponents: ['Motor Assembly M-452', 'Pump Housing PH-890'],
    lastOrderDate: '2025-02-10',
    lastReceivedDate: '2025-02-24',
    warranty: '6 months',
    notes: 'Order in packs of 2 for better pricing. Compatible with all M-series motors.'
  };

  const getStockStatusBadge = (status: string, current: string, min: string) => {
    const currentLevel = parseInt(current);
    const minLevel = parseInt(min);
    
    if (status === 'Out of Stock' || currentLevel === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    
    if (currentLevel <= minLevel) {
      return <Badge className="bg-amber-500">Low Stock</Badge>;
    }
    
    return <Badge className="bg-green-600">In Stock</Badge>;
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/spare-parts">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Spare Parts
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Spare Part Details</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/spare-parts/${id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Spare Part
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div>{sparePart.name}</div>
                <div>{getStockStatusBadge(sparePart.stockStatus, sparePart.stockLevel, sparePart.minStockLevel)}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{sparePart.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Part Number</h3>
                  <p className="mt-1">{sparePart.partNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Manufacturer</h3>
                  <p className="mt-1">{sparePart.manufacturer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Supplier</h3>
                  <p className="mt-1">{sparePart.supplier}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Cost</h3>
                  <p className="mt-1">{`${sparePart.currency} ${sparePart.cost}`}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lead Time</h3>
                  <p className="mt-1">{`${sparePart.leadTime} days`}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Stock</h3>
                  <p className="mt-1">{sparePart.stockLevel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Minimum Stock Level</h3>
                  <p className="mt-1">{sparePart.minStockLevel}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Storage Location</h3>
                  <p className="mt-1">{sparePart.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Ordered</h3>
                  <p className="mt-1">{sparePart.lastOrderDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Received</h3>
                  <p className="mt-1">{sparePart.lastReceivedDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Warranty</h3>
                  <p className="mt-1">{sparePart.warranty}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Related Components</h3>
                <ul className="mt-1 list-disc pl-5">
                  {sparePart.relatedComponents.map((component, index) => (
                    <li key={index}>{component}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1">{sparePart.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SparePartDetail;
