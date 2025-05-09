import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { PlusCircle, Edit, Trash2, UserPlus } from 'lucide-react';
import { checkAuth, isAdmin, Team, getTeams, updateTeamMemberCounts } from '@/utils/auth';
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
  const [teams, setTeams] = useState<Team[]>([]);
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);
  
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: ''
  });
  
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const { isAuthenticated } = checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Load teams data
    loadTeams();
  }, [navigate]);
  
  const loadTeams = () => {
    const teams = getTeams();
    setTeams(teams);
  };
  
  const handleCreateTeam = () => {
    // Validate form
    if (!newTeam.name || !newTeam.description) {
      toast.error("Team name and description are required");
      return;
    }
    
    // Create new team
    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      description: newTeam.description,
      members: 0
    };
    
    // Add team to "database"
    const updatedTeams = [...teams, team];
    setTeams(updatedTeams);
    localStorage.setItem('fmea_teams', JSON.stringify(updatedTeams));
    
    // Reset form and close dialog
    setNewTeam({
      name: '',
      description: ''
    });
    setCreateDialogOpen(false);
    
    toast.success("Team created successfully");
  };
  
  const handleEditTeam = () => {
    if (!editingTeam) return;
    
    // Validate form
    if (!editingTeam.name || !editingTeam.description) {
      toast.error("Team name and description are required");
      return;
    }
    
    // Update team
    const updatedTeams = teams.map(team => 
      team.id === editingTeam.id ? editingTeam : team
    );
    
    setTeams(updatedTeams);
    localStorage.setItem('fmea_teams', JSON.stringify(updatedTeams));
    
    setEditDialogOpen(false);
    toast.success(`Team ${editingTeam.name} updated successfully`);
  };
  
  const openEditDialog = (team: Team) => {
    setEditingTeam({...team});
    setEditDialogOpen(true);
  };
  
  const handleDeleteClick = (teamId: string) => {
    setTeamToDelete(teamId);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (!teamToDelete) return;
    
    const teamName = teams.find(t => t.id === teamToDelete)?.name || 'Team';
    
    // Update users that belonged to this team
    const storedUsers = localStorage.getItem('fmea_users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const updatedUsers = users.map(user => {
        if (user.teamId === teamToDelete) {
          return { ...user, teamId: undefined };
        }
        return user;
      });
      localStorage.setItem('fmea_users', JSON.stringify(updatedUsers));
    }
    
    // Remove team
    const updatedTeams = teams.filter(team => team.id !== teamToDelete);
    setTeams(updatedTeams);
    localStorage.setItem('fmea_teams', JSON.stringify(updatedTeams));
    
    setDeleteDialogOpen(false);
    setTeamToDelete(null);
    toast.success(`Team ${teamName} deleted successfully`);
  };
  
  const openAddMemberDialog = (teamId: string) => {
    setSelectedTeam(teamId);
    setAddMemberDialogOpen(true);
  };
  
  const handleAddMember = () => {
    // In real implementation, this would open a dialog to select users to add to the team
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
                    <TableCell colSpan={4} className="text-center">No teams found</TableCell>
                  </TableRow>
                ) : (
                  teams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.description}</TableCell>
                      <TableCell>{team.members}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => openAddMemberDialog(team.id)}>
                            <UserPlus className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(team)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteClick(team.id)}>
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
        
        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <p><span className="font-semibold">Engineering Team</span> updated 3 components yesterday</p>
              </div>
              <div className="p-4 border rounded-md">
                <p><span className="font-semibold">Maintenance Team</span> added 5 new failure modes last week</p>
              </div>
              <div className="p-4 border rounded-md">
                <p><span className="font-semibold">Quality Control</span> approved 8 spare parts requests</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Team Name</label>
              <Input 
                id="name"
                value={newTeam.name}
                onChange={e => setNewTeam({...newTeam, name: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <Textarea 
                id="description"
                value={newTeam.description}
                onChange={e => setNewTeam({...newTeam, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam}>
              Create Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Team Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update team details.
            </DialogDescription>
          </DialogHeader>
          {editingTeam && (
            <div className="space-y-4 py-4">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">Team Name</label>
                <Input 
                  id="edit-name"
                  value={editingTeam.name}
                  onChange={e => setEditingTeam({...editingTeam, name: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">Description</label>
                <Textarea 
                  id="edit-description"
                  value={editingTeam.description}
                  onChange={e => setEditingTeam({...editingTeam, description: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTeam}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Member Dialog */}
      <Dialog open={addMemberDialogOpen} onOpenChange={setAddMemberDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Team Members</DialogTitle>
            <DialogDescription>
              You'll be redirected to the Users page to assign users to this team.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddMemberDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMember}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this team?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. All team members will be unassigned from this team.
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
    </Layout>
  );
};

export default Teams;
