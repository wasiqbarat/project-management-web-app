// src/components/MyProjects.jsx

import React, { useState, useEffect } from 'react';
import { fetchMyProjects, getProjectTasks, addProject } from '../services/workbenchService.js';
import { useNavigate } from 'react-router-dom';
import './MyProjects.css';

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectTasks, setProjectTasks] = useState([]);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [tasksError, setTasksError] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    team: '',
    image_url: ''
  });
  const [addError, setAddError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await fetchMyProjects();
      setProjects(data);
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewTasks = async (project) => {
    setSelectedProject(project);
    setShowTasksModal(true);
    setTasksLoading(true);
    setTasksError('');
    setProjectTasks([]);

    try {
      const tasks = await getProjectTasks(project.id);
      setProjectTasks(tasks);
    } catch (err) {
      console.error('Error loading tasks:', err);
      setTasksError(err.message || 'Failed to load tasks');
    } finally {
      setTasksLoading(false);
    }
  };

  const handleEdit = (project) => {
    // TODO: Implement edit functionality
    console.log('Edit clicked for project:', project);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      setAddError('');
      
      // Validate inputs
      if (!newProject.name.trim()) {
        setAddError('Project name is required');
        return;
      }
      if (!newProject.team.trim()) {
        setAddError('Team ID is required');
        return;
      }

      // Create project data object
      const projectData = {
        name: newProject.name.trim(),
        team_id: newProject.team.trim(),
        image_url: newProject.image_url.trim() || null
      };

      console.log('Creating project with data:', projectData);
      const response = await addProject(projectData);
      console.log('Project created:', response);

      // Close modal and reset form
      setShowAddModal(false);
      setNewProject({ name: '', team: '', image_url: '' });
      setAddError('');
      
      // Reload projects list
      await loadProjects();
    } catch (err) {
      console.error('Error adding project:', err);
      setAddError(
        err.response?.data?.detail || 
        err.response?.data?.message || 
        err.message || 
        'Failed to create project'
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'TODO':
        return '#e67700';
      case 'IN_PROGRESS':
        return '#228be6';
      case 'DONE':
        return '#2f9e44';
      default:
        return '#868e96';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleTaskClick = (task) => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1>My Projects</h1>
        <button 
          className="btn add-project-btn"
          onClick={() => setShowAddModal(true)}
        >
          New Project
        </button>
      </header>

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-avatar">
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.name} />
                  ) : (
                    <span>{project.name[0].toUpperCase()}</span>
                  )}
                </div>
                <div className="project-info">
                  <h3>{project.name}</h3>
                  <div className="project-meta">
                    <span className="team-name">
                      Team: {project.team?.name}
                    </span>
                    <span className="progress">
                      Progress: {Math.round(project.progress || 0)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="project-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
              </div>

              <div className="project-actions">
                <button 
                  className="btn view-tasks-btn"
                  onClick={() => handleViewTasks(project)}
                >
                  View Tasks
                </button>
                <button 
                  className="btn edit-btn"
                  onClick={() => handleEdit(project)}
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tasks Modal */}
      {showTasksModal && selectedProject && (
        <div className="modal-overlay" onClick={() => setShowTasksModal(false)}>
          <div 
            className="modal animated" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tasks-modal-title"
          >
            <div className="modal-header">
              <h2 id="tasks-modal-title">{selectedProject.name} - Tasks</h2>
              <button 
                className="close-btn"
                onClick={() => setShowTasksModal(false)}
                aria-label="Close Tasks Modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              {tasksLoading ? (
                <div className="loading">Loading tasks...</div>
              ) : tasksError ? (
                <div className="error">{tasksError}</div>
              ) : (
                <div className="tasks-list">
                  {Array.isArray(projectTasks) && projectTasks.map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-header">
                        <h3 
                          className="task-title clickable" 
                          onClick={() => handleTaskClick(task)}
                        >
                          {task.title}
                        </h3>
                        <span 
                          className="task-status"
                          style={{ backgroundColor: getStatusColor(task.status) }}
                        >
                          {task.status}
                        </span>
                      </div>
                      <p className="task-description">{task.description}</p>
                      <div className="task-meta">
                        <span>Due: {formatDate(task.due_date)}</span>
                        <span>Priority: {task.priority}</span>
                        <span>Progress: {task.progress_percentage}%</span>
                      </div>
                    </div>
                  ))}
                  {(!Array.isArray(projectTasks) || projectTasks.length === 0) && (
                    <div className="no-tasks">No tasks available</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div 
            className="modal animated" 
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-project-modal-title"
          >
            <div className="modal-header">
              <h2 id="add-project-modal-title">Create New Project</h2>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddModal(false);
                  setNewProject({ name: '', team: '', image_url: '' });
                  setAddError('');
                }}
                aria-label="Close Add Project Modal"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddProject} className="modal-body">
              {addError && (
                <div className="error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  {addError}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Project Name</label>
                <input
                  type="text"
                  id="name"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Enter project name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="team">Team ID</label>
                <input
                  type="text"
                  id="team"
                  value={newProject.team}
                  onChange={e => setNewProject({...newProject, team: e.target.value})}
                  placeholder="Enter team ID"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image_url">Image URL (Optional)</label>
                <input
                  type="text"
                  id="image_url"
                  value={newProject.image_url}
                  onChange={e => setNewProject({...newProject, image_url: e.target.value})}
                  placeholder="Enter image URL (optional)"
                />
              </div>
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn cancel-btn"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewProject({ name: '', team: '', image_url: '' });
                    setAddError('');
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn submit-btn">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
