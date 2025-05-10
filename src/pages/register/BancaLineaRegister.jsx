// src/components/BancolineaRegister.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './BancaLineaRegister.css';
import { useNavigate } from 'react-router-dom';

const BancaLineaRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(
        'https://bank-service-back-dev-jqkt.3.us-1.fl0.io/api/v1/auth/register', 
        formData
      );
      
      if (response.data) {
        // Redirige al login después de registro exitoso
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro. Por favor intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro de Nuevo Usuario</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div className="form-group">
          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Ej: usuario@correo.com"
          />
        </div>

        <div className="form-group">
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Ej: jperez2023"
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Registrando...' : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default BancaLineaRegister;