<template>
    <div class="container mt-5">
      <h2>Welcome Home!</h2>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </template>
  
<script setup>
  import { useAuthStore } from '../store/auth'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const logout = () => {
    authStore.logout()
    router.push('/login')
  }
</script>