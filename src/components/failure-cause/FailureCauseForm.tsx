
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FailureCauseSimple } from '@/types/fmea-analysis-types';

interface FailureCauseFormProps {
  initialData?: FailureCauseSimple;
  isEdit?: boolean;
}

const FailureCauseForm: React.FC<FailureCauseFormProps> = ({ initialData, isEdit = false }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: initialData?.name || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const causeData: FailureCauseSimple = {
      id: isEdit ? initialData?.id || '' : `cause-${Date.now()}`,
      name: formData.name
    };

    console.log('Failure Cause Data:', causeData);
    
    toast({
      title: isEdit ? "Failure Cause Updated" : "Failure Cause Created",
      description: `${causeData.name} has been ${isEdit ? 'updated' : 'created'} successfully.`,
    });
    
    navigate('/failure-causes');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{isEdit ? 'Edit' : 'Create'} Failure Cause</h1>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Failure Cause Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Cause Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit">{isEdit ? 'Update' : 'Create'} Cause</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/failure-causes')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FailureCauseForm;
