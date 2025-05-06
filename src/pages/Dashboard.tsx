
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import RiskMatrix from '@/components/dashboard/RiskMatrix';
import FailureModeSummary from '@/components/dashboard/FailureModeSummary';
import SparePartsStatus from '@/components/dashboard/SparePartsStatus';
import HighRiskItems from '@/components/dashboard/HighRiskItems';
import { checkAuth } from '@/utils/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const { isAuthenticated } = checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Products" value="24" trend="up" percentage="12" />
          <StatCard title="Components" value="156" trend="up" percentage="8" />
          <StatCard title="Critical Failures" value="7" trend="down" percentage="3" />
          <StatCard title="Spare Parts" value="43" trend="up" percentage="15" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RiskMatrix />
          <FailureModeSummary />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SparePartsStatus />
          <HighRiskItems />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
