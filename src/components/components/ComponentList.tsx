
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { components, equipmentTypes } from '@/data/mockData';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskLevel } from '@/types/fmea-types';

const getBadgeVariant = (riskRating: RiskLevel | undefined) => {
  switch (riskRating) {
    case 'low': 
      return 'bg-risk-low';
    case 'medium': 
      return 'bg-risk-medium';
    case 'high': 
      return 'bg-risk-high';
    case 'critical': 
      return 'bg-risk-critical';
    default:
      return 'bg-muted';
  }
};

const ComponentList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Components</h1>
        <Link to="/components/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Component
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Equipment Type</TableHead>
              <TableHead>Risk Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {components.map((component) => {
              const equipmentType = equipmentTypes.find(eq => eq.id === component.equipmentTypeId);
              
              return (
                <TableRow key={component.id}>
                  <TableCell className="font-medium">{component.name}</TableCell>
                  <TableCell>{component.category}</TableCell>
                  <TableCell>{equipmentType?.name || 'Unknown'}</TableCell>
                  <TableCell>
                    <Badge className={getBadgeVariant(component.riskRating)}>
                      {component.riskRating || 'Unknown'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/components/${component.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link to={`/components/${component.id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ComponentList;
