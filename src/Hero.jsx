import React from 'react';
import './Hero.css';
import logowhite from './assets/img/logowhite.png';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero__logo-container">
          <img src={logowhite} alt="Banco Universitario Logo" className="hero__logo" />
        </div>
        <div className="hero-text">
          <h1>Banco Universitario</h1>
          <p className="hero-text__description">
            Apoyando a los estudiantes de Venezuela desde hace 5 años con soluciones financieras innovadoras y accesibles.
          </p>
          <p className="hero-text__bottomdescription">
            Tu tranquilidad y futuro están en nuestras manos.
          </p>
        </div>
        <div className="hero-btn">
          <Link to="/bancalinea/register" className="btn">REGISTRATE</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;