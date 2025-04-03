import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

// ✅ Agregar la función aquí, después de las importaciones
const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Registro de usuario
export const register = async (req, res) => {
    const { nombre, correo, contraseña } = req.body;
    console.log(req.body)
    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ mensaje: "Todos los campos son requeridos" });
    }

    try {
        const userExist = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        await pool.query("INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3)", 
            [nombre, correo, hashedPassword]);

        res.json({ mensaje: "Usuario registrado correctamente" });
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

// Login de usuario
export const login = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        const result = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);

        if (result.rows.length === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        const usuario = result.rows[0];

        console.log("Usuario encontrado en BD:", usuario);

        if (!await bcrypt.compare(contraseña, usuario.contraseña)) { 
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = generarToken(usuario.id);

        console.log("Token generado:", token);

        res.json({
            mensaje: "Inicio de sesión exitoso",
            token,
            usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};
