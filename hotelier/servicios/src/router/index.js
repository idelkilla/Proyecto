import { createRouter, createWebHistory } from "vue-router";

import head from "../views/head.vue";

const routes = [
  { path: "/head", component: head},
  { path: "/", redirect: "/head" } // 👈 redirige al nuevo path correcto
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
