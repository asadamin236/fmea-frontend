
// Simple authentication system using localStorage

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Check if user is authenticated
export const checkAuth = (): AuthState => {
  const userStr = localStorage.getItem('fmea_user');
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      return { isAuthenticated: true, user };
    } catch (e) {
      return { isAuthenticated: false, user: null };
    }
  }
  
  return { isAuthenticated: false, user: null };
};

// Login user
export const loginUser = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  // In a real app, you would validate against a backend
  // For demo, we'll check against some hardcoded values
  
  // Sample users
  const sampleUsers: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      id: '2',
      name: 'Regular User',
      email: 'user@example.com',
      role: 'user'
    }
  ];
  
  // Find user by email
  const user = sampleUsers.find(u => u.email === email);
  
  // Simple validation - in a real app you'd hash passwords
  if (user && password === 'password') {
    localStorage.setItem('fmea_user', JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

// Register user
export const registerUser = (name: string, email: string, password: string): 
  { success: boolean; user?: User; error?: string } => {
  // In a real app, you would validate and store in a backend
  
  // Check if email already exists
  const userStr = localStorage.getItem('fmea_users');
  let users: User[] = [];
  
  if (userStr) {
    try {
      users = JSON.parse(userStr);
      
      if (users.find(u => u.email === email)) {
        return { success: false, error: 'Email already in use' };
      }
    } catch (e) {
      // Invalid JSON, start fresh
      users = [];
    }
  }
  
  // Create new user - always as regular user (admin would be assigned separately)
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    role: 'user'
  };
  
  // Save user to "database"
  users.push(newUser);
  localStorage.setItem('fmea_users', JSON.stringify(users));
  
  // Log in the new user
  localStorage.setItem('fmea_user', JSON.stringify(newUser));
  
  return { success: true, user: newUser };
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('fmea_user');
};

// Check if user is admin
export const isAdmin = (): boolean => {
  const { user } = checkAuth();
  return user?.role === 'admin';
};
