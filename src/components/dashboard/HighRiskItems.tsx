
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { failureModes, components } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
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

const HighRiskItems = () => {
  // Get high risk failure modes
  const highRiskModes = failureModes
    .filter(mode => mode.riskRating === 'high' || mode.riskRating === 'critical')
    .sort((a, b) => b.rpn - a.rpn);
  
  // Get high risk components
  const highRiskComponents = components
    .filter(comp => comp.riskRating === 'high' || comp.riskRating === 'critical');

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>High Risk Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Failure Modes</h3>
            <ul className="space-y-2">
              {highRiskModes.map(mode => (
                <li key={mode.id} className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium">{mode.description}</h4>
                      <p className="text-xs text-muted-foreground">{mode.category}</p>
                    </div>
                    <Badge className={getBadgeVariant(mode.riskRating)}>
                      RPN: {mode.rpn}
                    </Badge>
                  </div>
                </li>
              ))}
              {highRiskModes.length === 0 && (
                <li className="text-sm text-muted-foreground">No high risk failure modes</li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Components</h3>
            <ul className="space-y-2">
              {highRiskComponents.map(comp => (
                <li key={comp.id} className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium">{comp.name}</h4>
                      <p className="text-xs text-muted-foreground">{comp.category}</p>
                    </div>
                    <Badge className={getBadgeVariant(comp.riskRating || 'medium')}>
                      {comp.riskRating}
                    </Badge>
                  </div>
                </li>
              ))}
              {highRiskComponents.length === 0 && (
                <li className="text-sm text-muted-foreground">No high risk components</li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighRiskItems;
