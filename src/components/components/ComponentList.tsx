import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
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

const API_BASE = "https://fmea-backend.vercel.app/api/components";

const ComponentList: React.FC = () => {
  const { toast } = useToast();
  const [components, setComponents] = useState<any[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState<string | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("fmea_token");
    if (!token) {
      toast({
        title: "Error",
        description: "Authentication required",
        variant: "destructive",
      });
      return;
    }

    fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setComponents(data))
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to load components",
          variant: "destructive",
        });
      });
  }, []);

  const handleDeleteClick = (componentId: string) => {
    setComponentToDelete(componentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (componentToDelete) {
      try {
        const token = localStorage.getItem("fmea_token");
        if (!token) {
          toast({
            title: "Error",
            description: "Authentication required",
            variant: "destructive",
          });
          return;
        }

        const res = await fetch(`${API_BASE}/${componentToDelete}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error();
        setComponents(
          components.filter((component) => component._id !== componentToDelete)
        );
        toast({
          title: "Component Deleted",
          description: "Component has been deleted successfully",
        });
      } catch {
        toast({
          title: "Error",
          description: "Failed to delete component",
          variant: "destructive",
        });
      }
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
              <TableRow key={component._id}>
                <TableCell className="font-medium">{component.name}</TableCell>
                <TableCell>{component.description}</TableCell>
                <TableCell>{(component.modules || []).join(", ")}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/components/${component._id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/components/${component._id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(component._id)}
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
            <AlertDialogTitle>
              Are you sure you want to delete this component?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              component and all of its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ComponentList;
