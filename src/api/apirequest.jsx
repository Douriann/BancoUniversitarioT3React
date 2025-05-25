import axios from 'axios';
import { getJWT } from "../utils/localStorage"

// URL base para la API con su respectivo tiempo de espera
export const apiUrl = '/api';
const timeoutRequest = 10000;

// Estableciendo configuración de encabezado para aceptar archivos JSON
const defaultHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const apiRequest = async (method, endpoint, data = null, params = null, headers = {}, options = {}) => {
    // asignando el url de la solicitud de la API
    const url = `${apiUrl}${endpoint}`;
    // Configuración de la respuesta de la API
    let serviceResponse = {};
    // Configuración adicional del encabezado para modificar sin afectar el encabezado por defecto
    options.headers = {
        ...defaultHeaders,
        ...headers,
    }; 
    // Configuración del encabezado de autorización para el token JWT
    // Si el token JWT existe, se agrega al encabezado de autorización
    let jwt = getJWT();
    if (jwt) {
        options.headers['Authorization'] = `Bearer ${jwt}`;
    }
    // Configuración de la solicitud de la API
    const servicePromise = axios({
        method: method.toLowerCase(),
        url,
        data,
        params,
        timeout: timeoutRequest, 
        ...options
    });
    // Manejo de la solicitud que se envia en consola
    console.log(`${method.toUpperCase()} ${url}`);

    // Manejo de la respuesta de la API
    try {
        const response = await servicePromise;
        console.log('Response:', response);
        serviceResponse = response.data;
        serviceResponse.headers = response.headers;
        }
    // Manejo de errores de la API
    catch (error) {
        if (error.response) {
            serviceResponse = error.response.data;
            console.error('API Error:', error.response);
            serviceResponse = error.response.data;
        } else {
            console.error('Network Error:', error);
            serviceResponse = error;
        }
        
    }
    return serviceResponse;
};