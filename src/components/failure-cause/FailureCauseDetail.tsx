
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit } from 'lucide-react';
import { FailureCauseSimple } from '@/types/fmea-analysis-types';

// Mock data
const mockCause: FailureCauseSimple = {
  id: 'cause-001',
  name: 'Poor Maintenance'
};

const FailureCauseDetail: React.FC = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the cause data based on the ID
  const cause = mockCause;

  if (!cause) {
    return <div>Failure Cause not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/failure-causes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Causes
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Failure Cause Details</h1>
        </div>
        <Link to={`/failure-causes/${id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit Cause
          </Button>
        </Link>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Cause Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <span className="font-medium">Name:</span> {cause.name}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailureCauseDetail;
