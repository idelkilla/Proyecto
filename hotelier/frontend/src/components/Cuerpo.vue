<template>
  <div class="main-container">
    <div class="search-section-container">
      <div class="search-bar-content">
        <div class="search-inputs-row">
          
          <div class="dropdown-container">
              <div class="input-group location-input">
                <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 11.5C10.621 11.5 9.5 10.379 9.5 9C9.5 7.621 10.621 6.5 12 6.5C13.379 6.5 14.5 7.621 14.5 9C14.5 10.379 13.379 11.5 12 11.5Z" stroke="#333" stroke-width="1.5"/>
                  <path d="M12 21C14.773 18.026 18.5 14.5 18.5 9.5C18.5 5.358 15.029 2 12 2C8.971 2 5.5 5.358 5.5 9.5C5.5 14.5 9.227 18.026 12 21Z" stroke="#333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div class="input-text-area">
                  <label>¿A dónde quieres ir?</label>
                  <input type="text" :placeholder="destino || 'Destino'" />
                </div>
              </div>
          </div>

          <div class="input-group date-input">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="#333" stroke-width="1.5"/>
              <path d="M7 2V4" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M17 2V4" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M3 8H21" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div class="input-text-area">
              <label>Fecha</label>
              <input type="text" :placeholder="resumenFechas || '15 nov. - 23 nov'" readonly />
            </div>
          </div>

          <div class="input-group guests-input">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#333" stroke-width="1.5"/>
              <path d="M12 14C16.4183 14 20 17.1333 20 21H4C4 17.1333 7.58172 14 12 14Z" stroke="#333" stroke-width="1.5"/>
           </svg>
            <div class="input-text-area">
              <label>Huéspedes</label>
              <input type="text" :placeholder="resumenHuespedes" readonly />
            </div>
          </div>
          
          <button class="search-button">Buscar</button>
        </div>

        <div class="accommodation-tabs">
          <div class="slider-background" :class="sliderClass"></div>
          <button class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M22 17v-3h-20" /><path d="M2 8v9" />
              <path d="M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5z" />
            </svg>
            Todos los hospedajes
          </button>
          <button class="tab" :class="{ active: activeTab === 'hotels' }" @click="activeTab = 'hotels'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 21l18 0" /><path d="M9 8l1 0" /><path d="M9 12l1 0" /><path d="M9 16l1 0" />
              <path d="M14 8l1 0" /><path d="M14 12l1 0" /><path d="M14 16l1 0" />
              <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
            </svg>
            Hoteles
          </button>
          <button class="tab" :class="{ active: activeTab === 'casa' }" @click="activeTab = 'casa'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
            Casa
          </button>
        </div>
      </div>
    </div>
   
    <div class="main-content-layout">
      <div class="filters-column">
        <p>Filtrar por:</p>

        <div class="filter-option">
          <label class="checkBox"><input type="checkbox" id="todo-incluido" checked></label>
          <label for="todo-incluido">Todo Incluido</label>
        </div>
        <div class="filter-option">
          <label class="checkBox"><input type="checkbox" id="comida-incluida"><div class="transition"></div></label>
          <label for="comida-incluida">Playa Dorada</label>
        </div>
        <div class="filter-option">
          <label class="checkBox"><input type="checkbox" id="hotel" checked><div class="transition"></div></label>
          <label for="hotel">Desayuno incluido</label>
        </div>
        <div class="filter-option">
          <label class="checkBox"><input type="checkbox" id="resort-familia"><div class="transition"></div></label>
          <label for="resort-familia">Ideal para familias</label>
        </div>
        <div class="filter-option">
          <label class="checkBox"><input type="checkbox" id="resort-alberca"><div class="transition"></div></label>
          <label for="resort-alberca">Alberca</label>
        </div>
   
        <div class="price-section">
          <p class="price-title">Rango de Precio</p>
          <div class="price-inputs-container">
              <div class="price-card">
                  <span class="price-label">Mínimo</span>
                  <div class="price-input-wrapper">
                      <span class="currency">$</span>
                      <input type="text" placeholder="" v-model="minPrice" />
                  </div>
              </div>
              <div class="price-card">
                  <span class="price-label">Máximo</span>
                  <div class="price-input-wrapper">
                      <span class="currency">$</span>
                      <input type="text" placeholder="" v-model="maxPrice" />
                  </div>
              </div>
          </div>
        </div>

        <div class="accommodation-section">
          <p class="filter-title-bold">Tipo de alojamiento</p>
          <div class="accommodation-list">
              <div class="accommodation-row">
                  <div class="checkbox-group">
                      <label class="checkBox"><input type="checkbox" id="casa"><div class="transition"></div></label>
                      <label for="casa" class="label-text">Apartamentos enteros</label>
                  </div>
                  
              </div>
              <div class="accommodation-row">
                  <div class="checkbox-group">
                      <label class="checkBox"><input type="checkbox" id="aparthotel"><div class="transition"></div></label>
                      <label for="aparthotel" class="label-text">Apartahoteles</label>
                  </div>
                
              </div>
              <div class="accommodation-row">
                  <div class="checkbox-group">
                      <label class="checkBox"><input type="checkbox" id="hoteles"><div class="transition"></div></label>
                      <label for="hoteles" class="label-text">Hoteles</label>
                  </div>
              
              </div>
          </div>
        </div>

        <div class="services-section">
          <p class="filter-title-bold">Servicios</p>
          <div class="services-grid">
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 18l.01 0" /><path d="M9.172 15.172a4 4 0 0 1 5.656 0" /><path d="M6.343 12.343a8 8 0 0 1 11.314 0" /><path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
              </svg>
              <span class="service-name">Wifi incluido (72)</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" /><path d="M15 12v-7.5a1.5 1.5 0 0 1 3 0" /><path d="M9 12v-7.5a1.5 1.5 0 0 0 -3 0" /><path d="M15 5l-6 0" /><path d="M9 10l6 0" />
              </svg>
              <span class="service-name">Alberca (47)</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 16a3 3 0 0 1 -3 3" /><path d="M16 16a3 3 0 0 0 3 3" /><path d="M12 16v4" /><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -4" /><path d="M7 13v-3a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v3" />
              </svg>
              <span class="service-name">Aire acondicionado (65)</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10" /><path d="M15 6v12" /><path d="M18 12h.01" /><path d="M18 15h.01" /><path d="M18 9h.01" /><path d="M6.5 10.5c1 -.667 1.5 -.667 2.5 0c.833 .347 1.667 .926 2.5 0" /><path d="M6.5 13.5c1 -.667 1.5 -.667 2.5 0c.833 .347 1.667 .926 2.5 0" />
              </svg>
              <span class="service-name">Cocina (52)</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 21h8" /><path d="M12 15v6" /><path d="M5 5a7 2 0 1 0 14 0a7 2 0 1 0 -14 0" /><path d="M5 5v.388c0 .432 .126 .853 .362 1.206l5 7.509c.633 .951 1.88 1.183 2.785 .517c.191 -.141 .358 -.316 .491 -.517l5 -7.509c.236 -.353 .362 -.774 .362 -1.206v-.388" />
              </svg>
              <span class="service-name">Bar (52)</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14.7 13.5c-1.1 -2 -1.441 -2.5 -2.7 -2.5c-1.259 0 -1.736 .755 -2.836 2.747c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c1.013 0 1.8 -.823 1.8 -2c0 -.285 -.049 -.697 -.146 -.962c-.475 -1.451 -2.512 -1.835 -3.454 -3.538" /></svg>
              <span class="service-name">Mascotas</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 9a10 10 0 1 0 20 0" /><path d="M12 19a10 10 0 0 1 10 -10" /><path d="M2 9a10 10 0 0 1 10 10" /><path d="M12 4a9.7 9.7 0 0 1 2.99 7.5" /><path d="M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5" /></svg>
              <span class="service-name">Spa</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" /><path d="M10 16v-8h2.667c.736 0 1.333 .895 1.333 2s-.597 2 -1.333 2h-2.667" /></svg>
              <span class="service-name">Estacionamiento</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -14" /><path d="M8 14a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M8 6h.01" /><path d="M11 6h.01" /><path d="M14 6h2" /><path d="M8 14c1.333 -.667 2.667 -.667 4 0c1.333 .667 2.667 .667 4 0" /></svg>
              <span class="service-name">Lavadora y secadora</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12m0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3" /></svg>
              <span class="service-name">Restaurante</span>
            </div>
          </div>
        </div>

        <div class="stars-section">
          <p class="filter-title-bold">Estrellas</p>
          <div class="stars-list">
              <div class="star-row" v-for="n in [5, 4, 3]" :key="n">
                  <div class="checkbox-group">
                      <label class="checkBox">
                          <input type="checkbox" :id="'star-' + n" v-model="selectedStars" :value="String(n)" />
                          <div class="transition"></div>
                      </label>
                      <label :for="'star-' + n">
                          <span class="star-icons">
                              <svg v-for="i in n" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2">
                                  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                          </span>
                      </label>
                  </div>
                  <span class="count-text">{{ n === 5 ? 85 : n === 4 ? 42 : 20 }}</span>
              </div>
          </div>
        </div>
      </div>
      
      <div class="listings-column">
        <h2>{{ }}</h2>
        
        <div class="hotel-card" v-for="hotel in filteredHoteles" :key="hotel.id">
          <div class="card-image-placeholder slider-container">
            <button class="slider-arrow left" @click.stop="prevImg(hotel)">&#10094;</button>
            <img :src="getImageUrl(hotel.imagenes[hotel.currentImg])" alt="Hotel" class="hotel-img" />
            <button class="wishlist-button" :class="{ 'is-active': hotel.isFavorite }" @click.stop="toggleFavorite(hotel)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" class="heart-svg-fix">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
              </svg>
            </button>
            <button class="slider-arrow right" @click.stop="nextImg(hotel)">&#10095;</button>
            <div class="slider-dots">
              <span v-for="(img, index) in hotel.imagenes" :key="index" :class="{ active: index === hotel.currentImg }"></span>
            </div>
          </div>

          <div class="card-details">
            <h3>{{ hotel.nombre }}</h3>
            <p class="subtitle">{{ hotel.ubicacion }}</p>
            <div class="amenities">
              <span v-for="amenity in hotel.amenidades" :key="amenity" class="amenity-tag">
                {{ amenity }}
                <svg v-if="amenity === 'Todo Incluido'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 5px; vertical-align: middle;">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M9.828 9.172a4 4 0 1 0 0 5.656a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828" />
                </svg>
              </span>
            </div>
            <div class="rating-info">
              <span class="rating">{{ hotel.rating.puntuacion }}</span>
              <div class="rating-text-stack">
                <span class="rating-status">{{ hotel.rating.texto }}</span>
                <span class="reviews">{{ hotel.rating.opiniones }} opiniones</span>
              </div>
            </div>
          </div>

          <div class="card-pricing">
            <span class="price-per-night">${{ hotel.precio.porNoche }} <small>por noche</small></span>
            <span class="total-price">${{ hotel.precio.totalTachado }} <small>en total</small></span>
            <p class="taxes-info">Total con impuestos y cargos incluidos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const API_URL = 'http://localhost:3000'
