import api from './api.js';

// Fetch My Projects
export const fetchMyProjects = async () => {
  const response = await api.get('/projects/myprojects');
  return response.data;
};

// Fetch All Tasks
export const fetchAllTasks = async () => {
  try {
    const response = await api.get('/tasks/all?limit=10');
    return response.data;
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    throw error;
  }
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

// Fetch User Profile
export const fetchUserProfile = async () => {
  const response = await api.get('/user/profile');
  return response.data;
};

export const updateUserProfile = async (data) => {
  try {
    const response = await api.patch('/user/profile', data);
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    if (error.response) {
      // Get the specific error message from the response if available
      const errorMessage = error.response.data?.detail || 
                          error.response.data?.message || 
                          error.response.data?.error ||
                          'Invalid request data. Please check your input.';
      
      if (error.response.status === 400) {
        throw new Error(`Validation error: ${errorMessage}`);
      } else if (error.response.status === 401) {
        throw new Error('Please log in again to update your profile.');
      } else if (error.response.status === 403) {
        throw new Error('You do not have permission to perform this action.');
      } else {
        throw new Error(errorMessage);
      }
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up the request. Please try again.');
    }
  }
};

// Add new task to a project
export const addTaskToProject = async (projectId, taskData) => {
  try {
    const response = await api.post(`/projects/${projectId}/task`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Get all tasks for a project
export const getProjectTasks = async (projectId) => {
  try {
    console.log('Fetching tasks for project:', projectId);
    const response = await api.get(`/projects/${projectId}/tasks`);
    console.log('Project tasks response:', response);
    
    if (response.data) {
      return Array.isArray(response.data) ? response.data : [response.data];
    }
    return [];
  } catch (error) {
    console.error('Error fetching project tasks:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to fetch project tasks');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up the request. Please try again.');
    }
  }
};



// Add new project
export const addProject = async (projectData) => {
  try {
    const response = await api.post('/project', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to create project');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up the request. Please try again.');
    }
  }
};



// Fetch Subtasks for a Task
export const fetchSubtasks = async (taskId) => {
  try {
    const response = await api.get(`/tasks/${taskId}/subtask/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching subtasks:', error);
    throw error;
  }
};

// Create a Subtask
export const createSubtask = async (taskId, subtaskData) => {
  try {
    const response = await api.post(`/tasks/${taskId}/subtask`, subtaskData);
    return response.data;
  } catch (error) {
    console.error('Error creating subtask:', error);
    throw error;
  }
};

// Update a Subtask
export const updateSubtask = async (taskId, subtaskId, updateData) => {
  console.log(`Updating Subtask: Task ID = ${taskId}, Subtask ID = ${subtaskId}`, updateData);
  try {
    const response = await api.patch(`/tasks/${taskId}/subtasks/${subtaskId}`, updateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Subtask updated successfully:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Server Error:', error.response.status, error.response.data);
      throw new Error(error.response.data.detail || 'Failed to update subtask');
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw new Error('No response from server');
    } else {
      // Something else caused the error
      console.error('Error:', error.message);
      throw new Error('An unexpected error occurred');
    }
  }
};