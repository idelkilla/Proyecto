<template>
  <header class="header">
    <div class="header-left">
      <router-link to="/home" class="logo">
        <img src="../assets/img/logo1.png" alt="Logo" />
      </router-link>

      <router-link to="/home" class="header-title">Hotelier</router-link>

      <div class="header-subtitle" @click.stop="toggleServicesMenu">
        <span>Planea tu viaje</span>
        <div class="chevron" :class="{ open: showServicesMenu }">
          <svg width="14" height="14" fill="none" viewBox="0 0 20 20">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="#191E3B"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>

    <ServicesMenu v-if="showServicesMenu" class="services-menu" />

    <div class="header-right">
      <nav class="header-links">
        <router-link to="/servicio-cliente" custom v-slot="{ navigate }">
          <a @click="navigate" role="link" style="cursor: pointer"
            >Servicio al cliente</a
          >
        </router-link>
        <a>Mis viajes</a>
      </nav>

      <div class="message-icon">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="#191e3b"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M8 9h8" />
          <path d="M8 13h6" />
          <path
            d="M15 18l-3 3l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5"
          />
          <path d="M19 16v3" />
          <path d="M19 22v.01" />
        </svg>
      </div>

      <div v-if="isLogged" class="user-container" @click.stop="toggleMenu">
        <div
          :class="[
            'user-avatar',
            user.photo && user.photo.startsWith('initial:') ? 'initial' : '',
          ]"
        >
          <template v-if="user.photo && user.photo.startsWith('http')">
            <img
              :src="fixPhoto(user.photo)"
              alt="User photo"
              @error="handlePhotoError"
            />
          </template>
          <template v-else-if="user.photo && user.photo.startsWith('initial:')">
            {{ user.photo.split(':')[1] }}
          </template>
          <template v-else>
            {{ user.initial || '?' }}
          </template>
        </div>
        <span class="user-name">{{ user.name || 'Usuario' }}</span>
      </div>

      <button v-if="!isLogged" class="btn-register" @click="goToRegister">
        Registrarse
      </button>

      <UserMenu v-if="showMenu" class="user-menu" @close="showMenu = false" />
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import UserMenu from './UserMenu.vue'
import ServicesMenu from './servicesMenu.vue'

const router = useRouter()

const user = ref({ photo: null, email: null, name: null, initial: '?' })
const showMenu = ref(false)
const showServicesMenu = ref(false)

const toggleMenu = () => (showMenu.value = !showMenu.value)
const toggleServicesMenu = () =>
  (showServicesMenu.value = !showServicesMenu.value)

// Cerrar menús al click fuera
const handleClickOutside = (e) => {
  const userMenu = document.querySelector('.user-menu')
  const avatar = document.querySelector('.user-avatar')

  const servicesMenu = document.querySelector('.services-menu')
  const servicesBtn = document.querySelector('.header-subtitle')

  if (
    showMenu.value &&
    userMenu &&
    !userMenu.contains(e.target) &&
    avatar &&
    !avatar.contains(e.target)
  ) {
    showMenu.value = false
  }

  if (
    showServicesMenu.value &&
    servicesMenu &&
    !servicesMenu.contains(e.target) &&
    servicesBtn &&
    !servicesBtn.contains(e.target)
  ) {
    showServicesMenu.value = false
  }
}

const fixEncoding = (str) => {
  if (!str) return str
  try {
    return decodeURIComponent(escape(str))
  } catch {
    return str
  }
}

// Cargar datos de usuario
const loadUserData = () => {
  const photo = localStorage.getItem('user_photo')
  const name = fixEncoding(localStorage.getItem('user_name')) // 👈
  const emailStored = localStorage.getItem('user_email')
  const initialStored = fixEncoding(localStorage.getItem('user_initial')) // 👈

  user.value.photo = photo || null
  user.value.name = name || null
  user.value.email = emailStored || null
  user.value.initial =
    initialStored || (name ? name.charAt(0).toUpperCase() : '?')
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
  window.addEventListener('storage', loadUserData)
  loadUserData()
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
  window.removeEventListener('storage', loadUserData)
})

const fixPhoto = (url) => {
  if (!url) return ''
  return url.includes('googleusercontent')
    ? url.replace(/=s\d+-c/, '=s300-c')
    : url
}

const isLogged = computed(() => Boolean(localStorage.getItem('user_token')))

const goToRegister = () => router.push('/register')
</script>

<style src="../assets/css/Header.css"></style>
