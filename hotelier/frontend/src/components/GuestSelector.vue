<template>
  <div class="guests-dropdown shadow-lg">
    <div v-for="(hab, index) in modelValue" :key="index" class="room-block">
      <div class="room-header">
        <strong>Habitación {{ index + 1 }}</strong>
        <button v-if="modelValue.length > 1" @click="removeRoom(index)" class="btn-remove">Eliminar</button>
      </div>

      <div class="guest-row">
        <div class="label-group">
          <span>Adultos</span>
        </div>
        <div class="counter">
          <button @click="updateGuest(index, 'adultos', -1)" :disabled="hab.adultos <= 1" class="btn-round">—</button>
          <span class="count">{{ hab.adultos }}</span>
          <button @click="updateGuest(index, 'adultos', 1)" class="btn-round">+</button>
        </div>
      </div>

      <div class="guest-row">
        <div class="label-group">
          <span>Niños</span>
          <small>0 a 17 años</small>
        </div>
        <div class="counter">
          <button @click="updateGuest(index, 'ninos', -1)" :disabled="hab.ninos <= 0" class="btn-round">—</button>
          <span class="count">{{ hab.ninos }}</span>
          <button @click="updateGuest(index, 'ninos', 1)" class="btn-round">+</button>
        </div>
      </div>

      <div v-if="hab.ninos > 0" class="ages-container">
        <div v-for="n in hab.ninos" :key="n" class="age-select-wrapper">
          <select 
            v-model="hab.edadesNinos[n-1]" 
            class="age-select"
            @change="updateAges(index)"
          >
            <option value="" disabled selected>Edad del niño {{ n }}</option>
            <option v-for="age in 18" :key="age-1" :value="age-1">{{ age - 1 }} años</option>
          </select>
        </div>
      </div>
    </div>

    <button class="btn-add-room" @click="addRoom">
      + Agregar otra habitación
    </button>

    <div class="dropdown-footer">
      <a href="#" class="help-link">¿Quieres reservar 9 o más habitaciones?</a>
      <button class="btn-done" @click="$emit('close')">Listo</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue', 'close']);

const addRoom = () => {
  const rooms = [...props.modelValue, { adultos: 2, ninos: 0, edadesNinos: [] }];
  emit('update:modelValue', rooms);
};

const removeRoom = (index) => {
  const rooms = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', rooms);
};

const updateGuest = (index, type, delta) => {
  const rooms = JSON.parse(JSON.stringify(props.modelValue)); // Clonación profunda
  rooms[index][type] += delta;

  // Si tocamos niños, ajustamos el array de edades
  if (type === 'ninos') {
    if (delta > 0) {
      rooms[index].edadesNinos.push(""); // Agrega espacio para edad vacía
    } else {
      rooms[index].edadesNinos.pop(); // Quita la última edad
    }
  }
  
  emit('update:modelValue', rooms);
};

const updateAges = (index) => {
  emit('update:modelValue', [...props.modelValue]);
};
</script>

<style scoped>
.guests-dropdown {
  position: absolute; background: white; border-radius: 12px; padding: 20px;
  width: 320px; z-index: 100; top: 100%; right: 0; margin-top: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}
.room-block { border-bottom: 1px solid #eee; margin-bottom: 15px; padding-bottom: 15px; }
.room-block:last-of-type { border-bottom: none; }
.room-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.guest-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.label-group span { display: block; font-weight: 500; }
.label-group small { color: #666; font-size: 0.8rem; }
.counter { display: flex; align-items: center; gap: 15px; }
.btn-round { 
  width: 35px; height: 35px; border-radius: 50%; border: 1px solid #265073;
  background: white; color: #265073; cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.btn-round:disabled { border-color: #ccc; color: #ccc; cursor: not-allowed; }

/* Estilos para el select de edad */
.ages-container { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.age-select {
  width: 100%; padding: 8px; border-radius: 6px; border: 1px solid #265073;
  background: white; color: #333; font-size: 0.9rem; outline: none;
}

.btn-add-room { background: none; border: none; color: #265073; font-weight: bold; cursor: pointer; margin-bottom: 20px; padding: 0; }
.dropdown-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #eee; padding-top: 15px; }
.btn-done { background: #265073; color: white; border: none; padding: 10px 25px; border-radius: 20px; font-weight: bold; cursor: pointer; }
.btn-remove { background: none; border: none; color: #ff4d4d; cursor: pointer; font-size: 0.8rem; }
.help-link { font-size: 0.8rem; color: #265073; text-decoration: none; width: 60%; }
</style>