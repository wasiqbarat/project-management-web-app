import React, { useState, useEffect } from 'react';
import { fetchMyProjects } from '../services/workbenchService';
import './MyProjects.css';

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchMyProjects();
        setProjects(data);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-projects">
      <header className="projects-header">
        <h1>My Projects</h1>
        <button className="new-project-btn">
          <i className="fas fa-plus"></i> New Project
        </button>
      </header>

      <div className="projects-grid">
        {projects.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-header">
              <img 
                src={project.image_url || 'https://via.placeholder.com/150'} 
                alt={project.name}
                className="project-image"
              />
              <div className="project-info">
                <h3>{project.name}</h3>
                <p className="team-name">{project.team.name}</p>
              </div>
            </div>
            
            <div className="project-progress">
              <div className="progress-info">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="project-meta">
              <div className="meta-item">
                <i className="fas fa-user"></i>
                <span>Admin: {project.admin_username}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>Created: {formatDate(project.created_at)}</span>
              </div>
            </div>

            <div className="project-team">
              <h4>Team Members</h4>
              <div className="team-members">
                {project.team.members.map(member => (
                  <div key={member.id} className="member-avatar" title={member.username}>
                    {member.username[0].toUpperCase()}
                  </div>
                ))}
              </div>
            </div>

            <div className="project-actions">
              <button className="action-btn">
                <i className="fas fa-tasks"></i>
                View Tasks
              </button>
              <button className="action-btn">
                <i className="fas fa-edit"></i>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProjects; 