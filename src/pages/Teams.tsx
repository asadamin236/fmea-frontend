
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, UserPlus } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

// Mock team data
const mockTeams = [
  {
    id: 1,
    name: 'Engineering Team',
    description: 'Product design and engineering',
    members: 8,
    role: 'Admin'
  },
  {
    id: 2,
    name: 'Maintenance Team',
    description: 'Equipment maintenance and repair',
    members: 12,
    role: 'Editor'
  },
  {
    id: 3,
    name: 'Quality Control',
    description: 'Product quality assurance',
    members: 6,
    role: 'Viewer'
  },
  {
    id: 4,
    name: 'Management',
    description: 'Executive oversight and approvals',
    members: 4,
    role: 'Admin'
  }
];

const Teams = () => {
  const handleAddTeam = () => {
    toast.info("Add team functionality would open a form dialog");
  };

  const handleEditTeam = (id: number) => {
    toast.info(`Edit team ${id}`);
  };

  const handleDeleteTeam = (id: number) => {
    toast.info(`Delete team ${id}`);
  };

  const handleAddMember = (id: number) => {
    toast.info(`Add member to team ${id}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Teams Management</h1>
          <Button onClick={handleAddTeam}>
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
                  <TableHead>Access Level</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell>{team.description}</TableCell>
                    <TableCell>{team.members}</TableCell>
                    <TableCell>
                      <Badge variant={team.role === 'Admin' ? 'default' : team.role === 'Editor' ? 'secondary' : 'outline'}>
                        {team.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleAddMember(team.id)}>
                          <UserPlus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditTeam(team.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteTeam(team.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
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
    </Layout>
  );
};

export default Teams;
