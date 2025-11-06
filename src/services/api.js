import axios from "axios";

const API_URL = "https://workbridge-backend-api.onrender.com/API/auth"; // Replace with your backend

export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const fetchCurrentUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || err;
  }
};
