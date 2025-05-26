
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { equipmentClasses } from '@/data/equipmentData';
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

const EquipmentClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const equipmentClass = equipmentClasses.find(ec => ec.id === id);

  if (!equipmentClass) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Equipment Class Not Found</h1>
          <p className="mt-2 text-gray-600">The equipment class you're looking for doesn't exist.</p>
          <Link to="/equipment-classes">
            <Button className="mt-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Equipment Classes
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    toast({
      title: "Equipment Class Deleted",
      description: `Equipment class "${equipmentClass.name}" has been deleted successfully`,
    });
    
    setShowDeleteDialog(false);
    navigate('/equipment-classes');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/equipment-classes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Equipment Classes
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Equipment Class Details</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/equipment-classes/${id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </Link>
            <Button 
              variant="destructive" 
              onClick={handleDeleteClick}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{equipmentClass.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1">{equipmentClass.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1">{equipmentClass.description || 'No description provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Last Reviewed</h3>
                <p className="mt-1">{equipmentClass.lastReviewed || 'Not reviewed yet'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reviewer List</h3>
                <p className="mt-1">{equipmentClass.reviewerList || 'No reviewers assigned'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Engineering Discipline</h3>
                <p className="mt-1">{equipmentClass.classEngineeringDiscipline || 'Not specified'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete this equipment class?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the equipment class
                and all associated data.
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

export default EquipmentClassDetail;
