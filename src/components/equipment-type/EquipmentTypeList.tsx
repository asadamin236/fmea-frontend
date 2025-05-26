
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
import { PlusCircle, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { equipmentTypes, equipmentClasses } from '@/data/equipmentData';
import { EquipmentType } from '@/types/equipment-types';
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

const EquipmentTypeList: React.FC = () => {
  const { toast } = useToast();
  const [types, setTypes] = useState<EquipmentType[]>(equipmentTypes);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const itemName = types.find(e => e.id === itemToDelete)?.name || 'Equipment Boundary';
      
      setTypes(types.filter(item => item.id !== itemToDelete));
      
      toast({
        title: "Equipment Boundary Deleted",
        description: `${itemName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setItemToDelete(null);
    }
  };

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const getEquipmentClassName = (id: string) => {
    return equipmentClasses.find(c => c.id === id)?.name || 'N/A';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipment Boundary</h1>
        <Link to="/equipment-types/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment Boundary
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8"></TableHead>
              <TableHead>Equipment Class</TableHead>
              <TableHead>System</TableHead>
              <TableHead>Components</TableHead>
              <TableHead>Subcomponents</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((item) => (
              <React.Fragment key={item.id}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpand(item.id)}
                      className="p-0 h-6 w-6"
                    >
                      {expandedItems.has(item.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    {getEquipmentClassName(item.equipmentClassId || '')}
                  </TableCell>
                  <TableCell>{item.systems?.length || 0} Systems</TableCell>
                  <TableCell>
                    {item.systems?.reduce((total, system) => total + (system.components?.length || 0), 0) || 0} Components
                  </TableCell>
                  <TableCell>
                    {item.systems?.reduce((total, system) => 
                      total + (system.components?.reduce((compTotal, comp) => 
                        compTotal + (comp.subcomponents?.length || 0), 0) || 0), 0) || 0} Subcomponents
                  </TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/equipment-types/${item.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(item.id)}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                
                {expandedItems.has(item.id) && item.systems?.map((system) => (
                  <React.Fragment key={`${item.id}-${system.id}`}>
                    {system.components?.map((component) => (
                      <React.Fragment key={`${item.id}-${system.id}-${component.id}`}>
                        {component.subcomponents?.map((subcomponent) => (
                          <TableRow key={`${item.id}-${system.id}-${component.id}-${subcomponent.id}`} className="bg-gray-50">
                            <TableCell></TableCell>
                            <TableCell className="text-sm text-gray-600 pl-8">
                              {getEquipmentClassName(item.equipmentClassId || '')}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">{system.name}</TableCell>
                            <TableCell className="text-sm text-gray-600">{component.name}</TableCell>
                            <TableCell className="text-sm text-gray-600">{subcomponent.name}</TableCell>
                            <TableCell className="text-sm text-gray-600">{subcomponent.remarks || '-'}</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this equipment boundary?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment boundary
              and all of its associated systems, components, and subcomponents.
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

export default EquipmentTypeList;
