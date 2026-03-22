<template>
  <Transition name="fade">
    <div v-if="visible" class="popup-overlay" @click.self="cerrar">
      <div class="popup-box">
        <button class="popup-close" @click="cerrar">✕</button>

        <img src="../assets/img/logo1.png" alt="Logo" class="popup-logo" />

        <h2>¡Accede a descuentos exclusivos!</h2>
        <p>Inicia sesión y obtén tarifas especiales en todas nuestras habitaciones.</p>

        <div class="popup-actions">
          <RouterLink to="/login" class="btn-primary" @click="cerrar">
            Iniciar sesión
          </RouterLink>
          <button class="btn-secondary" @click="cerrar">Ahora no</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(false)

const estaLogueado = () => {
  return !!localStorage.getItem('user_token') || !!localStorage.getItem('user_email')
}

onMounted(() => {
  if (!estaLogueado()) {
    setTimeout(() => {
      visible.value = true
    }, 10000) // 10 segundos
  }
})

const cerrar = () => {
  visible.value = false
}
</script>

<style src="../assets/css/LoginPromoPopup.css"></style>