import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL + '/api/products';

// ✅ Get all products
export const getProducts = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

// ✅ Get single product by ID
export const getProductById = async (id) => {
  try {
    return await axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Add new product (multipart/form-data)
export const addProduct = async (formData) => {
  try {
    return await axios.post(API_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
};

// ✅ Update existing product
export const updateProduct = async (id, formData) => {
  try {
    return await axios.put(`${API_URL}/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.error(`Failed to update product with ID ${id}:`, error);
    throw error;
  }
};

// ✅ Delete product
export const deleteProduct = async (id) => {
  try {
    return await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error(`Failed to delete product with ID ${id}:`, error);
    throw error;
  }
};
