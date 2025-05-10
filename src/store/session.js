import { defineStore } from 'pinia'
import axios from 'axios'

export const useSessionStore = defineStore('session', {
  state: () => ({
    username: localStorage.getItem('username') || null,
    role: localStorage.getItem('role') || null,
  }),
  getters: {
    getUsername: (state) => state.username,
    getUsername: (state) => state.role,
  },
  actions: {
    loadUserData(){},
    setUsername(username) {
        localStorage.setItem('username', username)
    },
    setRole(role) {
        localStorage.setItem('role', role)
    }
  },
})