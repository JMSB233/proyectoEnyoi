import { useState } from 'react';

function VerUsuarios() {
    const [usuarios,setUsuarios] = useState([])

    const handleSubmit= async(e) =>{
        e.preventDefault();
        try{
            const response= await fetch("http://localhost:3001/verUsuarios",{
                method:"GET",
                headers:{"Content-Type":"application/json"}
            });
            if (!response.ok) {
                throw new Error("Error al obtener los usuarios");
            }
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }
    
    return (
        <div>
            <h2>Lista de Usuarios</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Ver Usuarios</button>
            </form>
            <ul>
                {usuarios.length > 0 ? (
                    usuarios.map((usuario, index) => (
                        <li key={index}>
                            <strong>Nombre:</strong> {usuario.nombre} - <strong>Correo:</strong> {usuario.correo}
                        </li>
                    ))
                ) : (
                    <p>No hay usuarios disponibles</p>
                )}
            </ul>
        </div>
    );

}

export default VerUsuarios;