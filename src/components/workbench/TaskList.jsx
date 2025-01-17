import React, { useEffect, useState } from 'react';
import { fetchMyTasks } from '../../services/workbenchService.js';
import './TaskList.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyTasks = async () => {
      try {
        const data = await fetchMyTasks();
        setTasks(data.tasks.slice(0, 10)); // Get first 10 tasks
      } catch (error) {
        console.error('Error fetching my tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    getMyTasks();
  }, []);

  return (
    <div className="workbench-card">
      <h3>My Tasks</h3>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>You have no tasks assigned.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>: {task.description.length > 50 ? `${task.description.substring(0, 50)}...` : task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
