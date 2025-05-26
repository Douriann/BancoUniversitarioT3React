import React, { useEffect, useState } from "react";
import './BancaLineaHeader.css';
import logo from '../../assets/img/logo.png';
import logoutimg from '../../assets/img/logout.png';
import { getJWT , removeJWT} from "../../utils/localStorage";
import { Link , useNavigate} from 'react-router-dom';
import { apiRequest } from "../../api/apirequest";
import { toast } from 'react-hot-toast';

function BancaLineaHeader() {
   const navigate = useNavigate();
   const [userName, setUserName] = useState("Usuario");

    useEffect(() => {
        const findUserName = async () => {
            try{
                const response = await apiRequest("GET", "/v1/client/user/whoami", getJWT);
                console.log("Respuesta del servidor:", response);
                setUserName(`${response.data.first_name} ${response.data.last_name}`);
            }
            catch (error) {
                console.error("Error al conectar con el servidor:", error);
                toast("Error al conectar con el servidor");
                navigate("/bancalinea/login");
            }
        }
        findUserName();
    }, []);

    const handleLogout = () => {
        removeJWT();
        toast.success("Sesión cerrada");
        navigate("/bancalinea/login");
    }
  return (
    <header class="header-dashboard">
        <div class="header-left-elements">
            <div class="header-img-container">
                <img src={logo} alt="Banco Universitario Logo" class="header-logo"/>
            </div>
            <h2>Bienvenido(a) {userName}</h2>
        </div>
        <div class="header-btn-container">
            <a onClick={handleLogout} href="#" class="btn-header">
                Salir
                <img src={logoutimg} alt="Usuario" class="header-btn-img-logout"/>
            </a>         
        </div>
    </header>
  );
}

export default BancaLineaHeader;