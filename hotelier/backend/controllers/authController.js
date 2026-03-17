import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import { getPool } from '../db.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// LOGIN GOOGLE
export const googleLogin = async (req, res) => {
  const { credential } = req.body; 
  
  if (!credential) return res.status(400).json({ message: "No se recibió credencial" });

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential, audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { sub: google_id, email, name, picture } = ticket.getPayload();
    const pool = getPool();

    // Limpieza de caracteres: asegura que el nombre use UTF-8 puro
    const safeName = Buffer.from(name, 'utf-8').toString();

    let result = await pool.query(
      `SELECT id_usuario, usuario, correo_electronico FROM "USUARIO" 
       WHERE google_id = $1 OR correo_electronico = $2`,
      [google_id, email]
    );

    let user;
    if (result.rowCount === 0) {
      const newUser = await pool.query(
        `INSERT INTO "USUARIO" (usuario, correo_electronico, google_id)
         VALUES ($1, $2, $3) RETURNING id_usuario, usuario, correo_electronico`,
        [safeName, email, google_id]
      );
      user = newUser.rows[0];
    } else {
      user = result.rows[0];
      await pool.query(`UPDATE "USUARIO" SET google_id = $1 WHERE id_usuario = $2`, [google_id, user.id_usuario]);
    }

    const token = jwt.sign(
      { id: user.id_usuario, email: user.correo_electronico },
      process.env.JWT_SECRET, { expiresIn: "24h" }
    );

    res.json({
      token,
      user: { username: user.usuario, email: user.correo_electronico, googleUser: true, picture }
    });
  } catch (error) {
    res.status(400).json({ message: "Error en autenticación de Google" });
  }
};

// LOGIN MANUAL
export const loginUser = async (req, res) => {
  const { usuarioOrEmail, password } = req.body;
  try {
    const pool = getPool();
    const result = await pool.query(
      `SELECT id_usuario, usuario, correo_electronico, contrasena FROM "USUARIO" WHERE correo_electronico = $1 OR usuario = $1`,
      [usuarioOrEmail]
    );
    if (result.rowCount === 0) return res.status(401).json({ message: "Credenciales inválidas" });
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) return res.status(401).json({ message: "Credenciales inválidas" });
    const token = jwt.sign({ id: user.id_usuario, email: user.correo_electronico }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, user: { username: user.usuario, email: user.correo_electronico } });
  } catch (error) {
    res.status(500).json({ message: "Error en servidor" });
  }
};

// REGISTER
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "Campos incompletos" });
  try {
    const pool = getPool();
    const hashed = await bcrypt.hash(password, 12);
    await pool.query(
      `INSERT INTO "USUARIO" (usuario, correo_electronico, contrasena) VALUES ($1, $2, $3)`,
      [username, email, hashed]
    );
    res.status(201).json({ message: "Registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar" });
  }
};