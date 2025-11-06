import axios from "axios";

const API_URL = "https://workbridge-backend-api.onrender.com/"; // Replace with your backend

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const registerUser = async (data) => {
  try {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};