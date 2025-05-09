import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { checkAuth, isAdmin, User, Team, getTeams, updateTeamMemberCounts } from '@/utils/auth';
import { UserPlus, Trash2, UserRound, Eye, Edit } from 'lucide-react';
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
import { Badge } from "@/components/ui/badge";

const Users = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const teamIdParam = queryParams.get('teamId');
  
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('fmea_users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'editor' | 'user',
    teamId: teamIdParam || undefined
  });
  
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated and is admin
    const { isAuthenticated, user } = checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user?.role !== 'admin') {
      navigate('/');
      toast.error("You don't have permission to access this page");
    }
    
    // Load teams data
    const teamsData = getTeams();
    setTeams(teamsData);
    
    // If teamId is in URL, show notification
    if (teamIdParam) {
      const team = teamsData.find(t => t.id === teamIdParam);
      if (team) {
        toast.info(`Viewing users for team: ${team.name}`);
      }
    }
  }, [navigate, teamIdParam]);
  
  const handleAddUser = () => {
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("All fields are required");
      return;
    }
    
    // Check if email already exists
    if (users.find(u => u.email === newUser.email)) {
      toast.error("Email already in use");
      return;
    }
    
    // Create new user
    const user: User = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      teamId: newUser.teamId
    };
    
    // Add user to "database"
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('fmea_users', JSON.stringify(updatedUsers));
    
    // Also store the password (in a real app, this would be hashed)
    const userPasswords = JSON.parse(localStorage.getItem('fmea_user_passwords') || '{}');
    userPasswords[user.email] = newUser.password;
    localStorage.setItem('fmea_user_passwords', JSON.stringify(userPasswords));
    
    // Update team members count
    updateTeamMemberCounts();
    
    // Reset form and close dialog
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'user',
      teamId: teamIdParam || undefined
    });
    setOpen(false);
    
    toast.success("User added successfully");
  };
  
  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setShowDeleteDialog(true);
  };
  
  const confirmDelete = () => {
    if (userToDelete) {
      const user = users.find(u => u.id === userToDelete);
      const userName = user?.name || 'User';
      const updatedUsers = users.filter(user => user.id !== userToDelete);
      setUsers(updatedUsers);
      localStorage.setItem('fmea_users', JSON.stringify(updatedUsers));
      
      // Update team members count
      updateTeamMemberCounts();
      
      toast.success(`User ${userName} deleted successfully`);
      setShowDeleteDialog(false);
      setUserToDelete(null);
    }
  };

  const handleViewUser = (userId: string) => {
    navigate(`/users/${userId}`);
  };
  
  const handleEditUser = (userId: string) => {
    navigate(`/users/${userId}`);
  };
  
  const getTeamName = (teamId?: string) => {
    if (!teamId) return 'Not Assigned';
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'Unknown Team';
  };
  
  const getBadgeVariant = (role: string) => {
    switch(role) {
      case 'admin': return 'default';
      case 'editor': return 'secondary';
      default: return 'outline';
    }
  };
  
  const filteredUsers = teamIdParam 
    ? users.filter(user => user.teamId === teamIdParam)
    : users;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {teamIdParam ? `${getTeamName(teamIdParam)} - Users` : 'Users Management'}
          </h1>
          <div className="space-x-2">
            {teamIdParam && (
              <Button variant="outline" onClick={() => navigate('/teams')}>
                Back to Teams
              </Button>
            )}
            <Button onClick={() => setOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No users found</TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{getTeamName(user.teamId)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleViewUser(user.id)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditUser(user.id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(user.id)}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
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
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. The user will be able to log in with these credentials.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <Input 
                id="name"
                value={newUser.name}
                onChange={e => setNewUser({...newUser, name: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input 
                id="email"
                type="email"
                value={newUser.email}
                onChange={e => setNewUser({...newUser, email: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input 
                id="password"
                type="password"
                value={newUser.password}
                onChange={e => setNewUser({...newUser, password: e.target.value})}
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select 
                id="role"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={newUser.role}
                onChange={e => setNewUser({...newUser, role: e.target.value as 'admin' | 'editor' | 'user'})}
              >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label htmlFor="team" className="block text-sm font-medium text-gray-700">Team</label>
              <select 
                id="team"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                value={newUser.teamId || ''}
                onChange={e => setNewUser({...newUser, teamId: e.target.value || undefined})}
              >
                <option value="">Not Assigned</option>
                {teams.map(team => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>
              Add User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The user will lose all access to the system.
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

export default Users;
