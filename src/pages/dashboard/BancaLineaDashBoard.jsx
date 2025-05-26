import React, { useEffect, useState } from "react";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import './BancaLineaDashboard.css';
import BancaLineaSidebar from "./BancaLineaSidebar";
import { FaRegCopy } from "react-icons/fa";

function BancaLineaDashboard() {
const [accountState, setAccountState] = useState({
    accountNumber: "",
    accoutBalance: 0
});

const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountState.accountNumber);
    alert("Número de cuenta copiado");
};

        useEffect(() => {
            const findUserData = async () => {
                try{
                    const response = await apiRequest("GET", "/v1/client/user/whoami", getJWT);
                    const response2 = await apiRequest("GET", "/v1/client/user/balance", getJWT);
                    console.log("Respuesta del servidor:", response.message);
                    console.log("Respuesta 2 del servidor:", response2.message);
                    setAccountState(prevAccountState => ({
                        ...prevAccountState,
                        accountNumber: response.data.account_number,
                        accoutBalance: response2.data.balance
                    }));
                }
                catch (error) {
                    console.error("Error al conectar con el servidor:", error);
                    alert("Error al conectar con el servidor");
                }
            }
            findUserData();
        }, []);

return (
    <div class="container-mainclass">
        <BancaLineaSidebar />
        <main class="main-content">
            <h2>Posición Global</h2>
            <p>Consulta tu saldo, realiza transferencias y gestiona tus contactos de manera fácil y rápida.</p>
            <div class="global-position-container">
                <div class="global-position-box">
                    <div class="global-position-accoutnumb">
                    <h2 class="h2-main">Número de cuenta</h2>
                    <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {accountState.accountNumber}
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={handleCopyAccount}
                        title="Copiar número de cuenta"
                    >
                    <FaRegCopy />
                    </span>
                    </p>
                </div>
                    <div class="global-position-balancecontainer">
                        <h2 class="h2-main">Saldo Total</h2>
                        <p class="data-info">{accountState.accoutBalance.toLocaleString()} Bs.</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
);
}

export default BancaLineaDashboard;