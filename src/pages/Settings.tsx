
import React from 'react';
import Layout from '../components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";

const Settings = () => {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your general account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive email about system alerts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dashboard Auto-refresh</h4>
                      <p className="text-sm text-gray-500">Automatically refresh dashboard data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Default Dashboard View</h4>
                    <select className="w-full p-2 border rounded">
                      <option>Risk Matrix</option>
                      <option>Failure Mode Summary</option>
                      <option>Spare Parts Status</option>
                    </select>
                  </div>
                </div>
                
                <Button onClick={handleSave}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="risk-alerts" defaultChecked />
                    <label htmlFor="risk-alerts">High Risk Alerts</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox id="spare-parts" defaultChecked />
                    <label htmlFor="spare-parts">Spare Parts Stock Alerts</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox id="approvals" defaultChecked />
                    <label htmlFor="approvals">Approval Notifications</label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Checkbox id="system" defaultChecked />
                    <label htmlFor="system">System Updates</label>
                  </div>
                </div>
                
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Change Password</h4>
                    <div className="space-y-2">
                      <Input type="password" placeholder="Current Password" />
                      <Input type="password" placeholder="New Password" />
                      <Input type="password" placeholder="Confirm New Password" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-500">Add an extra layer of security</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Button onClick={handleSave}>Update Security</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Theme</h4>
                    <select className="w-full p-2 border rounded">
                      <option>System Default</option>
                      <option>Light Mode</option>
                      <option>Dark Mode</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Compact Mode</h4>
                      <p className="text-sm text-gray-500">Reduce spacing and font size</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Button onClick={handleSave}>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
