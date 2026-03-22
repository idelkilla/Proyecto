<template>
  <div class="page">
    <main class="container">
      <section class="help-center">
        <h2>Centro de ayuda</h2>
        <p class="saludo">Hola, {{ user.name || 'Usuario' }}</p>

        <div class="search-help">
          <SearchBox
            v-model="busqueda"
            placeholder="¿En qué podemos ayudarte?"
            @search="buscarArticulos"
          />
        </div>

        <h2>Administra tus reservaciones</h2>
        <img src="../assets/img/reserva_servicio.png" alt="No reservations" class="img_reserva" />

        <div class="empty-reservation">
          <p class="info_reserva">No encontramos ninguna reservación.</p>
          <button class="primary-btn">Buscar una reservación existente</button>
          <button class="secondary-btn">Iniciar una reserva</button>
        </div>
      </section>

      <section class="help-luxury">
        <h2>Consulta artículos de ayuda</h2>

        <div class="luxury-grid">
          <div class="luxury-item" @click="abrirCategoria('Vuelos')">
            <i class="fa-solid fa-plane"></i>
            <span>Vuelos</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Reembolsos y cargos')">
            <i class="fa-regular fa-credit-card"></i>
            <span>Reembolsos y cargos</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Paquetes')">
            <i class="fa-solid fa-suitcase-rolling"></i>
            <span>Paquetes</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Hospedaje')">
            <i class="fa-regular fa-building"></i>
            <span>Hospedaje</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Cruceros')">
            <i class="fa-solid fa-ship"></i>
            <span>Cruceros</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Actividades')">
            <i class="fa-regular fa-calendar"></i>
            <span>Actividades</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Cuentas')">
            <i class="fa-regular fa-user"></i>
            <span>Cuentas</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Privacidad')">
            <i class="fa-regular fa-eye"></i>
            <span>Privacidad</span>
          </div>

          <div class="luxury-item" @click="abrirCategoria('Alertas de viaje')">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span>Alertas de viaje</span>
          </div>
        </div>

        <!-- PANEL LATERAL -->
        <div v-if="categoriaActiva" class="side-panel activo">
          <button class="close-btn" @click="cerrarPanel">✕</button>

          <template v-if="!articuloActivo">
            <h3>{{ categoriaActiva }}</h3>

            <ul v-if="categoriaActiva === 'Resultados de búsqueda'">
              <li
                v-for="(item, index) in resultadosBusqueda"
                :key="index"
                @click="abrirArticulo(item)"
                class="articulo-item"
              >
                {{ item }}
              </li>
            </ul>

            <ul v-else-if="articulos[categoriaActiva]">
              <li
                v-for="(item, index) in articulos[categoriaActiva]"
                :key="index"
                @click="abrirArticulo(item)"
                class="articulo-item"
              >
                {{ item }}
              </li>
            </ul>
          </template>

          <template v-else>
            <button class="back-btn" @click="articuloActivo = null">
              ← Volver
            </button>

            <h2>{{ articuloActivo }}</h2>

            <p v-if="contenidoArticulos[articuloActivo]">
              {{ contenidoArticulos[articuloActivo] }}
            </p>

            <p v-else>Información no disponible todavía para este artículo.</p>
          </template>
        </div>
      </section>

      <section id="servicios">
        <h2>Nuestros Servicios</h2>

        <div class="services">
          <div class="card">
            <i class="fa-solid fa-calendar-check icon"></i>
            <h3>Reservaciones</h3>
            <p>Gestión elegante y eficiente de reservas, cambios y cancelaciones.</p>
          </div>

          <div class="card">
            <i class="fa-solid fa-headset icon"></i>
            <h3>Soporte al Huésped</h3>
            <p>Atención personalizada durante toda su estadía.</p>
          </div>

          <div class="card">
            <i class="fa-solid fa-comments icon"></i>
            <h3>Reclamaciones</h3>
            <p>Gestión cuidadosa de sugerencias y experiencias.</p>
          </div>
        </div>
      </section>

      <section id="contacto" class="contacto">
        <h2>Contáctanos</h2>

        <form @submit.prevent="enviarFormulario">
          <label>Nombre</label>
          <input v-model="form.nombre" type="text" placeholder="Tu nombre completo" required />

          <label>Correo</label>
          <input v-model="form.email" type="email" placeholder="correo@email.com" required />

          <label>Tipo de solicitud</label>
          <select v-model="form.tipo">
            <option>Reservación</option>
            <option>Queja</option>
            <option>Sugerencia</option>
            <option>Información</option>
          </select>

          <label>Mensaje</label>
          <textarea v-model="form.mensaje" rows="4" placeholder="Escriba su mensaje..."></textarea>

          <button type="submit">Enviar mensaje</button>

          <p v-if="enviado" class="ok">Mensaje enviado correctamente ✔</p>
        </form>
      </section>
    </main>
  </div>
