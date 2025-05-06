
import React from 'react';
import Layout from '../components/layout/Layout';
import RiskMatrix from '../components/dashboard/RiskMatrix';
import FailureModeSummary from '../components/dashboard/FailureModeSummary';
import HighRiskItems from '../components/dashboard/HighRiskItems';
import SparePartsStatus from '../components/dashboard/SparePartsStatus';
import StatCard from '../components/dashboard/StatCard';
import { mainProducts, components, failureModes, spareParts } from '../data/mockData';
import { Database, Settings, FileText, BarChart2 } from 'lucide-react';

const Dashboard = () => {
  // Calculate stats
  const totalProducts = mainProducts.length;
  const totalComponents = components.length;
  const totalFailureModes = failureModes.length;
  const lowStockItems = spareParts.filter(part => part.currentStock < part.minStock).length;
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">FMEA Risk Analysis Overview</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Products" 
          value={totalProducts} 
          icon={<Database className="h-6 w-6" />}
        />
        <StatCard 
          title="Total Components" 
          value={totalComponents} 
          icon={<Settings className="h-6 w-6" />}
        />
        <StatCard 
          title="Failure Modes" 
          value={totalFailureModes} 
          icon={<FileText className="h-6 w-6" />}
        />
        <StatCard 
          title="Low Stock Items" 
          value={lowStockItems} 
          icon={<BarChart2 className="h-6 w-6" />}
          className={lowStockItems > 0 ? "border-risk-high border-2" : ""}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RiskMatrix />
        <FailureModeSummary />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HighRiskItems />
        <SparePartsStatus />
      </div>
    </Layout>
  );
};

export default Dashboard;
