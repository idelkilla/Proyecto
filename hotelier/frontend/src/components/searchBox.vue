<template>
  <div class="search-wrapper">
    <div class="search-input-box" :class="{ focused: isFocused }">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#265073" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
    </svg>
      <input
        type="text"
        v-model="inputValue"
        :placeholder="placeholder"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @keyup.enter="handleSend"
      />
    </div>

    <button class="search-btn" @click="handleSend">
      Buscar
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '¿En qué podemos ayudarte?' },
  },
  emits: ['update:modelValue', 'search'],
  data() {
    return { isFocused: false }
  },
  computed: {
    inputValue: {
      get() { return this.modelValue },
      set(val) { this.$emit('update:modelValue', val) },
    },
  },
  methods: {
    handleSend() { this.$emit('search') },
  },
}
</script>
<style scoped src="../assets/css/searchBox.css"></style>