import express from "express";
import { obtenerHistorialReservas,filtrarReservasPorEstado ,filtrarReservasPorFecha,obtenerReservasPorUsuario, crearReserva, obtenerReservas, cancelarReserva } from "../controllers/reservasController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/crear", authMiddleware, crearReserva);
router.get("/listar", authMiddleware, obtenerReservas);
router.put("/cancelar/:id", authMiddleware, cancelarReserva); 
router.get("/usuario/:usuario_id", authMiddleware, obtenerReservasPorUsuario);
router.get("/filtrar-por-fechas", authMiddleware, filtrarReservasPorFecha);
router.get("/filtrar-por-estado", authMiddleware, filtrarReservasPorEstado);
router.get("/historial/:usuario_id", authMiddleware, obtenerHistorialReservas);


export default router;
