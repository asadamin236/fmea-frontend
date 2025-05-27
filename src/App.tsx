
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
import UserDetail from "./pages/UserDetail";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";
import EquipmentForm from "./pages/EquipmentForm";
import EquipmentClasses from "./pages/EquipmentClasses";
import EquipmentClassForm from "./pages/EquipmentClassForm";
import EquipmentClassDetail from "./pages/EquipmentClassDetail";
import EquipmentTypes from "./pages/EquipmentTypes";
import EquipmentTypeForm from "./pages/EquipmentTypeForm";
import EquipmentTypeDetail from "./pages/EquipmentTypeDetail";
import Manufacturers from "./pages/Manufacturers";
import ManufacturerForm from "./pages/ManufacturerForm";
import ManufacturerDetail from "./pages/ManufacturerDetail";
import FailureMechanisms from "./pages/FailureMechanisms";
import FailureCauses from "./pages/FailureCauses";
import FMEAAnalysis from "./pages/FMEAAnalysis";
import FMEAAnalysisForm from "./pages/FMEAAnalysisForm";
import FMEAAnalysisDetail from "./pages/FMEAAnalysisDetail";
import FailureMechanismForm from "./pages/FailureMechanismForm";
import FailureMechanismDetail from "./pages/FailureMechanismDetail";
import FailureCauseForm from "./pages/FailureCauseForm";
import FailureCauseDetail from "./pages/FailureCauseDetail";

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
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/equipment/new" element={<EquipmentForm />} />
            <Route path="/equipment/:id" element={<EquipmentDetail />} />
            <Route path="/equipment/:id/edit" element={<EquipmentForm />} />
            {/* Equipment Class Routes */}
            <Route path="/equipment-classes" element={<EquipmentClasses />} />
            <Route path="/equipment-classes/new" element={<EquipmentClassForm />} />
            <Route path="/equipment-classes/:id" element={<EquipmentClassDetail />} />
            <Route path="/equipment-classes/:id/edit" element={<EquipmentClassForm />} />
            {/* Equipment Type Routes */}
            <Route path="/equipment-types" element={<EquipmentTypes />} />
            <Route path="/equipment-types/new" element={<EquipmentTypeForm />} />
            <Route path="/equipment-types/:id" element={<EquipmentTypeDetail />} />
            <Route path="/equipment-types/:id/edit" element={<EquipmentTypeForm />} />
            {/* Manufacturer Routes */}
            <Route path="/manufacturers" element={<Manufacturers />} />
            <Route path="/manufacturers/new" element={<ManufacturerForm />} />
            <Route path="/manufacturers/:id" element={<ManufacturerDetail />} />
            <Route path="/manufacturers/:id/edit" element={<ManufacturerForm />} />
            {/* FMEA Analysis Routes */}
            <Route path="/fmea-analysis" element={<FMEAAnalysis />} />
            <Route path="/fmea-analysis/new" element={<FMEAAnalysisForm />} />
            <Route path="/fmea-analysis/:id" element={<FMEAAnalysisDetail />} />
            <Route path="/fmea-analysis/:id/edit" element={<FMEAAnalysisForm />} />
            {/* Failure Mechanism Routes */}
            <Route path="/failure-mechanisms" element={<FailureMechanisms />} />
            <Route path="/failure-mechanisms/new" element={<FailureMechanismForm />} />
            <Route path="/failure-mechanisms/:id" element={<FailureMechanismDetail />} />
            <Route path="/failure-mechanisms/:id/edit" element={<FailureMechanismForm />} />
            {/* Failure Cause Routes */}
            <Route path="/failure-causes" element={<FailureCauses />} />
            <Route path="/failure-causes/new" element={<FailureCauseForm />} />
            <Route path="/failure-causes/:id" element={<FailureCauseDetail />} />
            <Route path="/failure-causes/:id/edit" element={<FailureCauseForm />} />
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
            <Route path="/users/:id" element={<UserDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
