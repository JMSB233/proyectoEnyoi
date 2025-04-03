import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate
import "./Login.css"; // Asegúrate de tener un archivo de estilos

const Login = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Hook para redireccionar

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        try {
            const response = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo: email, contraseña: password }),
            });
    
            const data = await response.json();
            console.log("Respuesta del backend:", data); // 🔍 Verifica la respuesta
    
            if (!response.ok) {
                throw new Error(data.mensaje || "Error en el inicio de sesión");
            }
    
            // Guardar el token y usuario en localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
    
            // Actualizar estado global de autenticación
            setIsAuthenticated(true);
    
            console.log("Inicio de sesión exitoso. Redirigiendo...");
    
            // Redirigir al usuario a la página de reservas
            navigate("/reservas");
        } catch (err) {
            setError(err.message);
        }
    };
    
    
    

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
