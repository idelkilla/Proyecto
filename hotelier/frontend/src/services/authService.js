// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

const authService = {

  // REGISTER: Debe retornar una promesa que resuelve en { data: { token: '...' } }
  register: (username, email, password) => {
    return axios.post(`${API_URL}/register`, { username, email, password });
  },

  // LOGIN (username or email)
  login: (usuarioOrEmail, password) => {
    return axios.post(`${API_URL}/login`, { usuarioOrEmail, password });
  },

  // GOOGLE LOGIN (token del botón Google Identity)
  googleLogin: (credentialToken) => {
    return axios.post(`${API_URL}/google-login`, { credential: credentialToken });
  },

  // SAVE TOKEN
  saveToken: (token) => {
    if (typeof token === 'string') {
      localStorage.setItem('user_token', token);
    }
  },

  // SAVE USER DATA
  setUserData: ({ username, email, googleUser, picture }) => {
    localStorage.setItem('user_name', username || '');
    localStorage.setItem('user_email', email || '');
    localStorage.setItem('google_user', googleUser ? 'true' : 'false');

    let validPic = '';
    if (picture && typeof picture === 'string') {
      validPic = picture.startsWith('http') ? picture : 'https:' + picture;
    }

    localStorage.setItem('user_photo', validPic);
  },

  // CHECK AUTH
  isAuthenticated: () => {
    return Boolean(localStorage.getItem('user_token'));
  }
};

export default authService;