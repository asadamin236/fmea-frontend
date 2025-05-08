
import React from 'react';
import Layout from '@/components/layout/Layout';
import EquipmentClassList from '@/components/equipment-class/EquipmentClassList';

const EquipmentClasses: React.FC = () => {
  return (
    <Layout>
      <EquipmentClassList />
    </Layout>
  );
};

export default EquipmentClasses;
