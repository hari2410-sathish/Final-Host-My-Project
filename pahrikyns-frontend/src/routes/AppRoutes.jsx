import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";
import UserDashboardLayout from "../layouts/UserDashboard";
import AdminLayout from "../layouts/AdminLayout";

import HomePage from "../pages/Home/HomePage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

import AdminLogin from "../pages/Auth/AdminLogin";
import AdminOTPVerify from "../pages/Auth/AdminOTPVerify";
import AdminDashboard from "../pages/Admin/AdminDashboard";

import CourseRoutes from "./CourseRoutes";
import AdminProtectedRoute from "../utils/AdminProtectedRoute";
import UserProtectedRoute from "../utils/UserProtectedRoute";

// USER PAGES
import UserProfile from "../pages/User/UserProfile";
import ChangePassword from "../pages/User/ChangePassword";
import MyCourses from "../pages/User/MyCourses";
import ProgressDashboard from "../pages/User/ProgressDashboard";

// RESUME PAGES (NEW SYSTEM)
import ResumeHome from "../pages/Admin/Resume/ResumeHome";
import ResumeBuilder from "../pages/Admin/Resume/ResumeBuilder";

// TEMPLATES
import TemplateSimple from "../pages/Admin/Resume/templates/TemplateSimple";
import TemplateMedium from "../pages/Admin/Resume/templates/TemplateMedium";
import TemplatePro from "../pages/Admin/Resume/templates/TemplatePro";
import TemplateMaster from "../pages/Admin/Resume/templates/TemplateMaster";
import TemplateUltraPro from "../pages/Admin/Resume/templates/TemplateUltraPro";

// PUBLIC RESUME VIEW
import ResumePublic from "../pages/Public/ResumePublic";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/*" element={<CourseRoutes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* USER PROTECTED ROUTES */}
        <Route
          element={
            <UserProtectedRoute>
              <UserDashboardLayout />
            </UserProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ProgressDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="progress" element={<ProgressDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<ChangePassword />} />
        </Route>

        {/* PUBLIC RESUME SHARE PAGE */}
        <Route path="/resume/:resumeId" element={<ResumePublic />} />

        {/* ADMIN PUBLIC */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp" element={<AdminOTPVerify />} />

        {/* ADMIN PROTECTED ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* RESUME SYSTEM */}
          <Route path="resume" element={<ResumeHome />} />
          <Route path="resume/builder" element={<ResumeBuilder />} />

          {/* RESUME TEMPLATE ROUTES */}
          <Route path="resume/simple" element={<TemplateSimple />} />
          <Route path="resume/medium" element={<TemplateMedium />} />
          <Route path="resume/pro" element={<TemplatePro />} />
          <Route path="resume/master" element={<TemplateMaster />} />
          <Route path="resume/ultra-pro" element={<TemplateUltraPro />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
