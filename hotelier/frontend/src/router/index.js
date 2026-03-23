import { createRouter, createWebHistory } from 'vue-router';
import Login                  from '../view/login.vue';
import Register               from '../view/register.vue';
import Home                   from '../view/Home.vue';
import authService            from '../services/authService';
import servicesMenu           from '../components/servicesMenu.vue';
import head                   from '../view/head.vue';
import servicioCliente        from '../view/servicioCliente.vue';

const ADMIN_EMAIL = 'admin@gmail.com'

const routes = [
  { path: '/login',            name: 'Login',           component: Login },
  { path: '/register',         name: 'Register',        component: Register },
  { path: '/home',             name: 'Home',            component: Home },
  { path: '/services',         name: 'servicesMenu',    component: servicesMenu },
  { path: '/',                 redirect: '/home' },
  { path: '/head',             name: 'Head',            component: head },
  { path: '/servicio-cliente', name: 'ServicioCliente', component: servicioCliente },
  { path: '/hospedaje/:id',
    component: () => import('../view/head.vue'), name: 'DetalleHospedaje', props: true},
  // Admin — protegida por JWT
  // { path: '/admin', name: 'Admin', component: AdminRegistrarPropiedad, meta: { soloAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'instant' };
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authService.isAuthenticated();
  const emailGuardado   = localStorage.getItem('user_email');

  if (to.meta.soloAdmin) {
    if (!isAuthenticated || emailGuardado !== ADMIN_EMAIL) {
      return next({ name: 'Home' });
    }
  }

  if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;