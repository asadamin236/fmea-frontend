
import React from 'react';
import Layout from '@/components/layout/Layout';
import EquipmentTypeList from '@/components/equipment-type/EquipmentTypeList';

const EquipmentTypes: React.FC = () => {
  return (
    <Layout>
      <EquipmentTypeList />
    </Layout>
  );
};

export default EquipmentTypes;
