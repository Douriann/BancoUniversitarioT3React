import React, { useState } from "react";
import BancaLineaSidebar from "./BancaLineaSidebar";
import "./BancaLineaUserManagement.css";

const UserManagement = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");    

    const handleSubmit = (e) => {
    e.preventDefault();
    alert("Contraseña modificada exitosamente.");
    };

    return (
        <div class="container-mainclass">
        <BancaLineaSidebar/>
            <main className="userManagement-main-content">
                <h2>Gestión de Usuario</h2>
                <div className="userManagement-position-container">
                    <form onSubmit={handleSubmit}>
                        <label>Contraseña actual</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />

                        <label>Contraseña nueva</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />

                        <label>Repita la Contraseña nueva</label>
                        <input
                            type="password"
                            value={repeatNewPassword}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                        />                        

                        <div className="buttons">
                            <button type="button" className="cancel">Cancelar</button>
                            <button type="submit" className="modify">Modificar</button>
                        </div>
                    </form>
                </div>    
            </main>
        </div>
    );
};

export default UserManagement;
