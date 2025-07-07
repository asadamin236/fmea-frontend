import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const API_BASE = "http://localhost:5000/api/equipment-class";

const EquipmentClassList: React.FC = () => {
  const { toast } = useToast();
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch(API_BASE)
      .then((r) => r.json())
      .then((data) => setList(data))
      .catch(() =>
        toast({
          title: "Error",
          description: "Load failed",
          variant: "destructive",
        })
      )
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setList((l) => l.filter((item) => item._id !== id));
      toast({ title: "Deleted", description: "Removed" });
    } catch {
      toast({
        title: "Error",
        description: "Delete failed",
        variant: "destructive",
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipment Classes</h1>
        <Link to="/equipment-classes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Engineering Discipline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map((cls) => (
              <TableRow key={cls._id}>
                <TableCell>{cls.name}</TableCell>
                <TableCell>{cls.description || "—"}</TableCell>
                <TableCell>{cls.engineeringDiscipline || "—"}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/equipment-classes/${cls._id}`}>
                    <Button variant="outline" size="sm">
                      <Eye size={16} />
                    </Button>
                  </Link>
                  <Link to={`/equipment-classes/${cls._id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit size={16} />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(cls._id)}
                    disabled={deleting === cls._id}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EquipmentClassList;
