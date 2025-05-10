import { defineStore } from 'pinia'
import api from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      const response = await api.post('/login', credentials)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    async register(credentials) {
        const response = await api.post('/register', credentials)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      sessionStorage.setUsername(null)
      sessionStorage.setRole(null)
    },
  },
})