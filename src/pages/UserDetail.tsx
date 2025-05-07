
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { checkAuth, isAdmin, User } from '@/utils/auth';
import { ArrowLeft, Save, UserRound } from 'lucide-react';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [password, setPassword] = useState('');

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
      return;
    }
    
    // Load user data
    const storedUsers = localStorage.getItem('fmea_users');
    if (storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      const foundUser = users.find(u => u.id === id);
      
      if (foundUser) {
        setUser(foundUser);
        setEditedUser(JSON.parse(JSON.stringify(foundUser))); // Deep copy
      } else {
        toast.error("User not found");
        navigate('/users');
      }
    }
  }, [id, navigate]);

  const handleSaveChanges = () => {
    if (!editedUser) return;

    // Validate form
    if (!editedUser.name || !editedUser.email) {
      toast.error("Name and email are required");
      return;
    }

    // Get all users
    const storedUsers = localStorage.getItem('fmea_users');
    if (storedUsers) {
      let users: User[] = JSON.parse(storedUsers);
      
      // Check if email is already in use by another user
      const emailExists = users.some(u => u.email === editedUser.email && u.id !== editedUser.id);
      if (emailExists) {
        toast.error("Email already in use by another user");
        return;
      }
      
      // Update user
      users = users.map(u => u.id === editedUser.id ? editedUser : u);
      localStorage.setItem('fmea_users', JSON.stringify(users));
      
      // Update password if provided
      if (password) {
        const userPasswords = JSON.parse(localStorage.getItem('fmea_user_passwords') || '{}');
        userPasswords[editedUser.email] = password;
        localStorage.setItem('fmea_user_passwords', JSON.stringify(userPasswords));
      }
      
      setUser(editedUser);
      setEditMode(false);
      toast.success("User updated successfully");
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p>Loading user data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">User Details</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>User Information</CardTitle>
            <div className="space-x-2">
              {!editMode ? (
                <Button onClick={() => setEditMode(true)}>
                  Edit User
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => {
                    setEditMode(false);
                    setEditedUser(JSON.parse(JSON.stringify(user))); // Reset to original
                    setPassword('');
                  }}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveChanges}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative rounded-full overflow-hidden bg-gray-100 p-8">
                  <UserRound className="h-16 w-16 text-gray-400" />
                </div>
              </div>
              
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <Input
                      value={editedUser?.name || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={editedUser?.email || ''}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={editedUser?.role || 'user'}
                      onChange={(e) => setEditedUser(prev => prev ? {...prev, role: e.target.value as 'admin' | 'user'} : null)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password (leave blank to keep current)
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New password"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-lg capitalize">{user.role}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">User ID</p>
                    <p className="text-lg text-gray-500">{user.id}</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default UserDetail;
