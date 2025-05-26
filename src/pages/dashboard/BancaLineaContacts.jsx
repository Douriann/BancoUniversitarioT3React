import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import addimg from '../../assets/img/add.png';
import modifyimg from '../../assets/img/modify.png';
import removeimg from '../../assets/img/remove.png';
import {useNavigate} from 'react-router-dom';
import BancaLineaSidebar from "./BancaLineaSidebar";
import "./BancaLineaContacts.css";

const BancaLineaContacts = () => {
    const navigate = useNavigate();
    const [contactos, setContactos] = useState([]);
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        const fetchContactos = async () => {
            try{
            const response = await apiRequest("GET", "/v1/client/contact?page=1&page_size=20");
            setContactos(response.data || []);
            } catch (error) {
            console.error("Error al obtener contactos:", error);
        }
        };
        fetchContactos();
    }, []);

    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="contacts-main-content">
                <h2>Contactos</h2>
                <div className="contacts-position-container">
                    <div className="contacts-table-container">
                        <table className="contacts-table">
                            <thead>
                                <tr>
                                    <th>Número de Cuenta</th>
                                    <th>Alias</th>
                                    <th>Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                            {contactos.map((contacto, idx) => (
                                <tr
                                 key={contacto.id || idx}
                                 onClick={() => setContactoSeleccionado(contacto)}
                                className={contactoSeleccionado && contactoSeleccionado.id === contacto.id ? "selected-row" : ""}
                                style={{ cursor: "pointer" }}
                                >
                                <td>{contacto.account_number}</td>
                                <td>{contacto.alias}</td>
                                <td>{contacto.description}</td>
        </tr>
    ))}
</tbody>
                        </table>
                    </div>
                    <div className="contacts-actions">
    <button onClick={() => navigate("/bancalinea/addcontact")} className="contacts-btn"><img src={addimg} class="btn-transf-img"></img>Agregar</button>
    <button
        className="contacts-btn"
        onClick={() => navigate("/bancalinea/updatecontact")}
    >
        <img src={modifyimg} class="btn-transf-img"></img>
        Modificar
    </button>
    <button
        className="contacts-btn"
        disabled={!contactoSeleccionado}
        onClick={() => setMostrarModal(true)}
    >
        <img src={removeimg} class="btn-transf-img"></img>
        Eliminar
    </button>
</div>
            {mostrarModal && (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>¿Desea eliminar este contacto?</h3>
            <p>
                <strong>{contactoSeleccionado?.alias}</strong> - {contactoSeleccionado?.cuenta}
            </p>
            <div className="modal-actions">
                <button
                    className="contacts-btn"
                    style={{ background: "#e53935" }}
                    onClick={async () => {
                        try{
                        await apiRequest("DELETE", `/v1/client/contacts/${contactoSeleccionado.id}`);
                        setContactos(contactos.filter(c => c.id !== contactoSeleccionado.id));
                        setContactoSeleccionado(null);
                        setMostrarModal(false);
                        } catch(error) {
                            console.error("Error al eliminar contacto:", error);
                        }
                    }}
                >
                    Sí, eliminar
                </button>
                <button
                    className="contacts-btn"
                    style={{ background: "#4ecdc4" }}
                    onClick={() => setMostrarModal(false)}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
)}
                </div>
            </main>
        </div>
    );
};

export default BancaLineaContacts;