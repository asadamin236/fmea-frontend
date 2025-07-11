import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { PlusCircle, Edit, Trash2, UserPlus } from "lucide-react";
import { checkAuth, isAdmin, Team } from "@/utils/auth";
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
import { Textarea } from "@/components/ui/textarea";

const Teams = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState(null);
  const [newTeam, setNewTeam] = useState({ name: "", description: "" });
  const [editingTeam, setEditingTeam] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const { isAuthenticated } = checkAuth();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadTeams();
    // Listen for localStorage event to reload teams when user is added/deleted or team is added/edited/deleted
    const reloadTeams = (e) => {
      if (
        e.key === "teams_reload" ||
        e.key === "fmea_teams" ||
        e.key === "force_teams_reload"
      )
        loadTeams();
    };
    window.addEventListener("storage", reloadTeams);
    return () => window.removeEventListener("storage", reloadTeams);
    // eslint-disable-next-line
  }, [navigate]);

  const loadTeams = async () => {
    try {
      const token = localStorage.getItem("fmea_token");
      if (!token) {
        toast.error("Token not found. Please login again.");
        return;
      }
      const res = await fetch("https://fmea-backend.vercel.app/api/teams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || "Failed to fetch teams");
        return;
      }
      // Use backend's _id and memberCount directly
      setTeams(data.teams || []);
      // Save teams to localStorage for Users.tsx dropdown
      localStorage.setItem("fmea_teams", JSON.stringify(data.teams || []));
      // Fire localStorage event for other tabs/components
      window.dispatchEvent(new StorageEvent("storage", { key: "fmea_teams" }));
    } catch (err) {
      toast.error("Failed to load teams");
    }
  };

  const handleCreateTeam = async () => {
    if (!newTeam.name || !newTeam.description) {
      toast.error("Team name and description are required");
      return;
    }
    try {
      const token = localStorage.getItem("fmea_token");
      if (!token) {
        toast.error("No token found. Please login again.");
        return;
      }
      const res = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTeam),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to create team");
        return;
      }
      toast.success("Team created successfully");
      setNewTeam({ name: "", description: "" });
      setCreateDialogOpen(false);
      loadTeams();
      // Fire localStorage event for other tabs/components
      localStorage.setItem("force_teams_reload", Date.now().toString());
    } catch (err) {
      toast.error("An error occurred while creating the team");
    }
  };

  const handleEditTeam = async () => {
    if (!editingTeam) return;
    if (!editingTeam.name || !editingTeam.description) {
      toast.error("Team name and description are required");
      return;
    }
    try {
      const token = localStorage.getItem("fmea_token");
      const res = await fetch(
        `https://fmea-backend.vercel.app/api/teams/${editingTeam._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editingTeam.name,
            description: editingTeam.description,
          }),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to update team");
        return;
      }
      toast.success(`Team ${editingTeam.name} updated successfully`);
      setEditDialogOpen(false);
      loadTeams();
      localStorage.setItem("force_teams_reload", Date.now().toString());
    } catch (err) {
      toast.error("Failed to update team");
    }
  };

  const confirmDelete = async () => {
    if (!teamToDelete) return;
    try {
      const token = localStorage.getItem("fmea_token");
      const res = await fetch(
        `https://fmea-backend.vercel.app/api/teams/${teamToDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data?.error || "Failed to delete team");
        return;
      }
      toast.success("Team deleted successfully");
      setDeleteDialogOpen(false);
      setTeamToDelete(null);
      loadTeams();
      localStorage.setItem("force_teams_reload", Date.now().toString());
    } catch (err) {
      toast.error("Failed to delete team");
    }
  };

  const openEditDialog = (team) => {
    setEditingTeam({ ...team });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (teamId) => {
    setTeamToDelete(teamId);
    setDeleteDialogOpen(true);
  };

  const openAddMemberDialog = (teamId) => {
    setSelectedTeam(teamId);
    setAddMemberDialogOpen(true);
  };

  const handleAddMember = () => {
    setAddMemberDialogOpen(false);
    navigate(`/users?teamId=${selectedTeam}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Teams Management</h1>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Team
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      No teams found
                    </TableCell>
                  </TableRow>
                ) : (
                  teams.map((team) => (
                    <TableRow key={team._id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.description}</TableCell>
                      <TableCell>{team.memberCount || 0}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openAddMemberDialog(team._id)}
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(team)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteClick(team._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ...rest of your activity cards and dialogs remain unchanged... */}

        {/* Create Team Dialog */}
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new team.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Team Name
                </label>
                <Input
                  id="name"
                  value={newTeam.name}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <Textarea
                  id="description"
                  value={newTeam.description}
                  onChange={(e) =>
                    setNewTeam({ ...newTeam, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCreateDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateTeam}>Create Team</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Team Dialog */}
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Team</DialogTitle>
              <DialogDescription>Update team details.</DialogDescription>
            </DialogHeader>
            {editingTeam && (
              <div className="space-y-4 py-4">
                <div>
                  <label
                    htmlFor="edit-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Team Name
                  </label>
                  <Input
                    id="edit-name"
                    value={editingTeam.name}
                    onChange={(e) =>
                      setEditingTeam({ ...editingTeam, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="edit-description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Textarea
                    id="edit-description"
                    value={editingTeam.description}
                    onChange={(e) =>
                      setEditingTeam({
                        ...editingTeam,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTeam}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Member Dialog */}
        <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Members</DialogTitle>
              <DialogDescription>
                You'll be redirected to the Users page to assign users to this
                team.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddMemberDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddMember}>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this team?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All team members will be unassigned
                from this team.
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
    </Layout>
  );
};

export default Teams;