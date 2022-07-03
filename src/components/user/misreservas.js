import {React, useState} from 'react';
import {Container, Row, Col, Form, Button, Stack, Nav} from 'react-bootstrap';
import {db} from './../../firebase';
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import './misreservas.css';

function UserMisReservas(){
  return(
    <>
    <Container fluid="md">
      <Row>
        <Stack className='topButtonsBox' direction="horizontal" gap={3}>
          <Button className='topButton'>Siguiente</Button>
          <Button className='topButton'>1</Button>
          <Button className='topButton'>2</Button>
          <Button className='topButton'>3</Button>
          <Button className='topButton'>Anterior</Button>
        </Stack>
      </Row>

      <Row>
          <Nav justify variant="tabs" defaultActiveKey="/home">
            <Nav.Item className='tabs'>
              <Nav.Link className='link' href="/home">ID #22222222 (02/22/2022)</Nav.Link>
            </Nav.Item>
            <Nav.Item className='tabs'>
              <Nav.Link className='link' eventKey="link-1">ID #22222220 (02/20/2022)</Nav.Link>
            </Nav.Item>
            <Nav.Item className='tabs'>
              <Nav.Link className='link' eventKey="link-2">ID #22222202 (02/02/2022)</Nav.Link>
            </Nav.Item>
          </Nav>
      </Row>

      <Row className='containerInfo'>
        <Col className='containerBox'>
          <h1 className="black"><b>Cancha Utilizada</b></h1>
          <img src={require("https://dummyimage.com/800X480/000000/FFFFFF")}/>
          <h3 className="black">Cancha N° X</h3>
          <h2 className="black">★★★★☆</h2>
        </Col>
        <Col className='containerBox'>
          <p className="black">ID #22222222</p>
          <p className="black">Fecha 22/02/2022</p>
          <p className="black">Hora 22:22-22:22</p>
          <p className="black">Valor $2.222</p>
          <p className="black">Estado En espera de pago</p><br />
          <Button className='buttonPagar'>Ir a pagar</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}
export default UserMisReservas;