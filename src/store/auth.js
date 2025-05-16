import { defineStore } from 'pinia'
import authApi from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      const response = await authApi.post('/login', credentials)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      authApi.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    async register(credentials) {
      const response = await authApi.post('/register', credentials)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      autApi.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      delete autApi.defaults.headers.common['Authorization']
      sessionStorage.setUsername(null)
      sessionStorage.setRole(null)
    },
    async profile() {
      const response = await authApi.get('/profile')

    }
  },
})