
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'recharts';
import { failureModes } from '@/data/mockData';

const FailureModeSummary = () => {
  // Count failure modes by category
  const categoryCounts: Record<string, number> = {};
  
  failureModes.forEach(mode => {
    if (categoryCounts[mode.category]) {
      categoryCounts[mode.category]++;
    } else {
      categoryCounts[mode.category] = 1;
    }
  });

  // Prepare data for chart
  const chartData = Object.keys(categoryCounts).map(key => ({
    name: key,
    count: categoryCounts[key]
  }));

  const riskCounts = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  failureModes.forEach(mode => {
    riskCounts[mode.riskRating]++;
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Failure Mode Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted p-4 rounded-md">
            <div className="text-2xl font-bold">{failureModes.length}</div>
            <div className="text-sm text-muted-foreground">Total Failure Modes</div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <div className="text-2xl font-bold">{riskCounts.high + riskCounts.critical}</div>
            <div className="text-sm text-muted-foreground">High/Critical Risk</div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium">By Risk Level</h4>
          <div className="flex gap-1 h-8">
            {riskCounts.critical > 0 && (
              <div 
                className="bg-risk-critical text-white text-xs flex items-center justify-center px-2"
                style={{ width: `${(riskCounts.critical / failureModes.length) * 100}%` }}
              >
                {riskCounts.critical}
              </div>
            )}
            {riskCounts.high > 0 && (
              <div 
                className="bg-risk-high text-white text-xs flex items-center justify-center px-2"
                style={{ width: `${(riskCounts.high / failureModes.length) * 100}%` }}
              >
                {riskCounts.high}
              </div>
            )}
            {riskCounts.medium > 0 && (
              <div 
                className="bg-risk-medium text-white text-xs flex items-center justify-center px-2"
                style={{ width: `${(riskCounts.medium / failureModes.length) * 100}%` }}
              >
                {riskCounts.medium}
              </div>
            )}
            {riskCounts.low > 0 && (
              <div 
                className="bg-risk-low text-white text-xs flex items-center justify-center px-2"
                style={{ width: `${(riskCounts.low / failureModes.length) * 100}%` }}
              >
                {riskCounts.low}
              </div>
            )}
          </div>

          <h4 className="text-sm font-medium mt-4">By Category</h4>
          <ul className="space-y-2">
            {Object.keys(categoryCounts).map((category) => (
              <li key={category} className="flex items-center justify-between">
                <span className="text-sm">{category}</span>
                <span className="text-sm font-medium">{categoryCounts[category]}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default FailureModeSummary;
