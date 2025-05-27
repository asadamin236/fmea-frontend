
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit } from 'lucide-react';
import { FailureMechanismSimple } from '@/types/fmea-analysis-types';

// Mock data
const mockMechanism: FailureMechanismSimple = {
  id: 'mechanism-001',
  name: 'Wear'
};

const FailureMechanismDetail: React.FC = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the mechanism data based on the ID
  const mechanism = mockMechanism;

  if (!mechanism) {
    return <div>Failure Mechanism not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/failure-mechanisms">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Mechanisms
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Failure Mechanism Details</h1>
        </div>
        <Link to={`/failure-mechanisms/${id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Mechanism
          </Button>
        </Link>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Mechanism Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <span className="font-medium">Name:</span> {mechanism.name}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailureMechanismDetail;
