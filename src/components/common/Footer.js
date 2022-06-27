import React from 'react';
import './Footer.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
function Footer(){
    return (
        <footer className='footer'>
            <Navbar variant="dark" bg="black" expand="lg">
                <Nav.Link>Copyright@ EL DOS Inc.</Nav.Link>
                <Nav className="ml-auto">
                    <Nav.Link href="/contact">Contacto</Nav.Link>
                    <Nav.Link href="/aboutus">Sobre Nosotros</Nav.Link>
                </Nav>
            </Navbar>
        </footer>
    );
}
export default Footer;