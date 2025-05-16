import { defineStore } from 'pinia';
import usersApi from '../api/users';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await usersApi.get('/users');
        this.users = response.data;
      } catch (error) {
        this.error = error.message || 'Failed to fetch users.';
      } finally {
        this.loading = false;
      }
    },

    async fetchUser(userId) {
      this.loading = true;
      try {
        const response = await usersApi.get(`/users/${userId}`);
        this.currentUser = response.data;
      } catch (error) {
        this.error = error.message || 'Failed to fetch user.';
      } finally {
        this.loading = false;
      }
    },

    async updateUser(userId, userData) {
      this.loading = true;
      try {
        const response = await usersApi.put(`/users/${userId}`, userData);
        this.currentUser = response.data;
        // Optionally update the list if needed
        const index = this.users.findIndex(user => user.id === userId);
        if (index !== -1) this.users[index] = response.data;
      } catch (error) {
        this.error = error.message || 'Failed to update user.';
      } finally {
        this.loading = false;
      }
    },

    async deleteUser(userId) {
      this.loading = true;
      try {
        await usersApi.delete(`/users/${userId}`);
        this.users = this.users.filter(user => user.id !== userId);
        if (this.currentUser?.id === userId) this.currentUser = null;
      } catch (error) {
        this.error = error.message || 'Failed to delete user.';
      } finally {
        this.loading = false;
      }
    }
  }
});