
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="bg-primary text-primary-foreground shadow-md py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold">FMEA Risk Insight System</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Dashboard</Link>
          <Link to="/products" className="hover:text-primary-foreground/80 transition-colors">Products</Link>
          <Link to="/components" className="hover:text-primary-foreground/80 transition-colors">Components</Link>
          <Link to="/failure-modes" className="hover:text-primary-foreground/80 transition-colors">Failure Modes</Link>
          <Link to="/spare-parts" className="hover:text-primary-foreground/80 transition-colors">Spare Parts</Link>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="secondary" size="sm">Login</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
