<template>
  <button class="buscar-base" data-name="Buscar">
    Buscar
  </button>
</template>

<script setup>
</script>

<style scoped>
.buscar-base {
  background-color: #265073; 
  border: 0.7px solid rgba(255, 255, 255, 0.05); 
  border-radius: 30px; 

  width: 100%; 
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  
  color: white; 
  font-size: 16px;
  font-weight: 600;

  cursor: pointer;
  padding: 10px 20px;
  box-sizing: border-box; 
  transition: background-color 0.2s;
}

.buscar-base:hover {
    background-color: #1a3c56; 
}
</style>