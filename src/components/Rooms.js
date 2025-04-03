import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Rooms.css"; // Archivo de estilos

const Rooms = ({ isAuthenticated }) => {
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState({});
    const [showDescription, setShowDescription] = useState({});
    const navigate = useNavigate(); // Hook para la navegación

    useEffect(() => {
        setRooms([
            { id: 1, name: "Suite Deluxe. Habitación 101", image: "/images/suite.jpg", price: "$150 por noche", description: "Una suite espaciosa con vistas panorámicas y jacuzzi." },
            { id: 2, name: "Habitación Doble. Habitación 102", image: "/images/doble.jpg", price: "$100 por noche", description: "Cómoda habitación con dos camas individuales y balcón." },
            { id: 3, name: "Habitación Individual. Habitación 103", image: "/images/individual.jpg", price: "$70 por noche", description: "Perfecta para viajeros solitarios, con todas las comodidades." },
        ]);
    }, []);

    const handleReserve = (room) => {
        if (!isAuthenticated) {
            setMessage({ text: "⚠️ Debes iniciar sesión para reservar una habitación.", type: "error" });
            return;
        }

        // Redirige a la página de reservas con la información de la habitación
        navigate("/reservas", { state: { habitacion: room } });
    };

    const toggleDescription = (roomId) => {
        setShowDescription((prevState) => ({
            ...prevState,
            [roomId]: !prevState[roomId],
        }));
    };

    return (
        <div className="rooms-container">
            {message.text && <p className={message.type === "success" ? "success-message" : "error-message"}>{message.text}</p>}
            <div className="rooms-grid">
                {rooms.map((room) => (
                    <div key={room.id} className="room-card">
                        <img src={room.image} alt={room.name} className="room-image" />
                        <h3>{room.name}</h3>
                        <p>{room.price}</p>
                        
                        {/* Botón para ver descripción */}
                        <button className="action-btn" onClick={() => toggleDescription(room.id)}>
                            {showDescription[room.id] ? "Ocultar Descripción" : "Ver Descripción"}
                        </button>
                        
                        {/* Descripción de la habitación */}
                        {showDescription[room.id] && <p className="room-description">{room.description}</p>}
                        
                        {isAuthenticated ? (
                            <button className="reserve-btn" onClick={() => handleReserve(room)}>Reservar</button>
                        ) : (
                            <Link to="/login" className="action-btn">Iniciar Sesión para Reservar</Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rooms;
