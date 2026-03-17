<template>
  <header class="header">
    <div class="header-left">
      <router-link to="/home" class="logo">
        <img src="../../assets/img/logo.png" alt="Logo" />
      </router-link>

      <router-link to="/home" class="header-title">Hotelier</router-link>

      <div class="header-subtitle">
        <span>Planea tu viaje</span>
        <div class="chevron">
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

    <div class="header-right">
      <nav class="header-links">
        <a>Servicio al cliente</a>
        <a>Mis viajes</a>
      </nav>

      <div class="message-icon">
        <svg width="24" height="24" fill="none" stroke="#191e3b" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 9h8" />
          <path d="M8 13h6" />
          <path d="M15 18l-3 3l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5" />
          <path d="M19 16v3" />
          <path d="M19 22v.01" />
        </svg>
      </div>
    </div>
  </header>
</template>

<style src="../../assets/css/Header.css"></style>
