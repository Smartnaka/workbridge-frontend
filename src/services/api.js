import axios from "axios";

const api = axios.create({
  baseURL: "https://workbridge-backend-api.onrender.com/", // your live backend base URL
});

export default api;
