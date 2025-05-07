
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { checkAuth, isAdmin, User } from '@/utils/auth';
import { UserPlus, Trash2, UserRound } from 'lucide-react';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('fmea_users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user'
  });
  
  React.useEffect(() => {
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
  }, [navigate]);
  
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
      role: newUser.role
    };
    
    // Add user to "database"
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('fmea_users', JSON.stringify(updatedUsers));
    
    // Also store the password (in a real app, this would be hashed)
    const userPasswords = JSON.parse(localStorage.getItem('fmea_user_passwords') || '{}');
    userPasswords[user.email] = newUser.password;
    localStorage.setItem('fmea_user_passwords', JSON.stringify(userPasswords));
    
    // Reset form and close dialog
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'user'
    });
    setOpen(false);
    
    toast.success("User added successfully");
  };
  
  const handleDeleteUser = (id: string) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('fmea_users', JSON.stringify(updatedUsers));
    
    toast.success("User deleted successfully");
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Users Management</h1>
          <Button onClick={() => setOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
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
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">No users found</TableCell>
                  </TableRow>
                ) : (
                  users.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
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
                onChange={e => setNewUser({...newUser, role: e.target.value as 'admin' | 'user'})}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
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
    </Layout>
  );
};

export default Users;
