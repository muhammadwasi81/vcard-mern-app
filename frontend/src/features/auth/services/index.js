import axios from 'axios';
import { refreshToken as refreshThunk } from '../authSlice';
import { store } from '../../../app/store';

console.log('api file triggered');
const instance = axios.create({
  baseURL: 'http://localhost:8000/api/users/refresh-token',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach Authorization header if token exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    console.log(token, 'tokenIn anticipated');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error, 'error.message');
    return Promise.reject(error);
  }
);

// Handle token refresh on 401 response
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log('try block');
        const { refreshToken: newRefreshToken, accessToken: newAccessToken } =
          await store.dispatch(refreshThunk()).unwrap();
        // Update local storage with new tokens
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Set the Authorization header for the next request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request
        return instance(originalRequest);
      } catch (_error) {
        console.log('_error', _error);
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
