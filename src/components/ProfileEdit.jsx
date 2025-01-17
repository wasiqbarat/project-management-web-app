import React, { useState } from 'react';
import { updateUserProfile } from '../services/workbenchService';
import './ProfileEdit.css';

function ProfileEdit({ userProfile, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    email: userProfile?.email || '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Form validation
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Password validation if provided
    if (formData.password) {
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
      }
    }

    // Only send fields that have been changed
    const updatedFields = {};
    if (formData.email.trim() !== userProfile.email) {
      updatedFields.email = formData.email.trim();
    }
    if (formData.password) {
      updatedFields.password = formData.password;
    }

    // If no fields have been changed, show message
    if (Object.keys(updatedFields).length === 0) {
      setError('No changes to save');
      setLoading(false);
      return;
    }

    try {
      const updatedProfile = await updateUserProfile(updatedFields);
      setSuccess('Profile updated successfully!');
      onUpdate(updatedProfile);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-edit-overlay">
      <div className="profile-edit-modal">
        <div className="modal-header">
          <h2>Edit Profile</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">New Password (optional)</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileEdit; 