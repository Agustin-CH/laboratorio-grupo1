// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // tu proxy en package.json redirige al backend
});

// Añade el token JWT a cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
