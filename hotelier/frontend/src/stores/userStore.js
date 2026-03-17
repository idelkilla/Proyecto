import { defineStore } from 'pinia'
import authService from '../services/authService'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: null,
    email: null,
    photo: null,
    initial: '?',
    googleUser: false,
    token: null,
  }),
  actions: {
    setUser(data) {
      this.name = data.name
      this.email = data.email
      this.photo = data.photo
      this.initial = data.initial || (data.name ? data.name.charAt(0).toUpperCase() : '?')
      this.googleUser = data.googleUser
      this.token = data.token
    },
    logout() {
      this.name = null
      this.email = null
      this.photo = null
      this.initial = '?'
      this.googleUser = false
      this.token = null
      localStorage.clear()
    },
    loadFromLocalStorage() {
      this.name = localStorage.getItem('user_name')
      this.email = localStorage.getItem('user_email')
      this.photo = localStorage.getItem('user_photo')
      this.initial = localStorage.getItem('user_initial') || (this.name ? this.name.charAt(0).toUpperCase() : '?')
      this.googleUser = localStorage.getItem('user_google') === 'true'
      this.token = localStorage.getItem('user_token')
    },
  },
  getters: {
    isLogged: (state) => !!state.token,
  }
})
