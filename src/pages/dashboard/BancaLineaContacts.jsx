import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import BancaLineaSidebar from "./BancaLineaSidebar";
import "./BancaLineaContacts.css";

const BancaLineaContacts = () => {
    const [contactos, setContactos] = useState([]);

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
                                    <tr key={idx}>
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
                        <button className="contacts-btn">Modificar</button>
                        <button className="contacts-btn">Eliminar</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BancaLineaContacts;