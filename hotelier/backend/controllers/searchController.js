import { getPool } from '../db.js';

export const getUbicaciones = async (req, res) => {
    const { q } = req.query;
    try {
        const pool = getPool();
        const query = `
            SELECT u."ID_UBICACION" AS id, u."NOMBRE" AS ubicacion, u."ID_TIPO" AS id_tipo, 
                   c."NOMBRE" AS ciudad, p."NOMBRE" AS pais
            FROM "UBICACION" u
            JOIN "CIUDAD" c ON u."ID_CIUDAD" = c."ID_CIUDAD"
            JOIN "PAIS" p ON c."ID_PAIS" = p."ID_PAIS"
            WHERE ($1 = '' OR u."NOMBRE" ILIKE $1 OR c."NOMBRE" ILIKE $1 OR p."NOMBRE" ILIKE $1)
            ORDER BY u."NOMBRE" LIMIT 5`;

        const result = await pool.query(query, [q ? `%${q}%` : '']);
        res.json(result.rows);
    } catch (error) {
        console.error("Error en getUbicaciones:", error);
        res.status(500).json([]);
    }
};

export const postBuscarHospedaje = async (req, res) => {
    const { destino, habitaciones, fecha_inicio, fecha_fin } = req.body;

    try {
        const pool = getPool();

        // 1. VALIDACIÓN DE ENTRADA
        if (!fecha_inicio || !fecha_fin || !habitaciones || !Array.isArray(habitaciones)) {
            return res.status(400).json({ error: "Datos de búsqueda incompletos o malformados" });
        }

        // 2. CÁLCULO SEGURO DE NOCHES (Evita el error NaN)
        const dateInicio = new Date(fecha_inicio);
        const dateFin = new Date(fecha_fin);
        
        // Calculamos la diferencia en milisegundos y convertimos a días
        const diffInMs = dateFin.getTime() - dateInicio.getTime();
        const totalNoches = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

        // Verificación de seguridad antes de ejecutar SQL
        if (isNaN(totalNoches) || totalNoches <= 0) {
            console.error(`Cálculo fallido: Inicio(${fecha_inicio}), Fin(${fecha_fin}), Noches(${totalNoches})`);
            return res.status(400).json({ error: "El rango de fechas no es válido" });
        }

        // 3. REQUERIMIENTOS DE CAPACIDAD Y CANTIDAD
        const numHabitacionesSolicitadas = habitaciones.length;
        const maxAdultos = Math.max(...habitaciones.map(h => parseInt(h.adultos) || 0));
        const maxNinos = Math.max(...habitaciones.map(h => parseInt(h.ninos) || 0));

        // 4. QUERY CON PARÁMETROS LIMPIOS
        const query = `
            SELECT 
                s."ID_SERVICIO", 
                s."NOMBRE" AS hotel, 
                u."NOMBRE" AS ubicacion, 
                MIN(COALESCE(disp."PRECIO_AJUSTADO", hab."PRECIO_NOCHE")) AS precio_min
            FROM "SERVICIO" s
            JOIN "HOSPEDAJE" hos ON s."ID_SERVICIO" = hos."ID_SERVICIO"
            JOIN "UBICACION" u ON hos."ID_UBICACION" = u."ID_UBICACION"
            JOIN "HABITACION" hab ON hos."ID_SERVICIO" = hab."ID_SERVICIO"
            LEFT JOIN "DISPONIBILIDAD" disp ON hab."ID_HABITACION" = disp."ID_HABITACION"
            WHERE (u."NOMBRE" ILIKE $1 OR $1 = '') 
              AND hab."CAPACIDAD_ADULTO" >= $2 
              AND hab."CAPACIDAD_NINOS" >= $3
              AND hab."ID_HABITACION" IN (
                  SELECT d."ID_HABITACION"
                  FROM "DISPONIBILIDAD" d
                  WHERE d."FECHA" >= $4 AND d."FECHA" < $5
                    AND d."CANTIDAD_DISPONIBLE" >= $7
                    AND d."ESTADO" = '1'
                  GROUP BY d."ID_HABITACION"
                  HAVING COUNT(DISTINCT d."FECHA") = $6
              )
            GROUP BY s."ID_SERVICIO", s."NOMBRE", u."NOMBRE"
            ORDER BY precio_min ASC`;

        const params = [
            destino ? `%${destino}%` : '', // $1
            maxAdultos,                    // $2
            maxNinos,                      // $3
            fecha_inicio,                  // $4
            fecha_fin,                     // $5
            totalNoches,                   // $6 (Ahora garantizado como número)
            numHabitacionesSolicitadas     // $7
        ];

        const result = await pool.query(query, params);
        res.json(result.rows);

    } catch (error) {
        console.error("SEARCH_ERROR:", error.message);
        res.status(500).json({ error: "Error interno en el motor de búsqueda" });
    }
};