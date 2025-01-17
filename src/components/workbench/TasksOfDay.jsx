import React, { useEffect, useState } from 'react';
import { fetchTasksOfDay } from '../../services/workbenchService.js';
import './TasksOfDay.css';

function TasksOfDay() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const data = await fetchTasksOfDay();
        setTasks(data.tasks);
      } catch (error) {
        console.error('Error fetching tasks of the day:', error);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  return (
    <div className="workbench-card">
      <h3>Tasks of the Day</h3>
      {loading ? (
        <p>Loading...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks for today!</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksOfDay;
