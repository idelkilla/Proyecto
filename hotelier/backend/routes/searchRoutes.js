import express from 'express';
import { getUbicaciones, postBuscarHospedaje } from '../controllers/searchController.js';

const router = express.Router();

router.get('/ubicaciones', getUbicaciones);
router.post('/buscar', postBuscarHospedaje);


export default router;