import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubtasks, createSubtask, updateSubtask } from '../services/workbenchService.js';
import './TaskDetail.css';

function TaskDetail() {
  const { taskId } = useParams();
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [addError, setAddError] = useState('');
  const [addingSubtask, setAddingSubtask] = useState(false);

  useEffect(() => {
    const loadSubtasks = async () => {
      try {
        const data = await fetchSubtasks(taskId);
        setSubtasks(data);
      } catch (err) {
        console.error('Error fetching subtasks:', err);
        setError('Failed to load subtasks');
      } finally {
        setLoading(false);
      }
    };

    loadSubtasks();
  }, [taskId]);

  const handleSubtaskToggle = async (subtaskId, isCompleted) => {
    try {
      const updatedSubtask = await updateSubtask(taskId, subtaskId, { is_completed: !isCompleted });
      setSubtasks((prevSubtasks) =>
        prevSubtasks.map((subtask) =>
          subtask.id === subtaskId ? updatedSubtask : subtask
        )
      );
    } catch (err) {
      console.error('Error updating subtask:', err);
      alert('Failed to update subtask status');
    }
  };

  const handleAddSubtask = async (e) => {
    e.preventDefault();
    if (!subtaskTitle.trim()) {
      setAddError('Subtask title is required');
      return;
    }
    try {
      const newSubtask = await createSubtask(taskId, { 
        task: taskId, // Including task ID as per API requirement
        title: subtaskTitle.trim() 
      });
      setSubtasks([...subtasks, newSubtask]);
      setSubtaskTitle('');
      setAddingSubtask(false);
      setAddError('');
    } catch (err) {
      console.error('Error adding subtask:', err);
      setAddError('Failed to add subtask');
    }
  };

  return (
    <div className="task-detail-container">
      <header className="task-detail-header">
        <h1>Task Details</h1>
      </header>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="subtasks-section">
          <h2>Subtasks</h2>
          <ul className="subtasks-list">
            {subtasks.map((subtask) => (
              <li key={subtask.id} className="subtask-item">
                <input
                  type="checkbox"
                  checked={subtask.is_completed}
                  onChange={() => handleSubtaskToggle(subtask.id, subtask.is_completed)}
                />
                <span className={subtask.is_completed ? 'completed' : ''}>{subtask.title}</span>
              </li>
            ))}
            {subtasks.length === 0 && <p>No subtasks available.</p>}
          </ul>
          <button className="btn add-subtask-btn" onClick={() => setAddingSubtask(true)}>
            Add Subtask
          </button>
        </div>
      )}

      {/* Add Subtask Modal */}
      {addingSubtask && (
        <div className="modal-overlay" onClick={() => setAddingSubtask(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Subtask</h2>
              <button className="close-btn" onClick={() => setAddingSubtask(false)}>
                &times;
              </button>
            </div>
            <form onSubmit={handleAddSubtask} className="modal-body">
              {addError && <p className="error-message">{addError}</p>}
              <div className="form-group">
                <label htmlFor="subtask-title">Subtask Title</label>
                <input
                  type="text"
                  id="subtask-title"
                  value={subtaskTitle}
                  onChange={(e) => setSubtaskTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" className="btn cancel-btn" onClick={() => setAddingSubtask(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn submit-btn">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskDetail;