</template>

<script>
import SearchBox from './SearchBox.vue'

export default {
  name: 'AtencionAlCliente',
  components: { SearchBox },

  data() {
    return {
      user: {
        name: localStorage.getItem('user_name') || 'Usuario',
      },
      enviado: false,
      articuloActivo: null,
      busqueda: '',
      categoriaActiva: null,
      resultadosBusqueda: [],

      articulos: {
        Vuelos: [
          'Cambios de vuelos',
          'Cancelación de vuelos',
          'Check-in',
          'Restricciones de equipaje',
          'Reserva un vuelo con crédito de aerolínea',
          'Cambios hechos por la aerolínea',
          'Información de contacto de la aerolínea',
          'Check-in de tu vuelo',
          'Información sobre los asientos',
          'Reservar el traslado al aeropuerto',
          'Cargos por reservación de vuelo',
          'Pérdida de vuelos',
          'Tarifas económicas básicas y con restricciones',
          'Vuelos con mascotas',
          'Viajes en avión con niños',
          'Opciones de pago de vuelos',
          'Comidas durante los vuelos',
        ],
        'Reembolsos y cargos': [
          'Cargos por cancelación',
          'Plazos de reembolso',
          'Métodos de pago',
          'Información básica sobre reembolsos',
          'Recibo por tu reservación',
          'Seguridad en el pago',
          'Cargos no reconocidos',
          'Solución de problemas de pagos rechazados',
          'Plazo de reembolso',
          'Políticas de pago posterior',
          'Reembolsos de OneKeyCash',
        ],
        Paquetes: [
          'Cambio de paquetes vacacionales',
          'Información de contacto de la aerolínea',
          'Cancelación de paquetes vacacionales',
          'Check-in de tu vuelo',
          'Check-in y check-out de tu estancia',
          'Solicitudes especiales al reservar un hotel',
          'Restricciones de equipaje',
          'Acerca de las ofertas increíbles y los paquetes de ahorro',
          'Reservaciones de paquetes vacacionales',
          'Reservar el traslado al aeropuerto',
          'Consulta de reservaciones',
          'Reservaciones de hotel con facilidades para personas con discapacidad',
          'Opciones de pago de paquetes vacacionales',
          'Tus derechos como pasajero de un vuelo',
          'Facilidades de acceso para personas con discapacidad en los vuelos',
          'Hoteles y resorts todo incluido',
          'Qué incluyen los paquetes',
          'Cambios y cancelaciones',
        ],
        Hospedaje: [
          'Cambia tu estancia',
          'Cómo cancelar tu estancia',
          'Check-in y check-out de tu estancia',
          'Solicitudes especiales al reservar un hotel',
          'Cómo usar un cupón',
          'Reservar el traslado al aeropuerto',
          'Reservaciones para grupos',
          'Cambios en la reserva',
          'Check-in y check-out',
          'Políticas del hotel',
          'Consulta de reservaciones',
          'Reservaciones de hotel con facilidades para personas con discapacidad',
          'Opciones de pago para tu estancia',
          'Reservación de hotel en Cuba',
          'Hoteles y resorts todo incluido',
          'Cómo buscar un hotel que acepte mascotas',
          'Seguro de viaje',
          'Definiciones de acceso para personas con discapacidad',
          'Opiniones de huéspedes y categoría de estrellas',
          'Cómo escribir una opinión sobre tu estancia',
        ],
        Cruceros: [
          'Cambio o cancelación de reservaciones de crucero',
          'Reservaciones de cruceros',
          'Opciones de pago para tu crucero',
          'Registro en la línea de cruceros',
          'Documentos de viaje para cruceros',
          'Servicios y camarotes',
          'Abordaje y desembarque',
          'Tipos de cabinas',
          'Políticas de cancelación',
          'Servicios incluidos',
        ],
        Actividades: [
          'Reservar actividades',
          'Cancelaciones',
          'Horarios',
          'Cambio o cancelación de actividades',
          'Agregar actividades a tu reservación',
          'Reservaciones de actividades',
          'Consulta de reservaciones',
          'Opciones de pago de actividades',
          'Cómo consultar e imprimir tu voucher de actividad',
        ],
        Cuentas: [
          'Restricciones de aduana para viajeros internacionales',
          'Actualizar la información de tu cuenta',
          'Documentos para viajes internacionales',
          'Inicia sesión en tu cuenta',
          'Cancelación de suscripción a los emails de marketing, SMS y notificaciones push',
          'Requisitos aduanales',
          'Administración de la cuenta y datos de viaje',
          'Editar perfil',
          'Cambiar contraseña',
          'Eliminar cuenta',
          'Eliminación de tu cuenta',
        ],
        Privacidad: [
          'Actualizar la información de tu cuenta',
          'Información sobre tu privacidad',
          '¿Cuáles son tus derechos de privacidad como titular de datos?',
          'Cómo administrar el uso de tus datos personales para marketing directo',
          'Cancelación de suscripción a los emails de marketing, SMS y notificaciones push',
          'Otras preguntas e inquietudes sobre tus datos personales',
          'Solicitud o eliminación de tus datos personales',
          'Uso de datos',
          'Configuración de privacidad',
        ],
        'Alertas de viaje': [
          'Requisitos de entrada',
          'Cambios por clima',
          'Restricciones',
        ],
      },

      contenidoArticulos: {
        'Cambios de vuelos': 'Puedes cambiar tu vuelo desde tu panel de usuario o contactando soporte.',
        'Cancelación de vuelos': 'Las cancelaciones están sujetas a las políticas de la aerolínea.',
        'Check-in': 'El check-in puede realizarse online 24 horas antes del vuelo.',
        'Cargos por cancelación': 'Los cargos dependen del tipo de tarifa seleccionada.',
        'Cambio de paquetes vacacionales': 'Los paquetes pueden modificarse según disponibilidad.',
        'Cambia tu estancia': 'Puedes cambiar tu estancia desde la sección Mis Reservas.',
        'Cambio o cancelación de reservaciones de crucero': 'Consulta las políticas antes de cancelar.',
        'Reservar actividades': 'Puedes agregar actividades durante o después de tu reserva.',
        'Actualizar la información de tu cuenta': 'Ve a tu perfil para editar tus datos.',
        'Información sobre tu privacidad': 'Protegemos tus datos bajo nuestras políticas de privacidad.',
        'Requisitos de entrada': 'Verifica los requisitos del país antes de viajar.',
      },

      form: {
        nombre: '',
        email: '',
        tipo: 'Reservación',
        mensaje: '',
      },
    }
  },

  methods: {
    enviarFormulario() {
      this.enviado = true
      this.form = { nombre: '', email: '', tipo: 'Reservación', mensaje: '' }
      setTimeout(() => { this.enviado = false }, 3000)
    },

    buscarArticulos() {
      const texto = this.busqueda.toLowerCase().trim()
      if (!texto) {
        this.resultadosBusqueda = []
        this.categoriaActiva = null
        return
      }
      let resultados = []
      for (const categoria in this.articulos) {
        this.articulos[categoria].forEach((item) => {
          if (item.toLowerCase().includes(texto)) {
            resultados.push(`${categoria} · ${item}`)
          }
        })
      }
      this.resultadosBusqueda = resultados
      this.categoriaActiva = 'Resultados de búsqueda'
    },

    abrirCategoria(nombre) {
      this.categoriaActiva = this.categoriaActiva === nombre ? null : nombre
    },

    abrirArticulo(nombre) {
      this.articuloActivo = nombre
    },

    cerrarPanel() {
      this.categoriaActiva = null
      this.articuloActivo = null
    },
  },
}
</script>

<style scoped src="../assets/css/servicioCliente.css"></style>