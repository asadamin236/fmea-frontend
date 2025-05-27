import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkAuth, logoutUser } from '@/utils/auth';
import { toast } from "@/components/ui/sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = checkAuth();

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md py-3 fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="flex items-center">
            <span className="text-lg font-bold whitespace-nowrap">DWTask AMS - FMEA</span>
          </Link>
        </div>
        
        {/* <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Dashboard</Link>
          <Link to="/equipment-classes" className="hover:text-primary-foreground/80 transition-colors">Equipment Class</Link>
          <Link to="/equipment-types" className="hover:text-primary-foreground/80 transition-colors">Equipment Boundary</Link>
          <Link to="/equipment" className="hover:text-primary-foreground/80 transition-colors">Equipment List</Link>
          <Link to="/products" className="hover:text-primary-foreground/80 transition-colors">Medium</Link>
          <Link to="/components" className="hover:text-primary-foreground/80 transition-colors">Components</Link>
          <Link to="/failure-modes" className="hover:text-primary-foreground/80 transition-colors">Failure Modes</Link>
          <Link to="/spare-parts" className="hover:text-primary-foreground/80 transition-colors">Spare Parts</Link>
        </div> */}
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground hover:bg-primary-foreground/10 hidden sm:inline-flex"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground hover:bg-primary-foreground/10 hidden sm:inline-flex"
          >
            <Bell className="h-5 w-5" />
          </Button>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">
                    {user?.name?.split(' ')[0] || 'Account'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  Settings
                </DropdownMenuItem>
                {user?.role === 'admin' && (
                  <DropdownMenuItem onClick={() => navigate('/teams')}>
                    Team Management
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
