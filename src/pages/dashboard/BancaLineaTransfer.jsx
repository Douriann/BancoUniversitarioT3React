import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import cancelimg from '../../assets/img/cancel.png';
import transferimg from '../../assets/img/transfer.png';
import './BancaLineaTransfer.css';
import BancaLineaSidebar from "./BancaLineaSidebar";

function BancaLineaTransfer() {
    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="main-content">
                <h2>Transferir</h2>
                <div className="transfer-position-container">
                    <h2 class="h2-main">Rellene los campos</h2>
                    <div class="transfer-input-container">
                        <div class="contact-filter-container">
                            <select id="filter" class="transfer-filter-select">
                                <option value="todo">Seleccione Contacto</option>
                            </select>
                        </div>
                        <div class="transfer-inputs-container-2">
                            <input type="text" id="accountnum" placeholder="Número de cuenta" class="input-txtbox"/>
                            <input type="text" id="amount" placeholder="Monto" class="input-txtbox"/>
                        </div>
                        <input type="text" id="description" placeholder="Descripción" class="input-txtbox input-description"/>
                    </div>
                    <div class="transfer-button-container">
                        <button type="button" class="btn-transf btn-cancel"><img src={cancelimg} class="btn-transf-img"></img>Cancelar</button>
                        <button type="submit" class="btn-transf btn-transfer"><img src={transferimg} class="btn-transf-img"></img>Transferir</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BancaLineaTransfer;