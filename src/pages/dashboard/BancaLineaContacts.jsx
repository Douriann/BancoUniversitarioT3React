import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import BancaLineaSidebar from "./BancaLineaSidebar";
import "./BancaLineaContacts.css";

const BancaLineaContacts = () => {
    const [contactos, setContactos] = useState([]);
    const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

    useEffect(() => {
        const fetchContactos = async () => {
            const response = await apiRequest("GET", "/v1/client/contacts");
            setContactos(response.data || []);
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
                                <td>{contacto.cuenta}</td>
                                <td>{contacto.alias}</td>
                                <td>{contacto.descripcion}</td>
        </tr>
    ))}
</tbody>
                        </table>
                    </div>
                    <div className="contacts-actions">
    <button className="contacts-btn">Agregar</button>
    <button
        className="contacts-btn"
        disabled={!contactoSeleccionado}
        // onClick={...}
    >
        Modificar
    </button>
    <button
        className="contacts-btn"
        disabled={!contactoSeleccionado}
        onClick={async () => {
            if (contactoSeleccionado) {
                await apiRequest("DELETE", `/v1/client/contacts/${contactoSeleccionado.id}`);
                setContactos(contactos.filter(c => c.id !== contactoSeleccionado.id));
                setContactoSeleccionado(null);
            }
        }}
    >
        Eliminar
    </button>
</div>
                </div>
            </main>
        </div>
    );
};

export default BancaLineaContacts;