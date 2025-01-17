import React, { useEffect, useState } from 'react';
import { fetchProjectStatuses } from '../../services/workbenchService.js';
import { useAuth } from '../../contexts/AuthContext.jsx';
import './ProjectStatuses.css';

function ProjectStatuses() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Only display for admin users
  if (!user || !user.isAdmin) {
    return null;
  }

  useEffect(() => {
    const getProjectStatuses = async () => {
      try {
        const data = await fetchProjectStatuses();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching project statuses:', error);
      } finally {
        setLoading(false);
      }
    };

    getProjectStatuses();
  }, []);

  return (
    <div className="workbench-card">
      <h3>Project Statuses</h3>
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="project-list">
          {projects.map(project => (
            <li key={project.id} className="project-item">
              <a href={`/project/${project.id}`} className="project-link">
                <strong>{project.name}</strong>
              </a>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <span>{project.progress}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectStatuses;
