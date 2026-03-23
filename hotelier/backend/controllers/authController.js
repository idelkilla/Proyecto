import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { getPool } from '../db.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- VALIDACIÓN GLOBAL ---
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no definido");
}

// --- LOGIN GOOGLE ---
export const googleLogin = async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
        return res.status(400).json({ message: "No se recibió credencial" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { sub: google_id, email, name, picture } = ticket.getPayload();
        const pool = getPool();

        // 1. Buscar por GOOGLE_ID
        let result = await pool.query(
            `SELECT * FROM "USUARIO" WHERE "GOOGLE_ID" = $1`,
            [google_id]
        );

        let user;

        if (result.rowCount > 0) {
            user = result.rows[0];
        } else {
            // 2. Buscar por email
            const emailCheck = await pool.query(
                `SELECT * FROM "USUARIO" WHERE "CORREO_ELECTRONICO" = $1`,
                [email]
            );

            if (emailCheck.rowCount > 0) {
                const existingUser = emailCheck.rows[0];

                // ⚠️ Si ya existe con password → bloquear o decidir vinculación
                if (!existingUser.GOOGLE_ID) {
                    return res.status(400).json({
                        message: "Cuenta ya existe con email/password"
                    });
                }

                user = existingUser;
            } else {
                // 3. Crear nuevo usuario
                const newUser = await pool.query(
                    `INSERT INTO "USUARIO" ("USUARIO", "CORREO_ELECTRONICO", "GOOGLE_ID")
                     VALUES ($1, $2, $3)
                     RETURNING "ID_USUARIO", "USUARIO", "CORREO_ELECTRONICO"`,
                    [name, email, google_id]
                );

                user = newUser.rows[0];
            }
        }

        const token = jwt.sign(
            { id: user.ID_USUARIO, email: user.CORREO_ELECTRONICO },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            token,
            user: {
                username: user.USUARIO,
                email: user.CORREO_ELECTRONICO,
                googleUser: true,
                picture
            }
        });

    } catch (error) {
        console.error("GOOGLE_AUTH_ERROR:", error);
        res.status(400).json({ message: "Error en autenticación de Google" });
    }
};

// --- LOGIN MANUAL ---
export const loginUser = async (req, res) => {
    const { usuarioOrEmail, password } = req.body;

    if (!usuarioOrEmail || !password) {
        return res.status(400).json({ message: "Campos incompletos" });
    }

    try {
        const pool = getPool();

        const result = await pool.query(
            `SELECT * FROM "USUARIO"
             WHERE ("CORREO_ELECTRONICO" = $1 OR "USUARIO" = $1)
             AND "GOOGLE_ID" IS NULL`,
            [usuarioOrEmail]
        );

        if (result.rowCount === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const user = result.rows[0];

        // ⚠️ Protección extra
        if (!user.CONTRASENA) {
            return res.status(400).json({ message: "Usa login con Google" });
        }

        const validPassword = await bcrypt.compare(password, user.CONTRASENA);

        if (!validPassword) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: user.ID_USUARIO, email: user.CORREO_ELECTRONICO },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            token,
            user: {
                username: user.USUARIO,
                email: user.CORREO_ELECTRONICO
            }
        });

    } catch (error) {
        console.error('LOGIN_ERROR:', error);
        res.status(500).json({ message: "Error en servidor" });
    }
};

// --- REGISTER USER ---
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Campos incompletos" });
    }

    try {
        const pool = getPool();

        // Validación básica
        if (password.length < 6) {
            return res.status(400).json({ message: "Password muy corta" });
        }

        const existe = await pool.query(
            `SELECT * FROM "USUARIO"
             WHERE "CORREO_ELECTRONICO" = $1 OR "USUARIO" = $2`,
            [email, username]
        );

        if (existe.rowCount > 0) {
            return res.status(409).json({ code: 'EMAIL_OR_USER_TAKEN' });
        }

        const hashed = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO "USUARIO"
             ("USUARIO", "CORREO_ELECTRONICO", "CONTRASENA")
             VALUES ($1, $2, $3)
             RETURNING "ID_USUARIO", "USUARIO", "CORREO_ELECTRONICO"`,
            [username, email, hashed]
        );

        const user = result.rows[0];

        const token = jwt.sign(
            { id: user.ID_USUARIO, email: user.CORREO_ELECTRONICO },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            token,
            user: {
                username: user.USUARIO,
                email: user.CORREO_ELECTRONICO
            }
        });

    } catch (error) {
        console.error('REGISTER_ERROR:', error);
        res.status(500).json({ code: 'SERVER_ERROR' });
    }
};