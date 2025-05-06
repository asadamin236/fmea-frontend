
import React, { useEffect } from 'react';
import Dashboard from './Dashboard';
import { checkAuth } from '@/utils/auth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is authenticated
    const { isAuthenticated } = checkAuth();
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);
  
  return <Dashboard />;
};

export default Index;
