import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { fetchTodayTasks, fetchOverdueTasks, fetchAllTasks, fetchMyProjects, fetchColleagues } from '../services/workbenchService.js';
import './Dashboard.css';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [todayTasks, setTodayTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [myProjects, setMyProjects] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [todayTasksData, overdueTasksData, allTasksData, projectsData, colleaguesData] = await Promise.all([
          fetchTodayTasks(),
          fetchOverdueTasks(),
          fetchAllTasks(),
          fetchMyProjects(),
          fetchColleagues()
        ]);
        setTodayTasks(todayTasksData);
        setOverdueTasks(overdueTasksData);
        setAllTasks(allTasksData.slice(0, 10));
        setMyProjects(projectsData);
        setColleagues(colleaguesData);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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

  const isProjectAdmin = (projectAdminId) => {
    return user?.id === projectAdminId;
  };

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="user-profile">
          <div className="user-avatar">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <h3 className="user-name">{user?.username || 'User'}</h3>
          <p className="user-role">Project Manager</p>
          <div className="progress-container">
            <div className="progress-label">
              <span>Progress</span>
              <span>75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <i className="fas fa-home"></i>
            Dashboard
          </Link>
          <Link to="/projects" className="nav-item">
            <i className="fas fa-project-diagram"></i>
            My Projects
          </Link>
          
          {/* Tasks Section in Sidebar */}
          <div className="sidebar-tasks">
            <h3 className="sidebar-tasks-title">
              <i className="fas fa-tasks"></i>
              My Tasks
            </h3>
            {loading ? (
              <div className="sidebar-loading">Loading...</div>
            ) : error ? (
              <div className="sidebar-error">{error}</div>
            ) : (
              <div className="sidebar-tasks-list">
                {allTasks.map(task => (
                  <div key={task.id} className="sidebar-task-item">
                    <div className="task-title">
                      <span className="status-dot" style={{ backgroundColor: getStatusColor(task.status) }}></span>
                      {task.title}
                    </div>
                    <div className="task-brief">
                      {task.description.length > 50 
                        ? `${task.description.substring(0, 50)}...` 
                        : task.description}
                    </div>
                  </div>
                ))}
                {allTasks.length === 0 && (
                  <div className="no-tasks">No tasks available</div>
                )}
              </div>
            )}
          </div>

          <button className="nav-item" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </nav>

        <button className="new-project-btn">
          <i className="fas fa-plus"></i> New Project
        </button>

        {/* Colleagues Section */}
        <div className="sidebar-colleagues">
          <h3 className="sidebar-section-title">
            <i className="fas fa-users"></i>
            Colleagues
          </h3>
          {loading ? (
            <div className="sidebar-loading">Loading colleagues...</div>
          ) : error ? (
            <div className="sidebar-error">{error}</div>
          ) : (
            <div className="colleagues-list">
              {colleagues.map(team => (
                <div key={team.team_id} className="team-section">
                  <div className="team-header">
                    <span className="team-name">{team.team_name}</span>
                    <span className="member-count">{team.colleagues.length}</span>
                  </div>
                  <div className="team-members">
                    {team.colleagues.map(colleague => (
                      <div key={colleague.id} className="colleague-item">
                        <div className="colleague-avatar">
                          {colleague.username[0].toUpperCase()}
                        </div>
                        <div className="colleague-info">
                          <span className="colleague-name">{colleague.username}</span>
                          <span className="colleague-email">{colleague.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {colleagues.length === 0 && (
                <div className="no-colleagues">No colleagues found</div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="content-header">
          <div className="search-bar">
            <i className="fas fa-cog"></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <i className="fas fa-bell"></i>
            </button>
            <button className="icon-btn">
              <i className="fas fa-comment"></i>
            </button>
            <button className="icon-btn" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </header>

        {/* Projects Section */}
        <section className="projects-section">
          <div className="section-header">
            <div className="project-badge">
              <span>3</span>
              <h2>Personal Projects</h2>
            </div>
            <span className="status-badge">Active</span>
          </div>
        </section>

        {/* Today's Tasks Section */}
        <section className="today-tasks-section">
          <h2>Today's Tasks</h2>
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="tasks-list">
              {todayTasks.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span 
                      className="task-status"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-footer">
                    <div className="task-meta">
                      <span className="due-date">
                        <i className="fas fa-calendar"></i>
                        Due: {formatDate(task.due_date)}
                      </span>
                      <span className="priority">
                        <i className="fas fa-flag"></i>
                        Priority: {task.priority}
                      </span>
                    </div>
                    <div className="task-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${task.progress_percentage}%` }}
                        ></div>
                      </div>
                      <span>{task.progress_percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
              {todayTasks.length === 0 && (
                <div className="no-tasks">No tasks for today</div>
              )}
            </div>
          )}
        </section>

        {/* Overdue Tasks Section */}
        <section className="overdue-tasks-section">
          <h2>Overdue Tasks</h2>
          {loading ? (
            <div className="loading">Loading overdue tasks...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="tasks-list">
              {overdueTasks.map(task => (
                <div key={task.id} className="task-card overdue">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span 
                      className="task-status"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div className="task-footer">
                    <div className="task-meta">
                      <span className="due-date overdue">
                        <i className="fas fa-exclamation-circle"></i>
                        Due: {formatDate(task.due_date)}
                      </span>
                      <span className="priority">
                        <i className="fas fa-flag"></i>
                        Priority: {task.priority}
                      </span>
                    </div>
                    <div className="task-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${task.progress_percentage}%` }}
                        ></div>
                      </div>
                      <span>{task.progress_percentage}%</span>
                    </div>
                  </div>
                </div>
              ))}
              {overdueTasks.length === 0 && (
                <div className="no-tasks">No overdue tasks</div>
              )}
            </div>
          )}
        </section>

        {/* Tasks Grid */}
        <div className="tasks-grid">
          {/* Pending Tasks */}
          <div className="tasks-column">
            <h2 className="tasks-title pending">Pending Tasks</h2>
            <div className="task-list">
              <div className="task-item">
                <i className="fas fa-clock"></i>
                <span>Complete project documentation</span>
              </div>
            </div>
          </div>

          {/* Completed Tasks */}
          <div className="tasks-column">
            <h2 className="tasks-title completed">Completed Tasks</h2>
            <div className="task-list">
              <div className="task-item">
                <i className="fas fa-check"></i>
                <span>Initial project setup completed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Progress */}
        <section className="progress-section">
          <h2>Project Progress</h2>
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="progress-list">
              {myProjects.map(project => (
                <div key={project.id} className="progress-item">
                  <div className="progress-header">
                    <div className="project-info">
                      <span className="project-name">{project.name}</span>
                      {isProjectAdmin(project.admin_id) && (
                        <span className="admin-badge">Admin</span>
                      )}
                    </div>
                    <span className="progress-percentage">
                      {Math.round(project.progress)}%
                    </span>
                  </div>
                  <div className="progress-details">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    {isProjectAdmin(project.admin_id) && (
                      <div className="team-info">
                        <span className="team-name">{project.team.name}</span>
                        <span className="member-count">
                          {project.team.members.length} members
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {myProjects.length === 0 && (
                <div className="no-projects">No projects available</div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
