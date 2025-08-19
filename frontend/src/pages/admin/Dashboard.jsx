// src/pages/admin/Dashboard.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      
      <nav>
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/stores">Stores</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;