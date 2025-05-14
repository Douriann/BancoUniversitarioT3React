import React from 'react';
import { useState } from "react";
import { apiRequest } from "../../api/apirequest";
//import { setJWT } from "../../utils/localStorage";
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
    confirm_password:""
});

const handleChange = (event) => {
    setForm({
        ...form,
        [event.target.name]: event.target.value
    });
    const valor = event.target.value;
    console.log(valor);
};

const handleSubmit = async (event) => {
    // Evitar el comportamiento por defecto del formulario
    // para que no se recargue la página al enviar el formulario
    event.preventDefault();

// Bloque de validaciones
if (
    !form.first_name ||
    !form.last_name ||
    !form.document_number ||
    !form.birth_date ||
    !form.phone_number ||
    !form.email ||
    !form.password ||
    !form.confirm_password
) {
    alert("Por favor, completa todos los campos.");
    return;
}

if (form.password !== form.confirm_password) {
    alert("Las contraseñas no coinciden.");
    return;
}

// Validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(form.email)) {
    alert("Correo electrónico no válido.");
    return;
}

// Validar número de teléfono
const phoneRegex = /^\d{10,15}$/;
if (!phoneRegex.test(form.phone_number)) {
    alert("Número de teléfono no válido. Debe tener entre 10 y 15 dígitos.");
    return;
}

// Validar cédula
const idRegex = /^\d{6,12}$/;
if (!idRegex.test(form.document_number)) {
    alert("Cédula no válida. Debe tener entre 6 y 12 dígitos.");
    return;
}

// Validar contraseña segura
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
if (!passwordRegex.test(form.password)) {
    alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
    return;
}
//Fin del Bloque de validaciones


    try {
        const formattedDate = new Date(form.birth_date).toISOString()
        const formData = {
            ...form,
            birth_date: formattedDate,
        };
        const response = await apiRequest("POST", "/v1/public/client/user/register", formData);
        console.log("Respuesta del servidor:", response);
        console.log("Status:", response.errors.length);

        if (response.errors.length == 0) {
            alert(response.message || "Registro exitoso");
            navigate("/BancaLinea/login");
        }
        else {
            alert(response.message || "Error en el registro");
            return;
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
                <input type="text" name="first_name" placeholder="Nombre *" value={form.first_name} onChange={handleChange} required className="form-txtbox"/>
                <input type="text" name="last_name" placeholder="Apellido *" value={form.last_name} onChange={handleChange} required className="form-txtbox"/>
                <input type="text" name="document_number" placeholder="Cedula *" value={form.document_number} onChange={handleChange} required className="form-txtbox"/>
                <input type="date" name="birth_date" placeholder="Fecha de Nacimiento *" value={form.birth_date} onChange={handleChange} required className="form-txtbox"/>
                <input type="text" name="phone_number" placeholder="Numero de Telefono*" value={form.phone_number} onChange={handleChange} required className="form-txtbox"/> 
                <input type="email" name="email" placeholder="Correo *" value={form.email} onChange={handleChange} required className="form-txtbox"/>                                                                             
                <input type="password" name="password" placeholder="Contraseña *" value={form.password} onChange={handleChange} required className="form-txtbox"/>
                <input type="password" name="confirm_password" placeholder="Confirme la Contraseña *" value={form.confirm_password} onChange={handleChange} required className="form-txtbox"/>                
                <button type="submit">Registrarse</button>
            </form>
            <p className="register-link">
            ¿Ya tienes cuenta? <Link to="/BancaLinea/login">inicia sesión aquí</Link>
            </p>
        </div>
    </div>
);
}

export default BancaLineaRegister;