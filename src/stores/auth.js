import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
  }),

  actions: {
    async register(form) {
      const response = await api.post('/register', form)

      this.user = response.data.user
      this.token = response.data.token
      localStorage.setItem('token', this.token)

      return response
    },

    async login(form) {
      const response = await api.post('/login', form)

      this.user = response.data.user
      this.token = response.data.token
      localStorage.setItem('token', this.token)

      return response
    },

    async fetchUser() {
      const response = await api.get('/me')
      this.user = response.data

      return response
    },

    async logout() {
      await api.post('/logout')

      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
