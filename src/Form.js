import {useState} from "react";

function Form(){
    const [FormData,setFormData] = useState(  //Variable de estado, que rastrea que valores cambian
        {
            nombre : "",
            correo : "",
        }
    )

    const handleChange=(e)=>{
            setFormData({
                ...FormData,
                [e.target.name]:e.target.value,
            })
        console.log(e.target.name);
        console.log(e.target.value);
    }

    const handleSubmit= async(e) =>{
        e.preventDefault();
        const response= await fetch("http://localhost:3001/registerUser",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(FormData)
        })
        const data = await response.json();
        alert(`Nombre ${FormData.nombre}, correo ${FormData.correo} ${data.mensaje}`)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>nombre: </label>
                <input type="text" name="nombre" value={FormData.nombre} onChange={handleChange}/>
            </div>
            <div>
                <label>correo: </label>
                <input type="text" name="correo" value={FormData.correo} onChange={handleChange}/>
            </div>
            <button type="submit">Enviar</button>
        </form>
    );
}

export default Form;