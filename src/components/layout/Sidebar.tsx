
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Settings, Database, FileText, User, Users, Settings as SettingsIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 h-screen bg-sidebar text-sidebar-foreground fixed left-0 top-16 p-4">
      <nav className="space-y-6">
        <div>
          <h3 className="text-xs uppercase text-sidebar-foreground/70 font-semibold mb-2 px-4">Main</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <BarChart2 className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <Database className="mr-3 h-5 w-5" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/components" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <Settings className="mr-3 h-5 w-5" />
                <span>Components</span>
              </Link>
            </li>
            <li>
              <Link to="/equipment" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <Database className="mr-3 h-5 w-5" />
                <span>Equipment</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-sidebar-foreground/70 font-semibold mb-2 px-4">Risk Analysis</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/failure-modes" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <FileText className="mr-3 h-5 w-5" />
                <span>Failure Modes</span>
              </Link>
            </li>
            <li>
              <Link to="/spare-parts" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <Settings className="mr-3 h-5 w-5" />
                <span>Spare Parts</span>
              </Link>
            </li>
            <li>
              <Link to="/tasks" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <FileText className="mr-3 h-5 w-5" />
                <span>Tasks</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-sidebar-foreground/70 font-semibold mb-2 px-4">Admin</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/users" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <User className="mr-3 h-5 w-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/teams" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <Users className="mr-3 h-5 w-5" />
                <span>Teams</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center px-4 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
                <SettingsIcon className="mr-3 h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