const route = useRoute()

// ── Parámetros de búsqueda desde la URL ───────────────────
const destino      = route.query.destino  || ''
const entrada      = route.query.entrada  || ''
const salida       = route.query.salida   || ''
const habitaciones = JSON.parse(route.query.habitaciones || '[{"adultos":2,"ninos":0}]')

// ── Estado ────────────────────────────────────────────────
const hoteles       = ref([])
const loading       = ref(true)
const errorMsg      = ref(null)
const activeTab     = ref('all')
const minPrice      = ref(null)
const maxPrice      = ref(null)
const selectedStars = ref([])

// ── Resumen de fechas ─────────────────────────────────────
const resumenFechas = computed(() => {
  if (!entrada) return ''
  const fmt = (str) => {
    const [y, m, d] = str.split('-').map(Number)
    return new Date(y, m - 1, d).toLocaleDateString('es-ES', {
      day: 'numeric', month: 'short'
    })
  }
  return `${fmt(entrada)} — ${fmt(salida)}`
})

// ── Resumen de huéspedes ──────────────────────────────────
const resumenHuespedes = computed(() => {
  const total = habitaciones.reduce((acc, h) => acc + (h.adultos || 0) + (h.ninos || 0), 0)
  return `${total} personas, ${habitaciones.length} habitación`
})

