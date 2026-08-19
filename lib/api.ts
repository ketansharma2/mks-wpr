import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// --------------------------------------------------
// Refresh state
// --------------------------------------------------

let refreshPromise: Promise<void> | null = null;

// Only ONE refresh request can run at a time
const refreshAccessToken = async (): Promise<void> => {
  if (!refreshPromise) {
    refreshPromise = api
      .post("/auth/refresh")
      .then(() => {
        // Backend sets new HttpOnly cookies here.
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// --------------------------------------------------
// Response Interceptor
// --------------------------------------------------

api.interceptors.response.use(
  // Successful response
  (response) => {
    return response;
  },

  // Error response
  async (error: AxiosError) => {
    const originalRequest =
      error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

    // No request config
    if (!originalRequest) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const requestUrl = originalRequest.url || "";

    const isLoginRequest =
      requestUrl.includes("/auth/login");

    const isRefreshRequest =
      requestUrl.includes("/auth/refresh");

    // --------------------------------------------------
    // Only handle 401
    // --------------------------------------------------

    if (
      status !== 401 ||
      originalRequest._retry ||
      isLoginRequest ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    // Mark this request so it cannot enter refresh loop
    originalRequest._retry = true;

    try {
      // ------------------------------------------------
      // If another request is already refreshing,
      // wait for that SAME refresh request.
      // Otherwise start a new refresh request.
      // ------------------------------------------------

      await refreshAccessToken();

      // ------------------------------------------------
      // Browser now has the new HttpOnly accessToken
      // Retry the original request.
      // ------------------------------------------------

      return api(originalRequest);
    } catch (refreshError) {
      // Refresh token invalid/expired
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }

      return Promise.reject(refreshError);
    }
  }
);

export default api;