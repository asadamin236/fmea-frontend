
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginUser, registerUser, checkAuth } from '@/utils/auth';
import { toast } from "@/components/ui/sonner";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  
  // Register form state
  const [registerName, setRegisterName] = useState<string>("");
  const [registerEmail, setRegisterEmail] = useState<string>("");
  const [registerPassword, setRegisterPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    const result = registerUser(registerName, registerEmail, registerPassword);
    
    if (result.success) {
      toast.success("Registration successful!");
      navigate('/');
    } else {
      toast.error(result.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">FMEA Risk Insight System</CardTitle>
          <CardDescription>Login to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
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
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <Input 
                    id="name"
                    type="text" 
                    value={registerName} 
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input 
                    id="register-email"
                    type="email" 
                    value={registerEmail} 
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</label>
                  <Input 
                    id="register-password"
                    type="password" 
                    value={registerPassword} 
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <Input 
                    id="confirm-password"
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} FMEA Risk Insight System
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