// ── Fetch al backend ──────────────────────────────────────
onMounted(async () => {
  try {
    const res = await fetch(`${API_URL}/api/search/buscar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destino,
        fecha_inicio: entrada,
        fecha_fin:    salida,
        habitaciones,
      })
    })

    if (!res.ok) throw new Error('Error en la búsqueda')

    const data = await res.json()

    hoteles.value = data.map((h) => ({
      id:         h.id_servicio,
      nombre:     h.hotel,
      ubicacion:  h.ubicacion,
      tipo:       'hotels',
      amenidades: [],
      imagenes:   ['H1.jpg'],
      currentImg: 0,
      isFavorite: false,
      rating: { puntuacion: '—', texto: '', opiniones: 0 },
      precio: {
        porNoche:     Number(h.precio_min).toFixed(2),
        totalTachado: (Number(h.precio_min) * habitaciones.reduce((a, hh) => a + (hh.adultos || 0) + (hh.ninos || 0), 0)).toFixed(2)
      }
    }))
  } catch (err) {
    errorMsg.value = 'No se pudo conectar con el servidor.'
  } finally {
    loading.value = false
  }
})

// ── Helpers ───────────────────────────────────────────────
const toggleFavorite = (hotel) => { hotel.isFavorite = !hotel.isFavorite }

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

const nextImg = (hotel) => {
  hotel.currentImg = (hotel.currentImg + 1) % hotel.imagenes.length
}
const prevImg = (hotel) => {
  hotel.currentImg = (hotel.currentImg - 1 + hotel.imagenes.length) % hotel.imagenes.length
}

// ── Filtros locales ────────────────────────────────────────
const filteredHoteles = computed(() => {
  let filtered = hoteles.value

  if (activeTab.value !== 'all') {
    filtered = filtered.filter(h => h.tipo === activeTab.value)
  }
  if (minPrice.value !== null && minPrice.value !== '') {
    filtered = filtered.filter(h => Number(h.precio.porNoche) >= Number(minPrice.value))
  }
  if (maxPrice.value !== null && maxPrice.value !== '') {
    filtered = filtered.filter(h => Number(h.precio.porNoche) <= Number(maxPrice.value))
  }
  if (selectedStars.value.length > 0) {
    filtered = filtered.filter(h => {
      const rating = Math.floor(parseFloat(h.rating.puntuacion))
      return selectedStars.value.includes(rating.toString())
    })
  }
  return filtered
})

const sliderClass = computed(() => {
  if (activeTab.value === 'hotels') return 'is-hotels'
  if (activeTab.value === 'casa')   return 'is-casa'
  return 'is-all'
})
</script>

<style scoped src="../assets/css/cuerpo.css"></style>