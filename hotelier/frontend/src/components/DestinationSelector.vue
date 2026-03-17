<template>
  <div class="dynamic-field-wrapper" id="destination-wrapper" style="position: relative; flex: 2.5;">
    <div class="field-group border-style">
      <label>¿A dónde quieres ir?</label>
      <div class="input-with-icon">
        <span class="material-symbols-outlined custom-icon">location_on</span>
        <input 
          type="text" 
          :value="modelValue" 
          @input="onInput"
          @focus="abrirMenu"
          placeholder="Destino" 
          autocomplete="off"
        >
      </div>
    </div>

    <div v-if="mostrarDropdown" class="location-dropdown">
      <div v-if="loading" class="location-item">
        <span class="loc-details">Cargando ubicaciones...</span>
      </div>
      <div v-else-if="sugerencias.length === 0" class="location-item">
        <span class="loc-details">No se encontraron ubicaciones</span>
      </div>
      
      <div 
        v-for="loc in sugerencias" 
        :key="loc.id" 
        class="location-item" 
        @mousedown="seleccionarUbicacion(loc)"
      >
        <span class="material-symbols-outlined icon-gray">
          {{ loc.id_tipo === 1 ? 'apartment' : 'location_on' }}
        </span>
        <div class="location-text">
          <span class="loc-name">{{ loc.ubicacion }}</span>
          <span class="loc-details">{{ loc.ciudad }}, {{ loc.pais }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'focus'])

const API_URL = "http://localhost:3000"
const sugerencias = ref([])
const mostrarDropdown = ref(false)
const loading = ref(false)

const onInput = (e) => {
  emit('update:modelValue', e.target.value)
  fetchUbicaciones(e.target.value)
}

const abrirMenu = () => {
  mostrarDropdown.value = true
  emit('focus')
  if (props.modelValue) fetchUbicaciones(props.modelValue)
}

async function fetchUbicaciones(query) {
  if (!query) {
    sugerencias.value = []
    return
  }
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/api/search/ubicaciones?q=${query}`)
    sugerencias.value = await res.json()
  } catch (error) {
    sugerencias.value = []
  } finally {
    loading.value = false
  }
}

function seleccionarUbicacion(loc) {
  const fullText = `${loc.ubicacion}, ${loc.ciudad}, ${loc.pais}`
  emit('update:modelValue', fullText)
  mostrarDropdown.value = false
}

// Método expuesto para que el padre pueda cerrarlo desde fuera
defineExpose({ cerrar: () => mostrarDropdown.value = false })
</script>