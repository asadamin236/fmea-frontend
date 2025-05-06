
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-0'}`}>
          {sidebarOpen && <Sidebar />}
        </div>
        <main className={`flex-1 p-6 pt-20 transition-all duration-300 ease-in-out`}>
          <div className="mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleSidebar}
              className="md:inline-flex hidden"
            >
              <PanelLeft className="h-4 w-4 mr-2" />
              {sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
            </Button>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
