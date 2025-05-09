import React from 'react';
import './BancaLineaHeader.css';
import logo from '../../assets/img/logo.png';
import logoutimg from '../../assets/img/logout.png';

function BancaLineaHeader() {
  return (
    <header class="header-dashboard">
        <div class="header-left-elements">
            <div class="header-img-container">
                <img src={logo} alt="Banco Universitario Logo" class="header-logo"/>
            </div>
            <h2>Bienvenido(a) </h2>
        </div>
        <div class="header-btn-container">
            <a href="#home" class="btn-header">
                Salir
                <img src={logoutimg} alt="Usuario" class="header-btn-img-logout"/>
            </a>         
        </div>
    </header>
  );
}

export default BancaLineaHeader;