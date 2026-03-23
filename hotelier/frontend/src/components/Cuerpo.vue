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
                <input type="text" v-model="searchDestino" placeholder="Sosúa, Puerto Plata República..." />
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
              <label>Entrada</label>
              <input type="date" v-model="searchEntrada" />
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
              <label>Salida</label>
              <input type="date" v-model="searchSalida" />
            </div>
          </div>

          <div class="input-group guests-input">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#333" stroke-width="1.5"/>
              <path d="M12 14C16.4183 14 20 17.1333 20 21H4C4 17.1333 7.58172 14 12 14Z" stroke="#333" stroke-width="1.5"/>
            </svg>
            <div class="input-text-area">
              <label>Huéspedes</label>
              <input type="text" :value="resumenHuespedes" readonly />
            </div>
          </div>

          <button class="search-button" @click="ejecutarBusqueda">Buscar</button>
        </div>

        <div class="accommodation-tabs">
          <div class="slider-background" :class="sliderClass"></div>

          <button class="tab" :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M7 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
              <path d="M22 17v-3h-20"/><path d="M2 8v9"/>
              <path d="M12 14h10v-2a3 3 0 0 0 -3 -3h-7v5z"/>
            </svg>
            Todos los hospedajes
          </button>

          <button class="tab" :class="{ active: activeTab === 'Hotel' }" @click="activeTab = 'Hotel'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 21l18 0"/><path d="M9 8l1 0"/><path d="M9 12l1 0"/>
              <path d="M9 16l1 0"/><path d="M14 8l1 0"/><path d="M14 12l1 0"/>
              <path d="M14 16l1 0"/><path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16"/>
            </svg>
            Hoteles
          </button>

          <button class="tab" :class="{ active: activeTab === 'Casa' }" @click="activeTab = 'Casa'">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M5 12l-2 0l9 -9l9 9l-2 0"/>
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/>
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/>
            </svg>
            Casa
          </button>
        </div>
      </div>
    </div>

    <div class="main-content-layout">

      <!-- FILTROS -->
      <div class="filters-column">
        <p>Filtrar por:</p>

        <div v-for="servicio in serviciosDisponibles" :key="servicio" class="filter-option">
          <label class="checkBox">
            <input type="checkbox" :value="servicio" v-model="selectedServicios" />
            <div class="transition"></div>
          </label>
          <label>{{ servicio }}</label>
        </div>

        <div class="price-section">
          <p class="price-title">Rango de Precio</p>
          <div class="price-inputs-container">
            <div class="price-card">
              <span class="price-label">Mínimo</span>
              <div class="price-input-wrapper">
                <span class="currency">$</span>
                <input type="text" v-model="minPrice" />
              </div>
            </div>
            <div class="price-card">
              <span class="price-label">Máximo</span>
              <div class="price-input-wrapper">
                <span class="currency">$</span>
                <input type="text" v-model="maxPrice" />
              </div>
            </div>
          </div>
        </div>

        <div class="accommodation-section">
          <p class="filter-title-bold">Tipo de alojamiento</p>
          <div class="accommodation-list">
            <div v-for="tipo in tiposDisponibles" :key="tipo" class="accommodation-row">
              <div class="checkbox-group">
                <label class="checkBox">
                  <input type="checkbox" :value="tipo" v-model="selectedTipos" />
                  <div class="transition"></div>
                </label>
                <label class="label-text">{{ tipo }}</label>
              </div>
            </div>
          </div>
        </div>

        <div class="services-section">
          <p class="filter-title-bold">Servicios</p>
          <div class="services-grid">
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 18l.01 0"/><path d="M9.172 15.172a4 4 0 0 1 5.656 0"/>
                <path d="M6.343 12.343a8 8 0 0 1 11.314 0"/>
                <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"/>
              </svg>
              <span class="service-name">Wifi ({{ contarPorServicio('Wifi') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1"/>
                <path d="M2 16a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1"/>
                <path d="M15 12v-7.5a1.5 1.5 0 0 1 3 0"/><path d="M9 12v-7.5a1.5 1.5 0 0 0 -3 0"/>
                <path d="M15 5l-6 0"/><path d="M9 10l6 0"/>
              </svg>
              <span class="service-name">Alberca ({{ contarPorServicio('Alberca') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 16a3 3 0 0 1 -3 3"/><path d="M16 16a3 3 0 0 0 3 3"/>
                <path d="M12 16v4"/>
                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -4"/>
                <path d="M7 13v-3a1 1 0 0 1 1 -1h8a1 1 0 0 1 1 1v3"/>
              </svg>
              <span class="service-name">Aire acondicionado ({{ contarPorServicio('Aire acondicionado') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 7a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1l0 -10"/>
                <path d="M15 6v12"/><path d="M18 12h.01"/><path d="M18 15h.01"/><path d="M18 9h.01"/>
                <path d="M6.5 10.5c1 -.667 1.5 -.667 2.5 0c.833 .347 1.667 .926 2.5 0"/>
                <path d="M6.5 13.5c1 -.667 1.5 -.667 2.5 0c.833 .347 1.667 .926 2.5 0"/>
              </svg>
              <span class="service-name">Cocina ({{ contarPorServicio('Cocina') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M8 21h8"/><path d="M12 15v6"/>
                <path d="M5 5a7 2 0 1 0 14 0a7 2 0 1 0 -14 0"/>
                <path d="M5 5v.388c0 .432 .126 .853 .362 1.206l5 7.509c.633 .951 1.88 1.183 2.785 .517c.191 -.141 .358 -.316 .491 -.517l5 -7.509c.236 -.353 .362 -.774 .362 -1.206v-.388"/>
              </svg>
              <span class="service-name">Bar ({{ contarPorServicio('Bar') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M14.7 13.5c-1.1 -2 -1.441 -2.5 -2.7 -2.5c-1.259 0 -1.736 .755 -2.836 2.747c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c1.013 0 1.8 -.823 1.8 -2c0 -.285 -.049 -.697 -.146 -.962c-.475 -1.451 -2.512 -1.835 -3.454 -3.538"/>
                <path d="M20.188 8.082a1.039 1.039 0 0 0 -.406 -.082h-.015c-.735 .012 -1.56 .75 -1.993 1.866c-.519 1.335 -.28 2.7 .538 3.052c.129 .055 .267 .082 .406 .082c.739 0 1.575 -.742 2.011 -1.866c.516 -1.335 .273 -2.7 -.54 -3.052l-.001 0"/>
                <path d="M9.474 9c.055 0 .109 0 .163 -.011c.944 -.128 1.533 -1.346 1.32 -2.722c-.203 -1.297 -1.047 -2.267 -1.932 -2.267c-.055 0 -.109 0 -.163 .011c-.944 .128 -1.533 1.346 -1.32 2.722c.204 1.293 1.048 2.267 1.933 2.267"/>
                <path d="M16.456 6.733c.214 -1.376 -.375 -2.594 -1.32 -2.722a1.164 1.164 0 0 0 -.162 -.011c-.885 0 -1.728 .97 -1.93 2.267c-.214 1.376 .375 2.594 1.32 2.722c.054 .007 .108 .011 .162 .011c.885 0 1.73 -.974 1.93 -2.267"/>
                <path d="M5.69 12.918c.816 -.352 1.054 -1.719 .536 -3.052c-.436 -1.124 -1.271 -1.866 -2.009 -1.866c-.14 0 -.277 .027 -.407 .082c-.816 .352 -1.054 1.719 -.536 3.052c.436 1.124 1.271 1.866 2.009 1.866c.14 0 .277 -.027 .407 -.082"/>
              </svg>
              <span class="service-name">Mascotas ({{ contarPorServicio('Mascotas') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M2 9a10 10 0 1 0 20 0"/><path d="M12 19a10 10 0 0 1 10 -10"/>
                <path d="M2 9a10 10 0 0 1 10 10"/><path d="M12 4a9.7 9.7 0 0 1 2.99 7.5"/>
                <path d="M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5"/>
              </svg>
              <span class="service-name">Spa ({{ contarPorServicio('Spa') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14"/>
                <path d="M10 16v-8h2.667c.736 0 1.333 .895 1.333 2s-.597 2 -1.333 2h-2.667"/>
              </svg>
              <span class="service-name">Estacionamiento ({{ contarPorServicio('Estacionamiento') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 5a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2l0 -14"/>
                <path d="M8 14a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"/>
                <path d="M8 6h.01"/><path d="M11 6h.01"/><path d="M14 6h2"/>
                <path d="M8 14c1.333 -.667 2.667 -.667 4 0c1.333 .667 2.667 .667 4 0"/>
              </svg>
              <span class="service-name">Lavadora ({{ contarPorServicio('Lavadora') }})</span>
            </div>
            <div class="service-card">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="service-icon">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M19 3v12h-5c-.023 -3.681 .184 -7.406 5 -12m0 12v6h-1v-3m-10 -14v17m-3 -17v3a3 3 0 1 0 6 0v-3"/>
              </svg>
              <span class="service-name">Restaurante ({{ contarPorServicio('Restaurante') }})</span>
            </div>
          </div>
        </div>

        <div class="stars-section">
          <p class="filter-title-bold">Estrellas</p>
          <div class="stars-list">
            <div class="star-row">
              <div class="checkbox-group">
                <label class="checkBox">
                  <input type="checkbox" id="star-5" v-model="selectedStars" value="5" />
                  <div class="transition"></div>
                </label>
                <label for="star-5">
                  <span class="star-icons">
                    <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2">
                      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                    </svg>
                  </span>
                </label>
              </div>
              <span class="count-text">{{ contarPorCalificacion(9) }}</span>
            </div>

            <div class="star-row">
              <div class="checkbox-group">
                <label class="checkBox">
                  <input type="checkbox" id="star-4" v-model="selectedStars" value="4" />
                  <div class="transition"></div>
                </label>
                <label for="star-4">
                  <span class="star-icons">
                    <svg v-for="i in 4" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2">
                      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                    </svg>
                  </span>
                </label>
              </div>
              <span class="count-text">{{ contarPorCalificacion(7) }}</span>
            </div>

            <div class="star-row">
              <div class="checkbox-group">
                <label class="checkBox">
                  <input type="checkbox" id="star-3" v-model="selectedStars" value="3" />
                  <div class="transition"></div>
                </label>
                <label for="star-3">
                  <span class="star-icons">
                    <svg v-for="i in 3" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFD700" stroke="#FFD700" stroke-width="2">
                      <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                    </svg>
                  </span>
                </label>
              </div>
              <span class="count-text">{{ contarPorCalificacion(5) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- RESULTADOS -->
      <div class="listings-column">

        <div v-if="isLoading" class="estado-busqueda">
          <p>Buscando hospedajes...</p>
        </div>

        <div v-else-if="errorMsg" class="estado-busqueda">
          <p style="color: #c00">{{ errorMsg }}</p>
        </div>

        <div v-else-if="filteredHoteles.length === 0" class="estado-busqueda">
          <p>No se encontraron hospedajes para tu búsqueda.</p>
        </div>

        <template v-else>
          <h2>{{ filteredHoteles.length }} hospedajes encontrados</h2>

          <div
            class="hotel-card"
            v-for="hotel in filteredHoteles"
            :key="hotel.id_servicio"
            @click="verDetalle(hotel)"
            style="cursor: pointer"
          >
            <div class="card-image-placeholder slider-container">
              <button class="slider-arrow left" @click.stop="prevImg(hotel)">&#10094;</button>

              <template v-if="hotel.imagenes && hotel.imagenes.length > 0">
                <img :src="hotel.imagenes[hotel.currentImg]" :alt="hotel.hotel" class="hotel-img" />
              </template>
              <div v-else class="img-sin-foto">
                <span>Sin foto</span>
              </div>

              <button
                class="wishlist-button"
                :class="{ 'is-active': hotel.isFavorite }"
                @click.stop="hotel.isFavorite = !hotel.isFavorite"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" class="heart-svg-fix">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                </svg>
              </button>

              <button class="slider-arrow right" @click.stop="nextImg(hotel)">&#10095;</button>

              <div class="slider-dots">
                <span
                  v-for="(img, index) in hotel.imagenes"
                  :key="index"
                  :class="{ active: index === hotel.currentImg }"
                ></span>
              </div>
            </div>

            <div class="card-details">
              <h3>{{ hotel.hotel }}</h3>
              <p class="subtitle">{{ hotel.ubicacion }}</p>

              <div class="amenities">
                <span
                  v-for="amenity in hotel.amenidades.slice(0, 4)"
                  :key="amenity"
                  class="amenity-tag"
                >
                  {{ amenity }}
                  <svg
                    v-if="amenity === 'Todo Incluido'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round"
                    style="margin-left: 5px; vertical-align: middle"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9.828 9.172a4 4 0 1 0 0 5.656a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828"/>
                  </svg>
                </span>
                <span v-if="hotel.amenidades.length > 4" class="amenity-tag">
                  +{{ hotel.amenidades.length - 4 }} más
                </span>
              </div>

              <div class="rating-info">
                <span class="rating" :style="!hotel.calificacion_promedio ? 'background:#ccc' : ''">
                  {{ hotel.calificacion_promedio ?? '—' }}
                </span>
                <div class="rating-text-stack">
                  <span class="rating-status">{{ textoCalificacion(hotel.calificacion_promedio) }}</span>
                  <span class="reviews">{{ hotel.total_resenas }} opiniones</span>
                </div>
              </div>
            </div>

            <div class="card-pricing">
              <span class="price-per-night">
                ${{ hotel.precio_min.toFixed(2) }} <small>por noche</small>
              </span>
              <span class="total-price" v-if="noches > 0">
                ${{ (hotel.precio_min * noches).toFixed(2) }} <small>en total</small>
              </span>
              <p class="taxes-info">Total con impuestos y cargos incluidos</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route  = useRoute()
const router = useRouter()

// ── Parámetros de la URL ──────────────────────────────────────────────────────
const searchDestino = ref(route.query.destino      || '')
const searchEntrada = ref(route.query.entrada      || '')
const searchSalida  = ref(route.query.salida       || '')
const idUbicacion   = ref(route.query.id_ubicacion || '')
const habitaciones  = ref(
  route.query.huespedes ? JSON.parse(route.query.huespedes) : [{ adultos: 2, ninos: 0 }]
)

// ── Estado ────────────────────────────────────────────────────────────────────
const hoteles      = ref([])
const isLoading    = ref(false)
const errorMsg     = ref('')
let   ignorarWatch = false   // ← GUARD para evitar el bucle

// ── Filtros ───────────────────────────────────────────────────────────────────
const activeTab         = ref('all')
const minPrice          = ref(null)
const maxPrice          = ref(null)
const selectedStars     = ref([])
const selectedServicios = ref([])
const selectedTipos     = ref([])

// ── Computed ──────────────────────────────────────────────────────────────────
const resumenHuespedes = computed(() => {
  const total = habitaciones.value.reduce((s, h) => s + (h.adultos || 0) + (h.ninos || 0), 0)
  return `${total} persona(s), ${habitaciones.value.length} hab.`
})

const noches = computed(() => {
  if (!searchEntrada.value || !searchSalida.value) return 0
  return Math.max(
    0,
    Math.round((new Date(searchSalida.value) - new Date(searchEntrada.value)) / 86400000)
  )
})

const tiposDisponibles = computed(() =>
  [...new Set(hoteles.value.map(h => h.tipo_hospedaje).filter(Boolean))]
)

const serviciosDisponibles = computed(() => {
  const s = new Set()
  hoteles.value.forEach(h => (h.amenidades || []).forEach(a => s.add(a)))
  return [...s]
})

const filteredHoteles = computed(() => {
  let lista = hoteles.value

  if (activeTab.value !== 'all')
    lista = lista.filter(h => h.tipo_hospedaje === activeTab.value)

  if (selectedTipos.value.length)
    lista = lista.filter(h => selectedTipos.value.includes(h.tipo_hospedaje))

  if (minPrice.value)
    lista = lista.filter(h => h.precio_min >= Number(minPrice.value))

  if (maxPrice.value)
    lista = lista.filter(h => h.precio_min <= Number(maxPrice.value))

  if (selectedStars.value.length)
    lista = lista.filter(h => {
      if (!h.calificacion_promedio) return false
      return selectedStars.value.some(
        s => parseFloat(h.calificacion_promedio) >= Number(s) * 2
      )
    })

  if (selectedServicios.value.length)
    lista = lista.filter(h =>
      selectedServicios.value.every(s => (h.amenidades || []).includes(s))
    )

  return lista
})

const sliderClass = computed(() =>
  activeTab.value !== 'all' ? 'is-hotels' : 'is-all'
)

// ── Helpers ───────────────────────────────────────────────────────────────────
function contarPorCalificacion(umbral) {
  return hoteles.value.filter(
    h => h.calificacion_promedio && parseFloat(h.calificacion_promedio) >= umbral
  ).length
}

function contarPorServicio(nombre) {
  return hoteles.value.filter(h =>
    (h.amenidades || []).some(a => a.toLowerCase().includes(nombre.toLowerCase()))
  ).length
}

function textoCalificacion(cal) {
  if (!cal) return 'Sin calificación'
  const n = parseFloat(cal)
  if (n >= 9) return 'Excepcional'
  if (n >= 8) return 'Muy bueno'
  if (n >= 7) return 'Bueno'
  return 'Aceptable'
}

const nextImg = h => { h.currentImg = (h.currentImg + 1) % h.imagenes.length }
const prevImg = h => { h.currentImg = (h.currentImg - 1 + h.imagenes.length) % h.imagenes.length }

function verDetalle(hotel) {
  router.push({
    path: `/hospedaje/${hotel.id_servicio}`,
    query: {
      entrada:   searchEntrada.value,
      salida:    searchSalida.value,
      huespedes: JSON.stringify(habitaciones.value),
    },
  })
}

// ── Backend ───────────────────────────────────────────────────────────────────
async function ejecutarBusqueda() {
  isLoading.value = true
  errorMsg.value  = ''
  hoteles.value   = []

  const destino     = route.query.destino || ''
  const fechaInicio = route.query.entrada || ''
  const fechaFin    = route.query.salida  || ''
  const habs        = route.query.huespedes
                        ? JSON.parse(route.query.huespedes)
                        : [{ adultos: 2, ninos: 0 }]

  // Actualizar campos del buscador visual
  searchDestino.value = destino
  searchEntrada.value = fechaInicio
  searchSalida.value  = fechaFin

  console.log('EJECUTANDO BÚSQUEDA CON:', { destino, fechaInicio, fechaFin, habs })

  try {
    const res = await fetch('http://localhost:3000/api/search/hospedaje', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destino:      destino,
        fecha_inicio: fechaInicio,
        fecha_fin:    fechaFin,
        habitaciones: habs,
      }),
    })

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()
    console.log('HOTELES RECIBIDOS:', data.length, data)
    hoteles.value = data.map(h => ({ ...h, currentImg: 0, isFavorite: false }))

  } catch (err) {
    console.error('ERROR FETCH:', err)
    errorMsg.value = `Error: ${err.message}`
  } finally {
    isLoading.value = false
  }
}

onMounted(ejecutarBusqueda)
</script>

<style scoped src="../assets/css/cuerpo.css"></style>
