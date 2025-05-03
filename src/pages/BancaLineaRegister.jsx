import React from 'react';

function BancaLineaRegister() {
  return (
    <div>
      <h1>Registro de Usuario</h1>
      <form>
        <label htmlFor="nombre">Nombre completo:</label>
        <input type="text" id="nombre" name="nombre" required />

        <label htmlFor="email">Correo electrónico:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default BancaLineaRegister;