<template>
  <div class="home-page">
    <AppHeader />

    <main class="main-content">
      <div class="header-banner-section">
        <div class="contenido-superpuesto">
          <FormSearch
            @search="handleSearch"
            @select-service="handleServiceChange"
          />
        </div>
      </div>
      <AnotaLaFecha />
      <TravelPropositions />
    </main>

    <LoginPromoPopup />
  </div>
</template>

<script>
import AppHeader from '../components/Header.vue'
import FormSearch from '../components/FormSearch.vue'
import AnotaLaFecha from '../components/AnotaLaFecha.vue'
import TravelPropositions from '../components/TravelPropositions.vue'
import LoginPromoPopup from '../components/LoginPromoPopup.vue'

export default {
  name: 'Home',
  components: {
    AppHeader,
    FormSearch,
    AnotaLaFecha,
    TravelPropositions,
    LoginPromoPopup
  },
  methods: {
    handleSearch(formData) {
      console.log('Búsqueda iniciada con datos:', formData)
    },
    handleServiceChange(service) {
      console.log('Cambio de servicio a:', service)
    }
  }
}
</script>
<style scoped src="../assets/css/Global.css"></style>