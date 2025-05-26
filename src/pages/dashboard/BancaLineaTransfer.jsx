import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import{Toaster, toast} from 'react-hot-toast';
import { getJWT } from "../../utils/localStorage";
import {useNavigate} from 'react-router-dom';
import cancelimg from '../../assets/img/cancel.png';
import transferimg from '../../assets/img/transfer.png';
import './BancaLineaTransfer.css';
import BancaLineaSidebar from "./BancaLineaSidebar";

function BancaLineaTransfer() {
    const navigate = useNavigate();

    const [contacts, setContacts] = useState([]);

    const [form, setForm] = useState({
        amount: "",
        account_number: "",
        description: ""
    });

    useEffect(() => {
        const findContacts = async () => {
            try{
                const response = await apiRequest("GET", "/v1/client/contact");
                console.log("Respuesta del servidor:", response);
                if (response.errors.length == 0) {
                    setContacts(response.data || []);
                    console.log("Lista de contactos 2:", contacts);
                } else {
                    toast.error(response.errors[0].error || "Error al cargar los contactos");
                    return;
                }
            }
            catch (error) {
                console.error("Error al conectar con el servidor:", error);
                toast.error("Error al conectar con el servidor");
            }
        }
        findContacts();
        console.log("Lista de contactos:", contacts);
    }, []);

    const showContact = () => {
        if (contacts.length === 0) {
            return <option value="">No hay contactos disponibles</option>;
        }
        return contacts.map((contact) => (
            <option key={contact.account_number} value={contact.account_number}>
                {contact.alias} - {contact.account_number}
            </option>
        ));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "amount") {
            setForm({
                ...form,
                [name]: value.replace(/[^0-9,.]/g, "")
            });
        }
        else{
        setForm({
            ...form,
            [name]: value
        /*    [event.target.name]: event.target.value*/
        });
        }
    }

    const submitTransfer = async (event) => {
        event.preventDefault();
        console.log("Formulario enviado:", form);

        try{
            const formattedAmount = parseFloat(form.amount.replace(",", "."));
            const formData = {
                ...form,
                amount: formattedAmount,
            };
            const response = await apiRequest("POST", "/v1/client/movement", formData);
            if (response.errors.length === 0) {
                toast.success(response.message);
                navigate("/bancalinea/success", { state: form });
            }
            else
            {
                toast.error(response.errors[0].error ||  "Error");
                return;
            }
        }
        catch (error) {
            console.error("Error al enviar el formulario:", error);
            toast.error("Error al conectar con el servidor");
        }
    }
    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="main-content">
                <h2>Transferir</h2>
                <div className="transfer-position-container">
                    <h2 class="h2-main">Rellene los campos</h2>
                    <div class="transfer-input-container">
                        <div class="contact-filter-container">
                            <select id="filter" class="transfer-filter-select" name="account_number" value={form.account_number} onChange={handleChange}>
                                <option value="">Seleccione Contacto</option>
                                {showContact()}
                            </select>
                        </div>
                        <div class="transfer-inputs-container-2">
                            <input type="text" name="account_number" value={form.account_number} onChange={handleChange} id="accountnum" placeholder="Número de cuenta" class="input-txtbox"/>
                            <input type="text" name="amount" value={form.amount} onChange={handleChange} id="amount" placeholder="Monto" class="input-txtbox"/>
                        </div>
                        <input type="text" name="description" value={form.description} onChange={handleChange} id="description" placeholder="Descripción" class="input-txtbox input-description"/>
                    </div>
                    <div class="transfer-button-container">
                        <button type="button" onClick={() => navigate("/bancalinea/dashboard")} class="btn-transf btn-cancel"><img src={cancelimg} class="btn-transf-img"></img>Cancelar</button>
                        <button type="submit" onClick={submitTransfer} class="btn-transf btn-transfer"><img src={transferimg} class="btn-transf-img"></img>Transferir</button>
                    </div>
                    <Toaster position="top-right" reverseOrder={false} />
                </div>
            </main>
        </div>
    );
}

export default BancaLineaTransfer;