import React from 'react';
import logo from '../../assets/img/logo.png'; // Asegúrate de ajustar la ruta según la ubicación de tu imagen
import { Link } from 'react-router-dom';

function BancaLineaLogin() {
  return (
    <div>
      {/* Encabezado */}
      <header>
        <div>
          <img src={logo} alt="Banco Universitario Logo" />
        </div>
        <nav>
          <Link to="/">Volver al Inicio</Link>
        </nav>
      </header>

      {/* Sección de Inicio de Sesión */}
      <section>
        <h1>Inicia Sesión</h1>
        <form>
          <label htmlFor="cedula">Cédula de identidad:</label>
          <input type="text" id="cedula" name="cedula" required />

          <label htmlFor="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" name="contrasena" required />

          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          <Link to="/bancalinea/register" className="btn">¿No tienes cuenta? Regístrate aquí</Link>
        </p>
      </section>

      {/* Pie de página */}
      <footer>
        <p>© 2025 Banco Universitario. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default BancaLineaLogin;