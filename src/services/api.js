const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000/';

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
    const response = await fetchWithTimeout(`${API_URL}about`);
    if (!response.ok) {
      throw new Error(`Failed to fetch about data: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching about data:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw error;
  }
};

export const getMainInfo = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}about`);
    if (!response.ok) {
      throw new Error(`Failed to fetch main info: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.mainInfo;
  } catch (error) {
    console.error('Error fetching main info:', error);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please check your connection and try again.');
    }
    throw error;
  }
}; 