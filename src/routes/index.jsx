import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'
import HomePage from '../pages/HomePage'
import ProjectsPage from '../pages/ProjectsPage'
import ProjectDetailPage from '../pages/ProjectDetailPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ProjectManagement from '../pages/admin/ProjectManagement'
import CreateProject from '../pages/admin/CreateProject'
import EditProject from '../pages/admin/EditProject'
import { isAuthenticated, getCurrentUser } from '../services/authService'
import LoginPage from '../components/login/LoginPage' // 添加登录页面导入

// Admin route guard component
const AdminRoute = ({ children }) => {
  const user = getCurrentUser();
  const isAdmin = user && user.role === 'admin';
  
  if (!isAuthenticated()) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }
  
  if (!isAdmin) {
    // Logged in but not admin, redirect to home
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
      
      {/* Admin Routes */}
      <Route 
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="projects" element={<ProjectManagement />} />
        <Route path="projects/create" element={<CreateProject />} />
        <Route path="projects/edit/:id" element={<EditProject />} />
      </Route>
      
      {/* Login Route */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
