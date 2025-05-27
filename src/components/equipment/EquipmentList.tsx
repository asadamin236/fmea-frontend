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
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Equipment List</h1>
        <Link to="/equipment/new" className="w-full sm:w-auto">
          <Button className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Equipment
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Equipment No.</TableHead>
                <TableHead className="w-[180px]">Description</TableHead>
                <TableHead className="w-[80px]">Area</TableHead>
                <TableHead className="w-[80px]">Unit</TableHead>
                <TableHead className="w-[140px]">Functional Location</TableHead>
                <TableHead className="w-[140px]">FL from SAP</TableHead>
                <TableHead className="w-[180px]">FL Description from SAP</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Class</TableHead>
                <TableHead className="w-[80px]">Criticality</TableHead>
                <TableHead className="w-[100px]">Task Mapping</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.equipmentNoFromSAP}</TableCell>
                  <TableCell>
                    <div className="max-w-[180px] truncate" title={item.equipmentDescription}>
                      {item.equipmentDescription}
                    </div>
                  </TableCell>
                  <TableCell>{item.area}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <div className="max-w-[140px] truncate" title={item.functionalLocation}>
                      {item.functionalLocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[140px] truncate" title={item.functionalLocationFromSAP}>
                      {item.functionalLocationFromSAP}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[180px] truncate" title={item.functionalLocationDescriptionFromSAP}>
                      {item.functionalLocationDescriptionFromSAP}
                    </div>
                  </TableCell>
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
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Task Mapping for {item.equipmentDescription}</DialogTitle>
                          <DialogDescription>
                            Select which tasks apply to this equipment. Tasks are automatically filtered by equipment class.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="mt-4 w-full overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-12">Select</TableHead>
                                <TableHead className="w-[120px]">Task List</TableHead>
                                <TableHead className="w-[100px]">SAP GTL</TableHead>
                                <TableHead className="w-[200px]">Description</TableHead>
                                <TableHead className="w-[100px]">Type</TableHead>
                                <TableHead className="w-[100px]">Interval</TableHead>
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
                                  <TableCell>
                                    <div className="max-w-[200px] truncate" title={task.taskDescription}>
                                      {task.taskDescription}
                                    </div>
                                  </TableCell>
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
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this equipment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the equipment and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EquipmentList;
