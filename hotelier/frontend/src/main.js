import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; 
import authService from './services/authService'; 
import './assets/css/styles.css'; 

const loginHandler = async (response) => {
    
    if (!router) {
        console.error("CRÍTICO: Router no inicializado para el Google Login.");
        return; 
    }
    
    try {
        // 🛑 CORRECCIÓN: Accede a la función a través del objeto importado
        await authService.googleLogin(response?.credential);
        
        // Redirige al Home
        router.push('/Home'); 
        
    } catch (err) {
        console.error("Error de autenticación GSI:", err);
    }
};

window.gsiLoginHandler = loginHandler;

const app = createApp(App);

// ⚠️ POSIBLE CORRECCIÓN ADICIONAL: Si el error de isAuthenticated 
// ocurre en el router, asegúrate de que el archivo del router 
// (e.g., /router/index.js) también importe y use 'authService.isAuthenticated'.
app.use(router);
app.mount('#app');