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
import AdminMenu_Index from './components/adminmenu/adminmenu_index';
import ClientMenu_Index from './components/clientmenu/clientmenu_index';

import { BrowserRouter as Router,Routes,Route, Navigate }from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [loggedUser, setLoggedUser] = useState(null);
  onAuthStateChanged(auth, (fbUser) => {
    if (fbUser){
      setLoggedUser(fbUser);
      console.log(fbUser);
    }
    else{
      setLoggedUser(null);
    }
  });

  useEffect(() => {

  }, []);

  return (
    <div className='App'>
    <p>{loggedUser ? "LOGGED":"NOT LOGGED"}</p>
      <Router>
        <Header />
        <div className='content'>
        <Routes>
          <Route path="" element={<Main_Index />} />
          <Route path="fields" element={<Main_ListaCanchas />} />
          <Route path="available" element={<Main_ReservasDisponiblesPublic />} />
          <Route path="create" element={<Main_CrearCuenta />} />
          <Route path="contact" element={<Main_Contacto />} />
          <Route path="aboutus" element={<Main_SobreNosotros />} />
          <Route path="login" element={<Main_IniciarSesion />} />
          <Route path="adminmenu" element={loggedUser ? (<AdminMenu_Index />) : (<Navigate replace to="/login" />)} />
          <Route path="clientmenu" element={loggedUser ? (<ClientMenu_Index />) : (<Navigate replace to="/login" />)} />
        </Routes>
        </div>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
