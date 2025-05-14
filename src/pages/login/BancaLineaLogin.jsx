import React from 'react';
import { useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { setJWT } from "../../utils/localStorage";
import './BancaLineaLogin.css';
import logo from '../../assets/img/logo.png';
import loginico from '../../assets/img/favicon.png';
import { Link , useNavigate} from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function BancaLineaLogin() {
    const navigate = useNavigate();

//OJO    
const [showPassword, setShowPassword] = useState(false);
    
const [form, setForm] = useState({
    email: "",
    password: ""
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

    if (!form.email || !form.password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    try {
        const response = await apiRequest("POST", "/v1/public/client/user/login", form);
        console.log("Respuesta del servidor:", response);

        try {
            // guardando el JWT en el localStorage
            setJWT(response.data.jwt);
            alert("Inicio de sesión exitoso");
            navigate("/bancalinea/dashboard");
        } catch {
            alert(response.message || "Error al iniciar sesión");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Error al conectar con el servidor");
    }
};
return (
    <div className="login-container">
        <header className="login-header">
            <img src={logo} alt="Banco Universitario" className="logo" />
            <Link to="/" className="institutional-btn">Web Institucional</Link>
        </header>

        <div class="login-box">
            <div className="login-title">      
                <img src={loginico} alt="Login Icono" class="login-icon" />
                <h2>INICIAR SESIÓN</h2>
            </div>
            <form onSubmit={handleSubmit}>
    <label htmlFor="email" style={{ marginBottom: "4px", color: "#fff", fontWeight: "500", display: "block" }}>Correo</label>
    <input
        type="text"
        id="email"
        name="email"
        placeholder="EJ: micorreo@gmail.com"
        value={form.email}
        onChange={handleChange}
        required
    />
    <label htmlFor="password" style={{ margin: "12px 0 4px 0", color: "#fff", fontWeight: "500", display: "block" }}>Contraseña</label>
<div style={{ position: "relative", width: "100%" }}>
    <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        placeholder="Ingresa aquí tu contraseña"
        value={form.password}
        onChange={handleChange}
        required
        style={{ paddingRight: "35px", width: "100%" }}
    />
    <span
        onClick={() => setShowPassword(!showPassword)}
        style={{
            position: "absolute",
            right: "10px",
            top: "40%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#333"
        }}
        tabIndex={0}
        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
</div>
    <button type="submit">Entrar</button>
</form>
            <p className="register-link">
            Si eres nuevo cliente <Link to="/BancaLinea/Register">regístrate aquí</Link>
            </p>
        </div>
    </div>
);
}

export default BancaLineaLogin;