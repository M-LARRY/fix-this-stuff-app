import axios from 'axios';
import { useAuthStore } from '../store/auth.js';

const usersApi = axios.create({
  baseURL: import.meta.env.VITE_USERS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

usersApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
});

export default usersApi;