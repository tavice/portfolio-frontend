import axios from 'axios';

const API_URL = process.env.REACT_APP_RENDER_URL || 'http://localhost:10000';

// Helper function to handle fetch with timeout
const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export const getAbout = async () => {
  try {
    const response = await axios.get(`${API_URL}/about`);
    return response.data;
  } catch (error) {
    console.error('Error fetching about data:', error);
    throw error;
  }
};

export const getMainInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/main-info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching main info:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}; 