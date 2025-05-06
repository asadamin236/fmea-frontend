
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { spareParts } from '@/data/mockData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SparePartsStatus = () => {
  // Count spare parts by status
  const statusCounts = {
    approved: 0,
    pending: 0,
    rejected: 0
  };
  
  spareParts.forEach(part => {
    statusCounts[part.status]++;
  });
  
  // Get low stock spare parts
  const lowStockParts = spareParts.filter(part => part.currentStock < part.minStock);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Spare Parts Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-md">
            <div className="text-xl font-bold">{statusCounts.approved}</div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <div className="text-xl font-bold">{statusCounts.pending}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <div className="text-xl font-bold">{statusCounts.rejected}</div>
            <div className="text-xs text-muted-foreground">Rejected</div>
          </div>
        </div>
        
        {lowStockParts.length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Low Stock Warning</AlertTitle>
            <AlertDescription>
              {lowStockParts.length} spare part(s) below minimum stock level
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          <h4 className="text-sm font-medium">Low Stock Items</h4>
          {lowStockParts.map(part => (
            <div key={part.id} className="bg-muted p-3 rounded-md">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-medium">{part.description}</h4>
                  <p className="text-xs text-muted-foreground">{part.materialNo}</p>
                </div>
                <div className="text-xs text-right">
                  <div className="font-medium">{part.currentStock} / {part.minStock}</div>
                  <div className="text-muted-foreground">Current / Min</div>
                </div>
              </div>
            </div>
          ))}
          {lowStockParts.length === 0 && (
            <p className="text-sm text-muted-foreground">All parts at adequate stock levels</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SparePartsStatus;
