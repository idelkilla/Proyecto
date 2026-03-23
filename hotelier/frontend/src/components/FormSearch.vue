<template>
  <div class="search-container">
    <div class="hero">
      <h1>Vivimos para viajar</h1>
    </div>

    <div class="form-box">
      <!-- Opciones (Hospedaje, Vuelos, etc.) -->
      <div class="options">
        <div v-for="option in options" :key="option.id" :class="['item', { active: activeOption === option.id }]"
          @click="selectOption(option.id)">
          <img :src="getIconPath(option.icon_img)" :alt="option.label" />
          <span>{{ option.label }}</span>
        </div>
      </div>

      <!-- Campos de búsqueda -->
      <div class="search-fields-dynamic">

        <!-- Destino -->
        <div class="dynamic-field-wrapper" id="destination-wrapper" style="position: relative; flex: 2.5">
          <div class="field-group border-style">
            <label>¿A dónde quieres ir?</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined custom-icon">location_on</span>
              <input type="text" v-model="busquedaDestino" @focus="abrirMenu" @input="fetchUbicaciones"
                placeholder="Destino" autocomplete="off" />
            </div>
          </div>

          <div v-if="mostrarDropdown" class="location-dropdown">
            <div v-if="loadingUbicaciones" class="location-item">
              <span class="loc-details">Cargando ubicaciones...</span>
            </div>
            <div v-else-if="sugerencias.length === 0" class="location-item">
              <span class="loc-details">No se encontraron ubicaciones</span>
            </div>
            <div v-for="loc in sugerencias" :key="loc.id" class="location-item" @mousedown="seleccionarUbicacion(loc)">
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

        <!-- Fechas — el calendario sale aquí abajo -->
        <div class="dynamic-field-wrapper date-field" style="position: relative; flex: 2">
          <div class="field-group border-style" @click="toggleCalendar">
            <label>Entrada — Salida</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined custom-icon">calendar_month</span>
              <input type="text" readonly :value="resumenFechas" placeholder="Seleccionar fechas"
                class="readonly-input" />
            </div>
          </div>

          <!-- ✅ CalendarSelector va DENTRO del wrapper con position:relative -->
          <CalendarSelector v-if="mostrarCalendario" @update:dates="onDatesSelected"
            @close="mostrarCalendario = false" />
        </div>

        <!-- Huéspedes -->
        <div class="dynamic-field-wrapper" id="guest-wrapper" style="position: relative; flex: 2">
          <div class="field-group border-style" @click="toggleHuespedes">
            <label>Huéspedes</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined custom-icon">person</span>
              <input type="text" readonly :value="resumenHuespedes" class="readonly-input" />
            </div>
          </div>

          <GuestSelector v-if="mostrarHuespedes" v-model="habitaciones" @close="mostrarHuespedes = false" />
        </div>

        <!-- Buscar -->
        <div class="search-button-container">
          <BuscarButton @click="handleSearch" />
        </div>

      </div>

      <!-- Opciones extra (vuelo / auto) -->
      <div class="extra-options-row">
        <div class="checkbox-group">
          <label class="custom-checkbox">
            <input type="checkbox" v-model="agregarVuelo" />
            <span class="checkmark"></span>
            Agregar un vuelo
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="agregarAuto" />
            <span class="checkmark"></span>
            Agregar un auto
          </label>
        </div>

        <div v-if="agregarVuelo" class="origin-field-container" id="origin-wrapper">
          <div class="field-group border-style">
            <label>Origen</label>
            <div class="input-with-icon">
              <span class="material-symbols-outlined custom-icon">location_on</span>
              <input type="text" v-model="origenVuelo" placeholder="¿Desde dónde viajas?" autocomplete="off" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BuscarButton from './ButtonSearch.vue'
import GuestSelector from './GuestSelector.vue'
import CalendarSelector from './CalendarSelector.vue'

const API_URL = 'http://localhost:3000'
const router  = useRouter()

// ── Estado general ────────────────────────────────────────────────────────────
const activeOption      = ref('hospedaje')
const busquedaDestino   = ref('')
const selectedUbicacion = ref(null)       // objeto completo del dropdown
const sugerencias       = ref([])
const mostrarDropdown   = ref(false)
const mostrarHuespedes  = ref(false)
const mostrarCalendario = ref(false)
const loadingUbicaciones = ref(false)
const agregarVuelo      = ref(true)
const agregarAuto       = ref(true)
const origenVuelo       = ref('')

