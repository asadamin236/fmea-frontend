
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
import { failureModes } from '@/data/mockData';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RiskLevel } from '@/types/fmea-types';

const getBadgeVariant = (riskRating: RiskLevel) => {
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

const FailureModeList: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Failure Modes</h1>
        <Link to="/failure-modes/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Failure Mode
          </Button>
        </Link>
      </div>
      
      <div className="bg-white rounded-md shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>RPN</TableHead>
              <TableHead>Risk Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {failureModes.map((mode) => (
              <TableRow key={mode.id}>
                <TableCell className="font-medium">{mode.description}</TableCell>
                <TableCell>{mode.category}</TableCell>
                <TableCell>{mode.rpn}</TableCell>
                <TableCell>
                  <Badge className={getBadgeVariant(mode.riskRating)}>
                    {mode.riskRating}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link to={`/failure-modes/${mode.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to={`/failure-modes/${mode.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FailureModeList;
