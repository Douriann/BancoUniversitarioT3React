import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import { Toaster, toast } from "react-hot-toast";
import cancelimg from "../../assets/img/cancel.png";
import modifyimg from "../../assets/img/modify.png";
import buscarimg from "../../assets/img/movement.png"
import './BancaLineaUpdateContact.css';
import BancaLineaSidebar from "./BancaLineaSidebar";

function BancaLineaEditContact() {
    const { id: urlId } = useParams(); // ID desde URL
    const navigate = useNavigate();

    const [searchId, setSearchId] = useState(urlId || ""); // para buscar manualmente
    const [form, setForm] = useState({
        alias: "",
        account_number: "",
        description: ""
    });

    useEffect(() => {
        const token = getJWT();
        if (!token) {
            navigate("/bancalinea/login");
        }
    }, [navigate]);

    // Cargar contacto automáticamente si viene el ID en la URL
    useEffect(() => {
        if (urlId) {
            fetchContact(urlId);
        }
    }, [urlId]);

    const fetchContact = async (contactId) => {
        try {
            const response = await apiRequest("GET", `/v1/client/contact/${contactId}`);
            if (response?.data) {
                setForm({
                    alias: response.data.alias || "",
                    account_number: response.data.account_number || "",
                    description: response.data.description || ""
                });
                toast.success("Contacto cargado");
            } else {
                setForm({ alias: "", account_number: "", description: "" });
                toast.error("No se pudo obtener el contacto");
            }
        } catch (error) {
            toast.error("Error al obtener contacto:", error);
            setForm({ alias: "", account_number: "", description: "" });
            toast.error("Error al conectar con el servidor");
        }
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSearch = () => {
        if (!searchId.trim()) {
            toast.error("Ingrese el ID para buscar");
            return;
        }
        fetchContact(searchId.trim());
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.alias || !form.account_number || !form.description) {
            toast.error("Por favor, complete todos los campos");
            return;
        }

        try {
            const response = await apiRequest("PATCH", `/v1/client/contact/${searchId}`, form);
            if (response.errors.length === 0) {
                toast.success("Contacto actualizado");
                setTimeout(() => navigate("/bancalinea/dashboard"), 1500);
            } else {
                toast.error(response.errors[0]?.error || "Error al actualizar");
            }
        } catch (error) {
            console.error("Error al actualizar el contacto:", error);
            toast.error("Error al conectar con el servidor");
        }
    };

    return (
        <div className="container-mainclass">
            <BancaLineaSidebar />
            <main className="main-content">
                <h2>Editar contacto</h2>
                <div className="update-position-container">
                    <h2 className="h2-main">Buscar contacto</h2>
                    <div className="search-container">
                        <input
                            type="text"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            placeholder="Ingrese el ID"
                            className="input-txtbox search-input"
                        />
                        <button type="button" onClick={handleSearch} className="btn-update btn-search"><img src={buscarimg} className="btn-update-img" alt="Buscar" />Buscar</button>
                    </div>

                    <h2 className="h2-main">Modificar campos</h2>
                    <div className="update-input-container">
                        <div className="update-inputs-container-2">
                            <input type="text" name="account_number" value={form.account_number} onChange={handleChange} placeholder="Número de cuenta" className="input-txtbox" />
                            <input type="text" name="alias" value={form.alias} onChange={handleChange} placeholder="Alias" className="input-txtbox" />
                        </div>
                        <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Descripción" className="input-txtbox input-description" />
                    </div>
                    <div className="update-button-container">
                        <button type="button" onClick={() => navigate("/bancalinea/dashboard")} className="btn-update btn-cancel">
                            <img src={cancelimg} className="btn-update-img" alt="Cancelar" />Cancelar
                        </button>
                        <button type="button" onClick={handleSubmit} className="btn-update btn-update">
                            <img src={modifyimg} className="btn-update-img" alt="Actualizar" />Actualizar
                        </button>
                    </div>
                    <Toaster position="top-right" reverseOrder={false} />
                </div>
            </main>
        </div>
    );
}

export default BancaLineaEditContact;
