
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { equipmentData, equipmentTypes, manufacturers, equipmentClasses } from '@/data/equipmentData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EquipmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const equipment = equipmentData.find(e => e.id === id);
  
  if (!equipment) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-bold mb-4">Equipment not found</h2>
        <Button onClick={() => navigate('/equipment')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Equipment List
        </Button>
      </div>
    );
  }

  const equipmentType = equipmentTypes.find(type => type.id === equipment.equipmentType);
  const manufacturer = manufacturers.find(m => m.id === equipment.manufacturer);
  const equipmentClass = equipmentClasses.find(c => c.id === equipment.equipmentClass);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="outline" onClick={() => navigate('/equipment')} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">{equipment.equipmentDescription}</h1>
          <Badge className="ml-3" variant={equipment.criticality === 'high' ? 'destructive' : 'default'}>
            {equipment.criticality}
          </Badge>
        </div>
        <Button onClick={() => navigate(`/equipment/${id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Equipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Equipment Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Equipment No.</div>
              <div>{equipment.equipmentNoFromSAP}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Description</div>
              <div>{equipment.equipmentDescription}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Equipment Class</div>
              <div>{equipmentClass?.name || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Equipment Type</div>
              <div>{equipmentType?.name || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Manufacturer</div>
              <div>{manufacturer?.name || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Model</div>
              <div>{equipment.model || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">SCE</div>
              <div>{equipment.sce}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Criticality</div>
              <div>{equipment.criticality}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Location Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">Area</div>
              <div>{equipment.area}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Unit</div>
              <div>{equipment.unit}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Number of Units</div>
              <div>{equipment.numberOfUnits}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">Functional Location</div>
              <div>{equipment.functionalLocation}</div>
            </div>
            <div className="col-span-2">
              <div className="text-sm font-medium text-muted-foreground">SAP Information</div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-xs text-muted-foreground">Functional Location from SAP</div>
                  <div>{equipment.functionalLocationFromSAP}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">TechIdent No. from SAP</div>
                  <div>{equipment.techIdentNoFromSAP}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground">Functional Location Description from SAP</div>
                  <div className="p-2 bg-muted/20 rounded-md mt-1">{equipment.functionalLocationDescriptionFromSAP || 'N/A'}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-muted-foreground">Equipment Description from SAP</div>
                  <div className="p-2 bg-muted/20 rounded-md mt-1">{equipment.equipmentDescriptionFromSAP || 'N/A'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Equipment Functions</CardTitle>
        </CardHeader>
        <CardContent>
          {equipment.equipmentFunctions.length > 0 ? (
            <ul className="list-disc pl-6">
              {equipment.equipmentFunctions.map((func) => (
                <li key={func.id} className="mb-1">{func.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No functions defined for this equipment</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentDetail;
