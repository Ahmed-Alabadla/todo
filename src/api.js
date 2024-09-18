import axios from "axios";

const api = axios.create({
  baseURL: "https://todo-backend-m3dj.onrender.com/api",
  // baseURL: "http://localhost:8000/api",
});

export default api;
