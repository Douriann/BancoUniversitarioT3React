import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import { Link , useNavigate} from 'react-router-dom';
import userimg from '../../assets/img/user.png';
import homeimg from '../../assets/img/home.png';
import transferimg from '../../assets/img/transfer.png';
import contactimg from '../../assets/img/contact.png';
import configimg from '../../assets/img/config.png';
import moveimg from '../../assets/img/movement.png';

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
        <aside class="sidebar">
            <div class="sidebar-user-container">
                <div class="sidebar-user-img-container">
                    <img src={userimg} alt="Usuario" class="sidebar-user-img"/>
                </div>
                <h3>Menú de usuario</h3>
            </div>
            <nav class="sidebar-nav">
                <div class="sidebar-nav-btn"><a href="transferencias.html" class="btn-sidebar"><img src={homeimg}/> Posición Global</a></div>
                <div class="sidebar-nav-btn"><a href="consultar-saldo.html" class="btn-sidebar"><img src={moveimg}/>Movimientos</a></div>
                <div class="sidebar-nav-btn"><a href="movimientos.html" class="btn-sidebar"><img src={transferimg}/>Transferir</a></div>
                <div class="sidebar-nav-btn"><a href="configuracion.html" class="btn-sidebar"><img src={contactimg}/>Contactos</a></div>
                <div class="sidebar-nav-btn"><a href="configuracion.html" class="btn-sidebar"><img src={configimg}/>Gestión</a></div>
            </nav>
        </aside>
        <main class="main-content">
            <h2>Movimientos</h2>
            <div class="global-position-container">
                <div class="global-position-box">
                    <div class="movement-filter-container">
                        <label for="filter">Filtrar por tipo de movimiento:</label>
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
                            </tr>
                        </thead>
                        <tbody>
                            {/* Aquí se llenarán los movimientos */}
                            {movimientos.length > 0 ? (
                                movimientos.map((movimiento, index) => (
                                    <tr key={index}>
                                        <td>{movimiento.description}</td>
                                        <td>{movimiento.amount.toLocaleString()}</td>
                                        <td>{movimiento.balance.toLocaleString()}</td>
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