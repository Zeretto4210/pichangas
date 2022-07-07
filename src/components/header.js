import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuthValue } from "./../components/context/AuthContext"
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
function PageHeader() {
    const { currentUser } = useAuthValue();
    return (
        <Navbar variant="dark" className="header" expand="lg">
            <Navbar.Brand as={Link} to="/">
                <img className='header-logo' src={require('../files/header-logo.png')} alt='Header logo' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav variant="pills" className="ms-auto">
                    <Nav.Link as={Link} to="/canchas">Listado de Canchas</Nav.Link>
                    <Nav.Link as={Link} to="/reservas">Reservas Disponibles</Nav.Link>
                    {currentUser ? (
                        <div>
                            <Nav.Link as={Link} to="/login">Mi Panel</Nav.Link>
                            <Nav.Link as={Link} to="/" onClick={()=>{signOut(auth);}}>Cerrar Sesión</Nav.Link>
                        </div>
                    ) : (
                        <div>
                            <Nav.Link as={Link} to="/crear">Crear una Cuenta</Nav.Link>
                            <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                        </div>
                    )}
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    );
}
export default PageHeader;