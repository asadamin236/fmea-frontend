
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit } from 'lucide-react';

const FailureModeDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock failure mode data - in a real app, you would fetch this based on the ID
  const failureMode = {
    id: id || '1',
    name: 'Motor Overheating',
    description: 'Motor temperature exceeds normal operating parameters causing reduced efficiency and potential damage',
    component: 'Motor Assembly M-452',
    failureMechanism: 'Inadequate cooling, excessive load, or bearing failure causing friction and heat buildup in the motor assembly',
    effect: 'Reduced motor efficiency, potential damage to windings, eventual motor failure, and system downtime',
    severity: 'High',
    probability: 'Medium',
    detection: 'Low',
    riskPriorityNumber: '12',
    mitigationTasks: ['Regular temperature monitoring', 'Cooling system inspection', 'Bearing lubrication'],
    relatedTasks: ['Monthly temperature sensor calibration', 'Quarterly cooling fan inspection', 'Biannual bearing replacement'],
    notes: 'Install temperature sensors for continuous monitoring. Critical during summer months when ambient temperature is higher.'
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return <Badge className="bg-red-700">Critical</Badge>;
      case 'High':
        return <Badge className="bg-red-600">High</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-green-600">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getProbabilityBadge = (probability: string) => {
    switch (probability) {
      case 'High':
        return <Badge className="bg-red-600">High</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'Low':
        return <Badge className="bg-green-600">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDetectionBadge = (detection: string) => {
    switch (detection) {
      case 'Low':
        return <Badge className="bg-red-600">Low</Badge>;
      case 'Medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'High':
        return <Badge className="bg-green-600">High</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/failure-modes">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Failure Modes
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Failure Mode Details</h1>
          </div>
          <div className="flex gap-2">
            <Link to={`/failure-modes/${id}/edit`}>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Edit Failure Mode
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{failureMode.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1">{failureMode.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Associated Component</h3>
                  <p className="mt-1">{failureMode.component}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Severity</h3>
                  <div className="mt-1">{getSeverityBadge(failureMode.severity)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Probability</h3>
                  <div className="mt-1">{getProbabilityBadge(failureMode.probability)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Detection</h3>
                  <div className="mt-1">{getDetectionBadge(failureMode.detection)}</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Risk Priority Number (RPN)</h3>
                  <p className="mt-1">{failureMode.riskPriorityNumber}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Failure Mechanism</h3>
                <p className="mt-1">{failureMode.failureMechanism}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Effect</h3>
                <p className="mt-1">{failureMode.effect}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Mitigation Tasks</h3>
                <ul className="mt-1 list-disc pl-5">
                  {failureMode.mitigationTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Related Tasks</h3>
                <ul className="mt-1 list-disc pl-5">
                  {failureMode.relatedTasks.map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Notes</h3>
                <p className="mt-1">{failureMode.notes}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default FailureModeDetail;
