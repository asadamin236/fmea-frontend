
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
import { PlusCircle, Edit, Eye, Trash2, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { equipmentData, equipmentTypes, manufacturers, equipmentClasses, tasks } from '@/data/equipmentData';
import { Equipment, EquipmentCriticality } from '@/types/equipment-types';
import { useToast } from '@/hooks/use-toast';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const getBadgeVariant = (criticality: EquipmentCriticality) => {
  switch (criticality) {
    case 'low': 
      return 'bg-risk-low';
    case 'medium': 
      return 'bg-risk-medium';
    case 'high': 
      return 'bg-risk-high';
    default:
      return 'bg-muted';
  }
};

const EquipmentList: React.FC = () => {
  const { toast } = useToast();
  const [equipment, setEquipment] = useState<Equipment[]>(equipmentData);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [selectedEquipmentForTasks, setSelectedEquipmentForTasks] = useState<Equipment | null>(null);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const itemName = equipment.find(e => e.id === itemToDelete)?.equipmentDescription || 'Equipment';
      
      setEquipment(equipment.filter(item => item.id !== itemToDelete));
      
      toast({
        title: "Equipment Deleted",
        description: `${itemName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setItemToDelete(null);
    }
  };

  const getEquipmentClassName = (id: string) => {
    return equipmentClasses.find(c => c.id === id)?.name || 'N/A';
  };

  const getEquipmentTypeName = (id: string) => {
    return equipmentTypes.find(t => t.id === id)?.name || 'N/A';
  };

  const getTasksForEquipmentClass = (equipmentClassId: string) => {
    return tasks.filter(task => task.equipmentClassId === equipmentClassId);
  };

  const handleTaskMappingChange = (equipmentId: string, taskId: string, isSelected: boolean) => {
    setEquipment(prevEquipment => 
      prevEquipment.map(eq => {
        if (eq.id === equipmentId) {
          const taskMapping = eq.taskListMapping || [];
          const existingMapping = taskMapping.find(tm => tm.taskId === taskId);
          
          let updatedMapping;
          if (existingMapping) {
            updatedMapping = taskMapping.map(tm => 
              tm.taskId === taskId ? { ...tm, isSelected } : tm
            );
          } else {
            updatedMapping = [...taskMapping, { taskId, isSelected }];
          }
          
          return { ...eq, taskListMapping: updatedMapping };
        }
        return eq;
      })
    );
  };

  const getTaskMappingStatus = (equipment: Equipment, taskId: string) => {
    return equipment.taskListMapping?.find(tm => tm.taskId === taskId)?.isSelected || false;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipment List</h1>
        <Link to="/equipment/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment No.</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Functional Location</TableHead>
              <TableHead>FL from SAP</TableHead>
              <TableHead>FL Description from SAP</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Criticality</TableHead>
              <TableHead>Task Mapping</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipment.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.equipmentNoFromSAP}</TableCell>
                <TableCell>{item.equipmentDescription}</TableCell>
                <TableCell>{item.area}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.functionalLocation}</TableCell>
                <TableCell>{item.functionalLocationFromSAP}</TableCell>
                <TableCell>{item.functionalLocationDescriptionFromSAP}</TableCell>
                <TableCell>{getEquipmentTypeName(item.equipmentType)}</TableCell>
                <TableCell>{getEquipmentClassName(item.equipmentClass)}</TableCell>
                <TableCell>
                  <Badge className={getBadgeVariant(item.criticality)}>
                    {item.criticality}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => setSelectedEquipmentForTasks(item)}>
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Task Mapping for {item.equipmentDescription}</DialogTitle>
                        <DialogDescription>
                          Select which tasks apply to this equipment. Tasks are automatically filtered by equipment class.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">Select</TableHead>
                              <TableHead>Task List</TableHead>
                              <TableHead>SAP GTL</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Interval</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getTasksForEquipmentClass(item.equipmentClass).map((task) => (
                              <TableRow key={task.id}>
                                <TableCell>
                                  <Checkbox
                                    checked={getTaskMappingStatus(item, task.id)}
                                    onCheckedChange={(checked) => 
                                      handleTaskMappingChange(item.id, task.id, checked as boolean)
                                    }
                                  />
                                </TableCell>
                                <TableCell>{task.taskList}</TableCell>
                                <TableCell>{task.sapGTL}</TableCell>
                                <TableCell>{task.taskDescription}</TableCell>
                                <TableCell>
                                  <Badge variant="outline">{task.taskType}</Badge>
                                </TableCell>
                                <TableCell>{task.interval}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/equipment/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/equipment/${item.id}/edit`}>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this equipment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment
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

export default EquipmentList;
