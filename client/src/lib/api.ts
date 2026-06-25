import axios from "axios";
import { toast } from "sonner";



/**
 * Centralized Axios instance for backend API calls.
 * Override with VITE_API_BASE_URL if your backend is hosted elsewhere.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const silent = error?.config?.silent === true;
    if (typeof window !== "undefined" && status === 401) {
      localStorage.removeItem("auth_token");
      const path = window.location.pathname;
      if (!path.startsWith("/login") && !path.startsWith("/signup")) {
        toast.error("Session expired. Please sign in again.");
        window.location.replace("/login");
      }
    } else if (!silent && typeof window !== "undefined") {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(msg);
    }
    return Promise.reject(error);
  },
);

export default api;
