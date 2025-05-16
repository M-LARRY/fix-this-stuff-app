<template>
  <form @submit.prevent="handleRegister">
    <input v-model="name" placeholder="First Name" required class="form-control mb-2"/>
    <input v-model="surname" placeholder="Last Name" required class="form-control mb-2"/>
    <input v-model="email" type="email" placeholder="Email" required class="form-control mb-2"/>
    <input v-model="password" type="password" placeholder="Password" required class="form-control mb-2"/>
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required class="form-control mb-2"/>

    <button type="submit" class="btn btn-primary">Register</button>
    <p v-if="error" style="color:red">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth.js';

const authStore = useAuthStore();

const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const error = ref('');

const handleRegister = async () => {
  error.value = '';

  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    await authStore.register({
      firstName: name.value,
      lastName: surname.value,
      email: email.value,
      password: password.value,
    });
    // Redirect or show success message
  } catch (err) {
    if (err.response?.data?.errors?.length) {
      // Combine multiple validation messages into one string
      error.value = err.response.data.errors.map(e => e.msg).join(', ');
    } else if (err.response?.data?.message) {
      error.value = err.response.data.message;
    } else {
      error.value = 'Registration failed. Please try again.';
    }
  }
};
</script>
