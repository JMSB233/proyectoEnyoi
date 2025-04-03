import Hero from "../components/Hero"; // Sección de bienvenida
import Rooms from "../components/Rooms"; // Habitaciones
import "./Home.css"; // Estilos

const HomePage = ({ isAuthenticated }) => {
    return (
        <div className="home-container">
            <Hero /> {/* Sección de bienvenida */}
            
            <section className="featured-rooms">
                <h2>Nuestras Habitaciones</h2>
                <Rooms isAuthenticated={isAuthenticated} /> {/* Componente de habitaciones */}
            </section>
        </div>
    );
};

export default HomePage;
