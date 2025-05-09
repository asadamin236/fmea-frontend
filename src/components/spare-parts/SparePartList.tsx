
import React, { useState } from 'react';
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
import { PlusCircle, Edit, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { equipmentData } from '@/data/equipmentData';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Updated mock data to match the new structure
const mockSpareParts = [
  {
    id: 'spare1',
    equipmentId: '1',
    materialNumber: 'MAT-001',
    materialDescription: 'Bearing Kit',
    proposeStock: '10',
    minimum: '3',
    maximum: '15',
    price: '245.00',
    currency: 'RM',
    stockStatus: 'In Stock',
    remarks: 'Standard bearings for motor'
  },
  {
    id: 'spare2',
    equipmentId: '2',
    materialNumber: 'MAT-002',
    materialDescription: 'Seal Kit',
    proposeStock: '5',
    minimum: '2',
    maximum: '10',
    price: '120.50',
    currency: 'RM',
    stockStatus: 'Low Stock',
    remarks: 'For pump maintenance'
  },
  {
    id: 'spare3',
    equipmentId: '3',
    materialNumber: 'MAT-003',
    materialDescription: 'Filter Element',
    proposeStock: '0',
    minimum: '5',
    maximum: '20',
    price: '75.00',
    currency: 'RM',
    stockStatus: 'Out of Stock',
    remarks: 'High demand item'
  }
];

const getStatusBadge = (status: string) => {
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

const SparePartList: React.FC = () => {
  const { toast } = useToast();
  const [parts, setParts] = useState(mockSpareParts);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [partToDelete, setPartToDelete] = useState<string | null>(null);

  const handleDeleteClick = (partId: string) => {
    setPartToDelete(partId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (partToDelete) {
      const partName = parts.find(p => p.id === partToDelete)?.materialDescription || 'Spare Part';
      
      // Filter out the deleted spare part
      setParts(parts.filter(part => part.id !== partToDelete));
      
      // Show toast notification
      toast({
        title: "Spare Part Deleted",
        description: `${partName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setPartToDelete(null);
    }
  };

  // Helper function to get equipment name by ID
  const getEquipmentName = (id: string) => {
    return equipmentData.find(e => e.id === id)?.equipmentDescription || 'Unknown Equipment';
  };

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
              <TableHead>Equipment Name</TableHead>
              <TableHead>Material No.</TableHead>
              <TableHead>Material Description</TableHead>
              <TableHead>Stock (P/Min/Max)</TableHead>
              <TableHead>Price (RM)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts.map((part) => (
              <TableRow key={part.id}>
                <TableCell>{getEquipmentName(part.equipmentId)}</TableCell>
                <TableCell className="font-medium">{part.materialNumber}</TableCell>
                <TableCell>{part.materialDescription}</TableCell>
                <TableCell>
                  {parseInt(part.proposeStock) < parseInt(part.minimum) ? (
                    <span className="text-red-600 font-medium">
                      {part.proposeStock}/{part.minimum}/{part.maximum}
                    </span>
                  ) : (
                    <span>
                      {part.proposeStock}/{part.minimum}/{part.maximum}
                    </span>
                  )}
                </TableCell>
                <TableCell>RM {part.price}</TableCell>
                <TableCell>{getStatusBadge(part.stockStatus)}</TableCell>
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteClick(part.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this spare part?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the spare part
              and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SparePartList;
