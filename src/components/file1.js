import {React, useState} from 'react';
import './CrearCuenta.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {db} from './../../firebase';
import {setDoc, doc, Timestamp} from 'firebase/firestore';
import Stack from 'react-bootstrap/Stack';
import Nav from 'react-bootstrap/Nav';


function FileOne(){
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
          <h1 class="black"><b>Cancha Utilizada</b></h1>
          <image src={require("https://dummyimage.com/800X480/000000/FFFFFF")}/>
          <h3 class="black">Cancha N° X</h3>
          <h2 class="black">★★★★☆</h2>
        </Col>
        <Col className='containerBox'>
          <p class="black">ID #22222222</p>
          <p class="black">Fecha 22/02/2022</p>
          <p class="black">Hora 22:22-22:22</p>
          <p class="black">Valor $2.222</p>
          <p class="black">Estado En espera de pago</p><br />
          <Button className='buttonPagar'>Ir a pagar</Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default FileOne;