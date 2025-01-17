import api from './api.js';

// Fetch My Projects
export const fetchMyProjects = async () => {
  const response = await api.get('/projects/myprojects');
  return response.data;
};

// Fetch All Tasks
export const fetchAllTasks = async () => {
  const response = await api.get('/tasks/all');
  return response.data;
};

// Fetch Tasks of the Day
export const fetchTodayTasks = async () => {
  const response = await api.get('/tasks/today');
  return response.data;
};

// Fetch Overdue Tasks
export const fetchOverdueTasks = async () => {
  const response = await api.get('/tasks/passed-deadlines/');
  return response.data;
};

// Fetch Unread Messages Count
export const fetchUnreadMessagesCount = async () => {
  const response = await api.get('/messages/unread/count');
  return response.data;
};

// Fetch My Tasks
export const fetchMyTasks = async () => {
  const response = await api.get('/tasks/my-tasks');
  return response.data;
};

// Fetch Project Statuses (Admin Only)
export const fetchProjectStatuses = async () => {
  const response = await api.get('/projects/statuses');
  return response.data;
};

// Fetch My Colleagues
export const fetchMyColleagues = async () => {
  const response = await api.get('/users/colleagues');
  return response.data;
};

// Fetch Project Details
export const fetchProjectDetails = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

// Fetch My Colleagues
export const fetchColleagues = async () => {
  const response = await api.get('/user/colleagues');
  return response.data;
};
