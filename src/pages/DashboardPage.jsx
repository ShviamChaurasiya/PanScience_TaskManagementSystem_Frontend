import React from 'react';
import { useAuth } from '../auth/AuthContext';
import TaskList from '../components/TaskList';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>

      {/* Show user email if exists */}
      <p className="mb-4 text-gray-700">Welcome {user?.email || 'User'} {user?.role}</p>

      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <div className="mt-6">
        <TaskList isAdmin={user?.role === 'admin'} />
      </div>
    </div>
  );
};

export default Dashboard;
