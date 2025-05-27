
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FailureMechanismSimple } from '@/types/fmea-analysis-types';

interface FailureMechanismFormProps {
  initialData?: FailureMechanismSimple;
  isEdit?: boolean;
}

const FailureMechanismForm: React.FC<FailureMechanismFormProps> = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mechanismData: FailureMechanismSimple = {
      id: isEdit ? initialData?.id || '' : `mechanism-${Date.now()}`,
      name: formData.name
    };

    console.log('Failure Mechanism Data:', mechanismData);
    
    toast({
      title: isEdit ? "Failure Mechanism Updated" : "Failure Mechanism Created",
      description: `${mechanismData.name} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    
    navigate('/failure-mechanisms');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Create'} Failure Mechanism</h1>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Failure Mechanism Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Mechanism Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit">{isEdit ? 'Update' : 'Create'} Mechanism</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/failure-mechanisms')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailureMechanismForm;
