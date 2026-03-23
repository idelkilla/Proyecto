<template>
  <div class="admin-container">
    <header class="form-header">
      <nav class="breadcrumbs">
        <span>Propiedades</span> 
        <i class="material-symbols-outlined">chevron_right</i> 
        <span class="active">Nueva</span>
      </nav>
      <h1>Registrar Propiedad</h1>
    </header>

    <div class="stepper">
      <div v-for="(step, i) in steps" :key="i" class="step-item">
        <div :class="['step-number', { active: currentStep >= i }]">
          <span v-if="currentStep > i" class="material-symbols-outlined">check</span>
          <span v-else>{{ i + 1 }}</span>
        </div>
        <span class="step-label" :class="{ 'label-active': currentStep === i }">{{ step }}</span>
      </div>
    </div>

    <div class="main-layout">
      <div class="form-card">
        <section v-if="currentStep === 0" class="fade-in">
          <div class="section-title">
            <i class="material-symbols-outlined">info</i>
            <h2>Detalles Básicos</h2>
          </div>
          <div class="input-group">
            <label>Nombre de la propiedad</label>
            <input v-model="form.nombre" type="text" placeholder="Ej. Grand Horizon Resort">
          </div>
          <div class="grid-2">
            <div class="input-group">
              <label>Tipo de Hospedaje</label>
              <select v-model="form.id_tipo">
                <option value="1">Hotel</option>
                <option value="2">Resort</option>
                <option value="3">Apartamento</option>
              </select>
            </div>
            <div class="input-group">
              <label>Estrellas</label>
              <select v-model="form.estrellas">
                <option value="5">5 Estrellas</option>
                <option value="4">4 Estrellas</option>
                <option value="3">3 Estrellas</option>
              </select>
            </div>
          </div>
          <div class="input-group">
            <label>Descripción</label>
            <textarea v-model="form.descripcion" rows="4"></textarea>
          </div>
        </section>

        <div class="actions">
          <button @click="currentStep--" v-if="currentStep > 0" class="btn-ghost">Atrás</button>
          <div v-else></div>
          <button @click="nextStep" class="btn-primary">
            {{ currentStep === steps.length - 1 ? 'Finalizar' : 'Continuar' }}
          </button>
        </div>
      </div>

      <aside class="preview-sidebar">
        <div class="preview-card">
          <div class="preview-img">
            <span class="badge">VISTA PREVIA</span>
          </div>
          <div class="preview-content">
            <h3>{{ form.nombre || 'Nombre de la Propiedad' }}</h3>
            <p>{{ form.direccion || 'Ubicación no definida' }}</p>
            <div class="strength-meter">
              <span>Progreso: {{ progress }}%</span>
              <div class="bar"><div :style="{ width: progress + '%' }"></div></div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyForm',
  data() {
    return {
      currentStep: 0,
      steps: ['Detalles', 'Ubicación', 'Servicios', 'Precios'],
      form: {
        nombre: '',
        id_tipo: '1',
        estrellas: '5',
        descripcion: '',
        direccion: '',
      }
    }
  },
  computed: {
    progress() {
      let p = 0;
      if (this.form.nombre) p += 25;
      if (this.form.descripcion) p += 25;
      if (this.currentStep >= 1) p += 50;
      return p;
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      } else {
        console.log('Datos enviados:', this.form);
      }
    }
  }
}
</script>

<style scoped src="../assets/css/AdminRegistrarPropiedad.css"></style>