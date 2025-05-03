import React from 'react';
import './Header.css';
import logo from './assets/img/logo.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header__items">
        <div className="header__logo-container">
          <img src={logo} alt="Banco Universitario Logo" className="header__logo" />
        </div>
        <input type="checkbox" className="header__checkbox" id="open-menu" />
        <label htmlFor="open-menu" className="header__open-nav-button" role="button">=</label>
        <nav className="header__nav">
        <Link to="/">Inicio</Link>
        <a href="#about">Nosotros</a>
        <a href="#services">Servicios</a>
        <a href="#contact">Contacto</a>
        <Link to="/bancalinea/login" className="btn">Banca en Línea</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;