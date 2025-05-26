
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
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { tasks, equipmentClasses } from '@/data/equipmentData';
import { Task } from '@/types/equipment-types';
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

const getTaskTypeBadgeVariant = (taskType: string) => {
  switch (taskType) {
    case 'PM': 
      return 'bg-blue-500 text-white';
    case 'PPM': 
      return 'bg-green-500 text-white';
    case 'CM': 
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
};

const TaskList: React.FC = () => {
  const { toast } = useToast();
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      const itemName = taskList.find(t => t.id === itemToDelete)?.taskDescription || 'Task';
      
      setTaskList(taskList.filter(item => item.id !== itemToDelete));
      
      toast({
        title: "Task Deleted",
        description: `${itemName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setItemToDelete(null);
    }
  };

  const getEquipmentClassName = (id: string) => {
    return equipmentClasses.find(c => c.id === id)?.name || 'N/A';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <Link to="/tasks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task List</TableHead>
              <TableHead>SAP GTL</TableHead>
              <TableHead>Work Center</TableHead>
              <TableHead>Interval</TableHead>
              <TableHead>Task Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Personnel</TableHead>
              <TableHead>Man Hours</TableHead>
              <TableHead>Equipment Class</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {taskList.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.taskList}</TableCell>
                <TableCell>{item.sapGTL}</TableCell>
                <TableCell>{item.mainWorkCenter}</TableCell>
                <TableCell>{item.interval}</TableCell>
                <TableCell>
                  <Badge className={getTaskTypeBadgeVariant(item.taskType)}>
                    {item.taskType}
                  </Badge>
                </TableCell>
                <TableCell>{item.taskDescription}</TableCell>
                <TableCell>{item.numberOfPerson}</TableCell>
                <TableCell>{item.manHour}</TableCell>
                <TableCell>{getEquipmentClassName(item.equipmentClassId)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/tasks/${item.id}/edit`}>
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
            <AlertDialogTitle>Are you sure you want to delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task
              and remove it from all equipment mappings.
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

export default TaskList;
