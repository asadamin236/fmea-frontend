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
import { components, equipmentTypes } from '@/data/mockData';
import { PlusCircle, Edit, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskLevel } from '@/types/fmea-types';
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

const getBadgeVariant = (riskRating: RiskLevel | undefined) => {
  switch (riskRating) {
    case 'low': 
      return 'bg-risk-low';
    case 'medium': 
      return 'bg-risk-medium';
    case 'high': 
      return 'bg-risk-high';
    case 'critical': 
      return 'bg-risk-critical';
    default:
      return 'bg-muted';
  }
};

const ComponentList: React.FC = () => {
  const { toast } = useToast();
  const [componentList, setComponentList] = useState(components);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<string | null>(null);

  const handleDeleteClick = (componentId: string) => {
    setComponentToDelete(componentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (componentToDelete) {
      const componentName = componentList.find(c => c.id === componentToDelete)?.name || 'Component';
      
      // Filter out the deleted component
      setComponentList(componentList.filter(component => component.id !== componentToDelete));
      
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
              <TableHead>Category</TableHead>
              <TableHead>Equipment Type</TableHead>
              <TableHead>Risk Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {componentList.map((component) => {
              const equipmentType = equipmentTypes.find(eq => eq.id === component.equipmentTypeId);
              
              return (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">{component.name}</TableCell>
                  <TableCell>{component.category}</TableCell>
                  <TableCell>{equipmentType?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeVariant(component.riskRating)}>
                      {component.riskRating || 'Unknown'}
                    </Badge>
                  </TableCell>
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
              );
            })}
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
