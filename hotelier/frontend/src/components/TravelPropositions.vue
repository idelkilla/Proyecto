<script setup>

const plans = [
  {
    title: 'Ahorra en paquete',
    description: 'Obtén más por menos con las ofertas de paquete',
    icon: 'luggage',
    badge: 'attach_money',
    buttonText: 'Más información'
  },
  {
    title: 'Vuelos directos',
    description: 'Encuentra las rutas más rápidas al mejor precio',
    icon: 'flight_takeoff',
    badge: 'bolt',
    buttonText: 'Buscar vuelos'
  },
  {
    title: 'Precios claros',
    description: 'Sin sorpresas: incluimos impuestos y cargos extra',
    icon: 'verified',
    badge: 'check',
    buttonText: 'Ver detalles'
  }
];
</script>

<template>
  <main class="page-wrapper">
    <div class="container">
      <header class="section-header">
        <h1 class="main-title">Hospedajes para cada estilo de viaje</h1>
        <p class="subtitle">Precios promedio basados en el mes calendario actual</p>
      </header>

      <div class="grid">
        <div v-for="(plan, index) in plans" :key="index" class="pricing-card">
          <div class="card-content">
            
            <div class="icon-wrapper">
              <span class="material-symbols-outlined main-icon">{{ plan.icon }}</span>
              <div class="badge-coin" v-if="plan.badge">
                <span class="material-symbols-outlined">{{ plan.badge }}</span>
              </div>
            </div>

            <div class="header-section">
              <h2 class="plan-title">{{ plan.title }}</h2>
              <p class="plan-description">{{ plan.description }}</p>
            </div>
          </div>

          <div class="footer-section">
            <a href="#" class="action-button">{{ plan.buttonText }}</a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style src="../assets/css/TravelPropositions.css"></style>