// src/pages/user/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function UserDashboard() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      
      <nav>
        <Link to="/user">Stores</Link>
        <Link to="/user/change-password">Change Password</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;