import axios from 'axios';
import { useAuthStore } from '../store/auth.js';

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.role) {
    config.headers['x-role'] = authStore.role;
  }
  if (authStore.userId) {
    config.headers['x-user'] = authStore.userId;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default authApi;