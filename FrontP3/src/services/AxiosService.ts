import axios from "axios"
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios"
import { getToken, isTokenExpired, logout } from "./SessionService"
import toast from "react-hot-toast"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance: AxiosInstance  = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 15, // 15 sec
});

// Interceptor de request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      logout();
      toast.error("Sesión expirada, vuelva a iniciar sesión");
      throw new Error("Sesión expirada");
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      logout();
      toast.error("Sesión expirada o no autorizada");
    } else if (error.code === "ECONNABORTED") {
      toast.error("Tiempo de espera agotado. Intente nuevamente.");
    } else if (!error.response) {
      toast.error("Error de conexión con el servidor");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
