import React from 'react';
import './footer.css';
import {Navbar, Nav} from 'react-bootstrap';
function PageFooter(){
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
export default PageFooter;