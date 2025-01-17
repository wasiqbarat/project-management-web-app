import React, { useState } from 'react';
import './Workbench.css';

function Workbench() {
  // Mock data (will be replaced with API data later)
  const [todayTasks] = useState([
    { id: 1, title: 'Review Project Proposal', description: 'Review and provide feedback on the new project proposal', deadline: '2024-01-17', status: 'pending' },
    { id: 2, title: 'Team Meeting', description: 'Weekly team sync-up meeting', deadline: '2024-01-17', status: 'pending' },
  ]);

  const [overdueTasks] = useState([
    { id: 3, title: 'Documentation Update', description: 'Update API documentation', deadline: '2024-01-15', status: 'overdue' },
  ]);

  const [unreadMessages] = useState(5);

  const [projects] = useState([
    { id: 1, name: 'Project Alpha', progress: 75, description: 'Main development project' },
    { id: 2, name: 'Project Beta', progress: 45, description: 'Client website redesign' },
  ]);

  const [colleagues] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson' },
  ]);

  return (
    <div className="workbench-container">
      {/* Tasks Section */}
      <div className="workbench-section">
        <h2>Today's Tasks</h2>
        <div className="tasks-grid">
          {todayTasks.map(task => (
            <div key={task.id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-footer">
                <span className="deadline">Due: {task.deadline}</span>
                <span className={`status ${task.status}`}>{task.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue Tasks */}
      <div className="workbench-section">
        <h2>Overdue Tasks</h2>
        <div className="tasks-grid">
          {overdueTasks.map(task => (
            <div key={task.id} className="task-card overdue">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <div className="task-footer">
                <span className="deadline">Due: {task.deadline}</span>
                <span className="status overdue">Overdue</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages and Stats */}
      <div className="workbench-section stats-section">
        <div className="stat-card">
          <h3>Unread Messages</h3>
          <div className="stat-value">{unreadMessages}</div>
        </div>
      </div>

      {/* Projects Status (Admin Only) */}
      <div className="workbench-section">
        <h2>Project Status</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-status-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="progress-container">
                <div 
                  className="progress-bar" 
                  style={{ width: `${project.progress}%` }}
                />
                <span className="progress-text">{project.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colleagues Section */}
      <div className="workbench-section">
        <h2>My Colleagues</h2>
        <div className="colleagues-grid">
          {colleagues.map(colleague => (
            <div key={colleague.id} className="colleague-card">
              <div className="colleague-avatar">
                {colleague.firstName[0]}{colleague.lastName[0]}
              </div>
              <div className="colleague-info">
                <p>{colleague.firstName} {colleague.lastName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workbench;
