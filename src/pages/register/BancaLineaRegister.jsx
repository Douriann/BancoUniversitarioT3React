import React from 'react';
import { useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { setJWT } from "../../utils/localStorage";
import './BancaLineaRegister.css';
import logo from '../../assets/img/logo.png';
import registerico from '../../assets/img/favicon.png';
import { Link , useNavigate} from 'react-router-dom';

function BancaLineaRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
      name: "",
      lastname:"",
      id: "",
      birthdate:"",
      phone:"",
      email: "",
      password: "",
      repite_password:""
  });

  const handleChange = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    });
};

const handleSubmit = async (event) => {
    // Evitar el comportamiento por defecto del formulario
    // para que no se recargue la página al enviar el formulario
    event.preventDefault();

    if (!form.name || !form.lastname || !form.id || !form.birthdate || !form.phone || !form.email || !form.password || !form.repite_password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    
    try {
        const response = await apiRequest("POST", "/v1/public/client/user/register", form);
        console.log("Respuesta del servidor:", response);

        if (response.data.jwt) {
            // guardando el JWT en el localStorage
            setJWT(response.data.jwt);
            alert("Registro exitoso");
            navigate("/bancalinea/dashboard");
        } else {
            alert(response.message || "Error al registrar");
        }
    } catch (error) {
        console.error("Error en el register:", error);
        const response = await apiRequest("POST", "/v1/public/client/user/register", form);
        alert(response.message || "Error al conectar con el servidor");
    }
};
  return (
    <div class="register-container">
        <header class="register-header">
            <img src={logo} alt="Banco Universitario" class="logo" />
            <Link to="/" class="institutional-btn">Web Institucional</Link>
        </header>

        <div class="register-box">
            <div class="register-title">      
                <img src={registerico} alt="Register Icono" class="register-icon" />
                <h2>REGISTER</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre *" value={form.name} onChange={handleChange} required />
                <input type="text" name="lastname" placeholder="Apellido *" value={form.lastname} onChange={handleChange} required />
                <input type="text" name="id" placeholder="Cedula *" value={form.id} onChange={handleChange} required />
                <input type="date" name="birthdate" placeholder="Fecha de Nacimiento *" value={form.birthdate} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Numero de Telefono*" value={form.phone} onChange={handleChange} required /> 
                <input type="email" name="email" placeholder="Correo *" value={form.email} onChange={handleChange} required />                                                                             
                <input type="password" name="password" placeholder="Contraseña *" value={form.password} onChange={handleChange} required />
                <input type="password" name="repite_password" placeholder="Repita la Contraseña *" value={form.repite_password} onChange={handleChange} required />                
                <button type="submit">Registrarse</button>
            </form>
            <p class="register-link">
            ¿Ya tienes cuenta? <a href="#">inicia sesión aquí</a>
            </p>
        </div>
    </div>
  );
}

export default BancaLineaRegister;