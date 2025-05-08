import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
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

const TaskDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  // Mock task data - in a real app, you would fetch this based on the ID
  const task = {
    id: id || '1',
    taskType: 'Preventive Maintenance',
    description: 'Check valve pressure and calibrate if needed',
    frequency: 'Monthly',
    workCenter: 'Mechanical',
    mitigationAction: 'Calibrate pressure valves',
    shutdownRequired: true,
    status: 'pending',
    failureMode: 'Pressure Loss',
    lastCompleted: '2025-04-15',
    nextDue: '2025-05-15',
    assignedTo: 'John Doe',
    notes: 'This task requires special tooling to access the valve assembly.'
  };

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

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the task
    toast({
      title: "Task Deleted",
      description: `Task "${task.description}" has been deleted successfully`,
    });
    
    setShowDeleteDialog(false);
    navigate('/tasks');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/tasks">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tasks
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Task Details</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/tasks/${id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Task
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Task
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <div>{task.taskType}</div>
                <div>{getStatusBadge(task.status)}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{task.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Failure Mode</h3>
                  <p className="mt-1">{task.failureMode}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Mitigation Action</h3>
                  <p className="mt-1">{task.mitigationAction}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Frequency</h3>
                  <p className="mt-1">{task.frequency}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Work Center</h3>
                  <p className="mt-1">{task.workCenter}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Shutdown Required</h3>
                  <p className="mt-1">
                    {task.shutdownRequired ? (
                      <Badge variant="outline" className="bg-red-50 text-red-800 border-red-200">
                        Yes
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                        No
                      </Badge>
                    )}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Completed</h3>
                  <p className="mt-1">{task.lastCompleted}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Next Due</h3>
                  <p className="mt-1">{task.nextDue}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Assigned To</h3>
                  <p className="mt-1">{task.assignedTo}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1">{task.notes}</p>
              </div>
            </CardContent>
          </Card>
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

export default TaskDetail;
