// src/pages/ChangePasswordPage.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { changePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);
      setSuccess('Password changed successfully');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password');
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password:</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>New Password:</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            minLength="8" 
            maxLength="16" 
            required 
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;