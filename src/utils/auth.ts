
// Authentication system using localStorage

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
  
  // First check if the user is one of our sample users
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
  
  // Check sample users first (for demo purposes)
  const sampleUser = sampleUsers.find(u => u.email === email);
  if (sampleUser && password === 'password') {
    localStorage.setItem('fmea_user', JSON.stringify(sampleUser));
    return { success: true, user: sampleUser };
  }
  
  // Check users created by admin
  const storedUsers = localStorage.getItem('fmea_users');
  const userPasswords = localStorage.getItem('fmea_user_passwords');
  
  if (storedUsers && userPasswords) {
    try {
      const users: User[] = JSON.parse(storedUsers);
      const passwords = JSON.parse(userPasswords);
      
      const user = users.find(u => u.email === email);
      
      if (user && passwords[email] === password) {
        localStorage.setItem('fmea_user', JSON.stringify(user));
        return { success: true, user };
      }
    } catch (e) {
      // Invalid JSON
    }
  }
  
  return { success: false, error: 'Invalid email or password' };
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
