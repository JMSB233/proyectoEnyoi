import pool from "../config/db.js";

export const crearReserva = async (req, res) => {
    try {
        const { usuario_id, nombre, fecha_inicio, fecha_fin, habitacion } = req.body;

        if (!usuario_id || !nombre || !fecha_inicio || !fecha_fin || !habitacion) {
            return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
        }

        const nuevaReserva = await pool.query(
            "INSERT INTO reservas (usuario_id, nombre, fecha_inicio, fecha_fin, habitacion, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [usuario_id, nombre, fecha_inicio, fecha_fin, habitacion, "activa"]
        );

        res.json({
            mensaje: "Reserva creada con éxito",
            reserva: nuevaReserva.rows[0]
        });

    } catch (error) {
        console.error("Error al crear reserva:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};



export const obtenerReservas = async (req, res) => {
    try {
        const reservas = await pool.query("SELECT * FROM reservas ORDER BY fecha_inicio DESC");
        console.log(reservas.rows);
        res.status(200).json(reservas.rows);
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const cancelarReserva = async (req, res) => {
    const { id } = req.params;

    try {
        // Verificar si la reserva existe
        const reservaExistente = await pool.query("SELECT * FROM reservas WHERE id = $1", [id]);

        if (reservaExistente.rows.length === 0) {
            return res.status(404).json({ mensaje: "Reserva no encontrada" });
        }

        // Verificar si ya está cancelada
        if (reservaExistente.rows[0].estado.toLowerCase() === "cancelada") {
            return res.status(400).json({ mensaje: "La reserva ya está cancelada" });
        }

        // Actualizar el estado de la reserva a "cancelada"
        const reservaActualizada = await pool.query(
            "UPDATE reservas SET estado = 'cancelada' WHERE id = $1 RETURNING *",
            [id]
        );

        res.json({
            mensaje: "Reserva cancelada con éxito",
            reserva: reservaActualizada.rows[0],
        });
    } catch (error) {
        console.error("Error al cancelar reserva:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const obtenerReservasPorUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;

        const reservas = await pool.query(
            "SELECT id, nombre, fecha_inicio, fecha_fin, habitacion, estado FROM reservas WHERE usuario_id = $1",
            [usuario_id]
        );

        console.log("Reservas enviadas al frontend:", reservas.rows); // 👀 Verifica en la terminal del backend
        res.json(reservas.rows); // 👈 Asegura que sea un array
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


export const filtrarReservasPorFecha = async (req, res) => {
    const { fecha_inicio, fecha_fin } = req.query;

    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({ mensaje: "Las fechas de inicio y fin son requeridas" });
    }

    try {
        const reservas = await pool.query(
            "SELECT * FROM reservas WHERE fecha_inicio >= $1 AND fecha_fin <= $2",
            [fecha_inicio, fecha_fin]
        );

        res.json(reservas.rows);
    } catch (error) {
        console.error("Error al filtrar reservas por fecha:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const filtrarReservasPorEstado = async (req, res) => {
    const { estado } = req.query;

    if (!estado) {
        return res.status(400).json({ mensaje: "El estado de la reserva es requerido" });
    }

    try {
        const reservas = await pool.query(
            "SELECT * FROM reservas WHERE estado = $1",
            [estado]
        );

        res.json(reservas.rows);
    } catch (error) {
        console.error("Error al filtrar reservas por estado:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const obtenerHistorialReservas = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const historial = await pool.query(
            "SELECT * FROM reservas WHERE usuario_id = $1 ORDER BY fecha_inicio DESC",
            [usuario_id]
        );

        res.json(historial.rows);
    } catch (error) {
        console.error("Error al obtener historial de reservas:", error);
        res.status(500).json({ mensaje: "Error en el servidor" });
    }
};


