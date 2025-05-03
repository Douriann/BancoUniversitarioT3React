import React from 'react';
import './About.css';

function About() {
  return (
    <section className="about" id="about">
      <h2 className="about-tittle">Sobre nosotros</h2>
      <div className="about-items__container">
        <div className="about-items">
          <div className="about-item__box about-item__box--mision">
            <h3 className="about-item__tittle">Misión</h3>
            <p className="about-text">Facilitar la gestión de recursos y promover el crecimiento económico.</p>
          </div>
        </div>
        <div className="about-items">
          <div className="about-item__box about-item__box--vision">
            <h3 className="about-item__tittle">Visión</h3>
            <p className="about-text">Liderar el sector financiero para universitarios.</p>
          </div>
        </div>
        <div className="about-items">
          <div className="about-item__box about-item__box--objetivos">
            <h3 className="about-item__tittle">Objetivos</h3>
            <p className="about-text">Fomentar la educación financiera y crear alianzas con universidades.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;