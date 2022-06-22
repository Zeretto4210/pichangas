import React from 'react';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(){
    return (
        <Navbar variant="dark" className="color-nav" expand="lg">
        <Container>
            <Navbar.Brand href="#home">
                <img className='header-logo' src={require('../../images/header-logo.png')} alt= 'Header logo'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className="ms-auto">
                <Nav.Link href="#home">Listado de Canchas</Nav.Link>
                <Nav.Link href="#link">Reservas Disponibles</Nav.Link>
                <Nav.Link href="/home">Crear una Cuenta</Nav.Link>
                <Nav.Link href="/home">Iniciar Sesión</Nav.Link>
            </Nav>
            <NavDropdown disabled>
                <Nav.Link href="/home">Editar Perfil</Nav.Link>
                <Nav.Link href="/home">Ver Mis Reservas</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href="/home">Cerrar Sesión</Nav.Link>
            </NavDropdown>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
export default Header;