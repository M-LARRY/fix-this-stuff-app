import { defineStore } from 'pinia'
import authApi from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    email: localStorage.getItem('email') || null,
    role: localStorage.getItem('role') || "guest",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserId: (state) => state.userId,
    getEmail: (state) => state.email,
    getRole: (state) => state.role,
  },
  actions: {
    async login(credentials) {
      // VALERIO: ho preparato la login per funzionare con JWT ma JWT non è davvero implementato lato BE.
      const response = await authApi.post('/login', credentials)
      this.token = response.data.token
      localStorage.setItem('token', this.token)
      this.setUserId(response.data.user.id)
      this.setEmail(response.data.user.email)
      // VALERIO: il servizio ritorna sempre e solo user come role, anche se ci si autentica da admin. Quindi
      // per ora devo hardcodare il ruolo ad admin
      // this.setRole(response.data.user.role)  <------ questo dovrebbe essere corretto per quando il BE sarà fixato
      this.setRole("admin")
      authApi.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    async register(credentials) {
      const response = await authApi.post('/register', credentials)
      return response.status
    },
    logout() {
      this.token = null
      localStorage.removeItem('token')
      delete authApi.defaults.headers.common['Authorization']
      this.role = "guest"
      localStorage.setItem('role', "guest")
    },
    setUserId(userId) {
      this.userId = userId
      localStorage.setItem('userId', userId)
    },
    setEmail(email) {
      this.email = email
      localStorage.setItem('email', email)
    },
    setRole(role) {
      this.role = role
        localStorage.setItem('role', role)
    }
  },
})