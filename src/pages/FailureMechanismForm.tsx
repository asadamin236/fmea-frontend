
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import FailureMechanismForm from '@/components/failure-mechanism/FailureMechanismForm';

const FailureMechanismFormPage: React.FC = () => {
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <Layout>
      <FailureMechanismForm isEdit={isEdit} />
    </Layout>
  );
};

export default FailureMechanismFormPage;
