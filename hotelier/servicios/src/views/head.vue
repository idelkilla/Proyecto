<template>
  <body>
  <div class="page-container">
    <Header />
    <Cuerpo />    
  </div>
  </body>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import Cuerpo from "../components/layout/Cuerpo.vue";

</script>

<style scoped>
.page-container {
  margin-top: 30px;
}
</style>
