import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { fetchMyProjects, fetchColleagues, fetchUserProfile, fetchTodayTasks, fetchAllTasks } from '../services/workbenchService.js';
import './Dashboard.css';
import ProfileEdit from './ProfileEdit';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [myProjects, setMyProjects] = useState([]);
  const [colleagues, setColleagues] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [todayTasks, setTodayTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, colleaguesData, profileData, todayTasksData, allTasksData] = await Promise.all([
          fetchMyProjects(),
          fetchColleagues(),
          fetchUserProfile(),
          fetchTodayTasks(),
          fetchAllTasks()
        ]);
        setMyProjects(projectsData);
        setColleagues(colleaguesData);
        setUserProfile(profileData);
        setTodayTasks(todayTasksData);
        setAllTasks(allTasksData);
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

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(updatedProfile);
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="user-profile">
          {loading ? (
            <div className="profile-loading">Loading profile...</div>
          ) : error ? (
            <div className="profile-error">{error}</div>
          ) : userProfile && (
            <>
              <div 
                className="user-avatar"
                onClick={() => setIsEditingProfile(true)}
                title="Click to edit profile"
              >
                {userProfile.username[0].toUpperCase()}
              </div>
              <div className="user-info">
                <h3 className="user-name">{userProfile.username}</h3>
                <p className="user-email">{userProfile.email}</p>
                <div className="user-status">
                  <span className={`status-indicator ${userProfile.is_active ? 'active' : 'inactive'}`}></span>
                  {userProfile.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="user-meta">
                <div className="meta-item">
                  <span className="meta-label">Member since</span>
                  <span className="meta-value">{formatDate(userProfile.created_at)}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Last updated</span>
                  <span className="meta-value">{formatDate(userProfile.updated_at)}</span>
                </div>
              </div>
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditingProfile(true)}
              >
                <i className="fas fa-edit"></i>
                Edit Profile
              </button>
            </>
          )}
        </div>

        {isEditingProfile && (
          <ProfileEdit
            userProfile={userProfile}
            onClose={() => setIsEditingProfile(false)}
            onUpdate={handleProfileUpdate}
          />
        )}

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <i className="fas fa-home"></i>
            Dashboard
          </Link>
          <Link to="/projects" className="nav-item">
            <i className="fas fa-project-diagram"></i>
            My Projects
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <i className="fas fa-bell"></i>
            </button>
            <button className="icon-btn">
              <i className="fas fa-comment"></i>
            </button>
          </div>
        </header>

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

        <section className="my-tasks-section">
          <h2>My Tasks</h2>
          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="tasks-list">
              {allTasks.map(task => (
                <div key={task.id} className="task-card compact">
                  <div className="task-header">
                    <h3>{task.title}</h3>
                    <span 
                      className="task-status"
                      style={{ backgroundColor: getStatusColor(task.status) }}
                    >
                      {task.status}
                    </span>
                  </div>
                  <p className="task-description">
                    {task.description.length > 100 
                      ? `${task.description.substring(0, 100)}...` 
                      : task.description}
                  </p>
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
                </div>
              ))}
              {allTasks.length === 0 && (
                <div className="no-tasks">No tasks available</div>
              )}
            </div>
          )}
        </section>

        <section className="projects-section">
          <div className="section-header">
            <div className="project-badge">
              <span>{myProjects.length}</span>
              <h2>Projects Progress</h2>
            </div>
          </div>
          {loading ? (
            <div className="loading">Loading projects...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="projects-list">
              {myProjects.map(project => (
                <div key={project.id} className="project-item compact">
                  <div className="project-header">
                    <div className="project-info">
                      <h3 className="project-name">
                        {project.name}
                        {project.admin_id === userProfile?.id && (
                          <span className="admin-badge">Admin</span>
                        )}
                      </h3>
                    </div>
                    <div className="progress-value">
                      {Math.round(project.progress)}%
                    </div>
                  </div>
                  
                  <div className="project-progress single-line">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
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

      <aside className="right-sidebar">
        <div className="right-sidebar-section">
          <h2>
            <i className="fas fa-users"></i>
            Colleagues
          </h2>
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

      {isEditingProfile && (
        <ProfileEdit
          userProfile={userProfile}
          onClose={() => setIsEditingProfile(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}

export default Dashboard;
