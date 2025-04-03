import { Link } from "react-router-dom";
import "./Navbar.css";  // Estilos para el Navbar

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");  // Eliminar token al cerrar sesión
        setIsAuthenticated(false);
    };

    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/rooms">Habitaciones</Link></li>
                {isAuthenticated ? (
                    <>
                        <li><Link to="/reservas">Mis Reservas</Link></li>
                        <li><button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Iniciar Sesión</Link></li>
                        <li><Link to="/register">Registrarse</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
