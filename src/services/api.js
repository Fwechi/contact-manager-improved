import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 204 as success
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 204) {
      return Promise.resolve({ status: 204, data: {} });
    }
    return Promise.reject(error);
  }
);