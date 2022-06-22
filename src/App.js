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
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Link
  }
from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="" element={<Main_Index />} />
          <Route path="fields" element={<Main_ListaCanchas />} />
          <Route path="available" element={<Main_ReservasDisponiblesPublic />} />
          <Route path="create" element={<Main_CrearCuenta />} />
          <Route path="contact" element={<Main_Contacto />} />
          <Route path="aboutus" element={<Main_SobreNosotros />} />
          <Route path="login" element={<Main_IniciarSesion />} />
          amogus
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
