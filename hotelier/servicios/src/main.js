import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";   // 👈 importamos el router
import "./style.css";            // 👈 tus estilos globales

// Montamos la app y le decimos que use el router
createApp(App)
  .use(router)
  .mount("#app");
