import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import FooterMain from './FooterMain';
import BancaEnLinea from './pages/BancaLineaLogin'; // Importa tu nuevo componente para Banca en Línea
import BancaLineaRegister from './pages/BancaLineaRegister';
import BancaLineaDashboard from './pages/BancaLineaDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página principal */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <About />
              <Services />
              <Contact />
              <FooterMain />
            </>
          }
        />

        {/* Ruta para Banca en Línea */}
        <Route
         path="/bancalinea/login" 
         element={<BancaEnLinea />} />
        <Route
         path="/bancalinea/register" 
         element={<BancaLineaRegister />} />
        <Route
         path="/bancalinea/dashboard" 
         element={<BancaLineaDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;