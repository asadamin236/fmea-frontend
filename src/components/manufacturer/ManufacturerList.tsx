
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2, Eye, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { manufacturerService, Manufacturer } from '@/services/manufacturerService';
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

const ManufacturerList: React.FC = () => {
  const { toast } = useToast();
  const [manufacturerList, setManufacturerList] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Load manufacturers on component mount
  useEffect(() => {
    loadManufacturers();
  }, []);

  const loadManufacturers = async () => {
    try {
      setLoading(true);
      const manufacturers = await manufacturerService.getAllManufacturers();
      setManufacturerList(manufacturers);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load manufacturers",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      setDeleting(true);
      const itemName = manufacturerList.find(m => m._id === itemToDelete)?.name || 'Manufacturer';
      
      await manufacturerService.deleteManufacturer(itemToDelete);
      
      setManufacturerList(manufacturerList.filter(item => item._id !== itemToDelete));
      
      toast({
        title: "Manufacturer Deleted",
        description: `${itemName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setItemToDelete(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete manufacturer",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manufacturers</h1>
        <Link to="/manufacturers/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Manufacturer
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    Loading manufacturers...
                  </div>
                </TableCell>
              </TableRow>
            ) : manufacturerList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No manufacturers found
                </TableCell>
              </TableRow>
            ) : (
              manufacturerList.map((manufacturer) => (
                <TableRow key={manufacturer._id}>
                  <TableCell className="font-medium">{manufacturer.name}</TableCell>
                  <TableCell>{manufacturer.contactInfo || 'No contact info'}</TableCell>
                  <TableCell>
                    {manufacturer.website ? (
                      <a 
                        href={manufacturer.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Visit
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      'No website'
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/manufacturers/${manufacturer._id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/manufacturers/${manufacturer._id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(manufacturer._id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        disabled={deleting}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this manufacturer?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the manufacturer
              and remove it from all equipment mappings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground"
              disabled={deleting}
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ManufacturerList;
