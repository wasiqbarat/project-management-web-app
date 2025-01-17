import React from 'react';
import './UserProfile.css';

function UserProfile({ user, onLogout }) {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.username ? user.username[0].toUpperCase() : 'U'}
        </div>
        <div className="profile-info">
          <h3>{user?.username || 'User'}</h3>
          <p>{user?.email || 'No email'}</p>
        </div>
      </div>
      
      <div className="profile-actions">
        <button onClick={onLogout} className="logout-button">
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
