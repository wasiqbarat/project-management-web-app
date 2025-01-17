import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import MyProjects from './components/MyProjects';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import TaskDetail from './components/TaskDetail.jsx'; // New Import
import ProjectDetail from './components/ProjectDetail.jsx'; // **New Import**


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <PrivateRoute>
                <MyProjects />
              </PrivateRoute>
            } 
          />
          <Route
            path="/project/:projectId"
            element={
              <PrivateRoute>
                <ProjectDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <PrivateRoute>
                <TaskDetail /> {/* New Route */}
              </PrivateRoute>
            }
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
