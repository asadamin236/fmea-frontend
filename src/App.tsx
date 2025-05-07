
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Components from "./pages/Components";
import FailureModes from "./pages/FailureModes";
import SpareParts from "./pages/SpareParts";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import TaskDetail from "./pages/TaskDetail";
import TaskForm from "./pages/TaskForm";
import ProductForm from "./pages/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import ComponentForm from "./pages/ComponentForm";
import ComponentDetail from "./pages/ComponentDetail";
import FailureModeForm from "./pages/FailureModeForm";
import FailureModeDetail from "./pages/FailureModeDetail";
import SparePartForm from "./pages/SparePartForm";
import SparePartDetail from "./pages/SparePartDetail";
import TeamMemberForm from "./pages/TeamMemberForm";
import Users from "./pages/Users";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/new" element={<ComponentForm />} />
            <Route path="/components/:id" element={<ComponentDetail />} />
            <Route path="/components/:id/edit" element={<ComponentForm />} />
            <Route path="/failure-modes" element={<FailureModes />} />
            <Route path="/failure-modes/new" element={<FailureModeForm />} />
            <Route path="/failure-modes/:id" element={<FailureModeDetail />} />
            <Route path="/failure-modes/:id/edit" element={<FailureModeForm />} />
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/spare-parts/new" element={<SparePartForm />} />
            <Route path="/spare-parts/:id" element={<SparePartDetail />} />
            <Route path="/spare-parts/:id/edit" element={<SparePartForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/new" element={<TeamMemberForm />} />
            <Route path="/teams/:id" element={<TeamMemberForm />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
            <Route path="/users" element={<Users />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
