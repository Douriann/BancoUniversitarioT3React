import React from 'react';
import './BancaLineaLogin.css';
import logo from '../../assets/img/logo.png';
import loginico from '../../assets/img/favicon.png';
import { Link } from 'react-router-dom';

function BancaLineaLogin() {
  return (
    <div class="login-container">
        <header class="login-header">
            <img src={logo} alt="Banco Universitario" class="logo" />
            <Link to="/" class="institutional-btn">Web Institucional</Link>
        </header>

        <div class="login-box">
            <div class="login-title">      
                <img src={loginico} alt="Login Icono" class="login-icon" />
                <h2>LOGIN</h2>
            </div>
            <form>
                <input type="text" placeholder="Usuario *" required />
                <input type="password" placeholder="Contraseña *" required />
                <button type="submit">Entrar</button>
            </form>
            <p class="register-link">
            Si eres nuevo cliente <a href="#">regístrate aquí</a>
            </p>
        </div>
    </div>
  );
}

export default BancaLineaLogin;