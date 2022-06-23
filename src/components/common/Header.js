import React from 'react';
import './Header.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(){
    return (
        <Navbar variant="dark" className="color-nav" expand="lg">
        <Container>
            <Navbar.Brand href="/">
                <img className='header-logo' src={require('../../images/header-logo.png')} alt= 'Header logo'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="pills" className="ms-auto">
                <Nav.Link href="/fields">Listado de Canchas</Nav.Link>
                <Nav.Link href="/available">Reservas Disponibles</Nav.Link>
                <Nav.Link href="/create">Crear una Cuenta</Nav.Link>
                <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
            </Nav>
            <NavDropdown disabled>
                <Nav.Link href="/user/editprofile">Editar Perfil</Nav.Link>
                <Nav.Link href="/user/myreservations">Ver Mis Reservas</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link href="/logout">Cerrar Sesión</Nav.Link>
            </NavDropdown>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}
export default Header;