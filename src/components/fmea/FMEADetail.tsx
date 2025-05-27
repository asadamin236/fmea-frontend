
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit } from 'lucide-react';
import { FMEA } from '@/types/fmea-analysis-types';

// Mock data - same as in FMEAList
const mockFMEAData: FMEA = {
  id: 'fmea-001',
  components: ['Pump', 'Motor'],
  mainEquipment: 'EQ-001',
  operatingCondition: 'Normal Operation',
  availabilityTarget: 95,
  redundancy: 'None',
  fmeaNumber: 'FMEA-2024-001',
  preparedBy: 'John Doe',
  lastUpdatedBy: 'John Doe',
  fmeaDate: '2024-01-15',
  revision: 'Rev 1',
  failureModeCategory: 'Mechanical',
  additionalDescription: 'Primary pump failure analysis',
  failureMechanism: 'Wear',
  failureCause: 'Poor Maintenance',
  failureCauseDescription: 'Inadequate lubrication schedule',
  failureEffect: 'Pump failure leading to production stop',
  failureConsequences: ['Production Loss', 'Safety Risk'],
  consequencePeople: 'A2',
  consequenceEnvironment: 'B1',
  consequenceAsset: 'C3',
  consequenceReputation: 'B2',
  probability: 'Possible(P)',
  mitigatedRisk: 'B2',
  mitigationActions: ['Improve maintenance schedule', 'Install backup pump'],
  spareParts: 'Y',
  taskType: 'PM',
  frequency: 'Monthly',
  mainWorkCenter: 'WC-001',
  isShutdownRequired: true,
  mitigatedRiskRating: 'B1',
  taskOriginReferences: 'Maintenance Manual Section 5',
  remarks: 'Critical equipment requiring immediate attention',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-15T10:00:00Z'
};

const FMEADetail: React.FC = () => {
  const { id } = useParams();
  
  // In a real app, you would fetch the FMEA data based on the ID
  const fmea = mockFMEAData;

  if (!fmea) {
    return <div>FMEA not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Link to="/fmea-analysis">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to FMEA List
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">FMEA Details: {fmea.fmeaNumber}</h1>
        </div>
        <Link to={`/fmea-analysis/${id}/edit`}>
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Edit FMEA
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">FMEA Number:</span> {fmea.fmeaNumber}
            </div>
            <div>
              <span className="font-medium">Main Equipment:</span> {fmea.mainEquipment}
            </div>
            <div>
              <span className="font-medium">Operating Condition:</span> {fmea.operatingCondition}
            </div>
            <div>
              <span className="font-medium">Availability Target:</span> {fmea.availabilityTarget}%
            </div>
            <div>
              <span className="font-medium">Redundancy:</span> {fmea.redundancy}
            </div>
            <div>
              <span className="font-medium">FMEA Date:</span> {new Date(fmea.fmeaDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Revision:</span> {fmea.revision}
            </div>
            <div>
              <span className="font-medium">Prepared By:</span> {fmea.preparedBy}
            </div>
            <div>
              <span className="font-medium">Last Updated By:</span> {fmea.lastUpdatedBy}
            </div>
          </CardContent>
        </Card>

        {/* Components */}
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {fmea.components.map((component, index) => (
                <Badge key={index} variant="secondary">{component}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Failure Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Failure Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Failure Mode Category:</span> {fmea.failureModeCategory}
            </div>
            <div>
              <span className="font-medium">Failure Mechanism:</span> {fmea.failureMechanism}
            </div>
            <div>
              <span className="font-medium">Failure Cause:</span> {fmea.failureCause}
            </div>
            <div>
              <span className="font-medium">Failure Cause Description:</span>
              <p className="mt-1 text-sm text-gray-600">{fmea.failureCauseDescription}</p>
            </div>
            <div>
              <span className="font-medium">Failure Effect:</span>
              <p className="mt-1 text-sm text-gray-600">{fmea.failureEffect}</p>
            </div>
            {fmea.additionalDescription && (
              <div>
                <span className="font-medium">Additional Description:</span>
                <p className="mt-1 text-sm text-gray-600">{fmea.additionalDescription}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Consequence (People):</span> 
              <Badge className="ml-2">{fmea.consequencePeople}</Badge>
            </div>
            <div>
              <span className="font-medium">Consequence (Environment):</span> 
              <Badge className="ml-2">{fmea.consequenceEnvironment}</Badge>
            </div>
            <div>
              <span className="font-medium">Consequence (Asset):</span> 
              <Badge className="ml-2">{fmea.consequenceAsset}</Badge>
            </div>
            <div>
              <span className="font-medium">Consequence (Reputation):</span> 
              <Badge className="ml-2">{fmea.consequenceReputation}</Badge>
            </div>
            <div>
              <span className="font-medium">Probability:</span> 
              <Badge className="ml-2">{fmea.probability}</Badge>
            </div>
            <div>
              <span className="font-medium">Mitigated Risk:</span> 
              <Badge className="ml-2">{fmea.mitigatedRisk}</Badge>
            </div>
            <div>
              <span className="font-medium">Mitigated Risk Rating:</span> 
              <Badge className="ml-2">{fmea.mitigatedRiskRating}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Failure Consequences */}
        <Card>
          <CardHeader>
            <CardTitle>Failure Consequences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {fmea.failureConsequences.map((consequence, index) => (
                <Badge key={index} variant="destructive">{consequence}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mitigation Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Mitigation Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {fmea.mitigationActions.map((action, index) => (
                <Badge key={index} variant="outline">{action}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Information */}
        <Card>
          <CardHeader>
            <CardTitle>Task Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <span className="font-medium">Spare Parts Required:</span> 
              <Badge className="ml-2" variant={fmea.spareParts === 'Y' ? 'default' : 'secondary'}>
                {fmea.spareParts === 'Y' ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Task Type:</span> {fmea.taskType}
            </div>
            <div>
              <span className="font-medium">Frequency:</span> {fmea.frequency}
            </div>
            <div>
              <span className="font-medium">Main Work Center:</span> {fmea.mainWorkCenter}
            </div>
            <div>
              <span className="font-medium">Shutdown Required:</span> 
              <Badge className="ml-2" variant={fmea.isShutdownRequired ? 'destructive' : 'secondary'}>
                {fmea.isShutdownRequired ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Task Origin/References:</span>
              <p className="mt-1 text-sm text-gray-600">{fmea.taskOriginReferences}</p>
            </div>
          </CardContent>
        </Card>

        {/* Remarks */}
        {fmea.remarks && (
          <Card>
            <CardHeader>
              <CardTitle>Remarks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{fmea.remarks}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>Created: {new Date(fmea.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(fmea.updatedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FMEADetail;
