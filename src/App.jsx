import React from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate} from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import FooterMain from './FooterMain';
import BancaLineaLogin from './pages/login/BancaLineaLogin';
import BancaLineaRegister from './pages/register/BancaLineaRegister';
import BancaLineaDashboard from './pages/dashboard/BancaLineaDashboard';
import BancaLineaHeader from './pages/dashboard/BancaLineaHeader'; 
import BancaLineaFooter from './pages/dashboard/BancaLineaFooter'; 
import BancaLineaMovement from './pages/dashboard/BancaLineaMovement';
import BancaLineaTransfer from './pages/dashboard/BancaLineaTransfer';
import BancaLineaAddContact from './pages/dashboard/BancaLineaAddContact';
import BancaLineaUserManagement from './pages/dashboard/BancaLineaUserManagement';
import BancaLineaUpdateContact from './pages/dashboard/BancaLineaUpdateContact';
import BancaLineaSuccess from './pages/dashboard/BancaLineaSuccess';
import Ping from './ApiPing';
//import { getJWT } from "./utils/localStorage";
import PrivateRoute from './utils/PrivateRoute';
import BancaLineaContacts from './pages/dashboard/BancaLineaContacts';


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
         path="/bancalinea/ping" 
         element={<Ping />} />
        <Route
         path="/bancalinea/register" 
         element={<BancaLineaRegister />} />
        <Route
         path="/bancalinea/dashboard" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaDashboard />
         <BancaLineaFooter />
         </>} 
         />}/>
        <Route
         path="/bancalinea/movements" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaMovement />
         <BancaLineaFooter />
         </>} 
         />}/>
                 <Route
         path="/bancalinea/usermanagement" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaUserManagement />
         <BancaLineaFooter />
         </>} 
         />}/>
        <Route
         path="/bancalinea/transfer" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaTransfer />
         <BancaLineaFooter />
         </>} 
         />}/>
        <Route
         path="/bancalinea/addcontact" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaAddContact />
         <BancaLineaFooter />
         </>} 
         />}/>
         <Route
         path="/bancalinea/updatecontact" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaUpdateContact />
         <BancaLineaFooter />
         </>} 
         />}/>
         <Route
         path="/bancalinea/contacts" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaContacts />
         <BancaLineaFooter />
         </>} 
         />}/>
        <Route
         path="/bancalinea/success" 
         element={<PrivateRoute 
         element={
         <>
         <BancaLineaHeader />
         <BancaLineaSuccess />
         <BancaLineaFooter />
         </>} 
         />}/>
      </Routes>
      
    </Router>
  );
}

export default App;