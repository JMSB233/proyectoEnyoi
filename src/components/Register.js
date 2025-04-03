import { useState } from "react";
import "./Register.css"; // Asegúrate de importar el archivo CSS

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            const response = await fetch("http://localhost:3001/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nombre, correo: email, contraseña: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.mensaje || "Error en el registro");
            }

            setMensaje("Registro exitoso, ahora puedes iniciar sesión.");
            setNombre("");
            setEmail("");
            setPassword("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Registrarse</h2>
                {error && <p className="error-message">{error}</p>}
                {mensaje && <p className="success-message">{mensaje}</p>}
                
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
