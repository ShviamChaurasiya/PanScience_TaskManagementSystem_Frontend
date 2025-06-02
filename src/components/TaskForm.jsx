import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../api/tasks';

const TaskForm = ({ editingTask, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // example statuses
  const [priority, setPriority] = useState('low'); // example priorities
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [files, setFiles] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title || '');
      setDescription(editingTask.description || '');
      setStatus(editingTask.status || 'pending');
      setPriority(editingTask.priority || 'low');
      setDueDate(editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '');
      setAssignedTo(editingTask.assignedTo || '');
      setFiles(null);
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setPriority('low');
      setDueDate('');
      setAssignedTo('');
      setFiles(null);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const taskData = { title, description, status, priority, dueDate, assignedTo };

      if (editingTask) {
        await updateTask(editingTask.id, taskData, files);
      } else {
        await createTask(taskData, files);
      }

      onSuccess();
    } catch (err) {
      setError('Failed to save task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <select value={status} onChange={e => setStatus(e.target.value)} className="border p-2 rounded w-full">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select value={priority} onChange={e => setPriority(e.target.value)} className="border p-2 rounded w-full">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={e => setDueDate(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="number"
        placeholder="Assign to User ID (admin only)"
        value={assignedTo}
        onChange={e => setAssignedTo(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={e => setFiles(e.target.files)}
      />
      <p className="text-sm text-gray-600">You can upload up to 3 PDF files.</p>

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {editingTask ? 'Update' : 'Create'} Task
      </button>
    </form>
  );
};

export default TaskForm;
