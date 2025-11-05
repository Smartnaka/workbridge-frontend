import axios from "axios";

const API = axios.create({
  baseURL: "http://10.172.210.31:5000/api"  // <-- your phone's IP
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
