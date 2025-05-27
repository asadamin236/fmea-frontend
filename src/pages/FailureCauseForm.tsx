
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import FailureCauseForm from '@/components/failure-cause/FailureCauseForm';

const FailureCauseFormPage: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <Layout>
      <FailureCauseForm isEdit={isEdit} />
    </Layout>
  );
};

export default FailureCauseFormPage;
