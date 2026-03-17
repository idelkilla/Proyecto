<template>
  <div class="calendar-modal-container">
    <div v-if="showCalendar" class="calendar-modal">
      <div class="tabs">
        <button class="tab-item active">Calendario</button>
        <button class="tab-item">Fechas flexibles</button>
      </div>
      
      <div class="calendar-grid-container">
        <div class="month-view">
          <header class="month-header">{{ nombreMesActual }} {{ anioActual }}</header>
          <div class="days-header">
            <span v-for="dia in diasSemana" :key="dia">{{ dia }}</span>
          </div>
          <div class="days-body">
            <div class="day-cell empty" v-for="e in espaciosMesActual" :key="'empty-cur-'+e"></div>
            <div v-for="n in diasEnMesActual" :key="'cur-'+n" 
                 :class="['day-cell', { 'selected-range': n === diaHoy && esMesActual }]">
              {{ n }}
            </div>
          </div>
        </div>

        <div class="month-view">
          <header class="month-header">
            {{ nombreMesSiguiente }} {{ anioSiguiente }}
            <svg class="next-month" width="20" height="20" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor"/>
            </svg>
          </header>
          <div class="days-header">
            <span v-for="dia in diasSemana" :key="dia">{{ dia }}</span>
          </div>
          <div class="days-body">
            <div class="day-cell empty" v-for="e in espaciosMesSiguiente" :key="'empty-next-'+e"></div>
            <div v-for="n in diasEnMesSiguiente" :key="'next-'+n" class="day-cell">
              {{ n }}
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-footer">
        <button 
          v-for="chip in chips" 
          :key="chip.id"
          :class="['chip', { active: activeChip === chip.id }]"
          @click="selectChip(chip.id)"
        >
          <svg v-if="chip.id !== 'exactas'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {{ chip.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const showCalendar = ref(true);
const activeChip = ref('exactas');

const diasSemana = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];

const chips = [
  { id: 'exactas', label: 'Fechas exactas' },
  { id: '1dia', label: '1 día' },
  { id: '2dias', label: '2 días' },
  { id: '3dias', label: '3 días' },
  { id: '7dias', label: '7 días' }
];

// Lógica de fechas actuales
const hoy = new Date();
const diaHoy = hoy.getDate();
const esMesActual = true; // Para resaltar el día actual en el primer mes

// Datos Mes Actual
const anioActual = hoy.getFullYear();
const mesActualIdx = hoy.getMonth();
const nombreMesActual = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(hoy);
const diasEnMesActual = new Date(anioActual, mesActualIdx + 1, 0).getDate();
const espaciosMesActual = new Date(anioActual, mesActualIdx, 1).getDay();

// Datos Mes Siguiente
const fechaSiguiente = new Date(anioActual, mesActualIdx + 1, 1);
const anioSiguiente = fechaSiguiente.getFullYear();
const mesSiguienteIdx = fechaSiguiente.getMonth();
const nombreMesSiguiente = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(fechaSiguiente);
const diasEnMesSiguiente = new Date(anioSiguiente, mesSiguienteIdx + 1, 0).getDate();
const espaciosMesSiguiente = new Date(anioSiguiente, mesSiguienteIdx, 1).getDay();

const selectChip = (id) => {
  activeChip.value = id;
};
</script>

<style scoped src="../assets/css/CalendarSelector.css"></style>