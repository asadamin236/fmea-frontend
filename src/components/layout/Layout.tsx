import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { PanelLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar onMenuClick={toggleSidebar} />
      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={cn(
            "transition-all duration-300 ease-in-out min-h-screen",
            isMobile 
              ? "fixed inset-y-0 left-0 z-30 w-64 transform" 
              : "w-64",
            !sidebarOpen && (isMobile ? "-translate-x-full" : "w-0")
          )}
        >
          <div className={cn(
            "h-full bg-sidebar text-sidebar-foreground",
            isMobile ? "pt-16" : "pt-20"
          )}>
            <Sidebar />
          </div>
        </div>
        <main className={`w-full flex-1 p-6 pt-20 transition-all duration-300 ease-in-out`}>
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
