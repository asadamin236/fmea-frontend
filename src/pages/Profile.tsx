import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkAuth, User, Team, getTeamById } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const { isAuthenticated, user } = checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (user) {
      setUser(user);
      setName(user.name);
      setEmail(user.email);
      
      // Get user's team data if available
      if (user.teamId) {
        const teamData = getTeamById(user.teamId);
        if (teamData) {
          setTeam(teamData);
        }
      }
    }
  }, [navigate]);
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // In a real app, you'd send this to a server
    // For demo, we'll just update localStorage
    const updatedUser: User = {
      ...user,
      name,
      email
    };
    
    localStorage.setItem('fmea_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    toast.success('Profile updated successfully');
  };
  
  const getBadgeVariant = (role: string) => {
    switch(role) {
      case 'admin': return 'default';
      case 'editor': return 'secondary';
      default: return 'outline';
    }
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  <Input 
                    id="name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                  <Input 
                    id="email"
                    type="email"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <div className="py-2">
                    <Badge variant={getBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </div>
                </div>
                
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="block text-sm font-medium text-gray-500">User ID</span>
                <span>{user.id}</span>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-500">Team</span>
                <span>{team ? team.name : 'Not Assigned'}</span>
              </div>
              {team && (
                <div>
                  <span className="block text-sm font-medium text-gray-500">Team Description</span>
                  <span>{team.description}</span>
                </div>
              )}
              <div>
                <span className="block text-sm font-medium text-gray-500">Member Since</span>
                <span>May 2023</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
