import React, { useEffect, useState } from 'react';
import { fetchUnreadMessagesCount } from '../../services/workbenchService.js';
import './UnreadMessages.css';

function UnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUnreadMessages = async () => {
      try {
        const data = await fetchUnreadMessagesCount();
        setUnreadCount(data.unreadCount);
      } catch (error) {
        console.error('Error fetching unread messages:', error);
      } finally {
        setLoading(false);
      }
    };

    getUnreadMessages();
  }, []);

  return (
    <div className="workbench-card">
      <h3>Unread Messages</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>You have <strong>{unreadCount}</strong> unread messages.</p>
      )}
    </div>
  );
}

export default UnreadMessages;
