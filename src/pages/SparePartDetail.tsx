
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from 'lucide-react';
import { equipmentData } from '@/data/equipmentData';

const SparePartDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock spare part data - in a real app, you would fetch this based on the ID
  const sparePart = {
    id: id || '1',
    equipmentId: '1',
    materialNumber: 'MAT-45-789',
    materialDescription: 'High-temperature bearings for M-452 motor',
    proposeStock: '10',
    minimum: '3',
    maximum: '15',
    price: '245.00',
    currency: 'RM',
    stockStatus: 'In Stock',
    remarks: 'Order in packs of 2 for better pricing. Compatible with all M-series motors.'
  };

  // Find equipment name
  const equipment = equipmentData.find(eq => eq.id === sparePart.equipmentId);
  const equipmentName = equipment ? equipment.equipmentDescription : 'Unknown Equipment';

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return <Badge className="bg-green-600">In Stock</Badge>;
      case 'Low Stock':
        return <Badge className="bg-amber-500">Low Stock</Badge>;
      case 'Out of Stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
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
                <div>{sparePart.materialDescription}</div>
                <div>{getStockStatusBadge(sparePart.stockStatus)}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Equipment Name</h3>
                  <p className="mt-1">{equipmentName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Material Number</h3>
                  <p className="mt-1">{sparePart.materialNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Material Description</h3>
                  <p className="mt-1">{sparePart.materialDescription}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="mt-1">{`${sparePart.currency} ${sparePart.price}`}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Propose Stock</h3>
                  <p className="mt-1">{sparePart.proposeStock}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Minimum Stock</h3>
                  <p className="mt-1">{sparePart.minimum}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Maximum Stock</h3>
                  <p className="mt-1">{sparePart.maximum}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stock Status</h3>
                  <p className="mt-1">{getStockStatusBadge(sparePart.stockStatus)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Remarks</h3>
                <p className="mt-1">{sparePart.remarks}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SparePartDetail;
