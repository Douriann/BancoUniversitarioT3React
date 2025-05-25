import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import { Link , useNavigate} from 'react-router-dom';
import BancaLineaSidebar from "./BancaLineaSidebar";
import userimg from '../../assets/img/user.png';
import homeimg from '../../assets/img/home.png';
import transferimg from '../../assets/img/transfer.png';
import contactimg from '../../assets/img/contact.png';
import configimg from '../../assets/img/config.png';
import moveimg from '../../assets/img/movement.png';
import "./BancaLineaMovement.css";

const BancaLineaMovement = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [filtro, setFiltro] = useState("todo");
    
    useEffect(() => {
        const handleMovement = async () => {
            try {
                let endpoint = `/v1/client/movement?page=1&page_size=10`;

                if (filtro == "credito") {
                    endpoint += "&multiplier=1";
                } else if (filtro == "debito") {
                    endpoint += "&multiplier=-1";
                }

                const response = await apiRequest("GET", endpoint, getJWT());
                console.log("🔍 Datos recibidos:", response);

                setMovimientos(response.data || []);
            } catch (error) {
                console.error("❌ Error al obtener movimientos:", error);
                alert("Error al cargar los datos de movimientos.");
            }
        };

        handleMovement();
    }, [filtro]);

    const selectFilter = (event) => {
        setFiltro(event.target.value);
    };

    return (
    <div class="container-mainclass">
        <BancaLineaSidebar />
        <main class="movement-main-content">
            <h2>Movimientos</h2>
            <div class="movements-position-container">
                <div class="global-position-box">
                    <div class="movement-filter-container">
                        <label for="filter" class="label-option">Filtrar por tipo de movimiento:</label>
                        <select onChange={selectFilter} value={filtro} id="filter" class="movement-filter-select">
                            <option value="todo">Todos los movimientos</option>
                            <option value="credito">Solo Crédito</option>
                            <option value="debito">Solo Débito</option>
                        </select>
                    </div>
                </div>
                <div class="movements-table-container">
                    <table class="movements-table">
                        <thead>
                            <tr>
                                <th>Descripción</th>
                                <th>Monto</th>
                                <th>Saldo</th>
                                <th>Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí se llenarán los movimientos */}
                            {movimientos.length > 0 ? (
                                movimientos.map((movimiento, index) => (
                                    <tr key={index}>
                                        <td>{movimiento.description}</td>
                                        <td>{movimiento.amount.toLocaleString()}</td>
                                        <td style={{color: movimiento.multiplier == -1  ? "red" : "green"}}>{movimiento.balance.toLocaleString()}</td>
                                        <td>{movimiento.multiplier == 1 ? "Crédito" : "Débito"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: "center" }}>No hay movimientos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    </div>
    );
};

export default BancaLineaMovement;