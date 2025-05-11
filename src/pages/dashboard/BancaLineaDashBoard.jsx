import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import './BancaLineaDashboard.css';
import { Link , useNavigate} from 'react-router-dom';
import userimg from '../../assets/img/user.png';
import homeimg from '../../assets/img/home.png';
import transferimg from '../../assets/img/transfer.png';
import contactimg from '../../assets/img/contact.png';
import configimg from '../../assets/img/config.png';
import moveimg from '../../assets/img/movement.png';

function BancaLineaDashboard() {
    const [accountState, setAccountState] = useState({
        accountNumber: "",
        accoutBalance: 0
    });

        useEffect(() => {
            const findUserData = async () => {
                try{
                    const response = await apiRequest("GET", "/v1/client/user/whoami", getJWT);
                    const response2 = await apiRequest("GET", "/v1/client/user/balance", getJWT);
                    console.log("Respuesta del servidor:", response.message);
                    console.log("Respuesta 2 del servidor:", response2.message);
                    setAccountState(prevAccountState => ({
                        ...prevAccountState,
                        accountNumber: response.data.account_number,
                        accoutBalance: response2.data.balance
                    }));
                }
                catch (error) {
                    console.error("Error al conectar con el servidor:", error);
                    alert("Error al conectar con el servidor");
                }
            }
            findUserData();
        }, []);

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
                        <p>{accountState.accountNumber}</p>
                    </div>
                    <div class="global-position-balancecontainer">
                        <h2 class="h2-main">Saldo Total</h2>
                        <p>{accountState.accoutBalance} Bs.</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}

export default BancaLineaDashboard;