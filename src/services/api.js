import axios from 'axios';

const API_URL = process.env.REACT_APP_RENDER_URL || 'http://localhost:10000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error:', error.message);
    }
    throw error;
  }
);

export const getAbout = async () => {
  try {
    const response = await api.get('/about');
    return response.data;
  } catch (error) {
    console.error('Error fetching about data:', error);
    throw error;
  }
};

export const getMainInfo = async () => {
  try {
    const response = await api.get('/main-info');
    return response.data;
  } catch (error) {
    console.error('Error fetching main info:', error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await api.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData) => {
  try {
    const response = await api.post('/contact', formData);
    return response.data;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
}; 