import React from 'react';
import './Services.css';
import servicesTransfer from './assets/img/services-transfer.png';
import servicesDeposit from './assets/img/services-deposit.png';
import servicesWithdraw from './assets/img/services-withdraw.png';
import servicesTuition from './assets/img/services-tuition.png';
import servicesScholarship from './assets/img/services-scholarship.png';

function Services() {
  return (
    <section className="services" id="services">
      <h2 className="services-tittle">Nuestros Servicios</h2>
      <div className="services-container">
        <div className="services-card">
          <div className="services-card__tittle-container">
            <img src={servicesTransfer} alt="Transferencias" className="services-card__img" />
            <h3 className="services-card__tittle">Transferencias Gratis</h3>
          </div>
          <p>¡Envía plata a tus panas sin costo alguno, rápido y fácil!</p>
        </div>
        <div className="services-card">
          <div className="services-card__tittle-container">
            <img src={servicesDeposit} alt="Depósitos" className="services-card__img" />
            <h3 className="services-card__tittle">Depósitos</h3>
          </div>
          <p>Guarda tu dinero sin complicaciones, siempre a tu alcance.</p>
        </div>
        <div className="services-card">
          <div className="services-card__tittle-container">
            <img src={servicesWithdraw} alt="Retiros" className="services-card__img" />
            <h3 className="services-card__tittle">Retiros</h3>
          </div>
          <p>Saca efectivo cuando lo necesites, sin estrés.</p>
        </div>
        <div className="services-card">
          <div className="services-card__tittle-container">
            <img src={servicesTuition} alt="Matrículas" className="services-card__img" />
            <h3 className="services-card__tittle">Pago de Matrículas</h3>
          </div>
          <p>Paga tu universidad en un clic, ¡sin filas ni demoras!</p>
        </div>
        <div className="services-card">
          <div className="services-card__tittle-container">
            <img src={servicesScholarship} alt="Becas" className="services-card__img" />
            <h3 className="services-card__tittle">Cobro de Becas</h3>
          </div>
          <p>Recibe tu beca directo en tu cuenta, listo para usar.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;