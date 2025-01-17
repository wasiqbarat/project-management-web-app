import React, { useState, useEffect } from 'react';
import { fetchMyProjects, getProjectTasks, addProject } from '../services/workbenchService';
import './Projects.css';

function Projects() {
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
    console.log('View tasks clicked for project:', project);
    setSelectedProject(project);
    setShowTasksModal(true);
    setTasksLoading(true);
    setTasksError('');
    setProjectTasks([]);

    try {
      const tasks = await getProjectTasks(project.id);
      console.log('Received tasks:', tasks);
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
      await addProject(newProject);
      setShowAddModal(false);
      setNewProject({ name: '', team: '', image_url: '' });
      loadProjects(); // Reload projects after adding
    } catch (err) {
      setError('Failed to add project');
      console.error(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
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

  console.log('Render state:', { 
    showTasksModal, 
    selectedProject, 
    tasksLoading, 
    tasksError, 
    projectTasks 
  });

  return (
    <div className="projects-page">
      <header className="projects-header">
        <h1>My Projects</h1>
        <button 
          className="add-project-btn"
          onClick={() => setShowAddModal(true)}
        >
          <i className="fas fa-plus"></i>
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
                      <i className="fas fa-users"></i>
                      {project.team.name}
                    </span>
                    <span className="progress">
                      {Math.round(project.progress)}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="project-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${project.progress}%` }}
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
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedProject.name} - Tasks</h2>
              <button 
                className="close-btn"
                onClick={() => setShowTasksModal(false)}
              >
                <i className="fas fa-times"></i>
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
                        <div className="task-title">
                          <h3>{task.title}</h3>
                          <div className="task-meta">
                            <span>
                              <i className="fas fa-calendar"></i>
                              Due: {formatDate(task.due_date)}
                            </span>
                            <span>
                              <i className="fas fa-flag"></i>
                              Priority: {task.priority}
                            </span>
                            <span>
                              <i className="fas fa-clock"></i>
                              Created: {formatDate(task.created_at)}
                            </span>
                          </div>
                        </div>
                        <span 
                          className="task-status"
                          style={{ backgroundColor: getStatusColor(task.status) }}
                        >
                          {task.status}
                        </span>
                      </div>
                      
                      <p className="task-description">{task.description}</p>
                      
                      <div className="task-progress">
                        <div className="task-progress-header">
                          <span>Progress</span>
                          <span>{task.progress_percentage}%</span>
                        </div>
                        <div className="task-progress-bar">
                          <div 
                            className="task-progress-fill"
                            style={{ width: `${task.progress_percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="task-team">
                        <div className="task-team-header">
                          <i className="fas fa-users"></i>
                          {task.team.name}
                        </div>
                        <div className="task-team-members">
                          {task.team.members.map(member => (
                            <div key={member.id} className="team-member">
                              <div className="member-avatar">
                                {member.username[0].toUpperCase()}
                              </div>
                              <span>{member.username}</span>
                            </div>
                          ))}
                        </div>
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
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button 
                className="close-btn"
                onClick={() => setShowAddModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleAddProject} className="modal-body">
              <div className="form-group">
                <label htmlFor="name">Project Name</label>
                <input
                  type="text"
                  id="name"
                  value={newProject.name}
                  onChange={e => setNewProject({...newProject, name: e.target.value})}
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="image_url">Image URL (optional)</label>
                <input
                  type="url"
                  id="image_url"
                  value={newProject.image_url}
                  onChange={e => setNewProject({...newProject, image_url: e.target.value})}
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
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

export default Projects; 