
import React from 'react';
import Layout from '@/components/layout/Layout';
import TaskForm from '@/components/task/TaskForm';

const TaskFormPage: React.FC = () => {
  return (
    <Layout>
      <TaskForm />
    </Layout>
  );
};

export default TaskFormPage;
