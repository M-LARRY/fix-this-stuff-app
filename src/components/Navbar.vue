<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">MyApp</router-link>
  
        <div class="d-flex">
          <router-link to="/" class="btn btn-outline-primary me-2">Home</router-link>
          <router-link v-if="!isAuthenticated" to="/login" class="btn btn-outline-secondary me-2">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/register" class="btn btn-outline-secondary">Register</router-link>
          <button v-else class="btn btn-danger" @click="logout">Logout</button>
        </div>
      </div>
    </nav>
</template>
  
<script setup>
  import { computed } from 'vue'
  import { useAuthStore } from '../store/auth'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const isAuthenticated = computed(() => authStore.isAuthenticated)
  
  const logout = () => {
    authStore.logout()
    router.push('/login')
  }
</script>
  
<style>
</style>