// src/pages/admin/UsersPage.js
import React, { useState, useEffect } from 'react';
import api from '../../api';

function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: '',
    role: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/admin/users', { params: filters });
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Users</h2>
      
      <div>
        <h3>Filters</h3>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={filters.name} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" name="email" value={filters.email} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={filters.address} onChange={handleFilterChange} />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={filters.role} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
            <option value="OWNER">Owner</option>
          </select>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.role}</td>
              <td>
                <button>View</button>
                {user.role === 'OWNER' && <button>View Store</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsersPage;