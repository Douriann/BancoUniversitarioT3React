import React from 'react';
import './BancaLineaDashboard.css';
import { Link } from 'react-router-dom';
import userimg from '../../assets/img/user.png';
import homeimg from '../../assets/img/home.png';
import transferimg from '../../assets/img/transfer.png';
import contactimg from '../../assets/img/contact.png';
import configimg from '../../assets/img/config.png';
import moveimg from '../../assets/img/movement.png';

function BancaLineaDashboard() {
  return (
    <div class="container-mainclass">
        <aside class="sidebar">
            <div class="sidebar-user-container">
                <div class="sidebar-user-img-container">
                    <img src={userimg} alt="Usuario" class="sidebar-user-img"/>
                </div>
                <h3>Menú de usuario</h3>
            </div>
            <nav class="sidebar-nav">
                <div class="sidebar-nav-btn"><a href="transferencias.html" class="btn-sidebar"><img src={homeimg}/> Posición Global</a></div>
                <div class="sidebar-nav-btn"><a href="consultar-saldo.html" class="btn-sidebar"><img src={moveimg}/>Movimientos</a></div>
                <div class="sidebar-nav-btn"><a href="movimientos.html" class="btn-sidebar"><img src={transferimg}/>Transferir</a></div>
                <div class="sidebar-nav-btn"><a href="configuracion.html" class="btn-sidebar"><img src={contactimg}/>Contactos</a></div>
                <div class="sidebar-nav-btn"><a href="configuracion.html" class="btn-sidebar"><img src={configimg}/>Gestión</a></div>
            </nav>
        </aside>
        <main class="main-content">
            <h2>Posición Global</h2>
            <p>Consulta tu saldo, realiza transferencias y gestiona tus contactos de manera fácil y rápida.</p>
            <div class="global-position-container">
                <div class="global-position-box">
                    <div class="global-position-accoutnumb">
                        <h2 class="h2-main">Número de cuenta</h2>
                        <p>123</p>
                    </div>
                    <div class="global-position-balancecontainer">
                        <h2 class="h2-main">Saldo Total</h2>
                        <p> Bs.</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default BancaLineaDashboard;