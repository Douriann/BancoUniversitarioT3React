import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../../api/apirequest';
import './BancaLineaRegister.css';
import logo from '../../assets/img/logo.png';
import registerico from '../../assets/img/favicon.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Toaster , toast } from 'react-hot-toast';

const BancaLineaRegister = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    document_number: '',
    birth_date: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (Object.values(form).some(field => !field)) {
      toast('Por favor, completa todos los campos.');
      return;
    }

    if (form.password !== form.confirm_password) {
      toast('Las contraseñas no coinciden.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast('Correo electrónico no válido.');
      return;
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(form.phone_number)) {
      toast('Número de teléfono no válido. Debe tener entre 10 y 15 dígitos.');
      return;
    }

    const idRegex = /^\d{6,12}$/;
    if (!idRegex.test(form.document_number)) {
      toast('Cédula no válida. Debe tener entre 6 y 12 dígitos.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(form.password)) {
      toast('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
      return;
    }

    try {
      const formattedDate = new Date(form.birth_date).toISOString();
      const formData = { ...form, birth_date: formattedDate };

      const response = await apiRequest('POST', '/v1/public/client/user/register', formData);
      console.log('Respuesta del servidor:', response);

      if (response.errors?.length === 0) {
        toast(response.message || 'Registro exitoso');
        navigate('/BancaLinea/login');
      } else {
        toast(response.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      toast.error('Error al conectar con el servidor');
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <img src={logo} alt="Banco Universitario" className="logo" />
        <Link to="/" className="institutional-btn">Web Institucional</Link>
      </header>

      <div className="register-box">
        <div className="register-title">
          <img src={registerico} alt="Register Icono" className="register-icon" />
          <h2>REGISTRO NUEVO USUARIO</h2>
        </div>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Nombre', name: 'first_name', placeholder: 'EJ: CARLOS ANDRÉS' },
            { label: 'Apellido', name: 'last_name', placeholder: 'EJ: GONZÁLEZ PÉREZ' },
            { label: 'Cédula', name: 'document_number', placeholder: 'EJ: 12345678' },
            { label: 'Fecha de Nacimiento', name: 'birth_date', type: 'date' },
            { label: 'Número de Teléfono', name: 'phone_number', placeholder: 'EJ: 04161234567' },
            { label: 'Correo Electrónico', name: 'email', type: 'email', placeholder: 'EJ: micorreo@gmail.com' }
          ].map(({ label, name, type = 'text', placeholder }) => (
            <div className="form-group" key={name}>
              <label htmlFor={name}>{label} *</label>
              <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                required
                className="form-txtbox"
              />
            </div>
          ))}

          <div className="form-group">
            <label htmlFor="password">Contraseña *</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Ingrese aquí"
                value={form.password}
                onChange={handleChange}
                required
                className="form-txtbox"
                style={{ paddingRight: '35px' }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '56%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  color: '#333'
                }}
                tabIndex={0}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirme la Contraseña *</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirme aquí"
              value={form.confirm_password}
              onChange={handleChange}
              required
              className="form-txtbox"
            />
          </div>

          <div className="form-group">
            <button type="submit" style={{ width: '100%' }}>Registrarse</button>
          </div>
        </form>
        <p className="register-link">
          ¿Ya tienes cuenta? <Link to="/BancaLinea/login">Inicia sesión aquí</Link>
        </p>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default BancaLineaRegister;
