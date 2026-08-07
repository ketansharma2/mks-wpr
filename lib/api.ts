import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isLoginRequest =
      originalRequest?.url?.includes("/auth/login");

    const isRefreshRequest =
      originalRequest?.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        // Browser automatically sends HttpOnly cookies
        await api.post("/auth/refresh");

        // Retry original request
        return api(originalRequest);
      } catch {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;