// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/index'

const AuthContext = createContext();

export default function AuthProvider ({ children })  {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      setUser(response.data.user);
      navigate(getDashboardRoute(response.data.user.role));
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      console.log(userData);
      
      await api.post('/auth/signup', userData);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
    } catch (error) {
      throw error;
    }
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'ADMIN': return '/admin';
      case 'OWNER': return '/owner';
      default: return '/user';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, changePassword }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);