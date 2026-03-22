<template>
  <div class="calendar-modal">

    <!-- Tabs -->
    <div class="cal-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['cal-tab', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>

    <!-- Grid dos meses -->
    <div class="cal-grid">

      <!-- Mes 1 -->
      <div class="cal-month">
        <div class="cal-month-header">
          <button class="cal-nav" @click="navigate(-1)" aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
            </svg>
          </button>
          <span>{{ monthName(viewYear, viewMonth) }}</span>
          <span class="cal-nav" style="visibility:hidden" aria-hidden="true" />
        </div>
        <div class="cal-week-header">
          <span v-for="d in DAYS" :key="d">{{ d }}</span>
        </div>
        <div class="cal-days">
          <div v-for="e in startOffset(viewYear, viewMonth)" :key="'e1-'+e" class="cal-day empty" />
          <div
            v-for="day in daysInMonth(viewYear, viewMonth)"
            :key="'m1-'+day"
            :class="dayClasses(viewYear, viewMonth, day)"
            @click="handleClick(viewYear, viewMonth, day)"
            @mouseenter="hovering = makeDate(viewYear, viewMonth, day)"
            @mouseleave="hovering = null"
          >{{ day }}</div>
        </div>
      </div>

      <div class="cal-divider" />

      <!-- Mes 2 -->
      <div class="cal-month">
        <div class="cal-month-header">
          <span class="cal-nav" style="visibility:hidden" aria-hidden="true" />
          <span>{{ monthName(nextYear, nextMonth) }}</span>
          <button class="cal-nav" @click="navigate(1)" aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
          </button>
        </div>
        <div class="cal-week-header">
          <span v-for="d in DAYS" :key="d">{{ d }}</span>
        </div>
        <div class="cal-days">
          <div v-for="e in startOffset(nextYear, nextMonth)" :key="'e2-'+e" class="cal-day empty" />
          <div
            v-for="day in daysInMonth(nextYear, nextMonth)"
            :key="'m2-'+day"
            :class="dayClasses(nextYear, nextMonth, day)"
            @click="handleClick(nextYear, nextMonth, day)"
            @mouseenter="hovering = makeDate(nextYear, nextMonth, day)"
            @mouseleave="hovering = null"
          >{{ day }}</div>
        </div>
      </div>

    </div>

    <!-- Footer chips -->
    <div class="cal-footer">
      <button
        v-for="chip in chips"
        :key="chip.id"
        :class="['cal-chip', { active: activeChip === chip.id }]"
        @click="selectChip(chip.id)"
      >
        <svg
          v-if="chip.id !== 'exactas'"
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        {{ chip.label }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── Props & Emits ──────────────────────────────────────────────────────────
const props = defineProps({
  modelValue: {
    type: Object,  // { start: Date|null, end: Date|null }
    default: () => ({ start: null, end: null }),
  },
})

const emit = defineEmits(['update:modelValue', 'range-selected', 'update:dates', 'close'])

function formatDateStr(date) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// ── Constantes ─────────────────────────────────────────────────────────────
const DAYS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom']

const tabs = [
  { id: 'calendario', label: 'Calendario'       },
  { id: 'flexibles',  label: 'Fechas flexibles'  },
]

const chips = [
  { id: 'exactas', label: 'Fechas exactas' },
  { id: '1dia',   label: '1 día'          },
  { id: '2dias',  label: '2 días'         },
  { id: '3dias',  label: '3 días'         },
  { id: '7dias',  label: '7 días'         },
]

// ── Estado ─────────────────────────────────────────────────────────────────
const activeTab  = ref('calendario')
const activeChip = ref('exactas')

const today = new Date()
today.setHours(0, 0, 0, 0)

const viewYear  = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

const rangeStart = ref(props.modelValue?.start ?? null)
const rangeEnd   = ref(props.modelValue?.end   ?? null)
const hovering   = ref(null)

// ── Computed ───────────────────────────────────────────────────────────────
const nextYear  = computed(() => viewMonth.value === 11 ? viewYear.value + 1 : viewYear.value)
const nextMonth = computed(() => (viewMonth.value + 1) % 12)

// ── Utilidades ─────────────────────────────────────────────────────────────
function makeDate(y, m, d) {
  const date = new Date(y, m, d)
  date.setHours(0, 0, 0, 0)
  return date
}

function monthName(y, m) {
  return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' })
    .format(new Date(y, m, 1))
}

function daysInMonth(y, m) {
  return new Date(y, m + 1, 0).getDate()
}

function startOffset(y, m) {
  return (new Date(y, m, 1).getDay() + 6) % 7  // lun = 0
}

// ── Clases CSS por día ─────────────────────────────────────────────────────
function dayClasses(y, m, day) {
  const date = makeDate(y, m, day)
  const t    = date.getTime()
  const cls  = ['cal-day']

  if (date < today) return [...cls, 'past']
  if (t === today.getTime()) cls.push('today')

  // Usar displayStart/End si hay chip activo, si no usar rangeStart/End o hover
  const lo_date = activeChip.value !== 'exactas' && displayStart.value
    ? displayStart.value
    : rangeStart.value

  const hi_date = activeChip.value !== 'exactas' && displayEnd.value
    ? displayEnd.value
    : (rangeEnd.value ?? hovering.value ?? null)

  if (lo_date) {
    const start  = lo_date.getTime()
    const rawEnd = hi_date?.getTime() ?? null
    const lo = rawEnd !== null ? Math.min(start, rawEnd) : start
    const hi = rawEnd !== null ? Math.max(start, rawEnd) : start

    if      (t === lo && t === hi) cls.push('range-start', 'range-end')
    else if (t === lo)             cls.push('range-start')
    else if (t === hi)             cls.push('range-end')
    else if (t > lo && t < hi)    cls.push('in-range')
  }

  return cls
}

// ── Selección de rango ─────────────────────────────────────────────────────
function handleClick(y, m, day) {
  const date = makeDate(y, m, day)
  if (date < today) return

  if (!rangeStart.value || rangeEnd.value) {
    // Empezar nueva selección
    rangeStart.value = date
    rangeEnd.value   = null
    activeChip.value = 'exactas'
  } else if (date.getTime() === rangeStart.value.getTime()) {
    rangeStart.value = null
  } else if (date < rangeStart.value) {
    rangeEnd.value   = rangeStart.value
    rangeStart.value = date
    emitRange()   // rango completo
  } else {
    rangeEnd.value = date
    emitRange()   // rango completo — el calendario NO se cierra
  }
}

function emitRange() {
  const payload = { start: rangeStart.value, end: rangeEnd.value }
  emit('update:modelValue', payload)
  emit('range-selected', payload)
  emit('update:dates', {
    start: formatDateStr(rangeStart.value),
    end:   formatDateStr(rangeEnd.value),
  })
}

// ── Chips con offset ───────────────────────────────────────────────────────
function selectChip(id) {
  activeChip.value = id
  if (!rangeStart.value || !rangeEnd.value) return

  // Calcular offset en días
  const offsetMap = { 'exactas': 0, '1dia': 1, '2dias': 2, '3dias': 3, '7dias': 7 }
  const offset = offsetMap[id] ?? 0

  // El rango base es el rango exacto elegido
  const startMs = rangeStart.value.getTime()
  const endMs   = rangeEnd.value.getTime()

  // Expandir rango: inicio - offset, fin + offset
  const newStart = new Date(startMs - offset * 86400000)
  const newEnd   = new Date(endMs   + offset * 86400000)

  // No retroceder antes de hoy
  displayStart.value = newStart < today ? today : newStart
  displayEnd.value   = newEnd
}

// Fechas base (las que el usuario eligió)
// Las fechas de display pueden diferir si hay chip activo
const displayStart = ref(null)
const displayEnd   = ref(null)

// ── Navegación ─────────────────────────────────────────────────────────────
function navigate(dir) {
  viewMonth.value += dir
  if (viewMonth.value > 11) { viewMonth.value = 0;  viewYear.value++ }
  if (viewMonth.value < 0)  { viewMonth.value = 11; viewYear.value-- }
}
</script>

<style scoped src="../assets/css/CalendarSelector.css"></style>