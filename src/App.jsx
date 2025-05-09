import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import FooterMain from './FooterMain';
import BancaLineaLogin from './pages/login/BancaLineaLogin'; // Importa tu nuevo componente para Banca en Línea
import BancaLineaRegister from './pages/register/BancaLineaRegister'; // Importa tu nuevo componente para el registro
import BancaLineaDashboard from './pages/dashboard/BancaLineaDashBoard'; // Importa tu nuevo componente para el dashboard
import BancaLineaHeader from './pages/dashboard/BancaLineaHeader'; // Importa tu nuevo componente para el header del dashboard
import BancaLineaFooter from './pages/dashboard/BancaLineaFooter'; // Importa tu nuevo componente para el footer del dashboard

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
         element={<BancaLineaLogin />} />
        <Route
         path="/bancalinea/register" 
         element={<BancaLineaRegister />} />
        <Route
         path="/bancalinea/dashboard" 
         element={
          <>
          <BancaLineaHeader />
          <BancaLineaDashboard />
          <BancaLineaFooter />
          </>
        } 
        />
      </Routes>
    </Router>
  );
}

export default App;