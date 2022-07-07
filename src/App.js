import { React, useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';
import PageFooter from './components/footer';
import PageHeader from './components/header';
import MainIndex from './components/main/index';
import MainListaCanchas from './components/main/canchas';
import MainCrearCuenta from './components/main/crearcuenta';
import MainLogin from './components/main/login';
import UserIndex from './components/user/index';
import AdminIndex from './components/admin/index';
import UserReservar from './components/user/reservar';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getUser(mail) {
    setLoading(true);
    const docRef = doc(db, `Usuarios/${mail}`);
    const docCif = await getDoc(docRef);
    const docInfo = docCif.data();
    setCurrentUser(docInfo);
    setLoading(false);
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const data = getUser(user.email);
      }
      else {
        setLoading(true);
        setCurrentUser(null);
      }
    })

    return unsuscribe;
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider value={{ currentUser }}>
        <div className="App">
          <PageHeader />
          <div className="content">

            <Routes>
              <Route path="/" element={<MainIndex />} />
              <Route path="/canchas" element={<MainListaCanchas />} />
              <Route path="/reservas" element={<UserReservar />} />
              <Route path="/crear" element={<MainCrearCuenta />} />
              <Route path="/login" element={!loading ? (currentUser.tipo == "Administrador" ? <Navigate to="/admin/index" /> : <Navigate to="/user/index" />) : <MainLogin />} />
              <Route path="/user/index" element={currentUser ? <UserIndex /> : <Navigate to="/" />} />
              <Route path="/admin/index" element={currentUser ? <AdminIndex /> : <Navigate to="/" />} />
              <Route path="*" element={<Navigate to="" />} />
            </Routes>

          </div>
          <PageFooter />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
