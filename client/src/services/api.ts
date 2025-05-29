import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Adicionar token no header da requisicao
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Portador ${token}`;
  }
  return config;
});

export default api;
