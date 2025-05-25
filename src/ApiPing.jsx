import React, { useState } from "react";

const ApiPing = () => {
    const [status, setStatus] = useState("Esperando respuesta...");

    const checkServer = async () => {
        try {
            const response = await fetch("/api/ping");

            if (!response.ok) {
                throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
            }

            const data = await response.text();
            setStatus(`✅ Servidor activo - Respuesta: ${data}`);
        } catch (error) {
            setStatus(`❌ Error: ${error.message}`);
            console.error("❌ Detalles del error:", error);
        }
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h2>Ping al Servidor</h2>
            <button onClick={checkServer}>Probar conexión</button>
            <p>{status}</p>
        </div>
    );
};

export default ApiPing;