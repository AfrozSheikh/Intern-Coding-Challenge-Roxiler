// src/pages/owner/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function OwnerDashboard() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/stores/owner/dashboard');
        setDashboardData(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Owner Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      
      <nav>
        <Link to="/owner">Dashboard</Link>
        <Link to="/owner/change-password">Change Password</Link>
        <button onClick={logout}>Logout</button>
      </nav>
      
      <div>
        <h2>Store Statistics</h2>
        <p>Average Rating: {dashboardData?.averageRating || 'No ratings yet'}</p>
        <p>Total Ratings: {dashboardData?.totalRatings}</p>
      </div>
      
      <div>
        <h2>Users who rated your store</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {dashboardData?.ratings?.map((rating) => (
              <tr key={rating.id}>
                <td>{rating.user.name}</td>
                <td>{rating.user.email}</td>
                <td>{rating.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default OwnerDashboard;git branch -M main
git remote add origin https://github.com/AfrozSheikh/Intern-Coding-Challenge-Roxiler.git
git push -u origin main