
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
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

// Mock data for components
const initialComponents = [
  { 
    id: '1', 
    name: 'Motor Assembly M-452', 
    description: 'High-efficiency electric motor assembly for XL pumps',
    modules: ['Motor', 'Pump'] 
  },
  { 
    id: '2', 
    name: 'Control Panel CP-789', 
    description: 'Main control panel for pump operations',
    modules: ['Control System', 'Sensor'] 
  },
  { 
    id: '3', 
    name: 'Valve System VS-321', 
    description: 'Pressure regulation valve assembly',
    modules: ['Valve'] 
  },
];

const ComponentList: React.FC = () => {
  const { toast } = useToast();
  const [components, setComponents] = useState(initialComponents);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (componentId: string) => {
    setComponentToDelete(componentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (componentToDelete) {
      const componentName = components.find(c => c.id === componentToDelete)?.name || 'Component';
      
      // Filter out the deleted component
      setComponents(components.filter(component => component.id !== componentToDelete));
      
      // Show toast notification
      toast({
        title: "Component Deleted",
        description: `${componentName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setComponentToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Components</h1>
        <Link to="/components/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Component
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Modules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((component) => (
              <TableRow key={component.id}>
                <TableCell className="font-medium">{component.name}</TableCell>
                <TableCell>{component.description}</TableCell>
                <TableCell>{component.modules.join(', ')}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/components/${component.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/components/${component.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteClick(component.id)}
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
            <AlertDialogTitle>Are you sure you want to delete this component?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the component
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

export default ComponentList;
