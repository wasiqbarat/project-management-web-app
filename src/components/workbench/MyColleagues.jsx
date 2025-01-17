import React, { useEffect, useState } from 'react';
import { fetchMyColleagues } from '../../services/workbenchService.js';
import './MyColleagues.css';

function MyColleagues() {
  const [colleagues, setColleagues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getColleagues = async () => {
      try {
        const data = await fetchMyColleagues();
        setColleagues(data.colleagues);
      } catch (error) {
        console.error('Error fetching colleagues:', error);
      } finally {
        setLoading(false);
      }
    };

    getColleagues();
  }, []);

  return (
    <div className="workbench-card">
      <h3>My Colleagues</h3>
      {loading ? (
        <p>Loading...</p>
      ) : colleagues.length === 0 ? (
        <p>You have no colleagues.</p>
      ) : (
        <div className="colleagues-list">
          {colleagues.map(colleague => (
            <div key={colleague.id} className="colleague">
              {colleague.firstName.charAt(0)}. {colleague.lastName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyColleagues;
