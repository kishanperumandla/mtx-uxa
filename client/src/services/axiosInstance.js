import axios from "axios";
// import { BASE_URL } from "../../config/config";

import { BASE_URL } from "../config/config";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage ,setAccessTokenInLocalStorage } from "../utility/localStorage";



let isRefreshing = false;  // Lock flag
let failedQueue = [];      // Queue to hold failed requests while refreshing

// Function to process the failed requests after token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to attach the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessTokenFromLocalStorage();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && error.response.data.message === "Token expired" && !originalRequest._retry) {
      if (isRefreshing) {
        // Add request to queue and wait until token is refreshed
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getRefreshTokenFromLocalStorage();

      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {}, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = response.data.newAccessToken;
        setAccessTokenInLocalStorage(newAccessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

        // Process the failed requests queue
        processQueue(null, newAccessToken);

        // Retry the original request with the new token
        return axiosInstance(originalRequest);

      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
