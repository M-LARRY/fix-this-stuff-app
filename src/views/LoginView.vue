<template>
    <div class="container mt-5">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" />
        <input v-model="password" type="password" placeholder="Password" class="form-control mb-2" />
        <button class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '../store/auth'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const password = ref('')
  const authStore = useAuthStore()
  const router = useRouter()
  
  const handleLogin = async () => {
    try {
      await authStore.login({ email: email.value, password: password.value })
      router.push('/')
    } catch (e) {
      alert('Login failed')
    }
  }
  </script>