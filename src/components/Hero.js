import { useState, useEffect } from "react";
import Rooms from "../components/Rooms"; // Importamos el componente de habitaciones
import "./Home.css"; // Asegúrate de tener estilos

const HomePage = ({ isAuthenticated }) => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        if (user) {
            setUsuario(user);
        }
    }, []);

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Bienvenido a Tu Hotel{usuario ? `, ${usuario.nombre}` : ""}</h1>
                <p>Reserva habitaciones de forma rápida y segura.</p>
            </header>

            {/* Sección de descripción del hotel */}
            <section className="hotel-description">
                <h2>Sobre Nosotros</h2>
                <p>
                    En <strong>Tu Hotel</strong>, ofrecemos una experiencia de alojamiento única, 
                    combinando confort, elegancia y un servicio excepcional. 
                    Disfruta de nuestras habitaciones modernas y acogedoras, diseñadas para tu descanso.
                </p>
                <p>
                    Ubicados en el corazón de la ciudad, ofrecemos fácil acceso a los principales 
                    puntos turísticos y de negocios. ¡Haz de tu estancia una experiencia inolvidable!
                </p>
            </section>
        </div>
    );
};

export default HomePage;
