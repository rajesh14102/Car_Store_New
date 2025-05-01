import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/featured';

// Upload a new featured car (GLB model)
export const uploadFeaturedCar = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Fetch the current featured car
export const getFeaturedCar = async () => {
  try {
    const response = await axios.get(`${API_BASE}/get`);
    return response;
  } catch (error) {
    console.error('Failed to fetch featured car:', error);
    throw error;
  }
};
