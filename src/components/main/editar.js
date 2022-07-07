import React from 'react';
import { Form, Button, Container, Row} from 'react-bootstrap';

function MainEditar() {
    return (
        <><Container fluid="sm">
          <Row>
            <h1 className='titulo'>Editar Perfil</h1>
            <img src="https://dummyimage.com/800x480/000000/ffffff" />
          </Row>
          <Row className='fillDatos'>
            <Form>
              <Form.Group className="dato mb-3" controlId="formBasicName">
                <Form.Label>Nombre Completo</Form.Label>
                <Form.Control type="name" placeholder="Juan Del Dos Perez" />
              </Form.Group>
              <Form.Group className="dato mb-3" controlId="formBasicTelefono">
                <Form.Label>Telefono</Form.Label>
                <Form.Control type="phone" placeholder="56 8 22222222" />
              </Form.Group>
              <Form.Group className="dato mb-3" controlId="formBasicCelu">
                <Form.Label>Celular</Form.Label>
                <Form.Control type="celu" placeholder="+56 9 22222222" />
              </Form.Group>
              <Form.Group className="dato mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="***********" />
              </Form.Group>
              <Form.Group className="box mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="CAPTCHA" />
              </Form.Group>
              <Form.Group className="box mb-3">
                <Button className='button' type="submit">
                  Actualizar Datos
                </Button>
              </Form.Group>
              
            </Form>
          </Row>
        </Container></>      
      );
}

export default MainEditar