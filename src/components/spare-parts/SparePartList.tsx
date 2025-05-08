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
import { spareParts } from '@/data/mockData';
import { PlusCircle, Edit, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
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
  const { toast } = useToast();
  const [parts, setParts] = useState(spareParts);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [partToDelete, setPartToDelete] = useState<string | null>(null);

  const handleDeleteClick = (partId: string) => {
    setPartToDelete(partId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (partToDelete) {
      const partName = parts.find(p => p.id === partToDelete)?.description || 'Spare Part';
      
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
            {parts.map((part) => (
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
