import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../api/apirequest";
import { getJWT } from "../../utils/localStorage";
import cancelimg from '../../assets/img/cancel.png';
import configimg from '../../assets/img/config.png';
import BancaLineaSidebar from "./BancaLineaSidebar";
import "./BancaLineaUserManagement.css";

const UserManagement = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = getJWT();
    if (!token) {
      navigate("/bancalinea/login");
    } 
  }, []);

  const passwordSecure = (password) => {
    const securePasswordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}\[\]:;<>,.?/~_+\-=|\\]).{8,32}$/;
    return securePasswordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Bloque de validaciones
    if (!currentPassword || !newPassword || !repeatNewPassword) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    if (newPassword !== repeatNewPassword) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    } 
    if (!passwordSecure(newPassword)) {
      setError(
        "La contraseña nueva debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    setError("");

    //Lógica para enviar los datos al servidor
    try {
      const response = await apiRequest("PATCH", "/v1/client/user/password", {
        password: currentPassword,
        new_password: newPassword,

      });
      if (response.success) {
        alert("Contraseña modificada exitosamente.");
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      } else {
        setError(response.message || "No se pudo cambiar la contraseña.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al cambiar la contraseña. Intente más tarde.");
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setRepeatNewPassword("");
    setError("");
  };

  return (
    <div className="container-mainclass">
      <BancaLineaSidebar />
      <main className="userManagement-main-content">
        <h2>Gestión de Usuario</h2>
        <div className="userManagement-position-container">
          <form onSubmit={handleSubmit}>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Contraseña actual" className="text-box"/>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Nueva contraseña" className="text-box"/>
            <input type="password" value={repeatNewPassword} onChange={(e) => setRepeatNewPassword(e.target.value)} placeholder="Confirmar nueva contraseña" className="text-box"/>
            <div className="buttons">
              <button type="button" className="btn-config cancel" onClick={handleCancel}><img src={cancelimg} className="btn-config-img"></img>
                Cancelar
              </button>
              <button type="submit" className="btn-config modify"><img src={configimg} className="btn-config-img"></img>
                Modificar
              </button>
            </div>
          </form>

          <div className="error-box">
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
