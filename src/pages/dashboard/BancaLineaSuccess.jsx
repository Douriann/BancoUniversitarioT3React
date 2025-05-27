import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import { useLocation, useNavigate } from "react-router-dom";
import homeimg from '../../assets/img/home.png';

import './BancaLineaSuccess.css';
import BancaLineaSidebar from "./BancaLineaSidebar";

function BancaLineaSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const transaction = location.state || {};
    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="main-content">
                <h2>Operación Exitosa</h2>
                <div className="success-container">
                    <div className="success-box">
                        <h2 className="h2-main">Tu transacción ha sido completada exitosamente.</h2>
                        <div className="transaction-details-container">
                            <p className="transaction-data"><strong>Número de cuenta:  </strong> {transaction.account_number}</p>
                            <p className="transaction-data"><strong>Monto enviado: </strong>{transaction.amount} Bs.</p>
                        </div>
                            <div className="transaction-details-container-2">
                            <p className="transaction-data"><strong>Descripción: </strong>{transaction.description}</p>
                        </div>
                    </div>
                    <div class="transfer-button-container">
                        <button type="submit" onClick={() => navigate("/bancalinea/transfer")} class="btn-transf btn-transfer"><img src={homeimg} class="btn-transf-img"></img>Volver</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BancaLineaSuccess;