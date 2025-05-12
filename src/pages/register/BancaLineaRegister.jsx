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
      first_name: "",
      last_name:"",
      document_number: "",
      birth_date:"",
      phone_number:"",
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

    /*if (!form.name || !form.lastname || !form.id || !form.birthdate || !form.phone || !form.email || !form.password || !form.repite_password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    if (form.password !== form.repite_password) {
    alert("Las contraseñas no coinciden.");
    return;
    }
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
        alert("Correo electrónico no válido.");
        return;
    }

    // Validar número de teléfono (solo dígitos, al menos 10)
    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(form.phone)) {
        alert("Número de teléfono no válido. Debe tener entre 10 y 15 dígitos.");
        return;
    }

    // Validar cédula (solo dígitos, mínimo 6)
    const idRegex = /^\d{6,12}$/;
    if (!idRegex.test(form.id)) {
        alert("Cédula no válida. Debe tener entre 6 y 12 dígitos.");
        return;
    }
    
    // Validar contraseña segura
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(form.password)) {
        alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
        return;
    }*/


    try {
        const response = await apiRequest("POST", "/v1/public/client/user/register", form);
        console.log("Respuesta del servidor:", response);

        try {
            alert("Registro exitoso");
            //navigate("/bancalinea/login");
        } catch {
            alert(response.message || "Error al registrar");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Error al conectar con el servidor");
    }
};
  return (
    <div className="register-container">
        <header className="register-header">
            <img src={logo} alt="Banco Universitario" className="logo" />
            <Link to="/" className="institutional-btn">Web Institucional</Link>
        </header>

        <div className="register-box">
            <div className="register-title">      
                <img src={registerico} alt="Register Icono" className="register-icon" />
                <h2>REGISTER</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="Nombre *" value={form.name} onChange={handleChange} required class="form-txtbox"/>
                <input type="text" name="last_name" placeholder="Apellido *" value={form.lastname} onChange={handleChange} required class="form-txtbox"/>
                <input type="text" name="document_number" placeholder="Cedula *" value={form.id} onChange={handleChange} required class="form-txtbox"/>
                <input type="date" name="birth_date" placeholder="Fecha de Nacimiento *" value={form.birthdate} onChange={handleChange} required class="form-txtbox"/>
                <input type="text" name="phone_number" placeholder="Numero de Telefono*" value={form.phone} onChange={handleChange} required class="form-txtbox"/> 
                <input type="email" name="email" placeholder="Correo *" value={form.email} onChange={handleChange} required class="form-txtbox"/>                                                                             
                <input type="password" name="password" placeholder="Contraseña *" value={form.password} onChange={handleChange} required class="form-txtbox"/>
                <input type="password" name="repite_password" placeholder="Repita la Contraseña *" value={form.repite_password} onChange={handleChange} required class="form-txtbox"/>                
                <button type="submit">Registrarse</button>
            </form>
            <p className="register-link">
            ¿Ya tienes cuenta? <Link to="/login">inicia sesión aquí</Link>
            </p>
        </div>
    </div>
  );
}

export default BancaLineaRegister;