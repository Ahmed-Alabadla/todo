import axios from "axios";

const api = axios.create({
  // baseURL: "https://todo-backend-fvu2.onrender.com/api",
  baseURL: "http://localhost:8000/api",
});

export default api;
