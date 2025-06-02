import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask } from '../api/tasks';
import TaskForm from './TaskForm';

const TaskList = ({ userRole }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    try {
      // If admin, fetch all tasks, else fetch assigned tasks only
      const res = await fetchTasks(userRole === 'admin');
      setTasks(res.data);
    } catch {
      setError('Failed to load tasks');
    }
  };

  useEffect(() => {
    loadTasks();
  }, [userRole]); // reload if userRole changes

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      setError('Delete failed');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      {error && <p className="text-red-600">{error}</p>}

      <TaskForm
        editingTask={editingTask}
        onSuccess={() => {
          setEditingTask(null);
          loadTasks();
        }}
      />

      <ul className="space-y-4">
        {tasks.map(task => (
          <li key={task.id} className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h3 className="font-semibold text-lg">{task.title}</h3>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p>Description: {task.description}</p>
              {task.documents && task.documents.length > 0 && (
                <div>
                  <strong>Documents:</strong>
                  <ul className="list-disc list-inside">
                    {task.documents.map(doc => (
                      <li key={doc.id}>
                        <a
                          href={`http://localhost:5000/${doc.path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {doc.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-3 md:mt-0 flex space-x-2">
              <button
                onClick={() => setEditingTask(task)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
