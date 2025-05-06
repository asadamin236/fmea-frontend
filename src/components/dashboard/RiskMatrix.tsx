
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskMatrixCell } from '@/types/fmea-types';
import { riskMatrixData } from '@/data/mockData';

const getRiskColor = (level: string): string => {
  switch (level) {
    case 'low':
      return 'bg-risk-low';
    case 'medium':
      return 'bg-risk-medium';
    case 'high':
      return 'bg-risk-high';
    case 'critical':
      return 'bg-risk-critical';
    default:
      return 'bg-gray-300';
  }
};

const RiskMatrix = () => {
  // Group by severity and probability
  const matrixCells: Record<string, RiskMatrixCell> = {};
  
  riskMatrixData.forEach(cell => {
    const key = `${cell.severity}-${cell.probability}`;
    matrixCells[key] = cell;
  });
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Risk Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex justify-between mb-2">
            <div className="w-16"></div>
            <div className="flex-1 text-center font-medium">Probability</div>
          </div>
          <div className="flex">
            <div className="w-16 flex flex-col justify-between text-center">
              <span className="h-12 flex items-center justify-center">5</span>
              <span className="h-12 flex items-center justify-center">4</span>
              <span className="h-12 flex items-center justify-center">3</span>
              <span className="h-12 flex items-center justify-center">2</span>
              <span className="h-12 flex items-center justify-center">1</span>
              <span className="h-12 flex items-center justify-center font-medium">Severity</span>
            </div>
            <div className="flex-1">
              <div className="risk-matrix">
                {[5, 4, 3, 2, 1].map(severity => (
                  [1, 2, 3, 4, 5].map(probability => {
                    const key = `${severity}-${probability}`;
                    const cell = matrixCells[key];
                    const cellClass = getRiskColor(cell?.level || 'low');
                    
                    return (
                      <div 
                        key={key}
                        className={`risk-cell ${cellClass} flex flex-col`}
                      >
                        <span className="text-xs">{cell?.count || 0}</span>
                      </div>
                    );
                  })
                ))}
              </div>
              <div className="flex justify-around mt-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-low rounded mr-2"></div>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-medium rounded mr-2"></div>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-high rounded mr-2"></div>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-risk-critical rounded mr-2"></div>
            <span className="text-xs">Critical</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMatrix;
