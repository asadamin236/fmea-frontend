
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import FMEAForm from '@/components/fmea/FMEAForm';

const FMEAAnalysisForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <Layout>
      <FMEAForm isEdit={isEdit} />
    </Layout>
  );
};

export default FMEAAnalysisForm;
