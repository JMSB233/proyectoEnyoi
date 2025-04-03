import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Ruta protegida: solo usuarios autenticados pueden ver sus datos
router.get("/perfil", authMiddleware, (req, res) => {
    res.json({ mensaje: "Perfil de usuario", usuario: req.user });
});

export default router;
