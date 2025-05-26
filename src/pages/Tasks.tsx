
import React from 'react';
import Layout from '@/components/layout/Layout';
import TaskList from '@/components/task/TaskList';

const Tasks: React.FC = () => {
  return (
    <Layout>
      <TaskList />
    </Layout>
  );
};

export default Tasks;
