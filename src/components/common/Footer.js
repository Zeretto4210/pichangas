import React from 'react';
import './Footer.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
function Footer(){
    return (
        <Navbar variant="dark" bg="black" expand="lg">
        <Container>
            <Nav.Link>Copyright@ EL DOS Inc.</Nav.Link>
            <Nav className="ml-auto">
                <Nav.Link href="#home">Contacto</Nav.Link>
                <Nav.Link href="#link">Sobre Nosotros</Nav.Link>
            </Nav>
        </Container>
        </Navbar>
    );
}
export default Footer;