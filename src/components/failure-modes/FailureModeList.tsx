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
import { failureModes } from '@/data/mockData';
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

const getBadgeVariant = (riskRating: RiskLevel) => {
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

const FailureModeList: React.FC = () => {
  const { toast } = useToast();
  const [modes, setModes] = useState(failureModes);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [modeToDelete, setModeToDelete] = useState<string | null>(null);

  const handleDeleteClick = (modeId: string) => {
    setModeToDelete(modeId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (modeToDelete) {
      const modeName = modes.find(m => m.id === modeToDelete)?.description || 'Failure Mode';
      
      // Filter out the deleted failure mode
      setModes(modes.filter(mode => mode.id !== modeToDelete));
      
      // Show toast notification
      toast({
        title: "Failure Mode Deleted",
        description: `${modeName} has been deleted successfully`,
      });
      
      setShowDeleteDialog(false);
      setModeToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Failure Modes</h1>
        <Link to="/failure-modes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Failure Mode
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>RPN</TableHead>
              <TableHead>Risk Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modes.map((mode) => (
              <TableRow key={mode.id}>
                <TableCell className="font-medium">{mode.description}</TableCell>
                <TableCell>{mode.category}</TableCell>
                <TableCell>{mode.rpn}</TableCell>
                <TableCell>
                  <Badge className={getBadgeVariant(mode.riskRating)}>
                    {mode.riskRating}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/failure-modes/${mode.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/failure-modes/${mode.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteClick(mode.id)}
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
            <AlertDialogTitle>Are you sure you want to delete this failure mode?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the failure mode
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

export default FailureModeList;
