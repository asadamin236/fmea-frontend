
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FMEA, RISK_MATRIX_VALUES, PROBABILITY_VALUES, TASK_TYPES } from '@/types/fmea-analysis-types';

// Mock data - replace with actual data fetching
const mockComponents = ['Pump', 'Motor', 'Valve', 'Sensor'];
const mockEquipment = ['EQ-001', 'EQ-002', 'EQ-003'];
const mockFailureMechanisms = ['Wear', 'Corrosion', 'Fatigue'];
const mockFailureCauses = ['Poor Maintenance', 'Age', 'Environmental'];
const mockConsequences = ['Production Loss', 'Safety Risk', 'Environmental Impact'];
const mockWorkCenters = ['WC-001', 'WC-002', 'WC-003'];

interface FMEAFormProps {
  initialData?: FMEA;
  isEdit?: boolean;
}

const FMEAForm: React.FC<FMEAFormProps> = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<FMEA>>({
    components: [],
    failureConsequences: [],
    mitigationActions: [],
    spareParts: 'N',
    isShutdownRequired: false,
    ...initialData
  });

  const [newConsequence, setNewConsequence] = useState('');
  const [newMitigationAction, setNewMitigationAction] = useState('');

  const handleInputChange = (field: keyof FMEA, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayAdd = (field: 'components' | 'failureConsequences' | 'mitigationActions', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }));
      if (field === 'failureConsequences') setNewConsequence('');
      if (field === 'mitigationActions') setNewMitigationAction('');
    }
  };

  const handleArrayRemove = (field: 'components' | 'failureConsequences' | 'mitigationActions', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fmeaData: FMEA = {
      id: isEdit ? initialData?.id || '' : `fmea-${Date.now()}`,
      components: formData.components || [],
      mainEquipment: formData.mainEquipment || '',
      operatingCondition: formData.operatingCondition || '',
      availabilityTarget: formData.availabilityTarget || 0,
      redundancy: formData.redundancy || '',
      fmeaNumber: formData.fmeaNumber || '',
      preparedBy: formData.preparedBy || 'Current User',
      lastUpdatedBy: 'Current User',
      fmeaDate: formData.fmeaDate || '',
      revision: formData.revision || '',
      failureModeCategory: formData.failureModeCategory || '',
      additionalDescription: formData.additionalDescription,
      failureMechanism: formData.failureMechanism || '',
      failureCause: formData.failureCause || '',
      failureCauseDescription: formData.failureCauseDescription || '',
      failureEffect: formData.failureEffect || '',
      failureConsequences: formData.failureConsequences || [],
      consequencePeople: formData.consequencePeople || '',
      consequenceEnvironment: formData.consequenceEnvironment || '',
      consequenceAsset: formData.consequenceAsset || '',
      consequenceReputation: formData.consequenceReputation || '',
      probability: formData.probability || '',
      mitigatedRisk: formData.mitigatedRisk || '',
      mitigationActions: formData.mitigationActions || [],
      spareParts: formData.spareParts || 'N',
      taskType: formData.taskType || '',
      frequency: formData.frequency || '',
      mainWorkCenter: formData.mainWorkCenter || '',
      isShutdownRequired: formData.isShutdownRequired || false,
      mitigatedRiskRating: formData.mitigatedRiskRating || '',
      taskOriginReferences: formData.taskOriginReferences || '',
      remarks: formData.remarks,
      createdAt: isEdit ? initialData?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    console.log('FMEA Data:', fmeaData);
    
    toast({
      title: isEdit ? "FMEA Updated" : "FMEA Created",
      description: `FMEA ${fmeaData.fmeaNumber} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    
    navigate('/fmea-analysis');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Create'} FMEA</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="fmeaNumber">FMEA Number *</Label>
                <Input
                  id="fmeaNumber"
                  value={formData.fmeaNumber || ''}
                  onChange={(e) => handleInputChange('fmeaNumber', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="mainEquipment">Main Equipment *</Label>
                <Select onValueChange={(value) => handleInputChange('mainEquipment', value)} value={formData.mainEquipment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockEquipment.map((eq) => (
                      <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="operatingCondition">Operating Condition</Label>
                <Input
                  id="operatingCondition"
                  value={formData.operatingCondition || ''}
                  onChange={(e) => handleInputChange('operatingCondition', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="availabilityTarget">Availability Target (%)</Label>
                <Input
                  id="availabilityTarget"
                  type="number"
                  value={formData.availabilityTarget || ''}
                  onChange={(e) => handleInputChange('availabilityTarget', parseFloat(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="redundancy">Redundancy</Label>
                <Input
                  id="redundancy"
                  value={formData.redundancy || ''}
                  onChange={(e) => handleInputChange('redundancy', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="fmeaDate">FMEA Date (Ori.)</Label>
                <Input
                  id="fmeaDate"
                  type="date"
                  value={formData.fmeaDate || ''}
                  onChange={(e) => handleInputChange('fmeaDate', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="revision">Revision</Label>
                <Input
                  id="revision"
                  value={formData.revision || ''}
                  onChange={(e) => handleInputChange('revision', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Failure Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Failure Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="failureModeCategory">Failure Mode Category</Label>
                <Input
                  id="failureModeCategory"
                  value={formData.failureModeCategory || ''}
                  onChange={(e) => handleInputChange('failureModeCategory', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="additionalDescription">Additional Description</Label>
                <Textarea
                  id="additionalDescription"
                  value={formData.additionalDescription || ''}
                  onChange={(e) => handleInputChange('additionalDescription', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="failureMechanism">Failure Mechanism</Label>
                <Select onValueChange={(value) => handleInputChange('failureMechanism', value)} value={formData.failureMechanism}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mechanism" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFailureMechanisms.map((mechanism) => (
                      <SelectItem key={mechanism} value={mechanism}>{mechanism}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="failureCause">Failure Cause</Label>
                <Select onValueChange={(value) => handleInputChange('failureCause', value)} value={formData.failureCause}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cause" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockFailureCauses.map((cause) => (
                      <SelectItem key={cause} value={cause}>{cause}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="failureCauseDescription">Failure Cause Description</Label>
                <Textarea
                  id="failureCauseDescription"
                  value={formData.failureCauseDescription || ''}
                  onChange={(e) => handleInputChange('failureCauseDescription', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="failureEffect">Failure Effect</Label>
                <Textarea
                  id="failureEffect"
                  value={formData.failureEffect || ''}
                  onChange={(e) => handleInputChange('failureEffect', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Components */}
        <Card>
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select onValueChange={(value) => handleArrayAdd('components', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Add component" />
                </SelectTrigger>
                <SelectContent>
                  {mockComponents.filter(comp => !formData.components?.includes(comp)).map((component) => (
                    <SelectItem key={component} value={component}>{component}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex flex-wrap gap-2">
                {formData.components?.map((component, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {component}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleArrayRemove('components', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consequences */}
        <Card>
          <CardHeader>
            <CardTitle>Consequences & Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="consequencePeople">Consequence (People)</Label>
                <Select onValueChange={(value) => handleInputChange('consequencePeople', value)} value={formData.consequencePeople}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consequence" />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_MATRIX_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="consequenceEnvironment">Consequence (Environment)</Label>
                <Select onValueChange={(value) => handleInputChange('consequenceEnvironment', value)} value={formData.consequenceEnvironment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consequence" />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_MATRIX_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="consequenceAsset">Consequence (Asset)</Label>
                <Select onValueChange={(value) => handleInputChange('consequenceAsset', value)} value={formData.consequenceAsset}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consequence" />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_MATRIX_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="consequenceReputation">Consequence (Reputation)</Label>
                <Select onValueChange={(value) => handleInputChange('consequenceReputation', value)} value={formData.consequenceReputation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select consequence" />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_MATRIX_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="probability">Probability</Label>
                <Select onValueChange={(value) => handleInputChange('probability', value)} value={formData.probability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select probability" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROBABILITY_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mitigatedRisk">Mitigated Risk</Label>
                <Select onValueChange={(value) => handleInputChange('mitigatedRisk', value)} value={formData.mitigatedRisk}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_MATRIX_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mitigatedRiskRating">Mitigated Risk Rating</Label>
                <Select onValueChange={(value) => handleInputChange('mitigatedRiskRating', value)} value={formData.mitigatedRiskRating}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {RISK_MATRIX_VALUES.map((value) => (
                      <SelectItem key={value} value={value}>{value}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Failure Consequences List */}
            <div>
              <Label>Failure Consequences</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add failure consequence"
                  value={newConsequence}
                  onChange={(e) => setNewConsequence(e.target.value)}
                />
                <Button type="button" onClick={() => handleArrayAdd('failureConsequences', newConsequence)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.failureConsequences?.map((consequence, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {consequence}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleArrayRemove('failureConsequences', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mitigation & Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Mitigation & Tasks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mitigation Actions List */}
            <div>
              <Label>Mitigation Actions</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add mitigation action"
                  value={newMitigationAction}
                  onChange={(e) => setNewMitigationAction(e.target.value)}
                />
                <Button type="button" onClick={() => handleArrayAdd('mitigationActions', newMitigationAction)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.mitigationActions?.map((action, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {action}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleArrayRemove('mitigationActions', index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Spare Parts</Label>
                <Select onValueChange={(value: 'Y' | 'N') => handleInputChange('spareParts', value)} value={formData.spareParts}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Y">Yes</SelectItem>
                    <SelectItem value="N">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="taskType">Task Type</Label>
                <Select onValueChange={(value) => handleInputChange('taskType', value)} value={formData.taskType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Input
                  id="frequency"
                  value={formData.frequency || ''}
                  onChange={(e) => handleInputChange('frequency', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="mainWorkCenter">Main Work Center</Label>
                <Select onValueChange={(value) => handleInputChange('mainWorkCenter', value)} value={formData.mainWorkCenter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select work center" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockWorkCenters.map((center) => (
                      <SelectItem key={center} value={center}>{center}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isShutdownRequired"
                checked={formData.isShutdownRequired}
                onCheckedChange={(checked) => handleInputChange('isShutdownRequired', checked)}
              />
              <Label htmlFor="isShutdownRequired">Is Shutdown Required</Label>
            </div>

            <div>
              <Label htmlFor="taskOriginReferences">Task Origin/References</Label>
              <Textarea
                id="taskOriginReferences"
                value={formData.taskOriginReferences || ''}
                onChange={(e) => handleInputChange('taskOriginReferences', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={formData.remarks || ''}
                onChange={(e) => handleInputChange('remarks', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit">{isEdit ? 'Update' : 'Create'} FMEA</Button>
          <Button type="button" variant="outline" onClick={() => navigate('/fmea-analysis')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FMEAForm;
