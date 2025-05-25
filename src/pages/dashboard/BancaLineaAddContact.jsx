import React, {useState } from "react";
import { apiRequest } from "../../api/apirequest";
import{Toaster, toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import cancelimg from '../../assets/img/cancel.png';
import addimg from '../../assets/img/add.png';
import './BancaLineaAddContact.css';
import BancaLineaSidebar from "./BancaLineaSidebar";

function BancaLineaTransfer() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        alias: "",
        account_number: "",
        description: ""
    });

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async (event) => {
        // Evitar el comportamiento por defecto del formulario
        // para que no se recargue la página al enviar el formulario
        event.preventDefault();
        console.log("Formulario enviado:", form);

        if (!form.alias || !form.account_number || !form.description) {
            toast.error("Por favor, complete todos los campos");
            return;
        }
        
        try {
            const response = await apiRequest("POST", "/v1/client/contact", form);
            console.log("Respuesta del servidor:", response);
            if (response.errors.length == 0) {
                toast.success(response.message);
            } else {
                toast.error(response.errors[0].error ||  "Error");
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            toast.error("Error al conectar con el servidor");
            return;
        }
    }

    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="main-content">
                <h2>Agregar contacto</h2>
                <div className="add-contact-position-container">
                    <h2 class="h2-main">Rellene los campos</h2>
                    <div class="transfer-input-container">
                        <div class="transfer-inputs-container-2">
                            <input type="text" name="account_number" value={form.account_number} onChange={handleChange} id="accountnumUsr" placeholder="Número de cuenta" class="input-txtbox"/>
                            <input type="text" name="alias" value={form.alias} onChange={handleChange} id="alias" placeholder="Alias" class="input-txtbox"/>
                        </div>
                        <input type="text" name="description" value={form.description} onChange={handleChange} id="descriptionUsr" placeholder="Descripción" class="input-txtbox input-description"/>
                    </div>
                    <div class="transfer-button-container">
                        <button type="button" onClick={() => navigate("/bancalinea/dashboard")} class="btn-transf btn-cancel"><img src={cancelimg} class="btn-transf-img"></img>Cancelar</button>
                        <button type="button" onClick={handleSubmit} class="btn-transf btn-transfer"><img src={addimg} class="btn-transf-img"></img>Agregar</button>
                    </div>
                    <Toaster position="top-right" reverseOrder={false} />
                </div>
            </main>
        </div>
    );
}

export default BancaLineaTransfer;