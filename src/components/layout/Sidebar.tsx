import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Settings, Database, FileText, User, Users, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  // const location = useLocation();

  // const isActive = (path: string) => {
  //   return location.pathname === path;
  // };

  const navItemClasses = (path: string) => cn(
    "flex items-center px-4 py-2 rounded-md transition-colors",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    // isActive(path) && "bg-sidebar-accent text-sidebar-accent-foreground"
  );

  return (
    <aside className="h-full  pb-24">
      <nav className="space-y-6 p-4">
        <div>
          <h3 className="text-xs uppercase text-sidebar-foreground/70 font-semibold mb-2 px-4">Main</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className={navItemClasses('/')}>
                <BarChart2 className="mr-3 h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/equipment-classes" className={navItemClasses('/equipment-classes')}>
                <Database className="mr-3 h-5 w-5" />
                <span>Equipment Class</span>
              </Link>
            </li>
            <li>
              <Link to="/equipment-types" className={navItemClasses('/equipment-types')}>
                <Database className="mr-3 h-5 w-5" />
                <span>Equipment Boundary</span>
              </Link>
            </li>
            <li>
              <Link to="/equipment" className={navItemClasses('/equipment')}>
                <Database className="mr-3 h-5 w-5" />
                <span>Equipment List</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className={navItemClasses('/products')}>
                <Database className="mr-3 h-5 w-5" />
                <span>Medium</span>
              </Link>
            </li>
            <li>
              <Link to="/components" className={navItemClasses('/components')}>
                <Settings className="mr-3 h-5 w-5" />
                <span>Components</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-sidebar-foreground/70 font-semibold mb-2 px-4">Equipment Management</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/manufacturers" className={navItemClasses('/manufacturers')}>
                <FileText className="mr-3 h-5 w-5" />
                <span>Manufacturers</span>
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xs uppercase text-sidebar-foreground/70 font-semibold mb-2 px-4">Risk Analysis</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/failure-modes" className={navItemClasses('/failure-modes')}>
                <FileText className="mr-3 h-5 w-5" />
                <span>Failure Modes</span>
              </Link>
            </li>
            <li>
              <Link to="/spare-parts" className={navItemClasses('/spare-parts')}>
                <Settings className="mr-3 h-5 w-5" />
                <span>Spare Parts</span>
              </Link>
            </li>
            <li>
              <Link to="/tasks" className={navItemClasses('/tasks')}>
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
              <Link to="/users" className={navItemClasses('/users')}>
                <User className="mr-3 h-5 w-5" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/teams" className={navItemClasses('/teams')}>
                <Users className="mr-3 h-5 w-5" />
                <span>Teams</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className={navItemClasses('/settings')}>
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
