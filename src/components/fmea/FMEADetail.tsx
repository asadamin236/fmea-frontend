
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit } from 'lucide-react';
import { getFMEAById, getEquipmentName, getWorkCenterName, getTaskTypeName } from '@/services/mockDataService';

const FMEADetail: React.FC = () => {
  const { id } = useParams();
  
  // Get FMEA data from centralized service
  const fmea = getFMEAById(id || '');

  if (!fmea) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">FMEA Not Found</h1>
          <p className="text-gray-600 mb-4">The requested FMEA analysis could not be found.</p>
          <Link to="/fmea-analysis">
            <Button>Back to FMEA List</Button>
          </Link>
        </div>
      </div>
    );
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
              <span className="font-medium">Main Equipment:</span> {getEquipmentName(fmea.mainEquipment)}
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
              <Badge className="ml-2" variant={fmea.consequencePeople?.startsWith('A') ? 'destructive' : 'secondary'}>
                {fmea.consequencePeople}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Consequence (Environment):</span> 
              <Badge className="ml-2" variant={fmea.consequenceEnvironment?.startsWith('A') ? 'destructive' : 'secondary'}>
                {fmea.consequenceEnvironment}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Consequence (Asset):</span> 
              <Badge className="ml-2" variant={fmea.consequenceAsset?.startsWith('A') ? 'destructive' : 'secondary'}>
                {fmea.consequenceAsset}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Consequence (Reputation):</span> 
              <Badge className="ml-2" variant={fmea.consequenceReputation?.startsWith('A') ? 'destructive' : 'secondary'}>
                {fmea.consequenceReputation}
              </Badge>
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
              <span className="font-medium">Task Type:</span> {getTaskTypeName(fmea.taskType)}
            </div>
            <div>
              <span className="font-medium">Frequency:</span> {fmea.frequency}
            </div>
            <div>
              <span className="font-medium">Main Work Center:</span> {getWorkCenterName(fmea.mainWorkCenter)}
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
