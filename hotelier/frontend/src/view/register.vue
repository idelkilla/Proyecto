<template>
  <div class="login-page">
  <form class="modern-form" @submit.prevent="handleRegister">
    <h2 class="form-title">Crear Cuenta</h2>

    <div class="form-body">
      <div class="input-group">
        <div class="input-wrapper">
          <svg fill="none" viewBox="0 0 24 24" class="input-icon">
            <circle stroke-width="1.5" stroke="currentColor" r="4" cy="8" cx="12" />
            <path stroke-linecap="round" stroke-width="1.5" stroke="currentColor"
              d="M5 20C5 17.2386 8.13401 15 12 15C15.866 15 19 17.2386 19 20" />
          </svg>
          <input
            v-model="username"
            required
            placeholder="Usuario"
            class="form-input"
            :class="{ 'input-error': error && usernameError }"
            type="text"
          />
        </div>
        <p v-if="error && usernameError" class="error-message">
          El nombre de usuario no está disponible.
        </p>
      </div>

      <div class="input-group">
        <div class="input-wrapper">
          <svg fill="none" viewBox="0 0 24 24" class="input-icon">
            <path stroke-width="1.5" stroke="currentColor"
              d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" />
          </svg>
          <input
            v-model="email"
            required
            placeholder="Correo Electrónico"
            class="form-input"
            :class="{ 'input-error': error && emailError }"
            type="email"
          />
        </div>
        <p v-if="error && emailError" class="error-message">
          El correo es inválido o ya está registrado.
        </p>
      </div>

      <div class="input-group">
        <div class="input-wrapper">
          <svg fill="none" viewBox="0 0 24 24" class="input-icon">
            <path stroke-width="1.5" stroke="currentColor"
              d="M12 10V14M8 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H8C6.89543 18 6 17.1046 6 16V8C6 6.89543 6.89543 6 8 6Z" />
          </svg>
          <input
            v-model="password"
            required
            placeholder="Contraseña"
            class="form-input"
            :class="{ 'input-error': error && passwordError }"
            :type="passwordFieldType"
          />
          <button class="password-toggle" type="button" @click="togglePasswordVisibility">
            <svg v-if="!showPassword" fill="none" viewBox="0 0 24 24" class="eye-icon">
              <path stroke-width="1.5" stroke="currentColor" d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
              <circle stroke-width="1.5" stroke="currentColor" r="3" cy="12" cx="12" />
            </svg>
            <svg v-else fill="none" viewBox="0 0 24 24" class="eye-icon">
              <path stroke-width="1.5" stroke="currentColor" stroke-dasharray="2 2" opacity="0.5" d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" />
              <path stroke-width="1.5" stroke="currentColor" stroke-linecap="round" d="M3 3L21 21" />
              <circle stroke-width="1.5" stroke="currentColor" r="3" cy="12" cx="12" opacity="0.5" />
            </svg>
          </button>
        </div>
        <p v-if="error && passwordError" class="error-message">
          La contraseña es demasiado débil.
        </p>
      </div>

      <div v-if="generalError" class="input-group">
        <p class="error-message">Error: {{ error }}</p>
      </div>
    </div>

    <div class="separator"><span>o</span></div>

    <div id="google-target" style="width: 302px; margin: 0 auto"></div>

    <button class="submit-button" type="submit" :disabled="isLoading">
      <span class="button-text">{{ isLoading ? 'Registrando...' : 'Registrar Cuenta' }}</span>
      <div class="button-glow"></div>
    </button>

    <div class="form-footer">
      <router-link to="/login" class="login-link">
        <span class="abajo">¿Ya tienes una cuenta? Inicia Sesión aquí.</span>
      </router-link>

      <a class="login-link">
        Al crear una cuenta aceptas nuestros
        <span class="abajo">Términos y condiciones</span> y la
        <span class="abajo">Política de privacidad</span>.
      </a>
    </div>
  </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '../services/authService'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const error = ref(null)

const passwordFieldType = computed(() => showPassword.value ? 'text' : 'password')
const togglePasswordVisibility = () => (showPassword.value = !showPassword.value)

const usernameError = computed(() => error.value === 'USERNAME_TAKEN')
const emailError = computed(() => error.value === 'EMAIL_TAKEN')
const passwordError = computed(() => error.value === 'WEAK_PASSWORD')
const generalError = computed(() => error.value && !usernameError.value && !emailError.value && !passwordError.value)

// REGISTRO MANUAL
const handleRegister = async () => {
  error.value = null
  isLoading.value = true
  try {
    // 1. **REQUIERE TOKEN DEL BACKEND.**
    const res = await authService.register(username.value, email.value, password.value)
    authService.saveToken(res.data.token)

    const initial = username.value.charAt(0).toUpperCase()

    // 2. Guardar datos manual correctamente.
    localStorage.setItem('user_name', username.value)
    localStorage.setItem('user_email', email.value)
    localStorage.setItem('user_initial', initial)
    localStorage.setItem('user_photo', `initial:${initial}`) // Formato que activa la inicial en Header.vue
    localStorage.setItem('user_token', res.data.token)
    window.dispatchEvent(new Event('storage'))

    // 3. **LÍNEA PROBLEMÁTICA ELIMINADA:** //    authService.setUserData sobrescribía user_photo a una cadena vacía.
    
    router.replace('/Home')
  } catch (err) {
    error.value = err.response?.data?.code || 'SERVER_ERROR'
  } finally {
    isLoading.value = false
  }
}

// GOOGLE LOGIN (Funciona bien)
const handleGoogleCredential = async (response) => {
  isLoading.value = true
  try {
    const idToken = response.credential
    const res = await authService.googleLogin(idToken)
    const payload = JSON.parse(atob(idToken.split('.')[1]))

    authService.saveToken(res.data.token)

    // Guardar datos de Google
    localStorage.setItem('user_name', payload.name)
    localStorage.setItem('user_email', payload.email)
    localStorage.setItem('user_initial', payload.name.charAt(0).toUpperCase())
    localStorage.setItem('user_photo', payload.picture)
    localStorage.setItem('user_token', res.data.token)
    window.dispatchEvent(new Event('storage'))

    authService.setUserData({ username: payload.name, email: payload.email, googleUser: true, picture: payload.picture })
    router.replace('/Home')
  } catch {
    error.value = 'SERVER_ERROR'
  } finally {
    isLoading.value = false
  }
}

// GOOGLE BUTTON
onMounted(() => {
  if (authService.isAuthenticated()) {
    router.replace('/Home')
    return
  }
  if (window.google?.accounts?.id) {
    window.google.accounts.id.initialize({
      client_id: '128715608979-nffc56ns9uagf29p7j9em6vmm6mrkidv.apps.googleusercontent.com',
      callback: handleGoogleCredential
    })
    window.google.accounts.id.renderButton(
      document.getElementById('google-target'),
      { type: 'standard', theme: 'outline', size: 'large', width: 302 }
    )
  }
})
</script>