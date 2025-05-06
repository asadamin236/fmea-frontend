
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { spareParts } from '@/data/mockData';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'approved':
      return <Badge className="bg-green-600">Approved</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'rejected':
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const SparePartList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Spare Parts</h1>
        <Link to="/spare-parts/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Spare Part
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Material No.</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spareParts.map((part) => (
              <TableRow key={part.id} className={part.currentStock < part.minStock ? "bg-red-50" : ""}>
                <TableCell className="font-medium">{part.materialNo}</TableCell>
                <TableCell>{part.description}</TableCell>
                <TableCell>
                  {part.currentStock < part.minStock ? (
                    <span className="text-red-600 font-medium">
                      {part.currentStock} / {part.minStock}
                    </span>
                  ) : (
                    <span>
                      {part.currentStock} / {part.minStock}
                    </span>
                  )}
                </TableCell>
                <TableCell>${part.price}</TableCell>
                <TableCell>{getStatusBadge(part.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/spare-parts/${part.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/spare-parts/${part.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default SparePartList;