// ── Fechas ────────────────────────────────────────────────────────────────────
const fechaInicio = ref('')
const fechaFin    = ref('')

function onDatesSelected(dates) {
  fechaInicio.value = dates.start
  fechaFin.value    = dates.end
}

function fmtFecha(str) {
  if (!str) return ''
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

const resumenFechas = computed(() => {
  if (!fechaInicio.value) return ''
  const ini = fmtFecha(fechaInicio.value)
  const fin  = fechaFin.value ? fmtFecha(fechaFin.value) : '...'
  return `${ini} — ${fin}`
})

// ── Huéspedes ─────────────────────────────────────────────────────────────────
const habitaciones = ref([{ adultos: 2, ninos: 0, edadesNinos: [] }])

const resumenHuespedes = computed(() => {
  const totalPersonas = habitaciones.value.reduce(
    (acc, h) => acc + h.adultos + h.ninos, 0
  )
  return `${totalPersonas} personas, ${habitaciones.value.length} habitación`
})

// ── Opciones ──────────────────────────────────────────────────────────────────
const options = ref([
  { id: 'hospedaje',   label: 'Hospedaje',   icon_img: 'bed'     },
  { id: 'vuelos',      label: 'Vuelos',       icon_img: 'flight'  },
  { id: 'autos',       label: 'Autos',        icon_img: 'car'     },
  { id: 'paquetes',    label: 'Paquetes',     icon_img: 'package' },
  { id: 'actividades', label: 'Actividades',  icon_img: 'ticket'  },
  { id: 'cruceros',    label: 'Cruceros',     icon_img: 'cruise'  },
])

// ── Toggles ───────────────────────────────────────────────────────────────────
const toggleCalendar = () => {
  mostrarCalendario.value = !mostrarCalendario.value
  mostrarHuespedes.value  = false
  mostrarDropdown.value   = false
}

const toggleHuespedes = () => {
  mostrarHuespedes.value  = !mostrarHuespedes.value
  mostrarCalendario.value = false
  mostrarDropdown.value   = false
}

// ── Ubicaciones ───────────────────────────────────────────────────────────────
async function fetchUbicaciones() {
  mostrarDropdown.value    = true
  mostrarHuespedes.value   = false
  mostrarCalendario.value  = false
  loadingUbicaciones.value = true

  // Si el usuario edita manualmente el texto, resetear la ubicación seleccionada
  selectedUbicacion.value = null

  try {
    const res = await fetch(
      `${API_URL}/api/search/ubicaciones?q=${busquedaDestino.value}`
    )
    sugerencias.value = await res.json()
  } catch {
    sugerencias.value = []
  } finally {
    loadingUbicaciones.value = false
  }
}

const abrirMenu = fetchUbicaciones

function seleccionarUbicacion(loc) {
  selectedUbicacion.value = loc
  busquedaDestino.value   = `${loc.ubicacion}, ${loc.ciudad}, ${loc.pais}`
  mostrarDropdown.value   = false
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function selectOption(id) { activeOption.value = id }

function getIconPath(name) {
  return new URL(`../assets/img/iconos/light__${name}.svg`, import.meta.url).href
}

function cerrarTodos() {
  mostrarDropdown.value   = false
  mostrarHuespedes.value  = false
  mostrarCalendario.value = false
}

// ── Búsqueda ──────────────────────────────────────────────────────────────────
async function handleSearch() {
  if (!busquedaDestino.value || !fechaInicio.value || !fechaFin.value) {
    alert('Por favor completa destino y fechas')
    return
  }

  router.push({
    path: '/head',
    query: {
      destino:      busquedaDestino.value,          // texto legible: "Sosúa, Puerto Plata, RD"
      id_ubicacion: selectedUbicacion.value?.id ?? '', // ID numérico para el backend
      entrada:      fechaInicio.value,
      salida:       fechaFin.value,
      huespedes:    JSON.stringify(habitaciones.value),
    }
  })
}

// ── Clic fuera — cierra todos los dropdowns ───────────────────────────────────
const handleOutsideClick = (e) => {
  if (
    !e.target.closest('#destination-wrapper') &&
    !e.target.closest('#guest-wrapper') &&
    !e.target.closest('.date-field')
  ) {
    cerrarTodos()
  }
}

onMounted(()  => window.addEventListener('mousedown', handleOutsideClick))
onUnmounted(() => window.removeEventListener('mousedown', handleOutsideClick))
</script>

<style scoped>
@import '../assets/css/FormSearch.css';
</style>