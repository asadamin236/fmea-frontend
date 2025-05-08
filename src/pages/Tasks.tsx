import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
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

// Mock task data
const mockTasks = [
  {
    id: '1',
    taskType: 'Preventive Maintenance',
    description: 'Check valve pressure and calibrate if needed',
    frequency: 'Monthly',
    workCenter: 'Mechanical',
    mitigationAction: 'Calibrate pressure valves',
    shutdownRequired: true,
    status: 'pending',
    failureMode: 'Pressure Loss'
  },
  {
    id: '2',
    taskType: 'Inspection',
    description: 'Inspect seals for leaks or wear',
    frequency: 'Weekly',
    workCenter: 'Mechanical',
    mitigationAction: 'Replace worn seals',
    shutdownRequired: false,
    status: 'completed',
    failureMode: 'Fluid Leakage'
  },
  {
    id: '3',
    taskType: 'Corrective Maintenance',
    description: 'Replace bearings in motor assembly',
    frequency: 'As Needed',
    workCenter: 'Electrical',
    mitigationAction: 'Replace bearings and lubricate',
    shutdownRequired: true,
    status: 'pending',
    failureMode: 'Motor Vibration'
  },
  {
    id: '4',
    taskType: 'Condition Monitoring',
    description: 'Monitor temperature of heating elements',
    frequency: 'Daily',
    workCenter: 'Thermal',
    mitigationAction: 'Adjust temperature controller',
    shutdownRequired: false,
    status: 'active',
    failureMode: 'Overheating'
  },
  {
    id: '5',
    taskType: 'Preventive Maintenance',
    description: 'Clean and inspect filter elements',
    frequency: 'Quarterly',
    workCenter: 'Mechanical',
    mitigationAction: 'Replace filters if clogged',
    shutdownRequired: false,
    status: 'overdue',
    failureMode: 'Flow Restriction'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-600">Completed</Badge>;
    case 'pending':
      return <Badge className="bg-amber-500">Pending</Badge>;
    case 'active':
      return <Badge className="bg-blue-600">Active</Badge>;
    case 'overdue':
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const Tasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleDeleteClick = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      const taskDesc = tasks.find(t => t.id === taskToDelete)?.description || 'Task';
      
      // Filter out the deleted task
      setTasks(tasks.filter(task => task.id !== taskToDelete));
      
      // Show toast notification
      toast({
        title: "Task Deleted",
        description: `Task "${taskDesc}" has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setTaskToDelete(null);
    }
  };

  // Count tasks by status for the summary cards
  const completedCount = tasks.filter(task => task.status === 'completed').length;
  const pendingCount = tasks.filter(task => task.status === 'pending').length;
  const overdueCount = tasks.filter(task => task.status === 'overdue').length;

  return (
    <Layout>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Link to="/tasks/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg">Completed</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold">{completedCount}</div>
              <p className="text-sm text-gray-500">Tasks completed this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-amber-50">
              <CardTitle className="text-lg">Pending</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold">{pendingCount}</div>
              <p className="text-sm text-gray-500">Tasks waiting for action</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-red-50">
              <CardTitle className="text-lg">Overdue</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-3xl font-bold">{overdueCount}</div>
              <p className="text-sm text-gray-500">Tasks past their deadline</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Work Center</TableHead>
                <TableHead>Shutdown Required</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.taskType}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.frequency}</TableCell>
                  <TableCell>{task.workCenter}</TableCell>
                  <TableCell>
                    {task.shutdownRequired ? (
                      <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                        No
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/tasks/${task.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/tasks/${task.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteClick(task.id)}
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
    </Layout>
  );
};

export default Tasks;
