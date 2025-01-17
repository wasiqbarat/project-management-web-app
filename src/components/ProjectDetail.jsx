import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjectDetails } from '../services/workbenchService.js';
import './ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProject = async () => {
      try {
        const data = await fetchProjectDetails(id);
        setProject(data.project);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError('Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    getProject();
  }, [id]);

  if (loading) {
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="project-detail-container">
      <h2>{project.name}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Team:</strong> {project.teamName}</p>
      <p><strong>Status:</strong> {project.status}</p>
      {/* Add more project details as needed */}
    </div>
  );
}

export default ProjectDetail;
