
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from 'lucide-react';

const TeamMemberForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Mock team member data
  const initialMember = isEditing ? {
    id: id,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Maintenance Technician',
    department: 'Engineering',
    phone: '123-456-7890',
    specialization: 'Mechanical Systems',
    certifications: 'Certified Maintenance Technician (CMT), OSHA Safety',
    notes: 'Night shift lead technician. Has special training on XL pump systems.'
  } : {
    name: '',
    email: '',
    role: '',
    department: '',
    phone: '',
    specialization: '',
    certifications: '',
    notes: ''
  };

  const [formData, setFormData] = useState(initialMember);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting team member:', formData);
    
    toast({
      title: isEditing ? "Team Member Updated" : "Team Member Created",
      description: isEditing 
        ? `Team member ${formData.name} has been updated successfully` 
        : `Team member ${formData.name} has been created successfully`,
    });
    
    navigate('/teams');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Link to="/teams">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Teams
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Team Member' : 'Add New Team Member'}</h1>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Member Details' : 'Enter Member Details'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select 
                    value={formData.role}
                    onValueChange={(value) => handleSelectChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Maintenance Technician">Maintenance Technician</SelectItem>
                      <SelectItem value="Engineer">Engineer</SelectItem>
                      <SelectItem value="Operator">Operator</SelectItem>
                      <SelectItem value="Health and Safety Officer">Health and Safety Officer</SelectItem>
                      <SelectItem value="Quality Control Specialist">Quality Control Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={formData.department}
                    onValueChange={(value) => handleSelectChange('department', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Operations">Operations</SelectItem>
                      <SelectItem value="Quality">Quality</SelectItem>
                      <SelectItem value="Health and Safety">Health and Safety</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input 
                    id="specialization" 
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Textarea 
                  id="certifications" 
                  name="certifications" 
                  value={formData.certifications}
                  onChange={handleChange}
                  rows={2}
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
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate('/teams')}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update Team Member' : 'Add Team Member'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default TeamMemberForm;
