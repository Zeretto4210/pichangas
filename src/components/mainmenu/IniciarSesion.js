import React from 'react';
import './IniciarSesion.css';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
function Main_IniciarSesion(){
    return (
        <Container fluid="md">
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <h1>Crear Cuenta</h1>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mx-auto d-block" md={8}>
                    <p>Ingresa tus datos para crear una cuenta nueva.</p>
                </Col>
            </Row>
            <Container>
                <Form>
                    <Form.Group className="mb-3 white" controlId="form.rut">
                        <Form.Label>RUT</Form.Label>
                        <Form.Control type="number" placeholder="12345678" />
                    </Form.Group>
                    <Form.Group className="mb-3 white" controlId="form.password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="12345678" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Iniciar Sesión
                    </Button>
                </Form>
            </Container>
        </Container>
    );
}
export default Main_IniciarSesion;