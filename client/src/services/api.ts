import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9100/api",
  withCredentials: true,
});

// Adicionar token no header da requisicao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
