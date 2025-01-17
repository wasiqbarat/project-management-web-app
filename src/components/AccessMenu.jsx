import React from 'react';
import { NavLink } from 'react-router-dom';
import './AccessMenu.css';

function AccessMenu() {
  return (
    <nav className="access-menu">
      <h2>Menu</h2>
      <ul>
        <li>
          <NavLink 
            to="/dashboard" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-home"></i>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-project-diagram"></i>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-tasks"></i>
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/conversations" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            <i className="fas fa-comments"></i>
            Conversations
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AccessMenu;
