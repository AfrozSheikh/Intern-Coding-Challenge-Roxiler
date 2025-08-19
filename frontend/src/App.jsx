// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/admin/Dashboard';
import AdminUsersPage from './pages/admin/UsersPage';
import AdminStoresPage from './pages/admin/StoresPage';
import UserDashboard from './pages/user/Dashboard';
import UserStoresPage from './pages/user/StoresPage';
import OwnerDashboard from './pages/owner/Dashboard';
import ChangePasswordPage from './pages/ChangePasswordPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<PrivateRoute allowedRoles={['ADMIN']} />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="stores" element={<AdminStoresPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* User Routes */}
      <Route path="/user" element={<PrivateRoute allowedRoles={['USER']} />}>
        <Route index element={<UserStoresPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* Owner Routes */}
      <Route path="/owner" element={<PrivateRoute allowedRoles={['OWNER']} />}>
        <Route index element={<OwnerDashboard />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* Redirect root */}
      <Route path="/" element={<PrivateRoute allowedRoles={['ADMIN','USER','OWNER']} />}>
        <Route index element={<div>Redirecting to dashboard...</div>} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
