// src/pages/admin/StoresPage.js
import React, { useState, useEffect } from 'react';
import api from '../../api';

function AdminStoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [showAddStore, setShowAddStore] = useState(false);
  const [newStore, setNewStore] = useState({
    name: '',
    email: '',
    address: '',
    ownerEmail: ''
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/admin/stores', { params: filters });
        setStores(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/stores', newStore);
      setShowAddStore(false);
      setNewStore({ name: '', email: '', address: '', ownerEmail: '' });
      // Refresh stores
      const response = await api.get('/admin/stores', { params: filters });
      setStores(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add store');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Stores Management</h2>
      
      <button onClick={() => setShowAddStore(true)}>Add New Store</button>
      
      {showAddStore && (
        <div>
          <h3>Add New Store</h3>
          <form onSubmit={handleAddStore}>
            <div>
              <label>Store Name:</label>
              <input 
                type="text" 
                value={newStore.name} 
                onChange={(e) => setNewStore({...newStore, name: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                value={newStore.email} 
                onChange={(e) => setNewStore({...newStore, email: e.target.value})} 
              />
            </div>
            <div>
              <label>Address:</label>
              <textarea 
                value={newStore.address} 
                onChange={(e) => setNewStore({...newStore, address: e.target.value})} 
                required 
              />
            </div>
            <div>
              <label>Owner Email:</label>
              <input 
                type="email" 
                value={newStore.ownerEmail} 
                onChange={(e) => setNewStore({...newStore, ownerEmail: e.target.value})} 
                required 
              />
            </div>
            <button type="submit">Add Store</button>
            <button type="button" onClick={() => setShowAddStore(false)}>Cancel</button>
          </form>
        </div>
      )}
      
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
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Rating</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.email}</td>
              <td>{store.address}</td>
              <td>{store.averageRating || 'No ratings'}</td>
              <td>{store.owner?.name || 'No owner'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminStoresPage;