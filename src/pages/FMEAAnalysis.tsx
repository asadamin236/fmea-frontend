
import React from 'react';
import Layout from '@/components/layout/Layout';
import FMEAList from '@/components/fmea/FMEAList';

const FMEAAnalysis: React.FC = () => {
  return (
    <Layout>
      <FMEAList />
    </Layout>
  );
};

export default FMEAAnalysis;
