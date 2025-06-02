import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT token to requests
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // or from your auth context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchTasks = (filters = {}) => API.get('/tasks', { params: filters });
export const getTask = (id) => API.get(`/tasks/${id}`);

export const createTask = (taskData, files) => {
  const formData = new FormData();
  for (const key in taskData) {
    if (taskData[key]) formData.append(key, taskData[key]);
  }
  if (files) {
    Array.from(files).forEach(file => formData.append('documents', file));
  }
  return API.post('/tasks', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const updateTask = (id, taskData, files) => {
  const formData = new FormData();
  for (const key in taskData) {
    if (taskData[key]) formData.append(key, taskData[key]);
  }
  if (files) {
    Array.from(files).forEach(file => formData.append('documents', file));
  }
  return API.put(`/tasks/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// Documents download URL helper
export const getDocumentDownloadUrl = (docId) =>
  `http://localhost:5000/api/documents/${docId}/download`;
