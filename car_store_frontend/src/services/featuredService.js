import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL + '/api/featured';

// ✅ Upload featured car
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

// ✅ Get featured car
export const getFeaturedCar = async () => {
  try {
    const response = await axios.get(`${API_BASE}/get`);
    return response;
  } catch (error) {
    console.error('Failed to fetch featured car:', error);
    throw error;
  }
};
