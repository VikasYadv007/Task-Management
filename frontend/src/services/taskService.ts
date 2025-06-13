import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export interface Task {
  id?: number;
  title: string;
  description: string;
  effort_days: number;
  due_date: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

// Get all tasks for a user
export const getTasks = async (userId: number) => {
  const response = await axios.get(`${API_URL}/tasks/?user_id=${userId}`);
  return response.data;
};

// Get a specific task
export const getTask = async (id: number) => {
  const response = await axios.get(`${API_URL}/tasks/${id}/`);
  return response.data;
};

// Create a new task
export const createTask = async (task: Task) => {
  const response = await axios.post(`${API_URL}/tasks/`, task);
  return response.data;
};

// Update a task
export const updateTask = async (id: number, task: Task) => {
  const response = await axios.put(`${API_URL}/tasks/${id}/`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: number) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}/`);
  return response.data;
};

// Export tasks to Excel
export const exportTasksToExcel = async (userId: number) => {
  const response = await axios.get(`${API_URL}/tasks/export_excel/?user_id=${userId}`, {
    responseType: 'blob'
  });
  
  // Create a URL for the blob and trigger download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'tasks.xlsx');
  document.body.appendChild(link);
  link.click();
  link.remove();
}; 