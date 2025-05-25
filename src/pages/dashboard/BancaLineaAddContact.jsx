import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import cancelimg from '../../assets/img/cancel.png';
import addimg from '../../assets/img/add.png';
import './BancaLineaAddContact.css';
import BancaLineaSidebar from "./BancaLineaSidebar";

function BancaLineaTransfer() {
    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="main-content">
                <h2>Agregar contacto</h2>
                <div className="add-contact-position-container">
                    <h2 class="h2-main">Rellene los campos</h2>
                    <div class="transfer-input-container">
                        <div class="transfer-inputs-container-2">
                            <input type="text" id="accountnumUsr" placeholder="Número de cuenta" class="input-txtbox"/>
                            <input type="text" id="alias" placeholder="Alias" class="input-txtbox"/>
                        </div>
                        <input type="text" id="descriptionUsr" placeholder="Descripción" class="input-txtbox input-description"/>
                    </div>
                    <div class="transfer-button-container">
                        <button type="button" class="btn-transf btn-cancel"><img src={cancelimg} class="btn-transf-img"></img>Cancelar</button>
                        <button type="submit" class="btn-transf btn-transfer"><img src={addimg} class="btn-transf-img"></img>Agregar</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default BancaLineaTransfer;