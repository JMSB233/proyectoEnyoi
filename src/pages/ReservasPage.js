import { useState, useEffect } from "react";
import "./ReservasPage.css"; // Importar los estilos

const ReservaPage = () => {
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [habitacion, setHabitacion] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [reservas, setReservas] = useState([]);

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const fetchReservas = async () => {
        if (!usuario) {
            console.error("No hay usuario en localStorage");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3001/api/reservas/usuario/${usuario.id}`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            console.log("Datos recibidos:", data);
            setReservas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar reservas:", error);
            setReservas([]);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    const handleReserva = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!nombre || !fechaInicio || !fechaFin || !habitacion || !usuario) {
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/api/reservas/crear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    usuario_id: usuario.id,
                    nombre,
                    fecha_inicio: fechaInicio,
                    fecha_fin: fechaFin,
                    habitacion,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.mensaje || "Error al reservar");

            setMensaje("Reserva realizada con éxito.");
            fetchReservas();
        } catch (error) {
            setMensaje(error.message);
        }
    };

    const handleCancelReserva = async (reservaId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:3001/api/reservas/cancelar/${reservaId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.mensaje || "Error al cancelar la reserva");

            setMensaje("Reserva cancelada con éxito.");
            fetchReservas(); // Recargar las reservas después de cancelar
        } catch (error) {
            setMensaje(error.message);
        }
    };

    return (
        <div className="reserva-container">
            <h1 className="titulo-reserva">Reservar Habitación</h1>
            <form className="form-reserva" onSubmit={handleReserva}>
                <label className="label-reserva">Nombre:</label>
                <input className="input-reserva" type="text" value={nombre} placeholder="Escribe tu nombre" onChange={(e) => setNombre(e.target.value)} required />

                <label className="label-reserva">Fecha de entrada:</label>
                <input className="input-reserva" type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />

                <label className="label-reserva">Fecha de salida:</label>
                <input className="input-reserva" type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} required />

                <label className="label-reserva">Habitación:</label>
                <input className="input-reserva" type="text" value={habitacion} placeholder="Número de habitación" onChange={(e) => setHabitacion(e.target.value)} required />

                <button className="btn-reservar" type="submit">Reservar</button>
            </form>

            {mensaje && <p className="mensaje-reserva">{mensaje}</p>}

            <h2 className="titulo-historial">Historial de Reservas</h2>
            {reservas.length === 0 ? (
                <p className="mensaje-historial">No tienes reservas registradas.</p>
            ) : (
                <ul className="lista-reservas">
                    {reservas.map((reserva) => (
                        <li className="item-reserva" key={reserva.id}>
                            <strong>{reserva.nombre}</strong> - {reserva.habitacion} - {new Date(reserva.fecha_inicio).toLocaleDateString()} a {new Date(reserva.fecha_fin).toLocaleDateString()} - <span className={`estado-circulo ${reserva.estado.toLowerCase() === "activa" ? "activo" : "cancelado"}`}></span> 
                            <strong>{reserva.estado}</strong>
                            
                            {/* Mostrar botón cancelar solo si la reserva está activa */}
                            {reserva.estado.toLowerCase() === "activa" && (
                                <button className="cancel-btn" onClick={() => handleCancelReserva(reserva.id)}>
                                    Cancelar Reserva
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReservaPage;
