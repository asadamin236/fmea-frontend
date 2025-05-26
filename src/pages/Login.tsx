
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { loginUser, checkAuth } from '@/utils/auth';
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const navigate = useNavigate();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  useEffect(() => {
    // Redirect to dashboard if already logged in
    const { isAuthenticated } = checkAuth();
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginUser(loginEmail, loginPassword);
    
    if (result.success) {
      toast.success("Login successful!");
      navigate('/');
    } else {
      toast.error(result.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">DWTask AMS - FMEA</CardTitle>
          <CardDescription>Login to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4 mt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input 
                id="email"
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Input 
                id="password"
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="text-center text-sm text-gray-500 mt-2">
              <p>Demo credentials:</p>
              <p>Admin: admin@example.com / password</p>
              <p>User: user@example.com / password</p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} DWTask AMS - FMEA
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
