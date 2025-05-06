
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

const TaskForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock task data for editing - in a real app, you would fetch this based on the ID
  const initialTask = isEditing ? {
    id: id,
    taskType: 'Preventive Maintenance',
    description: 'Check valve pressure and calibrate if needed',
    frequency: 'Monthly',
    workCenter: 'Mechanical',
    mitigationAction: 'Calibrate pressure valves',
    shutdownRequired: true,
    status: 'pending',
    failureMode: 'Pressure Loss',
    lastCompleted: '2025-04-15',
    nextDue: '2025-05-15',
    assignedTo: 'John Doe',
    notes: 'This task requires special tooling to access the valve assembly.'
  } : {
    taskType: '',
    description: '',
    frequency: '',
    workCenter: '',
    mitigationAction: '',
    shutdownRequired: false,
    status: 'pending',
    failureMode: '',
    lastCompleted: '',
    nextDue: '',
    assignedTo: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialTask);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your API
    console.log('Submitting task:', formData);
    
    toast({
      title: isEditing ? "Task Updated" : "Task Created",
      description: isEditing 
        ? `Task ${id} has been updated successfully` 
        : "Your new task has been created successfully",
    });
    
    navigate('/tasks');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/tasks">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tasks
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Task' : 'Create New Task'}</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Task Details' : 'Enter Task Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="taskType">Task Type</Label>
                  <Select 
                    value={formData.taskType}
                    onValueChange={(value) => handleSelectChange('taskType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Preventive Maintenance">Preventive Maintenance</SelectItem>
                      <SelectItem value="Corrective Maintenance">Corrective Maintenance</SelectItem>
                      <SelectItem value="Inspection">Inspection</SelectItem>
                      <SelectItem value="Condition Monitoring">Condition Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="failureMode">Failure Mode</Label>
                  <Input 
                    id="failureMode" 
                    name="failureMode"
                    value={formData.failureMode}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workCenter">Work Center</Label>
                  <Select 
                    value={formData.workCenter}
                    onValueChange={(value) => handleSelectChange('workCenter', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select work center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Thermal">Thermal</SelectItem>
                      <SelectItem value="Control">Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select 
                    value={formData.frequency}
                    onValueChange={(value) => handleSelectChange('frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Annually">Annually</SelectItem>
                      <SelectItem value="As Needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input 
                    id="assignedTo" 
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastCompleted">Last Completed</Label>
                  <Input 
                    id="lastCompleted" 
                    name="lastCompleted"
                    type="date"
                    value={formData.lastCompleted}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nextDue">Next Due</Label>
                  <Input 
                    id="nextDue" 
                    name="nextDue"
                    type="date"
                    value={formData.nextDue}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mitigationAction">Mitigation Action</Label>
                <Textarea 
                  id="mitigationAction"
                  name="mitigationAction"
                  value={formData.mitigationAction}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="shutdownRequired"
                  checked={formData.shutdownRequired}
                  onCheckedChange={(checked) => handleSwitchChange('shutdownRequired', checked)}
                />
                <Label htmlFor="shutdownRequired">Shutdown Required</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/tasks')}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Task' : 'Create Task'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default TaskForm;
