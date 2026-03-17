import { createRouter, createWebHistory } from 'vue-router';
import Login from '../view/login.vue';
import Register from '../view/register.vue';
import Home from '../view/Home.vue';
import authService from '../services/authService';
import servicesMenu from '../components/servicesMenu.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/home', name: 'Home', component: Home },
   { path: '/services', name: 'servicesMenu', component: servicesMenu },
  { path: '/', redirect: '/home' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();

  // Evita que usuario logueado entre a login/register
  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    return next({ name: 'Home' });
  }

  // Bloquea home si no autenticado, pero no fuerza redirect en logout
  if (to.name === 'Home' && !isAuthenticated) {
    return next(); // deja la página como está, reload se encarga
  }

  next();
});

export default router;
