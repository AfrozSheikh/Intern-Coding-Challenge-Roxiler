// src/pages/user/StoresPage.js
import React, { useState, useEffect } from 'react';
import api from '../../api';
import RatingComponent from '../../components/RatingComponent';

function UserStoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState({ name: '', address: '' });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await api.get('/stores', { params: searchTerm });
        setStores(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch stores');
      } finally {
        setLoading(false);
      }
    };
    fetchStores();
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await api.post('/ratings', { storeId, value: rating });
      // Refresh stores to update ratings
      const response = await api.get('/stores', { params: searchTerm });
      setStores(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit rating');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Stores</h2>
      
      <div>
        <h3>Search</h3>
        <div>
          <label>Store Name:</label>
          <input type="text" name="name" value={searchTerm.name} onChange={handleSearchChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={searchTerm.address} onChange={handleSearchChange} />
        </div>
      </div>
      
      <div>
        {stores.map(store => (
          <div key={store.id}>
            <h3>{store.name}</h3>
            <p>Address: {store.address}</p>
            <p>Overall Rating: {store.averageRating || 'No ratings yet'}</p>
            <p>Your Rating: {store.userRating || 'Not rated yet'}</p>
            <RatingComponent 
              storeId={store.id} 
              userRating={store.userRating} 
              onSubmitRating={handleRatingSubmit} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserStoresPage;