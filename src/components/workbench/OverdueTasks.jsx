import React, { useEffect, useState } from 'react';
import { fetchOverdueTasks } from '../../services/workbenchService.js';
import './OverdueTasks.css';

function OverdueTasks() {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOverdueTasks = async () => {
      try {
        const data = await fetchOverdueTasks();
        setOverdueTasks(data.overdueTasks);
      } catch (error) {
        console.error('Error fetching overdue tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getOverdueTasks();
  }, []);

  return (
    <div className="workbench-card">
      <h3>Overdue Tasks</h3>
      {loading ? (
        <p>Loading...</p>
      ) : overdueTasks.length === 0 ? (
        <p>No overdue tasks!</p>
      ) : (
        <ul>
          {overdueTasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong> - Deadline: {new Date(task.deadline).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OverdueTasks;
