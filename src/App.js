import './App.css';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import Main_Index from './components/mainmenu/Index';
import Main_ListaCanchas from './components/mainmenu/ListaCanchas';
import Main_ReservasDisponiblesPublic from './components/mainmenu/ReservasDisponiblesPublic';
import Main_CrearCuenta from './components/mainmenu/CrearCuenta';
import Main_Contacto from './components/mainmenu/Contacto';
import Main_SobreNosotros from './components/mainmenu/SobreNosotros';
import Main_IniciarSesion from './components/mainmenu/IniciarSesion';
import useState from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  ProtectedRoute 
  }
from 'react-router-dom';
import React from 'react';
import AdminMenu_Index from './components/adminmenu/adminmenu_index';
import ClientMenu_Index from './components/clientmenu/clientmenu_index';
function App() {
  const [token, setToken] = useState();
  if(!token) {
    return <Main_IniciarSesion setToken={setToken} />
  }
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="" element={<Main_Index />} />
          <Route path="fields" element={<Main_ListaCanchas />} />
          <Route path="available" element={<Main_ReservasDisponiblesPublic />} />
          <Route path="create" element={<Main_CrearCuenta />} />
          <Route path="contact" element={<Main_Contacto />} />
          <Route path="aboutus" element={<Main_SobreNosotros />} />
          <Route path="login" element={<Main_IniciarSesion />} />
          <Route path="adminmenu" element={<RequireAuth><AdminMenu_Index /></RequireAuth>} />
          <Route path="clientmenu" element={<RequireAuth><ClientMenu_Index /></RequireAuth>} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
